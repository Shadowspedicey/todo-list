import _ from "lodash";
import { format, differenceInDays, parse, parseISO } from "date-fns";
import arrayMove from "array-move";
import isMobile from "is-mobile";
import fitText from "./fit-text.js";

//localStorage.removeItem("projects");

// Gets "projects" from localStorage and sets the date accordingly and attaches a function
let getStoredProjects = () =>
{
	const _storage = JSON.parse(localStorage.getItem("projects"));
	if (_storage == null) return [];
	_storage.forEach(project =>
	{
		project.dueDate = parseISO(project.dueDate);
		project.AddChecklistToArray = () =>
		{
			let name;
			const nameArrayLength = _.filter(project.checklist, check => check.name.match(/^Name(\d)*$/gm)).length;
			
			// Checks if check with name "Name" exists if it does create check with name of "Name" plus length if names array
			if (nameArrayLength === 0) name = "Name";
			else name = `Name${nameArrayLength}`;

			let _check = Checklist(name, false);
			project.checklist.push(_check);
			return _check;
		};
	});
	return _storage;
};
const SyncLocally = () => localStorage.setItem("projects", JSON.stringify(projects));

let projects = getStoredProjects();

window.addEventListener("click", () => console.log(projects));

const Checklist = (name, checked) =>
{
	return {name, checked};
};

const Project = function(name, description, dueDate, priority, checklist)
{
	const progress = 0;
	const defaultProject = true;

	const AddChecklistToArray = () =>
	{
		let name;
		const nameArrayLength = _.filter(checklist, check => check.name.match(/^Name(\d)*$/gm)).length;
		
		// Checks if check with name "Name" exists if it does create check with name of "Name" plus length if names array
		if (nameArrayLength === 0) name = "Name";
		else name = `Name${nameArrayLength}`;

		let _check = Checklist(name, false);
		checklist.push(_check);
		return _check;
	};

	const obj = { name, description, dueDate, priority, checklist, progress, defaultProject, AddChecklistToArray };
	if (!_.find(projects, project => project === obj)) projects.push(obj);
	return obj;
};

