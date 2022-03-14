<script>
	export const prerender = true;
    import { supabase } from "../supabaseClient";
	import Header from '$lib/header/Header.svelte';

let username;
	async function getProfile() {
    try {
      
let user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username,
        website,
        avatar_url`)
        .eq('id', user.id)
        .single()
		

      if (error && status !== 406) throw error;
	  

      if (data) {
        username = data.username
      }
    } catch (error) {	
		alert(error.message)
    //} finally {
      //loading = false
    }
  }

 
  
</script>

<svelte:head>
	<title>My summary</title>
</svelte:head>

<section>
	<Header />
</section>


<div class="form-message" />

<main>
		<p use:getProfile>
			{username}
		</p>
</main>

<style>
</style>