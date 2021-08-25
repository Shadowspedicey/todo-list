const DarkMode = (() =>
{
	let on;

	const On = () =>
	{
		DarkMode.on = true;

		document.querySelector("#dark-mode").querySelector("span").classList.add("dark-mode-dark");

		document.querySelector("#content").classList.add("content-dark");

		document.querySelectorAll(".project").forEach(project => project.classList.add("project-dark"));

		document.querySelectorAll(".sort-button").forEach(button => button.classList.add("sort-dark"));
	};

	const Off = () =>
	{
		DarkMode.on = false;

		document.querySelector("#dark-mode").querySelector("span").classList.remove("dark-mode-dark");

		document.querySelector("#content").classList.remove("content-dark");

		document.querySelectorAll(".project").forEach(project => project.classList.remove("project-dark"));

		document.querySelectorAll(".sort-button").forEach(button => button.classList.remove("sort-dark"));
	};

	return { on, On, Off };
})();

export default DarkMode;
