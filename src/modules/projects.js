import _ from "lodash";
import { parseISO } from "date-fns";
import Checklist from "./factories/Checklist";

let projects = getStoredProjects();

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

export const setProjects = newProjects => projects = newProjects;

export const SyncLocally = () => localStorage.setItem("projects", JSON.stringify(projects));

export default projects;
