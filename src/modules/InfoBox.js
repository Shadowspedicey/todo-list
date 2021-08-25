/* eslint-disable no-undef */
import _ from "lodash";
import { format, parse } from "date-fns";
import isMobile from "is-mobile";

import Interface from "./Interface";
import { SyncLocally, SyncWithCloud } from "./projects";
import DarkMode from "../dark-mode";

const InfoBox = (() =>
{
	const _priorities = ["Low", "Medium", "High"];

	const Create = (project) =>
	{
		const infoContainer = document.createElement("div");

		// Sets and unsets "hidden" class quickly to get an animation
		infoContainer.classList.add("hidden");
		window.setTimeout(() => infoContainer.classList = "", 0);

		infoContainer.id = "info-container";

		const infoBox = document.createElement("div");
		if (DarkMode.on) infoBox.classList.add("info-box-dark");
		console.log(DarkMode.on);
		infoBox.id = "info-box";

		const mainInfo = document.createElement("div");
		mainInfo.id = "main-info";

		// Creates the info fields through a loop
		(() =>
		{
			const _properties = ["name", "description", "dueDate", "priority"];
			for (let i = 0; i < _properties.length; i++)
			{
				let div = document.createElement("div");
				div.classList.add("info-box");
				div.id = _properties[i];

				const h1 = document.createElement("h1");
				h1.textContent = _properties[i];
				div.appendChild(h1);

				const p = document.createElement("p");
				p.textContent = project[_properties[i]];
				if (_properties[i] === "dueDate") p.textContent = format(project.dueDate, "dd/MM/yyyy");

				CreateEditButton(p, project, false);

				div.appendChild(p);

				mainInfo.appendChild(div);
			}
		})();
		infoBox.appendChild(mainInfo);

		// Creates the side info div and appends every checklist obj in project
		(() =>
		{
			const sideInfo = document.createElement("div");
			sideInfo.id = "side-info";

			const header = document.createElement("div");
			header.classList.add("info-box");
			header.id = "checklist-header";

			const h1 = document.createElement("h1");
			h1.textContent = "Checklist";
			header.appendChild(h1);
			sideInfo.appendChild(header);

			// Adds the add checklist button
			const addDiv = document.createElement("div");
			addDiv.id = "checklist-add";
			addDiv.textContent = "+";
			addDiv.addEventListener("click", () => CreateChecklistItem(project));
			sideInfo.appendChild(addDiv);

			// Adds the checklist
			(() =>
			{
				for (let i = 0; i < project.checklist.length; i++)
				{
					const div = document.createElement("div");
					div.classList.add("info-box", "checklist");
					div.dataset.index = i;

					const p = document.createElement("p");
					p.textContent = project.checklist[i].name;
					
					CreateEditButton(p, project, true);

					div.appendChild(p);

					const input = document.createElement("input");
					input.type = "checkbox";
					input.checked = project.checklist[i].checked;
					input.addEventListener("change", () =>
					{
						project.checklist[i].checked = input.checked;
						Save(project);
					});
					div.appendChild(input);

					sideInfo.insertBefore(div, addDiv);
				}
			})();

			infoBox.appendChild(sideInfo);
		})();

		// Adds close button
		(() =>
		{
			const close = document.createElement("span");
			close.classList.add("material-icons");
			close.textContent = "close";

			close.addEventListener("click", () => Close());

			infoBox.appendChild(close);
		})();

		infoContainer.appendChild(infoBox);

		document.querySelector("#content").appendChild(infoContainer);
	};

	const Edit = (element, project) =>
	{
		project.defaultProject = false;

		element.querySelector("span").remove();
		let pInput = document.createElement("input");
		switch (element.parentElement.id)
		{
			case "name":
			case "description":
				pInput.type = "text";
				pInput.value = element.textContent;
				break;

			case "dueDate":
				pInput.type = "date";
				pInput.value = format(project.dueDate, "yyyy-MM-dd");
				pInput.min = format(new Date(), "yyyy-MM-dd");
				break;

			case "priority":
				pInput = document.createElement("select");
				_priorities.forEach(_priority =>
				{
					const option = document.createElement("option");
					option.value = _priority;
					option.textContent = _priority;

					pInput.appendChild(option);
				});
				pInput.value = element.textContent;
				break;

			// Fallback to be able to edit checklist
			default:
				pInput.type = "text";
				pInput.value = element.lastChild.textContent;
				break;
		}

		if (element.parentElement.classList.contains("checklist")) element.parentElement.insertBefore(pInput, element.parentElement.firstChild);
		else element.parentElement.appendChild(pInput);
		pInput.focus();
		element.remove();

		// Creates the p element and fills it with the value of the input and appends it while creating and edit button
		const ConfirmChanges = () =>
		{
			const newP = document.createElement("p");
			newP.textContent = pInput.value;
			// Checks if input is a date and parses it correctly
			if (pInput.parentElement.id === "dueDate") newP.textContent = format(parse(pInput.value, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");

			if (pInput.parentElement.classList.contains("checklist"))
			{
				if (pInput.value === "")
				{
					project.checklist.splice(pInput.parentElement.dataset.index, 1);
					pInput.parentElement.remove();
					Interface.SyncChecklistIndexes(project);
				}
				CreateEditButton(newP, project, true);
				pInput.parentElement.insertBefore(newP, pInput.parentElement.firstChild);
			}
			else 
			{
				CreateEditButton(newP, project, false);
				pInput.parentElement.appendChild(newP);
			}
			if (pInput) pInput.remove();

			CreateSaveButton(project);
		};

		if (pInput.parentElement.id === "dueDate" || pInput.parentElement.id === "priority") 
			return pInput.addEventListener("change", () => ConfirmChanges());

		// Checks for enter key to confirm changes to info box
		pInput.addEventListener("keyup", (e) => e.keyCode === 13 ? pInput.blur() : null);
		pInput.addEventListener("focusout", () => ConfirmChanges());
	};

	const Save = (project) =>
	{
		// Saves info fields and date
		(() =>
		{
			const _infoBoxes = _.without([...document.querySelectorAll(".info-box")], document.querySelector("#checklist-header"), ...document.querySelectorAll(".checklist"));
			for (let i = 0; i < _infoBoxes.length; i++)
			{
				project[_infoBoxes[i].id] = _infoBoxes[i].querySelector("p").firstChild.textContent;
				if (_infoBoxes[i].id === "dueDate") project[_infoBoxes[i].id] = parse(_infoBoxes[i].querySelector("p").firstChild.textContent, "dd/MM/yyyy", new Date());
			}
		})();

		// Saves Checklist
		(() =>
		{
			const _checklistDOM = _.without([...document.querySelectorAll(".checklist")], document.querySelector("#checklist-header"));
			for (let i = 0; i < _checklistDOM.length; i++)
			{
				// eslint-disable-next-line eqeqeq
				let _element = _.find(_checklistDOM, element => element.dataset.index == i);
				project.checklist[i].name = _element.querySelector("p").lastChild.textContent;
			}
		})();
		
		// Calculates progress and saves it
		(() =>
		{
			if (project.checklist.length === 0) return;
			let _checkedTemp = _.filter(project.checklist, (_check) => _check.checked);
			project.progress = (_checkedTemp.length / project.checklist.length) * 100;
		})();

		// Changes the info on the project DOM accordingly
		Interface.SaveChangesToDOM(project);

		if (firebase.auth().currentUser) return SyncWithCloud(firebase.auth().currentUser.uid);
		SyncLocally();
	};

	const Close = () => 
	{
		document.querySelector("#info-container").classList.add("hidden");
		window.setTimeout(() => document.querySelector("#info-container").remove(), 125);
	};

	// Create the edit button and adds event listeners to icon parent and passed the project
	const CreateEditButton = (p, project, before) =>
	{
		const icon = document.createElement("span");
		icon.classList.add("material-icons");
		if (!isMobile()) icon.classList.add("hidden");
		icon.textContent = "edit";
		before ? p.insertBefore(icon, p.firstChild) : p.appendChild(icon);
		icon.addEventListener("click", () => Edit(p, project));

		// Removes any onHoverShow elements
		(() =>
		{
			if (isMobile()) return;
			p.addEventListener("mouseover", () => p.querySelector("span").classList.remove("hidden"));
			p.addEventListener("mouseout", () => p.querySelector("span").classList.add("hidden"));
		})();
	};

	// Creates a checklist item and appends it to side info
	const CreateChecklistItem = (project) =>
	{
		let _check = project.AddChecklistToArray();

		const div = document.createElement("div");
		div.classList.add("info-box", "checklist");
		div.dataset.index = project.checklist.indexOf(_check);

		const p = document.createElement("p");
		p.textContent = _check.name;
		
		CreateEditButton(p, project, true);

		div.appendChild(p);

		const input = document.createElement("input");
		input.type = "checkbox";
		input.checked = _check.checked;
		input.addEventListener("change", () =>
		{
			_check.checked = input.checked;
			Save(project);
		});
		div.appendChild(input);

		document.querySelector("#side-info").insertBefore(div, document.querySelector("#checklist-add"));
		if (firebase.auth().currentUser) return SyncWithCloud(firebase.auth().currentUser.uid);
		SyncLocally();
	};

	const CreateSaveButton = project =>
	{
		if (document.querySelector("#save")) return;
		const saveButton = document.createElement("div");
		saveButton.id = "save";
		saveButton.textContent = "Save";
		saveButton.addEventListener("click", () => 
		{
			Save(project);
			saveButton.remove();
		});

		document.querySelector("#main-info").appendChild(saveButton);
	};
	
	window.addEventListener("click", (e) => 
	{
		if (e.target.id === "info-container") InfoBox.Close();
	});

	return { Create, Close };
})();

export default InfoBox;
