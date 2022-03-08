<script context="module">
	export const prerender = true;
	import { user } from "$lib/sessionStore";
let loading = false;
let Logedin = false;
	async function getProfile() {
    try {
      loading = true
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error;
	  

      if (data) {
		Logedin = true
        username = data.username
        //website = data.website
        //avatar_url = data.avatar_url
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading = false
    }
  }

</script>

<script>
	import Header from '$lib/header/Header.svelte';
</script>

<svelte:head>
	<title>My summary</title>
</svelte:head>

<section>
	<Header />
</section>

<main class={Logedin ? "shown" : "hidden"}>
<p>
	hello
</p>
</main>

<style>
.hidden{
	display: none;
}
.shown{
	display: flex;
}
</style>