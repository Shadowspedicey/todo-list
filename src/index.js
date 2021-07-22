import _ from "lodash";
import { format, differenceInDays, parse } from "date-fns";

const content = document.querySelector("#content");
let projects = [];

const Checklist = (name, checked) =>
{
  return {name, checked};
}

const Project = function(name, description, dueDate, priority, notes, checklist)
{
  const obj = { name, description, dueDate, priority, notes, checklist };

  projects.push(obj);
  return obj;
}
Project("Hello", "s", new Date(2021, 7 - 1, 24), "Medium", "", [Checklist("Intro", false), Checklist("Buildup", false)]);
Project("Hey", "s", new Date());

const Interface = (() =>
{
  const OutputProjectToDOM = (project) =>
  {
    const _projectsDiv = document.querySelector("#projects");
    const projectDOM = document.createElement("div");
    projectDOM.classList.add("project");
    projectDOM.dataset.index = projects.indexOf(project);

    const name = document.createElement("h2");
    name.textContent = project.name;
    projectDOM.appendChild(name);

    const date = document.createElement("h2");
    date.textContent = `Due Date:${format(project.dueDate, "dd/M/yyyy")}`;

    const remainingDays = document.createElement("h2");
    remainingDays.textContent = `Remaining Days: ${differenceInDays(project.dueDate, new Date())}`
    projectDOM.appendChild(remainingDays);

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

  (() =>
  {
    const _projects = _.without([...document.querySelectorAll(".project")], document.querySelector("#add"));
    _projects.forEach(_project =>
      {
        _project.addEventListener("click", () => InfoBox.Create(projects[_project.dataset.index]));
      });
  })();

  return { OutputProjectToDOM }
})();

const InfoBox = (() =>
{
  const Edit = (element, project) =>
  {
    //TODO Date and priority edit
    element.querySelector("span").remove();
    const pInput = document.createElement("input");
    pInput.type = "text";
    pInput.value = element.textContent;
    element.parentElement.appendChild(pInput);
    element.remove();

    pInput.addEventListener("keyup", (e) =>
    {
      if (e.keyCode === 13)
      {
        const newP = document.createElement("p");
        newP.textContent = pInput.value;

        const icon = document.createElement("span");
        icon.classList.add("material-icons", "hidden");
        icon.textContent = "edit";
        element.appendChild(icon);
        icon.addEventListener("click", () => Edit(element));

        (() =>
        {
          element.addEventListener("mouseover", () =>
          {
            element.querySelector("span").classList.remove("hidden");
          });

          element.addEventListener("mouseout", () =>
          {
            element.querySelector("span").classList.add("hidden");
          });
        })();

        pInput.parentElement.appendChild(newP);
        pInput.remove();

        Save(project)
      }
    });
  }

  const Save = (project) =>
  {
    const _infoBoxes = _.without([...document.querySelectorAll(".info-box")], document.querySelector("#checklist-header"), ...document.querySelectorAll(".checklist"));
    for (let i = 0; i < _infoBoxes.length; i++)
    {
      project[_infoBoxes[i].id] = _infoBoxes[i].querySelector("p").firstChild.textContent;
      if (_infoBoxes[i].id == "dueDate") project[_infoBoxes[i].id] = parse(_infoBoxes[i].querySelector("p").firstChild.textContent, "dd/M/yyyy", new Date());
    }

    (() =>
    {
      const projectDOM = document.querySelector(`[data-index="${projects.indexOf(project)}"]`);
      const header = projectDOM.children[0];
      const remainingDays = projectDOM.children[1];
      const progressBar = projectDOM.children[2];

      header.textContent = project.name;
      remainingDays.textContent = `Remaining Days: ${differenceInDays(project.dueDate, new Date())}`; 
    })();
  }

  const Create = (project) =>
  {
    (() =>
    {
      const infoContainer = document.createElement("div");
      infoContainer.id = "info-container";

      const infoBox = document.createElement("div");
      infoBox.id = "info-box";

      const mainInfo = document.createElement("div");
      mainInfo.id = "main-info";

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

          const icon = document.createElement("span");
          icon.classList.add("material-icons", "hidden");
          icon.textContent = "edit";
          p.appendChild(icon);
          icon.addEventListener("click", () => Edit(p, project));

          (() =>
          {
            p.addEventListener("mouseover", () =>
            {
              p.querySelector("span").classList.remove("hidden");
            });

            p.addEventListener("mouseout", () =>
            {
              p.querySelector("span").classList.add("hidden");
            });
          })();

          div.appendChild(p);

          mainInfo.appendChild(div);
        }
      })();
      infoBox.appendChild(mainInfo);

      (() =>
      {
        const sideInfo = document.createElement("div");
        sideInfo.id = "side-info";

        const header = document.createElement("div");
        header.classList.add("info-box");
        header.id = "checklist-header";
        header.style.textAlign = "center";

        const h1 = document.createElement("h1");
        h1.textContent = "Checklist";
        header.appendChild(h1);
        sideInfo.appendChild(header);

        (() =>
        {
          for (let i = 0; i < project.checklist.length; i++)
          {
            const div = document.createElement("div");
            div.classList.add("info-box", "checklist");

            const p = document.createElement("p");
            p.textContent = project.checklist[i].name;
            div.appendChild(p);

            const input = document.createElement("input");
            input.type = "checkbox";
            input.checked = project.checklist[i].checked;
            div.appendChild(input);

            sideInfo.appendChild(div);
          }
        })()

        infoBox.appendChild(sideInfo);
      })();


      infoContainer.appendChild(infoBox);

      content.appendChild(infoContainer);
    })();
  }

  return { Create }
})();

(() =>
{
  window.addEventListener("click", (e) => 
  {
    if (e.target.id === "info-container") e.target.remove();
  });
})();