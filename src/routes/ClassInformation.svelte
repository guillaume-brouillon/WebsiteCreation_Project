<script>
    	import { user,classIdRequested } from "$lib/sessionStore";
    import { supabase } from "../supabaseClient";
	import Header from '$lib/header/Header.svelte';
  import { Accordion, AccordionItem, Button } from "carbon-components-svelte";

	
let loading = false;
let class_info = null;
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


  let open = false;
</script>

<Header/>
<main  use:getClassInfo class="{classIdRequested == "none" ? "hidden" : "shown"} w-full">
  <div class="w-full">
    <div class="flex containerClass blue">
      <p>{class_info != null ? class_info.ID_Cours : ""}</p>
      <p>{class_info != null ? class_info.Name_of_Class : ""}</p>
      <p>{class_info != null ? class_info.Responsable : ""}</p>  
    </div>
    


    <div  class="containerClass">
<Accordion>
<AccordionItem {open}>
<h5 slot="title" >Abstract</h5>
<p>{class_info != null ? class_info.Abstract : ""}</p>
</AccordionItem>

{#if class_info != null && class_info.Objectives != null }
<AccordionItem {open}>
<h5 slot="title" >Objectives</h5>
<p>{class_info != null ? class_info.Objectives : ""}</p>
</AccordionItem>
{/if}

  <AccordionItem {open}>
  <h5 slot="title" >Outline</h5>
  <p>{class_info != null ? class_info.Outline : ""}</p>
  </AccordionItem>
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
</style>