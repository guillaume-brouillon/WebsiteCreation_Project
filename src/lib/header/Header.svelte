<script>
	import { page } from '$app/stores';
	import logo from "./Logo_essec_simple.svg";
	
	import { InlineNotification } from "carbon-components-svelte";


	import jQuery from "jquery";
	import { onMount } from "svelte";
	let errormessage = "";
	let showerror = false;
	let navigation_open = false;

	var waitForFinalEvent = (function () {
		let timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = "Don't call this twice without a uniqueId";
			}
			if (timers[uniqueId]) {
				clearTimeout(timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	function computer_panel() {
		jQuery("#navigationlinks li:not(.active)").css("display", "inline");
		jQuery("#navigationlinks").css("display", "flex");
	}
	function mobile_panel() {
		jQuery("#navigationlinks li:not(.active)").css("display", "none");
		jQuery("#navigationlinks").css("display", "block");
		navigation_open = false;
	}

	onMount(() => {
		jQuery(window).resize(function () {
			waitForFinalEvent(function () {
				if (jQuery(window).width() >= 600) {
					computer_panel();
				} else {
					mobile_panel();
				}
			});
		});
	});

	function reveal_nav_pannel() {
		if (!navigation_open) {
			jQuery("#navigationlinks li:not(.active)").css("display", "block");
			jQuery("#navigationlinks").css("display", "block");
		} else {
			jQuery("#navigationlinks li:not(.active)").css("display", "none");
			jQuery("#navigationlinks").css("display", "flex");
		}

		navigation_open = !navigation_open;
	}


	const logout = async () => {
		try{
			const { error } = await supabase.auth.signOut()
			if(error) {
				throw error;
			} else {
			}
		} catch (error) {
			errormessage = error.message;
			showerror = true;
		}
	}
</script>
<script context="module">
    import { supabase } from "../../supabaseClient";
	let user = supabase.auth.user();
    export async function load() {

    if (!user) {
		
	console.log("ok")
            return {
                status: 302,
                redirect: "/"
            };
    }
	return {};
    }

</script>

<header class="shadow-lg">
	
	<nav class="top: 0px w-full h-16 " id="navbar">
		<img id="logoseulsimple" class="h-auto" src={logo} alt="Logo Essec" />
		<button class="w-12" on:click={reveal_nav_pannel} id="logoseul">
			<img class="h-auto" src={logo} alt="Logo Essec" />
		</button>

		<div id="LogoContainer" class="w-500">
			<img id="logo" class="h-auto" src={logo} alt="Logo Essec" />
			<h1 class="h-auto" id="MyClasses">My Classes</h1>
		</div>
		<ul id="navigationlinks" class="z-50">
			<li class:active={$page.url.pathname === "/summary" || $page.url.pathname === "/" }>
				<a sveltekit:prefetch href="/summary">My Summary</a>
				<a sveltekit:prefetch href="/choose" class="filler"
					>Choose your classes</a
				>
			</li>
			<li class:active={$page.url.pathname === "/choose"}>
				<a sveltekit:prefetch href="/choose">Choose your classes</a>
			</li>
			<li class:active={$page.url.pathname === "/ClassInformation"}>
				<a sveltekit:prefetch href="/ClassInformation">Explore Classes</a>
				<a sveltekit:prefetch href="/choose" class="filler"
					>Choose your classes</a
				>
			</li>
			<li class:active={$page.url.pathname === "/exploretracks"}>
				<a sveltekit:prefetch href="/exploretracks">Explore Tracks</a>
				<a sveltekit:prefetch href="/choose" class="filler"
					>Choose your classes</a
				>
			</li>

			<li class:active={$page.url.pathname === "/contactus"}>
				<a sveltekit:prefetch href="/contactus">Contact Us</a>
				<a sveltekit:prefetch href="/choose" class="filler"
					>Choose your classes</a
				>
			</li>
		</ul>
	</nav>
	<a href="/" class=" ml-auto mt-auto mb-auto mr-5"><button class="custombutton w-28" on:click="{logout}" >Log Out</button></a>
</header>
{#if showerror}
<InlineNotification 
  title="Error:"
  subtitle={errormessage}
/>
{/if}
<style>
	
	header {
		display: flex;
		justify-content: space-between;
		background-color: var(--primary-color);
	}
	h1 {
		margin-left: 10px;
		margin-right: 2rem;
		font-size: 1rem;
		text-align: center;
		position: relative;
		color: var(--accent-color);
		white-space: nowrap;
		width: fit-content;




/* LOGO */

position: relative;
height: 25%;
left: 0px;
right: 0px;
top: calc(50% - 25%/2);

font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 16px;
/* identical to box height, or 133% */
display: flex;
align-items: center;
letter-spacing: 0.1px;
text-transform: uppercase;
;


	}

	nav {
		display: flex;
		justify-content: center;
		--background: var(--primary-color);
		background: var(--background);
		transition: 1s;
	}
	@media (max-width: 900px) {
		#logo {
			display: none;
		}
		h1#MyClasses {
			display: none;
		}
		
		#logoseulsimple {
			display: flex;
			widows: 50px;
		}
	}
	@media (min-width: 900px)
	{		
		#logoseulsimple 
		{
			display: none;
		}
	}
	@media (min-width: 600px) {
		.filler {
			display: none;
		}
		#logoseul {
			display: none;
		}

	}
	
	@media (max-width: 600px) {
		#navigationlinks li:not(.active) {
			display: none;
		}
		.filler {
			display: block;
		}

		#logoseul {
			display: flex;
		}

		#logoseulsimple {
			display: none;
		}
	}
	path {
		fill: var(--background);
	}
	#logo,
	#logoseul,
	#logoseulsimple {
		padding: 0.4rem;
	}
	#LogoContainer {
		display: flex;
	}
	ul {
		display: flex;
		align-items: center;
		padding: 10px;
		vertical-align: auto;
	}

	li {
		position: relative;
		height: 100%;
		background: var(--primary-color);
		transition: 1s;
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
		font-size: 14px;
		font-style: normal;
		letter-spacing: 0.2px;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
	.filler {
		visibility: hidden;
	}
</style>
