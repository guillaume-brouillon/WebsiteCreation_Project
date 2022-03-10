<script>
    	import { classIdRequested } from "$lib/sessionStore";
    import { supabase } from "../supabaseClient";
	import Header from '$lib/header/Header.svelte';
  import { Accordion, AccordionItem, Button, Dropdown,Toggle  } from "carbon-components-svelte";

	
let loading = false;
let class_info = {Outline: null};
	async function getClassInfo() {
    if(classIdRequested != "none"){
      try {
      loading = true
      let user = supabase.auth.user();
	  
	  console.log("user connected");

      let { data, error, status } = await supabase
        .from('ClassInformation')
        .select(`*`)
        .eq('ID_Cours', classIdRequested)
        .single()
		
		console.log("info fetched");
		console.log(data);
		console.log("info fetched");

      if (error && status !== 406) throw error;
	  

      if (data) {
        class_info = data
      }
    } catch (error) {	
		console.log(error.message);	
		alert(error.message)
    } finally {
      loading = false
    }
    }
    
  }

let property_name = ["Abstract","Objectives","Topics","Outline","Pedagolocial_Approach","Grading","Bibliography"]
  let open = false;
  let toggled = false;

  let Desirability = [
    { id: "0", text: "None" },
    { id: "1", text: "Lowest" },
    { id: "2", text: "Low" },
    { id: "3", text: "Normal" },
    { id: "4", text: "High" },
    { id: "5", text: "Higher" },
    { id: "6", text: "Highest" },
    { id: "7", text: "Must Take" },
    { id: "8", text: "Mandatory" }
  ];
  let DesirabilityId = "0";
let status = [
  { id: 0, text: "Not Taken" },
  { id: 1, text: "Asked" },
  { id: 2, text: "In Progress" },
  { id: 3, text: "Failed" },
  { id: 4, text: "Passed" }
];
let StatusId = 0;
</script>

<Header/>
<main  use:getClassInfo class="{classIdRequested == "none" ? "hidden" : "shown"} w-full">
    <div style="background-color: var(--bandeau-color);"  class="flex m-auto ">
      <div  class="BarAcceptClass flex content-center flex-wrap">
        <Dropdown
        style="margin-left: 1rem"
        type="inline"
        light
    titleText="Desirability"
    bind:selectedId={DesirabilityId}
    items={Desirability}
    class="VerticalAligned"
  />
      
<Dropdown
style="margin-left: 1rem"
type="inline"
light
titleText="Status"
bind:selectedId={StatusId}
items={status}
class="VerticalAligned"
/>

<Toggle 
class="toggle {StatusId < 2 ? toggled ? "togglepaddingFull" : "togglepaddingSmall" : "togglepaddingNoToggle"} {StatusId < 2 ? "shown" : "vishidden"}"
bind:toggled
labelA="This Semester"
labelB="Not this semester"
>
</Toggle>
 
</div></div>
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
        <p>Responsable : </p>
        <p>{class_info != null ? class_info.Responsable : ""}</p> 
      </div>
      {/if} 
    </div>
    


    <div  class="containerClass">
<Accordion>
  {#each property_name as property}
  {#if class_info[property] != null }
  <AccordionItem {open}>
  <h5 slot="title" >{property.replace("_"," ")}</h5>
  <div bind:innerHTML={class_info[property]} 
  contenteditable="true"></div>
  </AccordionItem>
  {/if}
  {/each}
</Accordion>

</div>
</main>
<style>
  *
  {
    font-family: 'Lora', serif;
  }
  main
  {
    background-color: #F2F2F2;
    padding: 1rem;
    display: block;
  }
  div
  {
    background-color: var(--pure-white);
    margin: 1rem;
  }
.containerClass p{
margin-right: 1rem;
}
.blue{
  background-color: var(--primary-color);
}
:global(.toggle)
{
  height: 52px;
  margin-left: 10px;
}
:global(.VerticalAligned)
{
margin: auto;
}
.BarAcceptClass{
  margin:auto;
  background-color: var(--bandeau-color);
}
:global(.togglepaddingFull)
{  
  padding-right: 120px;
}
:global(.togglepaddingSmall)
{  
  padding-right: 100px;
}
:global(.togglepaddingNoToggle)
{  
  padding-right: 0px;
}

	
</style>