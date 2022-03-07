<script context="module">
	export const prerender = true;
</script>

<script>
	import Navbar from "$lib/navbar/Navbar.svelte";
	import happystudent from "./websitestudent.svg";

	import {supabase} from "../supabaseClient"
	let navbarcomponent;
let loading = false
let LaunchCreateAccount;
	import { onMount } from "svelte";
onMount(function(){
		LaunchCreateAccount = function(){
			navbarcomponent.clearAllInputError('register');
		}
	});
</script>

<svelte:head>
	<title>My ESSEC classes</title>
</svelte:head>

<header>
	<Navbar bind:this={navbarcomponent}/>
</header>

<main>
	<div id="container1">
		<img src={happystudent} alt="happy student" class="align-middle m-10" />
		<div class="m-10">
			<h2>We Help you choose your classes at Essec</h2>
			<p class="w-full">
				Hello dear essec student ! Do you feel like you spend way too
				much time choosing your classes ? Do feel like you are wasting
				effort, looking for the perfect class, the perfect track, the
				perfect teacher, only to see your request rejected because you
				didn't put enough points ? We do too ! That's why we created My
				Essec Classes.
			</p>
			<p>
				My Essec classes is a website that puts all the relevant
				information in one place. Over are the days browsing through one
				pdf file to the other. My Essec classes
			</p>

			<button on:click="{LaunchCreateAccount}"> Start </button>
		</div>
	</div>
</main>

<style>
	/*
{#await getData()}
	<p>Fetching data...</p>
{:then data}
	{#each data as essecclass}
		<li>{essecclass.Description}</li>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
	*/
	#container1 {
		padding-top: 0.2rem;
		padding-bottom: 1.5rem;
	}
	main {
		background-color: var(--primary-color);
		margin: 0;
	}
	p {
		width: 100%;
	}
	/* We help you find your next classes */
	h2 {
		/* H2 - bold 44 (56, 0.2px) */
		font-style: normal;
		font-weight: bold;
		font-size: 30px;
		/* or 127% */
		letter-spacing: 0.2px;

		/* Light / Black */
		color: #373f41;
	}

	@media (min-width: 800px) {
		img {
			max-width: 40%;
		}
		#container1 {
			display: flex;
		}
	}
	div {
		display: block;
		margin-top: auto;
		margin-bottom: auto;
	}
	img {
		display: block;
	}
	button {
		/* Accent / Default */
		background: var(--accent-color);

		/* Button - bold 14 (18, 0.3px) */
		font-family: Mulish;
		font-style: normal;
		font-weight: bold;
		font-size: 14px;
		line-height: 18px;
		/* identical to box height, or 129% */
		display: flex;
		align-items: center;
		text-align: center;
		letter-spacing: 0.3px;

		/* Light / White */
		color: #ffffff;

		padding-top: 1rem;
		padding-bottom: 1rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		margin-left: auto;
		margin-right: auto;
		margin-top: 1rem;
	}
	button:hover {
		background-color: var(--tertiary-color);
	}
</style>
