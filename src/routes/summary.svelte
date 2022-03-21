<script>
  export const prerender = true;
  import { supabase } from "../supabaseClient";
  import Header from "$lib/header/Header.svelte";
  import { current_component, element } from "svelte/internal";
    import { onMount } from "svelte";
  import {
    Accordion,
    AccordionItem,
    ExpandableTile,
  } from "carbon-components-svelte";

  let open = false;
  let username;
  async function getProfile() {
    try {
      let user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(
          `username,
        website,
        avatar_url`
        )
        .eq("id", user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        username = data.username;
      }
    } catch (error) {
      alert(error.message);
      //} finally {
      //loading = false
    }
  }
  let recordedclasses;
  let outer_year_group = [];
  async function getSummary() {
    try {
      let user = supabase.auth.user();
      let { data, error, status } = await supabase.rpc("get_summary_crenaux", {
        userid: user.id,
      });

      if (error && status !== 406) throw error;
      recordedclasses = data;
      if (recordedclasses.length > 0) {
        let currentyear = 1;
        let currenttrimester = "T-1";
        let year_group = [];
        recordedclasses.forEach((element) => {
          if (element.Année == currentyear) {
            if (element.Trimestre == currenttrimester) {
              currenttrimester = element.Trimestre;
              year_group[year_group.length - 1].semester_group[
                year_group[year_group.length - 1].semester_group.length - 1
              ].classes.push(element);
            } else {
              currenttrimester = element.Trimestre;
              year_group[year_group.length - 1].semester_group.push({
                trimestre: element.Trimestre,
                classes: [element],
              });
            }
          } else {
            currentyear = element.Année;
            currenttrimester = element.Trimestre;
            year_group.push({
              year: element.Année,
              semester_group: [
                {
                  trimestre: element.Trimestre,
                  classes: [element],
                },
              ],
            });
          }
          outer_year_group = year_group;
        });
        console.group("year_group");
        console.log(year_group);
      }
    } catch (error) {
      alert(error.message);
      //} finally {
      //loading = false
    }
  }
  let open2 = false;
  /*

  {#each cl.classes as cc}
          <div class="flex">
          <p>{cc.ChosenCNR}</p>
          <p>{cc.IdClass}</p>
          <p>{cc.Name_of_Class}</p>
        </div>
          {/each}

          <DataTable
          title={cl.trimestre}
  headers={[
    { key: "ChosenCNR", value: "CNR" },
    { key: "IdClass", value: "Class Id" },
    { key: "Name_of_Class", value: "Name" }
  ]}
  rows={cl.classes}
  />
          */
</script>

<svelte:head>
  <title>My summary</title>
</svelte:head>

<section>
  <Header />
</section>

<div class="form-message" />

<main>
  <p use:getProfile class="m-10 font-extralight text-2xl">
    {username == undefined ? "" : username}
  </p>
  <div use:getSummary>
    <Accordion>
      {#each outer_year_group as semestergroup}
        <AccordionItem>
          <h5 slot="title">{semestergroup.year}</h5>
          
            {#each semestergroup.semester_group as cl}
              <ExpandableTile light>
                <div slot="above">{cl.trimestre}</div>
                <div slot="below">
                  {#each cl.classes as cc}
                    <div class="flex">
                      <p>{cc.ChosenCNR}</p>
                      <p>{cc.IdClass}</p>
                      <p>{cc.Name_of_Class}</p>
                    </div>
                  {/each}
                </div>
              </ExpandableTile>
            {/each}
        </AccordionItem>
      {/each}
    </Accordion>
  </div>
</main>

<style>
  p {
    margin-left: 2rem;
  }
</style>