const Interface = (() =>
{
	const SetProgressBar = (progressBar, project) =>
	{
		progressBar.firstChild.textContent = `${+Math.round(project.progress)}%`;
		progressBar.querySelector("#bar").style.width = `${project.progress}%`;
		switch (project.priority)
		{
			case "Low":
				progressBar.querySelector("#bar").style.background = "green";
				break;

			case "Medium":
				progressBar.querySelector("#bar").style.background = "yellow";
				break;

			case "High":
				progressBar.querySelector("#bar").style.background = "red";
				break;

			default:
				console.log("error with priority");
		}
	};

	const OutputProjectToDOM = project =>
	{
		const _projectsDiv = document.querySelector("#projects");
		const projectDOM = document.createElement("div");
		projectDOM.classList.add("project");
		projectDOM.dataset.index = projects.indexOf(project);

		const name = document.createElement("h2");
		name.textContent = project.name;
		projectDOM.appendChild(name);

		const dateDiv = document.createElement("div");

		const remainingDays = document.createElement("h2");
		remainingDays.textContent = "Remaining Days:";

		const daysLeft = document.createElement("h2");
		const nOfDaysLeft = differenceInDays(project.dueDate, new Date());
		if (nOfDaysLeft > 0 || nOfDaysLeft === 0) daysLeft.textContent = nOfDaysLeft;
		else if (project.progress === 100) daysLeft.textContent = "Completed";
		else daysLeft.textContent = "Failed";
		dateDiv.appendChild(daysLeft);

		projectDOM.appendChild(dateDiv);

		const progressBar = document.createElement("span");
		progressBar.classList.add("progress-bar");
		progressBar.textContent = `${+Math.round(project.progress)}%`;
		const progressSpan = document.createElement("span");
		progressSpan.id = "bar";
		progressBar.appendChild(progressSpan);
		projectDOM.appendChild(progressBar);
		SetProgressBar(progressBar, project);

		// Adds close button
		(() =>
		{
			const close = document.createElement("span");
			close.classList.add("material-icons", "hidden");
			close.textContent = "close";

			close.addEventListener("click", (e) => DeleteProject(e));

			projectDOM.appendChild(close);

			if (isMobile()) return;
			projectDOM.addEventListener("mouseover", () => close.classList.remove("hidden"));
			projectDOM.addEventListener("mouseout", () => close.classList.add("hidden"));
		})();

		// Adds sort buttons
		(() =>
		{
			const sortDiv = document.createElement("div");
			sortDiv.id = "sort-div";
			sortDiv.classList.add("hidden");
	
			const sortRight = document.createElement("button");
			sortRight.id = "sort-right";
			sortRight.classList.add("sort-button");
			sortRight.textContent = ">";

			const sortLeft = document.createElement("button");
			sortLeft.id = "sort-left";
			sortLeft.classList.add("sort-button");
			sortLeft.textContent = "<";
			sortDiv.appendChild(sortLeft);
			sortDiv.appendChild(sortRight);

			sortLeft.addEventListener("click", (e) => SortProject(e, projectDOM, true, project));
			sortRight.addEventListener("click", (e) => SortProject(e, projectDOM, false, project));

			projectDOM.appendChild(sortDiv);

			if (isMobile()) return;
			projectDOM.addEventListener("mouseover", () => sortDiv.classList.remove("hidden"));
			projectDOM.addEventListener("mouseout", () => sortDiv.classList.add("hidden"));
		})();

		_projectsDiv.insertBefore(projectDOM, document.querySelector("#add"));

		// Fits name to project if overflowing
		fitText(1.75, name.parentElement, name);

		// Inserts "Remaining Days" and fits it separately from name
		dateDiv.insertBefore(remainingDays, dateDiv.firstChild);
		fitText(5, projectDOM, remainingDays);

		projectDOM.addEventListener("click", () => InfoBox.Create(project));
	};

	const PrintArrayToDOM = () =>
	{
		const _projectsDOM = _.without([...document.querySelectorAll(".project")], document.querySelector("#add"));
		projects.forEach(_project =>
		{
			let doesProjectExist = () =>
			{
				for (let i = 0; i < _projectsDOM.length; i++)
				{
					// eslint-disable-next-line eqeqeq
					if (_projectsDOM[i].dataset.index == projects.indexOf(_project)) return true;
				}
				return false;
			};
			if (doesProjectExist()) return;

			OutputProjectToDOM(_project);

			SyncLocally();
		});
	};
	PrintArrayToDOM();

	const SaveChangesToDOM = (project) =>
	{
		const projectDOM = document.querySelector(`[data-index="${projects.indexOf(project)}"]`);
		const header = projectDOM.children[0];
		const daysLeft = projectDOM.children[1].children[1];
		const progressBar = projectDOM.children[2];

		header.textContent = project.name;
		fitText(1.75, header.parentElement, header);

		const nOfDaysLeft = differenceInDays(project.dueDate, new Date());
		if (nOfDaysLeft > 0 || nOfDaysLeft === 0) daysLeft.textContent = nOfDaysLeft;
		else if (project.progress === 100) daysLeft.textContent = "Completed";
		else daysLeft.textContent = "Failed";

		SetProgressBar(progressBar, project);
	};

	const AddProject = () =>
	{
		let name;
		const nameArrayLength = _.filter(projects, project => project.name.includes("Name") && project.defaultProject === true).length;
		
		// Checks if object with name "Name" exists if it does create object with name of "Name" plus length if names array
		if (nameArrayLength === 0) name = "Name";
		else name = `Name${nameArrayLength}`;

		Project(name, "", new Date(), "Low", []);
		PrintArrayToDOM();
	};

	const DeleteProject = (e) =>
	{
		e.stopPropagation();
		e.target.parentElement.remove();
		projects.splice(e.target.parentElement.dataset.index, 1);
		SyncProjectIndexes();
		SyncLocally();
	};

	// Gets the projects DOM and loops through them assigning the index dataset by name
	const SyncProjectIndexes = () =>
	{
		const _projectsDOM = _.without([...document.querySelectorAll(".project")], document.querySelector("#add"));
		_projectsDOM.forEach(_project => _project.dataset.index = projects.indexOf(_.find(projects, project => project.name === _project.firstChild.textContent)));
	};

	const SyncChecklistIndexes = project =>
	{
		const _checklistDOM = document.querySelectorAll(".checklist");
		_checklistDOM.forEach(_check => _check.dataset.index = project.checklist.indexOf(_.find(project.checklist, check => check.name === _check.firstChild.lastChild.textContent)));
	};

	// Moves Projects in the DOM
	const SortProject = (e, element, left, project) =>
	{
		e.stopPropagation();

		const MoveLeft = () =>
		{
			if(element.previousElementSibling) 
			{
				element.parentNode.insertBefore(element, element.previousElementSibling);
				projects = arrayMove(projects, projects.indexOf(project), projects.indexOf(project) - 1);
			}
		};

		const MoveRight = () =>
		{
			if(element.nextElementSibling && element.nextElementSibling !== document.querySelector("#add")) 
			{
				element.parentNode.insertBefore(element.nextElementSibling, element);
				projects = arrayMove(projects, projects.indexOf(project), projects.indexOf(project) + 1);
			}
		};

		left ? MoveLeft() : MoveRight();
		
		SyncLocally();
	};

	// Adds even listener on the add project button
	(() =>
	{
		const projectAdd = document.querySelector("#add");
		projectAdd.addEventListener("click", () => AddProject());
	})();

	return { OutputProjectToDOM, SaveChangesToDOM, SyncChecklistIndexes };
})();

