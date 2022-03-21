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

<script>
    import Header from "$lib/header/Header.svelte";
    import { trackID, courseID } from '$lib/sessionStore';
    import {Tag, Button} from "carbon-components-svelte";
    import SearchTrack from '$lib/search/SearchTrack.svelte';
  
    let trackIdRequested;
    let track_info = { Outline: null };
    let track_class = [];
    let course;

    const getTrackInfo = async () => {
        if (trackIdRequested !== "none") {
            try {
                const { data } = await supabase
                .from("TracksInfo")
                .select(`*`)
                .eq("Nom", trackIdRequested)
                .single();
                if (data) {
                    track_info = data;
                }
            } catch (error) {
                alert(error.message);
            }
        };
    };

    const getcourseMandatory = async () => {
        if (trackIdRequested !== "none") {
            try {
                const { data } = await supabase.rpc('get_track_class', {trackname: trackIdRequested});
                if (data) {
                    track_class = data;
                }
            } catch (error) {
                alert(error.message);
            }
        };
    };

    trackID.subscribe(value => {
        trackIdRequested = value;
        getTrackInfo();
        getcourseMandatory();
    });

    const add_class = (event) => {
        event.target.parentElement.parentElement.childNodes.forEach((element) => {
        if (element.classList) {
            element.classList.remove("bg-cyan-200", "text-sky-900");
        }
        });
        event.target.parentElement.classList.add("bg-cyan-200", "text-sky-900");
        course = event.target.innerText.substring(0, 9);
    };

    const find_class = () => {
        courseID.update(() => course);
    };

</script>


<Header />
<div>
    <SearchTrack />
</div>

<main>
    <div class="flex flex-wrap justify-around self-center">
        {#if track_info.Nom != null}
            <div>
                <p>{track_info != null ? track_info.Nom : ""}</p>
            </div>
            <div>
                <p>Type : {track_info != null ? track_info.Track : ""}</p>
            </div>
        {/if}
    </div>

    {#if track_class != null && track_class.length != 0}
        <div class="containerClass bg-transparent" style="background-color: transparent;">
            <p>Mandatory courses :</p>
            <div class="grid grid-cols-2 text-center justify-center" style="background-color: transparent;">
                {#each track_class as classes}
                    <Tag class="cursor-pointer" on:click={(event) => add_class(event)}>{classes.id} : {classes.Name}</Tag>
                {/each}
            </div>
        </div>
    {/if}
</main>

{#if course!= null}
    <div class="text-center">
        <a on:click={find_class} href="/ClassInformation" style="link">
            <Button class="button">Search for {course}</Button>
        </a>
    </div>
{/if}

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

    :global(.button) {
        background-color:  var(--color-primary-dark);
        justify-content: center;
    }

    :global(.button):hover {
        background-color: var(--tertiary-color);
        transform: scale(1.1);
    }

</style>