<script>
	export const prerender = true;
	import { user } from "$lib/sessionStore";
    import { supabase } from "../supabaseClient";
	import Header from '$lib/header/Header.svelte';

	
import jquery from "jquery";
import { onMount } from "svelte";
let loading = false;
let Logedin = false;
let username;
	async function getProfile() {
    try {
      loading = true
      const user = supabase.auth.user()
	  
	  console.log("user connected");

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username,
        website,
        avatar_url`)
        .eq('id', user.id)
        .single()
		
		console.log("info fetched");
		console.log(data);
		console.log("info fetched");

      if (error && status !== 406) throw error;
	  

      if (data) {
		Logedin = true
        username = data.username
		console.log(username);
        //website = data.website
        //avatar_url = data.avatar_url
      }
    } catch (error) {	
		console.log(error.message);	
		alert("Get Profile")
		alert(error.message)
    } finally {
      loading = false
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
		<p use:getProfile class="{Logedin ? "shown" : "hidden"}">
			{username}
		</p>
</main>

<style>
</style>