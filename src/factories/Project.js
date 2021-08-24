import _ from "lodash";
import Checklist from "./Checklist";
import projects from "../projects";

const Project = (name, description, dueDate, priority, checklist) =>
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

export default Project;
