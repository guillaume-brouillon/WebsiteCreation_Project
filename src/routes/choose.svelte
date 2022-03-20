<script context="module">
    import { supabase } from "../supabaseClient";
  import ListView      from 'svelte-sortable-flat-list-view'
    let user = supabase.auth.user();
    /*
    export async function load() {
        if (user == null) {
            return {
                status: 302,
                redirect: "/"
            };
        }
        return {};
    }*/
</script>

<script>
    import Header from "$lib/header/Header.svelte";
    import SearchClass from "$lib/search/SearchClass.svelte";
  import { Tooltip, TooltipDefinition,AccordionItem,Accordion } from "carbon-components-svelte";
    import { onMount } from 'svelte';
    const askedCourse = async () => {
        if(classes == []){
        try{
            let user = supabase.auth.user();
            const { data, error } = await supabase.from("UserClassInfo").select("IdClass").match({ IdUser: user.id}).eq('AddToTrimester', true).order()
            console.log('data', data);
            allclasses.set(data);
            if(error) {
                throw error;
                console.log(error);
            } else {
                console.log(data);
            }
        } catch(error){
            alert(error.message);
        }
        }
    }
    const askedCourseTrie = async () => {
        if(classes.length == 0){
        try{
                console.log("trie");
            let user = supabase.auth.user();
            const { data, error } = await supabase.rpc("get_info_class_tri", {userid: user.id})

            allclasses.set(data);
                console.log(classes);
            console.log("fin trie");
            if(error) {
                throw error;
                console.log(error);
            } else {
                console.log(data);
            }
        } catch(error){
                console.log(error);
            alert(error.message);
        }
    }
    }
    import { courseID,selector,allclasses,trackID,Selector} from '$lib/sessionStore';
    let classes = [];
    allclasses.subscribe((value)=>{classes = value;})
    import Search from '$lib/search/Search.svelte';
  
    let trackIdRequested;

    trackID.subscribe(value => {
        trackIdRequested = value;
    });
    $: visibleClasses = 
    classes.filter(classe => {
        var test = classe.ID_Cours.match(`${$Selector.CourseId}.*`);
        if($Selector.Desirability_compare_type == 0)
        test = test && classe.Desirability <= $Selector.DesirabilityId
        else if($Selector.Desirability_compare_type == 1)
        test = test && classe.Desirability == $Selector.DesirabilityId
        else if($Selector.Desirability_compare_type == 2)
        test = test && classe.Desirability >= $Selector.DesirabilityId

        test = test && $Selector.ThisSemester == classe.AddToTrimester;
			return test;//
		});

	onMount(async () => {
        await askedCourseTrie();
	});   
   

    var targetObj = new selector();
    /*var Selector = new Proxy(targetObj, {
    set: function (target, key, value) {
      console.log(`${key} set to ${value}`);
      target[key] = value;
      return true;
  }
});
*/
  let open = false;
</script>

<header>
    <Header />
    <button on:click="{() => askedCourse()}">Click</button>
    <button on:click="{() => askedCourseTrie()}">ClickTrie</button>
    <button on:click="{() => get_track_data()}">Click</button>

</header>
<main>
    <Search />
    <SearchClass/>
    {#each visibleClasses as classe}
    <div class="listviewitem">
    <div class="flex">
        <p>{classe.ID_Cours}</p>
        <p>{classe.Name_of_Class}</p>
        
        

        <p>UV : </p>
        <p>{classe["UV"]}</p>
    </div>
    {#if classe.Abstract != null}
        
    <Accordion>
  <AccordionItem {open}>
    <h5 slot="title">Abstract</h5>
    <div bind:innerHTML={classe.Abstract} contenteditable="true" />
  </AccordionItem>
  </Accordion>
{/if}

<div class="flex">
    <a on:click={courseID.set(classe.ID_Cours)} href="/ClassInformation">Learn more</a>
</div>
    </div>
    
    {/each}
</main>

<style>
p
{
    margin-right: 1rem;
}
.listviewitem{
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-color: gray;
    border-style: solid;
    border-width: 1px;
    padding: 0.7rem;
}

main {
    padding: 1rem;
    display: block;
  }

</style>