const InfoBox = (() =>
{
	const _priorities = ["Low", "Medium", "High"];

	const Create = (project) =>
	{
		const infoContainer = document.createElement("div");
		infoContainer.id = "info-container";

		const infoBox = document.createElement("div");
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
			if(pInput) pInput.remove();

			CreateSaveButton(project);
		};

		if (pInput.parentElement.id === "dueDate" || pInput.parentElement.id === "priority") 
			return pInput.addEventListener("change", () => ConfirmChanges());

		// Checks for enter key to confirm changes to info box
		pInput.addEventListener("keyup", (e) =>
		{
			if (e.keyCode === 13) pInput.blur();
		});

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
				console.log(projects);
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

		SyncLocally();
	};

	const Close = () => document.querySelector("#info-container").remove();

	// Create the edit button and adds event listeners to icon parent and passed the project
	const CreateEditButton = (p, project, before) =>
	{
		const icon = document.createElement("span");
		icon.classList.add("material-icons");
		if (!isMobile()) icon.classList.add("hidden");
		icon.textContent = "edit";
		before ? p.insertBefore(icon, p.firstChild) : p.appendChild(icon);
		icon.addEventListener("click", () => Edit(p, project));

		(() =>
		{
			if (isMobile()) return;
			p.addEventListener("mouseover", () => p.querySelector("span").classList.remove("hidden"));
			p.addEventListener("mouseout", () => p.querySelector("span").classList.add("hidden"));
		})();
	};

	// Creats a checklist item and appends it to side info
	const CreateChecklistItem = (project) =>
	{
		let _check = project.AddChecklistToArray();
		console.log(project);

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

	return { Create, Close };
})();

(() =>
{
	window.addEventListener("click", (e) => 
	{
		if (e.target.id === "info-container") InfoBox.Close();
	});
})();

(() =>
{
	if(isMobile())
	{
		const hiddenElements = Array.from(document.getElementsByClassName("hidden"));
		hiddenElements.forEach(element => element.classList.remove("hidden"));
	}
})();
