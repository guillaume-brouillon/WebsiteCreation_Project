<script context="module">
    import { supabase } from "../supabaseClient";
    import ListView from "svelte-sortable-flat-list-view";
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
    import {
        Tooltip,
        TooltipDefinition,
        AccordionItem,
        Accordion,
        OverflowMenu,
        OverflowMenuItem,
    } from "carbon-components-svelte";
    import { onMount } from "svelte";

    const askedCourseTrie = async () => {
        if (classes.length == 0 || true) {
            try {
                let user = supabase.auth.user();
                const { data, error } = await supabase.rpc(
                    "get_info_class_tri",
                    { userid: user.id }
                );

                const { data:data2, error:error2 } = await supabase.rpc(
                    "get_info_class_tri_crenaux",
                    { userid: user.id }
                );
                allclasses.set(data);
                let i =0;
                        $allclasses[i].takeclass_text="Take Class"
                data2.forEach(element => {
                    if($allclasses[i].ID_Cours == element.ID_Cours){
                        if($allclasses[i].crenaux == undefined)
                        $allclasses[i].crenaux = []
                        $allclasses[i].crenaux.push({Année: element.Année,Trimestre: element.Trimestre,
                        CNR: element["CNR"],Jour: element.Jour, Crénaux: element.Crénaux})
                        if($allclasses[i]["CNR"]==element["CNR"])
                        $allclasses[i].takeclass_text="Reset Class"
                        
                    }
                    else{
                    i++;
                        $allclasses[i].takeclass_text="Take Class"
                    }
                console.log(i);
                });
                console.log("__foreach");
                if (error) {
                    throw error;
                }
                 else {
                }
                console.log("class length");
            } catch (error) {
                alert(error.message);
            }
        }
    };
    import {
        courseID,
        selector,
        allclasses,
        trackID,
        Selector,
        ModifyTable,
    } from "$lib/sessionStore";
    let classes = [];
    allclasses.subscribe((value) => {
        classes = value;
    });
    import Search from "$lib/search/Search.svelte";

    let trackIdRequested;

    trackID.subscribe((value) => {
        trackIdRequested = value;
    });
    $: visibleClasses = $allclasses.filter((classe) => {
        console.log(classe)
        var test = classe.ID_Cours.match(`${$Selector.CourseId}.*`);
        if ($Selector.Desirability_compare_type == 0)
            test = test && classe.Desirability <= $Selector.DesirabilityId;
        else if ($Selector.Desirability_compare_type == 1)
            test = test && classe.Desirability == $Selector.DesirabilityId;
        else if ($Selector.Desirability_compare_type == 2)
            test = test && classe.Desirability >= $Selector.DesirabilityId;
        if (classe.AddToTrimester == null)
            test = test && $Selector.ThisSemester == false;
        else test = test && $Selector.ThisSemester == classe.AddToTrimester;

        test = test && $Selector.StatusId == classe.Status;

        return test; //
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
</header>
<main>
    <input type="text" class="bg-purple-white placeholder-gray-700 text-dark shadow rounded border-2 border-gray-400 p-3 w-full mb-4"  bind:value={$Selector.CourseId}/>
    <SearchClass />
    {#each visibleClasses as classe}
        <div class="listviewitem">
            <div class="flex">
                <div class="flex">
                    <p>{classe.ID_Cours}</p>
                    <p>{classe.Name_of_Class}</p>

                    <p>UV :</p>
                    <p>{classe["UV"]}</p>
                </div>
            </div>
            <div class="flex">
                {#if  classe.crenaux != undefined && classe.crenaux.length > 0}
                    <OverflowMenu
                        style="width: auto;"
                        class="mb-auto mt-auto overflowmenu"
                    >
                        <div
                            slot="menu"
                            style="padding: 1rem; "
                            on:click={() => {
                                if (classe.takeclass_text == "Remove Class") {
                                    classe.takeclass_text = "Take Class";
                                    classe.chosencnr = undefined;
                                    ModifyTable(
                                        { ChosenCNR: null },
                                        classe.ID_Cours
                                    );
                                }
                            }}
                        >
                            {classe.takeclass_text}
                        </div>
                        {#each classe.crenaux as cr}
                            <OverflowMenuItem class="overflowitem min-w-fit">
                                <div
                                    class="flex min-w-fit"
                                    on:click={() => {
                                        classe.chosencnr = cr;
                                        ModifyTable(
                                            { ChosenCNR: cr["CNR"],Année: cr.Année, Trimestre: cr.Trimestre },
                                            classe.ID_Cours
                                        );
                                        classe.takeclass_text = "Remove Class";
                                    }}
                                >
                                    <p>{cr.Année}</p>
                                    <p>{cr.Trimestre}</p>
                                    <p>{cr["CNR"]}</p>
                                    <p class="min-w-fit">{cr.Jour}</p>
                                    <p>{cr.Crénaux}</p>
                                </div>
                            </OverflowMenuItem>
                        {/each}
                    </OverflowMenu>
                {/if}
                {#if classe.chosencnr != undefined}
                    <div class="flex mt-auto mb-auto">
                        <p>{classe.chosencnr.Année}</p>
                        <p>{classe.chosencnr.Trimestre}</p>
                        <p>{classe.chosencnr["CNR"]}</p>
                        <p class="min-w-fit">{classe.chosencnr.Jour}</p>
                        <p>{classe.chosencnr.Crénaux}</p>
                    </div>
                {/if}
            </div>
            {#if classe.Abstract != null}
                <Accordion>
                    <AccordionItem {open}>
                        <h5 slot="title">Abstract</h5>
                        <div
                            bind:innerHTML={classe.Abstract}
                            contenteditable="true"
                        />
                    </AccordionItem>
                </Accordion>
            {/if}

            <div class="flex">
                <a
                    on:click={courseID.set(classe.ID_Cours)}
                    href="/ClassInformation">Learn more</a
                >
            </div>
        </div>
    {/each}
</main>

<style>
    p {
        margin-right: 1rem;
        word-wrap: unset;
    }
    :global(.overflowitem) {
        width: 22rem;
        background-color: #f4f4f4;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
    }
    :global(.overflowitem:hover) {
        width: 22rem;
        background-color: #e5e5e5;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
    }

    :global(.overflowmenu) {
    }
    .listviewitem {
        max-width: 80rem;
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
