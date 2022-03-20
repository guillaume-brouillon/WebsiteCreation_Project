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
    import { trackID } from '$lib/sessionStore';
    import SearchTrack from '$lib/search/SearchTrack.svelte';
  
    let trackIdRequested;

    trackID.subscribe(value => {
        trackIdRequested = value;
    });
</script>


<Header />
<div>
    <SearchTrack />
    {trackIdRequested}
</div>

<main>
</main>