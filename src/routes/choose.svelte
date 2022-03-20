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
/*
    const askedCourse = async () => {
        try{
            let user = supabase.auth.user();
            const { data, error } = await supabase.from("UserClassInfo").select("IdClass").match({ IdUser: user.id}).eq('AddToTrimester', true).order()
            console.log('data', data);

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
*/
    import { trackID } from '$lib/sessionStore';
    import SearchTrack from '$lib/search/SearchTrack.svelte';
  
    let trackIdRequested;

    trackID.subscribe(value => {
        trackIdRequested = value;
    });
</script>

<main>
    <Header />

</main>
<div>
    <SearchTrack />
    {trackIdRequested}
  </div>