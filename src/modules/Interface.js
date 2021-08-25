import _ from "lodash";
import { differenceInDays } from "date-fns";
import isMobile from "is-mobile";
import arrayMove from "array-move";

import Project from "../factories/Project";
import projects, { SyncLocally, SyncWithCloud, setProjects } from "./projects";
import InfoBox from "./InfoBox";
import fitText from "./fit-text";
import DarkMode from "../dark-mode";

const Interface = (() =>
{
	const DisplayInterface = () =>
	{
		const projects = document.createElement("div");
		projects.id = "projects";
		const add = document.createElement("div");
		add.id = "add";
		add.classList.add("project");
		add.addEventListener("click", () => AddProject());
		const plus = document.createElement("span");
		plus.textContent = "+";
		add.appendChild(plus);
		projects.appendChild(add);

		document.querySelector("#content").appendChild(projects);

		PrintArrayToDOM();
	};

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
				return console.log("error with priority");
		}
	};

	const OutputProjectToDOM = project =>
	{
		const _projectsDiv = document.querySelector("#projects");
		const projectDOM = document.createElement("div");
		projectDOM.classList.add("project");
		if (DarkMode.on) projectDOM.classList.add("project-dark");
		projectDOM.dataset.index = projects().indexOf(project);

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
		console.log(projects());
		const _projectsDOM = _.without([...document.querySelectorAll(".project")], document.querySelector("#add"));
		projects().forEach(_project =>
		{
			let doesProjectExist = () =>
			{
				for (let i = 0; i < _projectsDOM.length; i++)
				{
					// eslint-disable-next-line eqeqeq
					if (_projectsDOM[i].dataset.index == projects().indexOf(_project)) return true;
				}
				return false;
			};
			if (doesProjectExist()) return;

			OutputProjectToDOM(_project);

			if (firebase.auth().currentUser) return SyncWithCloud(firebase.auth().currentUser.uid);
			SyncLocally();
		});
	};

	const SaveChangesToDOM = (project) =>
	{
		const projectDOM = document.querySelector(`[data-index="${projects().indexOf(project)}"]`);
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
		const nameArrayLength = _.filter(projects(), project => project.name.includes("Name") && project.defaultProject === true).length;
		
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
		projects().splice(e.target.parentElement.dataset.index, 1);
		SyncProjectIndexes();
		if (firebase.auth().currentUser) return SyncWithCloud(firebase.auth().currentUser.uid);
		SyncLocally();
	};

	// Gets the projects DOM and loops through them assigning the index dataset by name
	const SyncProjectIndexes = () =>
	{
		const _projectsDOM = _.without([...document.querySelectorAll(".project")], document.querySelector("#add"));
		_projectsDOM.forEach(_project => _project.dataset.index = projects().indexOf(_.find(projects(), project => project.name === _project.firstChild.textContent)));
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
				setProjects(arrayMove(projects(), projects().indexOf(project), projects().indexOf(project) - 1));
			}
		};

		const MoveRight = () =>
		{
			if(element.nextElementSibling && element.nextElementSibling !== document.querySelector("#add")) 
			{
				element.parentNode.insertBefore(element.nextElementSibling, element);
				setProjects(arrayMove(projects(), projects().indexOf(project), projects().indexOf(project) + 1));
			}
		};

		left ? MoveLeft() : MoveRight();
		
		if (firebase.auth().currentUser) return SyncWithCloud(firebase.auth().currentUser.uid);
		SyncLocally();
	};

	return { OutputProjectToDOM, SaveChangesToDOM, SyncChecklistIndexes, DisplayInterface };
})();

export default Interface;
