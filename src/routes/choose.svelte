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

    import { courseID } from '$lib/sessionStore';
    import Search from '$lib/search/Search.svelte';
  
    let classIdRequested;

    courseID.subscribe(value => {
        classIdRequested = value;
    });
</script>

<main>
    <Header />
    <button on:click="{() => askedCourse()}">Click</button>
    <button on:click="{() => get_track_data()}">Click</button>

</main>
<div>
    <Search />
    {classIdRequested}
  </div>