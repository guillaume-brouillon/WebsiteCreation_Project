const c = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/ClassInformation.svelte"),
	() => import("../../src/routes/exploretracks.svelte"),
	() => import("../../src/routes/contactus.svelte"),
	() => import("../../src/routes/summary.svelte"),
	() => import("../../src/routes/choose.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/ClassInformation.svelte
	[/^\/ClassInformation\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/exploretracks.svelte
	[/^\/exploretracks\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/contactus.svelte
	[/^\/contactus\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/summary.svelte
	[/^\/summary\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/choose.svelte
	[/^\/choose\/?$/, [c[0], c[7]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];