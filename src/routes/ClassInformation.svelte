<script>
    	import { user,classIdRequested } from "$lib/sessionStore";
    import { supabase } from "../supabaseClient";
	import Header from '$lib/header/Header.svelte';
  import { Accordion, AccordionItem, Button } from "carbon-components-svelte";

	
let loading = false;
let class_info = {Outline: null};
	async function getClassInfo() {
    if(classIdRequested != "none"){
      try {
      loading = true
      const user = supabase.auth.user()
	  
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
</script>

<Header/>
<main  use:getClassInfo class="{classIdRequested == "none" ? "hidden" : "shown"} w-full">
  <div class="w-full">
    <div class="flex containerClass" id="ClassId">
      {#if class_info.ID_Cours != null}
      <p>{class_info != null ? class_info.ID_Cours : ""}</p>
      {/if}
      {#if class_info.Name_of_Class != null}
      <p>{class_info != null ? class_info.Name_of_Class : ""}</p>
      {/if}
      {#if class_info.Responsable != null}
      <p>{class_info != null ? class_info.Responsable : ""}</p> 
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
</div>
</main>
<style>
.containerClass{
padding: 1.5rem;
}
.blue{
  background-color: aliceblue;
}
#ClassId p{
  margin: 0.5rem;
}

</style>