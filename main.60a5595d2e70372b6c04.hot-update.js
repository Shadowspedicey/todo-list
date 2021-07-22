self["webpackHotUpdatetodo_list"]("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/differenceInDays/index.js");



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
Project("Hello", "s", new Date(2021, 7 - 1, 24));
Project("Hey", "s", new Date());

console.log(projects);

const Interface = (function ()
{
  (function()
  {
    const _projects = lodash__WEBPACK_IMPORTED_MODULE_0___default().without([...document.querySelectorAll(".project")], document.querySelector("#add"));
    _projects.forEach(_project =>
      {
        _project.addEventListener("click", () => InfoBox.Create(projects[_project.dataset.index]));
      });
  })();

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
    date.textContent = `Due Date:${(0,date_fns__WEBPACK_IMPORTED_MODULE_1__.default)(project.dueDate, "dd/M/yyyy")}`;

    const remainingDays = document.createElement("h2");
    remainingDays.textContent = `Remaining Days: ${(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.default)(project.dueDate, new Date())}`
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

  return { OutputProjectToDOM }
})();

const InfoBox = (() =>
{
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
        console.log("s");
        for (let i = 0; i < _properties.length; i++)
        {
          let div = document.createElement("div");
          div.classList.add("info-box");
          div.id = `info-${_properties[i]}`

          const h1 = document.createElement("h1");
          h1.textContent = _properties[i];
          div.appendChild(h1);

          const p = document.createElement("p");
          p.textContent = project[_properties[i]];
          if (_properties[i] === "dueDate") p.textContent = (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.default)(project.dueDate, "dd/MM/yyyy");
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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5979a8edba10448c48f0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNzQzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscURBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxpREFBTSwrQkFBK0I7O0FBRXhFO0FBQ0EsbURBQW1ELGlEQUFnQiw4QkFBOEI7QUFDakc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEdBQUc7O0FBRUgsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixlQUFlOztBQUUxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDREQUE0RCxpREFBTTtBQUNsRTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsOEJBQThCO0FBQ3ZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxPQUFPOzs7QUFHUDs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxVQUFVO0FBQ1YsQ0FBQyxJOzs7Ozs7Ozs7O1VDNUpELHNEIiwiZmlsZSI6Im1haW4uNjBhNTU5NWQyZTcwMzcyYjZjMDQuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IGZvcm1hdCwgZGlmZmVyZW5jZUluRGF5cywgZ2V0RGF0ZSB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xubGV0IHByb2plY3RzID0gW107XG5cbmNvbnN0IENoZWNrbGlzdCA9IChuYW1lLCBjaGVja2VkKSA9Plxue1xuICByZXR1cm4ge25hbWUsIGNoZWNrZWR9O1xufVxuXG5jb25zdCBQcm9qZWN0ID0gZnVuY3Rpb24obmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgY2hlY2tsaXN0KVxue1xuICBjb25zdCBvYmogPSB7IG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGNoZWNrbGlzdCB9O1xuXG4gIHByb2plY3RzLnB1c2gob2JqKTtcbiAgcmV0dXJuIG9iajtcbn1cblByb2plY3QoXCJIZWxsb1wiLCBcInNcIiwgbmV3IERhdGUoMjAyMSwgNyAtIDEsIDI0KSk7XG5Qcm9qZWN0KFwiSGV5XCIsIFwic1wiLCBuZXcgRGF0ZSgpKTtcblxuY29uc29sZS5sb2cocHJvamVjdHMpO1xuXG5jb25zdCBJbnRlcmZhY2UgPSAoZnVuY3Rpb24gKClcbntcbiAgKGZ1bmN0aW9uKClcbiAge1xuICAgIGNvbnN0IF9wcm9qZWN0cyA9IF8ud2l0aG91dChbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpXSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRcIikpO1xuICAgIF9wcm9qZWN0cy5mb3JFYWNoKF9wcm9qZWN0ID0+XG4gICAgICB7XG4gICAgICAgIF9wcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBJbmZvQm94LkNyZWF0ZShwcm9qZWN0c1tfcHJvamVjdC5kYXRhc2V0LmluZGV4XSkpO1xuICAgICAgfSk7XG4gIH0pKCk7XG5cbiAgY29uc3QgT3V0cHV0UHJvamVjdFRvRE9NID0gKHByb2plY3QpID0+XG4gIHtcbiAgICBjb25zdCBfcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzXCIpO1xuICAgIGNvbnN0IHByb2plY3RET00gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RET00uY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XG4gICAgcHJvamVjdERPTS5kYXRhc2V0LmluZGV4ID0gcHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KTtcblxuICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbmFtZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgICBwcm9qZWN0RE9NLmFwcGVuZENoaWxkKG5hbWUpO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBkYXRlLnRleHRDb250ZW50ID0gYER1ZSBEYXRlOiR7Zm9ybWF0KHByb2plY3QuZHVlRGF0ZSwgXCJkZC9NL3l5eXlcIil9YDtcblxuICAgIGNvbnN0IHJlbWFpbmluZ0RheXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgcmVtYWluaW5nRGF5cy50ZXh0Q29udGVudCA9IGBSZW1haW5pbmcgRGF5czogJHtkaWZmZXJlbmNlSW5EYXlzKHByb2plY3QuZHVlRGF0ZSwgbmV3IERhdGUoKSl9YFxuICAgIHByb2plY3RET00uYXBwZW5kQ2hpbGQocmVtYWluaW5nRGF5cyk7XG5cbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHByb2dyZXNzQmFyLmNsYXNzTGlzdC5hZGQoXCJwcm9ncmVzcy1iYXJcIik7XG4gICAgcHJvZ3Jlc3NCYXIudGV4dENvbnRlbnQgPSBcIjAlXCI7XG4gICAgcHJvamVjdERPTS5hcHBlbmRDaGlsZChwcm9ncmVzc0Jhcik7XG5cbiAgICBfcHJvamVjdHNEaXYuaW5zZXJ0QmVmb3JlKHByb2plY3RET00sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkXCIpKTtcbiAgfVxuXG4gIGNvbnN0IFByaW50QXJyYXlUb0RPTSA9ICgoKSA9PlxuICB7XG4gICAgcHJvamVjdHMuZm9yRWFjaChfcHJvamVjdCA9PlxuICAgICAge1xuICAgICAgICBPdXRwdXRQcm9qZWN0VG9ET00oX3Byb2plY3QpO1xuICAgICAgfSk7XG4gIH0pKCk7XG5cbiAgcmV0dXJuIHsgT3V0cHV0UHJvamVjdFRvRE9NIH1cbn0pKCk7XG5cbmNvbnN0IEluZm9Cb3ggPSAoKCkgPT5cbntcbiAgY29uc3QgQ3JlYXRlID0gKHByb2plY3QpID0+XG4gIHtcbiAgICAoKCkgPT5cbiAgICB7XG4gICAgICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGluZm9Db250YWluZXIuaWQgPSBcImluZm8tY29udGFpbmVyXCI7XG5cbiAgICAgIGNvbnN0IGluZm9Cb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaW5mb0JveC5pZCA9IFwiaW5mby1ib3hcIjtcblxuICAgICAgY29uc3QgbWFpbkluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbWFpbkluZm8uaWQgPSBcIm1haW4taW5mb1wiO1xuXG4gICAgICAoKCkgPT5cbiAgICAgIHtcbiAgICAgICAgY29uc3QgX3Byb3BlcnRpZXMgPSBbXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIiwgXCJkdWVEYXRlXCIsIFwicHJpb3JpdHlcIl07XG4gICAgICAgIGNvbnNvbGUubG9nKFwic1wiKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfcHJvcGVydGllcy5sZW5ndGg7IGkrKylcbiAgICAgICAge1xuICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiaW5mby1ib3hcIik7XG4gICAgICAgICAgZGl2LmlkID0gYGluZm8tJHtfcHJvcGVydGllc1tpXX1gXG5cbiAgICAgICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgICBoMS50ZXh0Q29udGVudCA9IF9wcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChoMSk7XG5cbiAgICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgcC50ZXh0Q29udGVudCA9IHByb2plY3RbX3Byb3BlcnRpZXNbaV1dO1xuICAgICAgICAgIGlmIChfcHJvcGVydGllc1tpXSA9PT0gXCJkdWVEYXRlXCIpIHAudGV4dENvbnRlbnQgPSBmb3JtYXQocHJvamVjdC5kdWVEYXRlLCBcImRkL01NL3l5eXlcIik7XG4gICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHApO1xuXG4gICAgICAgICAgbWFpbkluZm8uYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtcbiAgICAgIGluZm9Cb3guYXBwZW5kQ2hpbGQobWFpbkluZm8pO1xuXG4gICAgICAoKCkgPT5cbiAgICAgIHtcbiAgICAgICAgY29uc3Qgc2lkZUluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzaWRlSW5mby5pZCA9IFwic2lkZS1pbmZvXCI7XG5cbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJpbmZvLWJveFwiKTtcbiAgICAgICAgaGVhZGVyLmlkID0gXCJjaGVja2xpc3QtaGVhZGVyXCI7XG4gICAgICAgIGhlYWRlci5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuXG4gICAgICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBoMS50ZXh0Q29udGVudCA9IFwiQ2hlY2tsaXN0XCI7XG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChoMSk7XG4gICAgICAgIHNpZGVJbmZvLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICAgICAgKCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuY2hlY2tsaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImluZm8tYm94XCIsIFwiY2hlY2tsaXN0XCIpO1xuXG4gICAgICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBwLnRleHRDb250ZW50ID0gcHJvamVjdC5jaGVja2xpc3RbaV0ubmFtZTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChwKTtcblxuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHByb2plY3QuY2hlY2tsaXN0W2ldLmNoZWNrZWQ7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gICAgICAgICAgICBzaWRlSW5mby5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuXG4gICAgICAgIGluZm9Cb3guYXBwZW5kQ2hpbGQoc2lkZUluZm8pO1xuICAgICAgfSkoKTtcblxuXG4gICAgICBpbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9Cb3gpO1xuXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKGluZm9Db250YWluZXIpO1xuICAgIH0pKCk7XG4gIH1cblxuICByZXR1cm4geyBDcmVhdGUgfVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI1OTc5YThlZGJhMTA0NDhjNDhmMFwiKSJdLCJzb3VyY2VSb290IjoiIn0=