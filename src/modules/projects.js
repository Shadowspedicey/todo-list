/* eslint-disable no-undef */
import _ from "lodash";
import { parseISO } from "date-fns";
import Checklist from "../factories/Checklist";

let db;
let projects;
setTimeout(() => db = firebase.firestore(), 0);

// Gets "projects" from localStorage and sets the date accordingly and attaches a function
let getStoredProjects = async storage =>
{
	let _storage;

	if (storage === "cloud")
		_storage = await db.collection(`${firebase.auth().currentUser.uid}`).doc("projects").get()
			.then(doc => doc.exists ? doc.data() : {projects: []}).then(storage => storage.projects);

	return new Promise(resolve =>
	{
		if (storage === "local") _storage = JSON.parse(localStorage.getItem("projects"));
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
		resolve(_storage);
	});
};

export const setProjects = newProjects => projects = newProjects;
console.log(projects);

export const SyncLocally = () => localStorage.setItem("projects", JSON.stringify(projects));
export const SyncWithCloud = uid => db.collection(`${uid}`)
	.doc("projects").set({"projects": JSON.parse(JSON.stringify(projects))});

export const initProjects = async (storage) =>
{
	projects = await getStoredProjects(storage);
};

export default () => projects;
