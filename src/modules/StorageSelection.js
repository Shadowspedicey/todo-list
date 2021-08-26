import Interface from "./Interface";
import { initProjects } from "./projects";
import { loginPage } from "./Auth";
import DarkMode from "../dark-mode";

const StorageSelection = (() =>
{
	return {
		create: (animation) =>
		{
			document.querySelector("#content").innerHTML = "";

			const selectionDiv = document.createElement("div");
			selectionDiv.id = "storage-selection";
			DarkMode.on ? selectionDiv.classList.add("storage-dark") : null;
			if (animation !== "anim") selectionDiv.style =
			`
			animation: none;
			transform: scale(1);
			opacity: 1;
			`;

			const localButton = document.createElement("button");
			localButton.id = "local";
			localButton.innerHTML = "Local Storage";
			localButton.addEventListener("click", async () =>
			{
				await initProjects("local");
				Interface.DisplayInterface();
			});
			const localImg = document.createElement("img");
			localImg.src = "./images/LocalStorage.png";
			localImg.alt = "Local Storage";
			localButton.insertBefore(localImg, localButton.firstChild);

			const cloudButton = document.createElement("button");
			cloudButton.id = "cloud";
			cloudButton.innerHTML = "Cloud Storage";
			cloudButton.addEventListener("click", loginPage.create);
			const cloudImg = document.createElement("img");
			cloudImg.src = "./images/CloudStorage.png";
			cloudImg.alt = "Cloud Storage";
			cloudButton.insertBefore(cloudImg, cloudButton.firstChild);

			selectionDiv.appendChild(localButton);
			selectionDiv.appendChild(cloudButton);
			document.querySelector("#content").appendChild(selectionDiv);
		}
	};
})();

export default StorageSelection;
