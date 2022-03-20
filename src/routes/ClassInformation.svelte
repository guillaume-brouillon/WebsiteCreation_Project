<script>
  import Header from "$lib/header/Header.svelte";
  import {Accordion, AccordionItem, Tag, Dropdown, Toggle} from "carbon-components-svelte";
  import Search from '$lib/search/Search.svelte';
  import { courseID } from '$lib/sessionStore';
  
  let classIdRequested;
  let class_info = { Outline: null };
  let tracks = [{filliere:"none"}] ;
  let teachers = [{Professeur:"none"}] ;
  let profs = [{Professeur:"none"}];
  let crenaux_lists = null;
  let years = [{id: 0, text:'None'}];
  let trimesters = [{id: 0, text:'None'}];

  let property_name = [
    "Abstract",
    "Objectives",
    "Topics",
    "Outline",
    "Pedagolocial_Approach",
    "Grading",
    "Bibliography",
  ];
  let open = false;
  let toggled = false;

  let Desirability = [
    { id: 0, text: "None" },
    { id: 1, text: "Lowest" },
    { id: 2, text: "Low" },
    { id: 3, text: "Normal" },
    { id: 4, text: "High" },
    { id: 5, text: "Higher" },
    { id: 6, text: "Highest" },
    { id: 7, text: "Must Take" },
    { id: 8, text: "Mandatory" },
  ];
  let status = [
    { id: 0, text: "Not Taken" },
    { id: 1, text: "Asked" },
    { id: 2, text: "In Progress" },
    { id: 3, text: "Failed" },
    { id: 4, text: "Passed" },
  ];

  const user = supabase.auth.user();
  let DesirabilityId = 0;
  let StatusId = 0;
  let YearId = 0;
  let TrimesterId = 0;

  const getClassInfo = async () => {
    if(classIdRequested !== 'none') {
      try {
        const {data} = await supabase.from("ClassInformation").select(`*`).eq("ID_Cours", classIdRequested).single();
        if (data) {
          class_info = data;
        }
      } catch (error) {
        alert(error.message);
      } 
    } 
  }

  async function getClassInfoUser() {
    if (classIdRequested != "none" && user) {
      try {
        const { data, status, error } = await supabase.from("UserClassInfo").select(`*`).match({ IdUser: user.id, IdClass: classIdRequested }).single();
        if (error && status == 406) {
          toggled = false;
          DesirabilityId = 0;
          StatusId = 0;
        } else if (data) {
          toggled = data.AddToTrimester;
          DesirabilityId = data.Desirability;
          StatusId = data.Status;
        }
      } catch (error) {
          alert(error.message); 
      }
    }
  }

  const getTrackInfo = async () => {
    if (classIdRequested != "none") {
      try {
        let { data, status } = await supabase.rpc('get_track', {courside: classIdRequested});
        if (status == 406) {
          tracks = [];
        } else if (data) {
          tracks = data;
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }

  const getTeacherInfo = async () => {
      if (classIdRequested != "none") {
        try {
          let { data, status } = await supabase.rpc('get_teacher', {courside: classIdRequested});
          if (status == 406) {
            teachers = [];
          } else if (data) {
            teachers = data;
          }
        } catch (error) {
          alert(error.message);
        }
      }
  }

  const getYearsTrimester = async () => {
    if (classIdRequested != "none") {
        try {
          let { data, status } = await supabase.rpc('get_years_trimester', {courside: classIdRequested});
          let i = 1;
          let j = 1;
          let year_possibility = [];
          let trimester_possibility = [];
          data.forEach(element => {
            if (!year_possibility.includes(element.Year)) {
              year_possibility = [...year_possibility, element.Year]
              years = [...years, {id:i, text: element.Year}]
              i++
            }
            if (!trimester_possibility.includes(element.Trimester)) {
              trimester_possibility = [...trimester_possibility, element.Trimester]
              trimesters = [...trimesters, {id: j, text:element.Trimester}]
              j++
            }
          });
        } catch (error) {
          alert(error.message);
        }
      }
  }

  courseID.subscribe(value => {
    classIdRequested = value;
    getClassInfo();
    getClassInfoUser();
    getTrackInfo();
    getTeacherInfo();
    getYearsTrimester();
  });

  const ModifyTable = async (kv) => {
    if (classIdRequested != "none" && user) {
      try{
        let { error, status } = await supabase.from("UserClassInfo").select(`IdClass`).match({ IdUser: user.id, IdClass: classIdRequested }).single();
        if( status == 406) {
          await supabase.from("UserClassInfo").insert([{IdUser: user.id, IdClass: classIdRequested, Desirability: DesirabilityId, Status: StatusId, AddToTrimester: false}]);
        }
        await supabase.from("UserClassInfo").update(kv).match({ IdUser: user.id, IdClass:classIdRequested }).single()
      } catch(error){
        alert(error.message);
      }
    }
  }

  const add_teacher = async (event) => {
    event.target.parentElement.parentElement.childNodes.forEach(element => {
      if (element.classList) { 
        element.classList.remove("bg-cyan-200", "text-sky-900")
      };
    });
    event.target.parentElement.classList.add("bg-cyan-200", "text-sky-900");
    let teacher = event.target.innerText;
    try {
      const {data} = await supabase.from("InfoProf").select(`*`).eq(`Professeur`, teacher);
      profs = data;
    } catch (error) {
      alert(error.message);
    }
  }

  const getCrenauxInfo = async () => {
    if (classIdRequested != "none" && YearId > 0 && TrimesterId > 0) {
      try {
        let { data, status } = await supabase.from("Crenaux").select("*").match({Course_ID: classIdRequested, Année: years[YearId].text, Trimestre: trimesters[TrimesterId].text});
        if (status == 406) {
          crenaux_lists = [];
        } else if (data) {
          crenaux_lists = data;
        }
        console.log(crenaux_lists);
      } catch (error) {
        alert(error.message);
      }
    }
  }

</script>

<script context="module">
  import { supabase } from "../supabaseClient";
  let user = supabase.auth.user();

  export async function load() {
    if (user == null) {
      return {status: 302, redirect: "/"};
    }
    return {};
  }
</script>

<Header />
<div>
  <Search />
</div>

<main style="{classIdRequested === 'none' ? 'hidden' : 'shown'} w-full">

  <div style="background-color: var(--bandeau-color);" class="flex m-auto ">
    <div class="BarAcceptClass flex content-center flex-wrap">
      <Dropdown
        style="margin-left: 1rem"
        type="inline"
        light
        titleText="Desirability"
        bind:selectedId={DesirabilityId}
        items={Desirability}
        class="VerticalAligned"
        on:select={ModifyTable({ Desirability: DesirabilityId })}
      />

      <Dropdown
        style="margin-left: 1rem"
        type="inline"
        light
        titleText="Status"
        bind:selectedId={StatusId}
        items={status}
        class="VerticalAligned"
        on:select={ModifyTable({ Status: StatusId })}
      />

      <Toggle
        class="toggle {StatusId < 2
          ? toggled
            ? 'togglepaddingFull'
            : 'togglepaddingSmall'
          : 'togglepaddingNoToggle'} {StatusId < 2 ? 'shown' : 'vishidden'}"
        bind:toggled
        on:toggle={ModifyTable({ AddToTrimester: toggled })}
        labelA="Choose this Trimester"
        labelB="Not choose this Trimester"
      />
    </div>
  </div>


  <div class="flex flex-wrap containerClass">
    <div class="flex">
      {#if class_info.ID_Cours != null}
        <p>{class_info != null ? class_info.ID_Cours : ""}</p>
      {/if}
      {#if class_info.Name_of_Class != null}
        <p>{class_info != null ? class_info.Name_of_Class : ""}</p>
      {/if}
    </div>

    {#if class_info.Responsable != null}
      <div class="flex">
        <p>Responsable :</p>
        <p>{class_info != null ? class_info.Responsable : ""}</p>
      </div>
    {/if}
  </div>

  <div class="containerClass">
    <Accordion>
      {#each property_name as property}
        {#if class_info[property] != null}
          <AccordionItem {open}>
            <h5 slot="title">{property.replace("_", " ")}</h5>
            <div bind:innerHTML={class_info[property]} contenteditable="true" />
          </AccordionItem>
        {/if}
      {/each}
    </Accordion>
  </div>

  <div class="containerClass bg-transparent" style="background-color: transparent;">
    <p>Tracks</p>
  {#if tracks != null}
    {#each tracks as track}
      <Tag>{track.filliere}</Tag>
    {/each}
  {/if}
  </div>

  <div class="containerClass bg-transparent" style="background-color: transparent;">
    <p>Teachers</p>
  {#if teachers != null}
    {#each teachers as teacher}
      <Tag class="cursor-pointer" on:click="{(event) => {add_teacher(event)}}">
        {teacher.Professeur}
      </Tag>
    {/each}
  {/if}

  {#if profs != null && profs.Professeur != 'none'}
    {#each profs as prof}
      <div class="{prof.Professeur === 'none' ? "hidden" : "grid grid-cols-2 text-center justify-center"} ">
        <div>Teacher pedagogy</div>
        <div>{prof.PedagogicalGradeOn10}</div>
        <div>Course grade</div>
        <div>{prof.CourseGradeOn10}</div>
        <div>Average bet points</div>
        <div>{prof.AverageBetPoints}</div>
        <div>Number of opinions</div>
        <div>{prof.NbOpinion}</div>
      </div>
    {/each}
  {/if}

  <div class="containerClass bg-transparent flex" style="background-color: transparent;">
    <p class="align-text-bottom">Classes</p>
    <div  class="BarAcceptClass flex content-center flex-wrap containerClass" style="background-color: transparent;">
      <Dropdown
      style="margin-left: 1rem"
      type="inline"
      light
      titleText="Year"
      bind:selectedId={YearId}
      items={years}
      class="VerticalAligned"
      on:select={getCrenauxInfo}
      />

      <Dropdown
      style="margin-left: 1rem"
      type="inline"
      light
      titleText="Trimester"
      bind:selectedId={TrimesterId}
      items={trimesters}
      class="VerticalAligned"
      on:select={getCrenauxInfo}
      />
    </div>
  </div>

  <div class="containerClass bg-transparent" style="background-color: transparent;">
    {#if crenaux_lists != null}
      <p>Dates</p>
      <div class="grid grid-cols-4 text-center justify-center">
        <div>Day</div>
        <div>Hours</div>
        <div>CRN</div>
        <div>Teacher</div>
        {#each crenaux_lists as cre}
          <div>{cre.Jour}</div>
          <div>{cre.Crénaux}</div>
          <div>{cre.CNR}</div>
          <div>{cre.Professeur}</div>
        {/each}
      </div>
    {/if}
  </div>

</main>

<style>
  * {
    font-family: "Lora", serif;
  }
  main {
    background-color: #f2f2f2;
    padding: 1rem;
    display: block;
  }
  div {
    background-color: var(--pure-white);
    margin: 1rem;
  }
  .containerClass p {
    margin-right: 1rem;
  }
  .blue {
    background-color: var(--primary-color);
  }
  :global(.toggle) {
    height: 52px;
    margin-left: 10px;
  }
  :global(.VerticalAligned) {
    margin: auto;
  }
  .BarAcceptClass {
    margin: auto;
    background-color: var(--bandeau-color);
  }
  :global(.togglepaddingFull) {
    padding-right: 120px;
  }
  :global(.togglepaddingSmall) {
    padding-right: 100px;
  }
  :global(.togglepaddingNoToggle) {
    padding-right: 0px;
  }
</style>
