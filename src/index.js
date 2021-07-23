import _ from "lodash";
import { format, differenceInDays, parse } from "date-fns";

const content = document.querySelector("#content");
let projects = [];

const Checklist = (name, checked) =>
{
  return {name, checked};
}

const Project = function(name, description, dueDate, priority, checklist)
{
  const progress = 0;

  const AddChecklistToArray = () =>
  {
    let _check = Checklist("Name", false);
    checklist.push(_check);
    return _check;
  };

  const obj = { name, description, dueDate, priority, checklist, progress, AddChecklistToArray };
  projects.push(obj);
  return obj;
}
Project("Hello", "s", new Date(2021, 7 - 1, 25), "Medium", [Checklist("Intro", false), Checklist("Buildup", false), Checklist("Transition", false)]);
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
    progressBar.textContent = `${project.progress}%`;
    const progressSpan = document.createElement("span");
    progressSpan.id = "bar";
    progressBar.appendChild(progressSpan);
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

  const SaveChangesToDOM = (project) =>
  {
    const projectDOM = document.querySelector(`[data-index="${projects.indexOf(project)}"]`);
    const header = projectDOM.children[0];
    const remainingDays = projectDOM.children[1];
    const progressBar = projectDOM.children[2];

    header.textContent = project.name;

    remainingDays.textContent = `Remaining Days: ${differenceInDays(project.dueDate, new Date())}`;

    progressBar.firstChild.textContent = `${Math.round(project.progress)}%`;
    progressBar.querySelector("#bar").style.width = `${project.progress}%`;
    switch (project.priority)
    {
      case "Low":
        console.log("a");
        progressBar.querySelector("#bar").style.background = "green";
        break;

      case "Medium":
        progressBar.querySelector("#bar").style.background = "yellow";
        break;

      case "High":
        progressBar.querySelector("#bar").style.background = "red";
        break;
    }
  }

  (() =>
  {
    const _projects = _.without([...document.querySelectorAll(".project")], document.querySelector("#add"));
    _projects.forEach(_project =>
      {
        _project.addEventListener("click", () => InfoBox.Create(projects[_project.dataset.index]));
      });
  })();

  return { OutputProjectToDOM, SaveChangesToDOM }
})();

const InfoBox = (() =>
{
  const _priorities = ["Low", "Medium", "High"];

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

      //Creates the info fields through a loop
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

      //Creates the side info div and appends every checklist obj in project
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

        //Adds the add checklist button
        const addDiv = document.createElement("div");
        addDiv.id = "checklist-add";
        addDiv.textContent = "+";
        addDiv.addEventListener("click", () => CreateChecklistItem(project));
        sideInfo.appendChild(addDiv);

        //Adds the checklist
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
        })()

        infoBox.appendChild(sideInfo);
      })();

      //Adds close button
      (() =>
      {
        const close = document.createElement("span");
        close.classList.add("material-icons")
        close.textContent = "close";

        close.addEventListener("click", () => Close());

        infoBox.appendChild(close);
      })()

      infoContainer.appendChild(infoBox);

      content.appendChild(infoContainer);
    })();
  }

  const Edit = (element, project) =>
  {
    //TODO Date and priority edit
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

      //Fallback to be able to edit checklist
      default:
        pInput.type = "text";
        pInput.value = element.lastChild.textContent;
        break;
    }
    if (element.parentElement.classList.contains("checklist")) element.parentElement.insertBefore(pInput, element.parentElement.firstChild);
    else element.parentElement.appendChild(pInput);
    element.remove();

    //Creates the p element and fills it with the value of the input and appends it while creating and edit button
    const ConfirmChanges = () =>
    {
      const newP = document.createElement("p");
      newP.textContent = pInput.value;
      if (pInput.parentElement.id === "dueDate") newP.textContent = format(parse(pInput.value, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");

      if (pInput.parentElement.classList.contains("checklist")) CreateEditButton(newP, project, true)
      else CreateEditButton(newP, project, false);

      if (pInput.parentElement.classList.contains("checklist")) pInput.parentElement.insertBefore(newP, pInput.parentElement.firstChild);
      else pInput.parentElement.appendChild(newP);
      pInput.remove();

      Save(project)
    }

    if (pInput.parentElement.id === "dueDate" || pInput.parentElement.id === "priority") return pInput.addEventListener("change", () => ConfirmChanges());

    //Checks for enter key to confirm changes to info box
    pInput.addEventListener("keyup", (e) =>
    {
      if (e.keyCode === 13)
      {
        ConfirmChanges();
      }
    });
  }

  const Save = (project) =>
  {
    //Saves info fields and date
    (() =>
    {
      const _infoBoxes = _.without([...document.querySelectorAll(".info-box")], document.querySelector("#checklist-header"), ...document.querySelectorAll(".checklist"));
      for (let i = 0; i < _infoBoxes.length; i++)
      {
        project[_infoBoxes[i].id] = _infoBoxes[i].querySelector("p").firstChild.textContent;
        if (_infoBoxes[i].id == "dueDate") project[_infoBoxes[i].id] = parse(_infoBoxes[i].querySelector("p").firstChild.textContent, "dd/MM/yyyy", new Date());
      };  
    })();

    //Saves Checklist
    (() =>
    {
      const _checklistDOM = _.without([...document.querySelectorAll(".checklist")], document.querySelector("#checklist-header"));
      for (let i = 0; i < _checklistDOM.length; i++)
      {
        let _element = _.find(_checklistDOM, element => element.dataset.index == i);
        console.log(_element);
        project.checklist[i].name = _element.querySelector("p").lastChild.textContent;
      }
    })();
    
    //Calculates progress and saves it
    (() =>
    {
      let _checkedTemp = _.filter(project.checklist, (_check) => _check.checked);
      project.progress = (_checkedTemp.length / project.checklist.length) * 100;
    })();

    //Changes the info on the project DOM accordingly
    Interface.SaveChangesToDOM(project);
  }

  const Close = () =>
  {
    document.querySelector("#info-container").remove();
  }

  //Create the edit button and adds event listeners to icon parent and passed the project
  const CreateEditButton = (p, project, before) =>
  {
    const icon = document.createElement("span");
    icon.classList.add("material-icons", "hidden");
    icon.textContent = "edit";
    before ? p.insertBefore(icon, p.firstChild) : p.appendChild(icon);
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
  };

  //Creats a checklist item and appends it to side info
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
      _checked.checked = input.checked;
      Save(project);
    });
    div.appendChild(input);

    document.querySelector("#side-info").insertBefore(div, document.querySelector("#checklist-add"));
  };

  return { Create, Close }
})();

(() =>
{
  window.addEventListener("click", (e) => 
  {
    if (e.target.id === "info-container") InfoBox.Close();
  });
})();