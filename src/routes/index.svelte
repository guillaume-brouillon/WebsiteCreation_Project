<script context="module">
	export const prerender = true;
<<<<<<< HEAD

=======
	import happy_img from "./websitestudent.svg";
>>>>>>> 780cf5db1cb49ca777fd2408bd53b49f32dad579
</script>

<script>
	import Navbar from '$lib/navbar/Navbar.svelte';
</script>

<svelte:head>
	<title>My ESSEC classes</title>
</svelte:head>

<<<<<<< HEAD
<header>
	<Navbar />
</header>

<section>
=======
<main>
<div id="container1">
		
	<img src="{happy_img}" alt="happy student" class="align-middle m-10"/>
	<div class="m-10">
		<h2>
			We Help you choose your classes at Essec
		</h2>
	<p class="w-full">
		Hello dear essec student ! Do you feel like you spend way too much time choosing your classes ? 
		Do feel like you are wasting effort, looking for the perfect class, the perfect track, the perfect teacher, 
		only to see your request rejected because you didn't put enough points ? We do too ! That's why we created My Essec Classes.
	</p>
	<p>
		My Essec classes is a website that puts all the relevant information in one place. 
		Over are the days browsing through one pdf file to the other. My Essec classes 
	</p>
>>>>>>> 780cf5db1cb49ca777fd2408bd53b49f32dad579

	<button>
		Start
	</button>
	</div>
</div>
</main>

<style>
	
	#container1
	{
		padding-top: 0.2rem;
		padding-bottom: 1.5rem;
	}
	main
	{
		background-color: var(--primary-color);
		margin: 0;
	}
p
{
	width: 100%;
}
/* We help you find your next classes */
h2
{

/* H2 - bold 44 (56, 0.2px) */
font-style: normal;
font-weight: bold;
font-size: 30px;
/* or 127% */
letter-spacing: 0.2px;

/* Light / Black */
color: #373F41;
}

@media (min-width: 800px)
{
	img
	{
		max-width: 40%;
	}
	#container1
	{
		display: flex;
	}
	
}
div
{
	display: block;
	margin-top: auto;
	margin-bottom: auto;
}
img
{
	display: block;
}
button
 {
	 
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
color: #FFFFFF;

padding-top: 1rem;
padding-bottom: 1rem;
padding-left: 1.5rem;
padding-right: 1.5rem;
margin-left: auto;
margin-right: auto;
margin-top: 1rem;
 }
 button:hover
 {
background-color: var(--tertiary-color);
 }
</style>
