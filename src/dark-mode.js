const DarkMode = (() =>
{
	let on;

	const On = () =>
	{
		DarkMode.on = true;

		document.querySelector("#dark-mode").querySelector("span").classList.add("dark-mode-dark");
		document.querySelector("#content").classList.add("content-dark");

		// Storage Selection
		if (document.querySelector("#storage-selection"))
			document.querySelector("#storage-selection").classList.add("storage-dark");

		// Login
		if (document.querySelector("#login-window"))
			document.querySelector("#login-window").classList.add("login-dark");

		// Projects
		document.querySelectorAll(".project").forEach(project => project.classList.add("project-dark"));
		document.querySelectorAll(".sort-button").forEach(button => button.classList.add("sort-dark"));
	};

	const Off = () =>
	{
		DarkMode.on = false;

		document.querySelector("#dark-mode").querySelector("span").classList.remove("dark-mode-dark");
		document.querySelector("#content").classList.remove("content-dark");

		// Storage Selection
		if (document.querySelector("#storage-selection"))
			document.querySelector("#storage-selection").classList.remove("storage-dark");

		// Login
		if (document.querySelector("#login-window"))
			document.querySelector("#login-window").classList.remove("login-dark");

		// Projects
		document.querySelectorAll(".project").forEach(project => project.classList.remove("project-dark"));
		document.querySelectorAll(".sort-button").forEach(button => button.classList.remove("sort-dark"));
	};

	return { on, On, Off };
})();

export default DarkMode;
