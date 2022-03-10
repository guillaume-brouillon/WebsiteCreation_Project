<script>;
	import '../app.css';
	import {user} from "./sessionStore"
    import {supabase} from "./supabaseClient"
    user.set(supabase.auth.user())

    supabase.auth.onAuthStateChange((_, session) => {
        user.set(session.user)
    })
</script>


<main>
	<slot />
</main>

<footer>
	
</footer>

<style>

</style>
