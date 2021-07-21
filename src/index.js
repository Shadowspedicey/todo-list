import _ from "lodash";

let projects = [];

const Project = function(name, description, dueDate, priority, notes)
{
  const obj = { name, description, dueDate, priority, notes };

  projects.push(obj);
  return obj;
}
Project("Hello", "s", "2/2/2021");

console.log(projects);

const Interface = (function ()
{
  (function()
  {
    const _projects = _.without([...document.querySelectorAll(".project")], document.querySelector("#add"));
    _projects.forEach(_project =>
      {
        _project.addEventListener("click", () => console.log("a"));
      });
  })();

  const OutputProjectToDOM = (project) =>
  {
    const _projectsDiv = document.querySelector("#projects");
    const projectDOM = document.createElement("div");
    projectDOM.classList.add("project");

    const name = document.createElement("h2");
    name.textContent = project.name;
    projectDOM.appendChild(name);

    const date = document.createElement("h2");
    date.textContent = `Due Date: ${project.dueDate}`;
    projectDOM.appendChild(date);

    const progressBar = document.createElement("span");
    progressBar.classList.add("progress-bar");
    progressBar.textContent = "0%";
    projectDOM.appendChild(progressBar);

    _projectsDiv.insertBefore(projectDOM, document.querySelector("#add"));
  }

  const PrintArrayToDOM = (() =>
  {
    projects.forEach(_project =>
      {
        OutputProjectToDOM(_project);
      });
  })();

  return { OutputProjectToDOM }
})()