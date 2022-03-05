const c = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/index.svelte"),
<<<<<<< HEAD
	() => import("../../src/routes/contactus.svelte"),
	() => import("../../src/routes/summary.svelte")
=======
	() => import("../../src/routes/exploreclasses/index.svelte"),
	() => import("../../src/routes/contactus.svelte")
>>>>>>> 780cf5db1cb49ca777fd2408bd53b49f32dad579
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/contactus.svelte
	[/^\/contactus\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/summary.svelte
	[/^\/summary\/?$/, [c[0], c[4]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];