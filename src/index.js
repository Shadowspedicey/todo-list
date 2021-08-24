import isMobile from "is-mobile";
import DarkMode from "./dark-mode.js";

(() =>
{
	if(isMobile())
	{
		const hiddenElements = Array.from(document.getElementsByClassName("hidden"));
		hiddenElements.forEach(element => element.classList.remove("hidden"));
	}
})();

(() => document.querySelector("#dark-mode").addEventListener("click", () => DarkMode.on = !DarkMode.on))();
