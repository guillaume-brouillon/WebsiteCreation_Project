<script>
	import { page } from '$app/stores';
	import logo from './Logo_essec_simple.svg';
</script>

<header>

	<nav class="top: 0px w-full h-16">
		<img
		id="logoseul"
		class="h-auto hidden"
		src={logo}
		alt="Logo Essec"
		 />
		<div id="LogoContainer" class="w-500">	
			<img
			id="logo"
			class="h-auto"
			src={logo}
			alt="Logo Essec"
			 />
				<h1 class="h-auto">
					My Classes
				</h1>
		</div>	
		<ul class="">
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.url.pathname === '/summary'}>
				<a sveltekit:prefetch href="/summary">My Summary</a>
			</li>
			<li class:active={$page.url.pathname === '/choose'}>
				<a sveltekit:prefetch href="/choose">Choose your classes</a>
			</li>
			<li class:active={$page.url.pathname === '/exploreclasses'}>
				<a sveltekit:prefetch href="/exploreclasses">Explore Classes</a>
			</li>
			<li class:active={$page.url.pathname === '/exploretracks'}>
				<a sveltekit:prefetch href="/exploretracks">Explore Tracks</a>
			</li>
			<li class:active={$page.url.pathname === '/contactus'}>
				<a sveltekit:prefetch href="/contactus">Contact Us</a>
			</li>
		</ul>
	</nav>

</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
	h1{
		margin-left: 10px;
		margin-right: 2rem;
		font-size: 1rem;
		text-align: center;
		position: relative;
		top: 30%;
		  color: var(--accent-color);
		  white-space: nowrap;
		  width: fit-content;
	}


	nav {
		display: flex;
		justify-content: center;
		--background: rgba(60, 100, 177, 0.06);
		background: var(--background);
	}
	@media(max-width: 900px)
	{
		#logo{
			display: none;
		}
		h1{
			display: none;
		}
#logoseul
{
	display: flex;
}
	}
	@media(max-width: 500px)
	{
		#logo{
			display: none;
		}
		h1{
			display: none;
		}
#logoseul
{
	display: flex;
}
	}
	path {
		fill: var(--background);
	}
#logo, #logoseul{
	padding: 0.4rem;
}
#LogoContainer{
		display: flex;
}
	ul {
		display: flex;
		align-items: center;
		padding: 10px;	
		vertical-align:auto;	
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active a {
		color: var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: normal;
		font-size: 0.8rem;
	font-style: normal;
	letter-spacing: 0.2px;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
