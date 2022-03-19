<script>
  import Header from "$lib/header/Header.svelte";
  import {
    Accordion,
    AccordionItem,
    Button,Tag,
    Dropdown,
    Toggle,
  } from "carbon-components-svelte";
  
  import Search from '$lib/search/Search.svelte';
  import { courseID } from '$lib/sessionStore';
  
  let classIdRequested;
  let class_info = { Outline: null };
  let info = 'hidden';

  courseID.subscribe(value => {
      classIdRequested = value;
      getClassInfo()
      if (classIdRequested === 'none') {
      info = 'hidden' 
    }
    else { 
      info = 'shown'
    }
  });

  let DesirabilityId = 0;
  let StatusId = 0;
  async function getClassInfo() {
    if(classIdRequested !== 'none') {
      try {
        let user = supabase.auth.user();

        let { data, error, status } = await supabase
          .from("ClassInformation")
          .select(`*`)
          .eq("ID_Cours", classIdRequested)
          .single();


        if (error && status !== 406) throw error;

        if (data) {
          class_info = data;
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      } 
    } 
  }
  
  const user = supabase.auth.user();
  let default_user_info;
  if(user){
    default_user_info
 = {
    IdUser: user.id,
    IdClass: classIdRequested,
    Desirability: DesirabilityId,
    Status: StatusId,
    AddTostTrimester: false,
  };
  }
  let user_class_info = default_user_info;
  async function createUserClassInfo() {
    try {
      let { error } = await supabase
        .from("UserClassInfo")
        .insert(default_user_info);
    } catch (error) {
      alert(error);
    }
  }
  async function getClassInfoUser() {
    if (classIdRequested != "none") {
      try {
        let user = supabase.auth.user();


        let { data, error, status } = await supabase
          .from("UserClassInfo")
          .select(`*`)
          .match({ IdUser: user.id, IdClass: classIdRequested })
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          user_class_info = data;
          toggled = user_class_info.AddToTrimester;
          DesirabilityId = user_class_info.Desirability;
          StatusId = user_class_info.Status;
        } else {
          user_class_info = default_user_info;
          createUserClassInfo();
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
  }

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
  async function ModifyTable(kv,table="UserClassInfo"){
  try{
    let user = supabase.auth.user();
  const { data, error } = await supabase
  .from(table)
  .update(kv)
  .match({ IdUser: user.id,IdClass:classIdRequested })
  if(error) throw error;
  }
  catch(error){
    alert(error.message)
  }

  }
  let tracks = [{filliere:"none"}] ;
  async function getTrackInfo(){
    if (classIdRequested != "none") {
      try {
        let user = supabase.auth.user();

        let { data, error, status } = await supabase.rpc('get_track',{courside: classIdRequested})

        if (error && status !== 406) throw error;

        if (data) {
          tracks = data;
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
}
let crenaux_lists = null;
async function getCrenauxInfo(){
    if (classIdRequested != "none") {
      try {
        let user = supabase.auth.user();

        let { data, error, status } = await supabase
        .from("Crenaux")
        .select("*")
        .match({Course_ID: classIdRequested})

        if (error && status !== 406) throw error;

        if (data) {
          crenaux_lists = data;
        }
      } catch (error) {
        console.log(error.message);
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
  
          return {
              status: 302,
              redirect: "/"
          };
  }
return {};
  }

</script>
<Header />
<div>
  <Search />
</div>
<main
  use:getClassInfo
  class="{classIdRequested === 'none' ? 'hidden' : 'shown'} w-full"
>
  <div style="background-color: var(--bandeau-color);" class="flex m-auto " use:getClassInfoUser>
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
        labelA="This Trimester"
        labelB="Not this Trimester"
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

  <div class="containerClass bg-transparent" style="background-color: transparent;" use:getTrackInfo>
    <p>Tracks</p>
  {#if tracks != null}
    {#each tracks as track}
      <Tag>{track.filliere}</Tag>
    {/each}
  {/if}
  </div>
  
  <div  class="containerClass">

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
