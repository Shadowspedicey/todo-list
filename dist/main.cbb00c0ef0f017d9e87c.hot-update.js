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
        _project.addEventListener("click", () => console.log("a"));
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

InfoBox.Create(Project("Wow", "m4 3arf", new Date(2021, 8 - 1, 16), "High", null, [Checklist("Intro", false)]));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("60a5595d2e70372b6c04")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNzQzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscURBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxpREFBTSwrQkFBK0I7O0FBRXhFO0FBQ0EsbURBQW1ELGlEQUFnQiw4QkFBOEI7QUFDakc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEdBQUc7O0FBRUgsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixlQUFlOztBQUUxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDREQUE0RCxpREFBTTtBQUNsRTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsOEJBQThCO0FBQ3ZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxPQUFPOzs7QUFHUDs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRCxnSDs7Ozs7Ozs7OztVQzlKQSxzRCIsImZpbGUiOiJtYWluLmNiYjAwYzBlZjBmMDE3ZDllODdjLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBmb3JtYXQsIGRpZmZlcmVuY2VJbkRheXMsIGdldERhdGUgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcblxuY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcbmxldCBwcm9qZWN0cyA9IFtdO1xuXG5jb25zdCBDaGVja2xpc3QgPSAobmFtZSwgY2hlY2tlZCkgPT5cbntcbiAgcmV0dXJuIHtuYW1lLCBjaGVja2VkfTtcbn1cblxuY29uc3QgUHJvamVjdCA9IGZ1bmN0aW9uKG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGNoZWNrbGlzdClcbntcbiAgY29uc3Qgb2JqID0geyBuYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBjaGVja2xpc3QgfTtcblxuICBwcm9qZWN0cy5wdXNoKG9iaik7XG4gIHJldHVybiBvYmo7XG59XG5Qcm9qZWN0KFwiSGVsbG9cIiwgXCJzXCIsIG5ldyBEYXRlKDIwMjEsIDcgLSAxLCAyNCkpO1xuUHJvamVjdChcIkhleVwiLCBcInNcIiwgbmV3IERhdGUoKSk7XG5cbmNvbnNvbGUubG9nKHByb2plY3RzKTtcblxuY29uc3QgSW50ZXJmYWNlID0gKGZ1bmN0aW9uICgpXG57XG4gIChmdW5jdGlvbigpXG4gIHtcbiAgICBjb25zdCBfcHJvamVjdHMgPSBfLndpdGhvdXQoWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKV0sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkXCIpKTtcbiAgICBfcHJvamVjdHMuZm9yRWFjaChfcHJvamVjdCA9PlxuICAgICAge1xuICAgICAgICBfcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY29uc29sZS5sb2coXCJhXCIpKTtcbiAgICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IE91dHB1dFByb2plY3RUb0RPTSA9IChwcm9qZWN0KSA9PlxuICB7XG4gICAgY29uc3QgX3Byb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c1wiKTtcbiAgICBjb25zdCBwcm9qZWN0RE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0RE9NLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgIHByb2plY3RET00uZGF0YXNldC5pbmRleCA9IHByb2plY3RzLmluZGV4T2YocHJvamVjdCk7XG5cbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIG5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG4gICAgcHJvamVjdERPTS5hcHBlbmRDaGlsZChuYW1lKTtcblxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGBEdWUgRGF0ZToke2Zvcm1hdChwcm9qZWN0LmR1ZURhdGUsIFwiZGQvTS95eXl5XCIpfWA7XG5cbiAgICBjb25zdCByZW1haW5pbmdEYXlzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHJlbWFpbmluZ0RheXMudGV4dENvbnRlbnQgPSBgUmVtYWluaW5nIERheXM6ICR7ZGlmZmVyZW5jZUluRGF5cyhwcm9qZWN0LmR1ZURhdGUsIG5ldyBEYXRlKCkpfWBcbiAgICBwcm9qZWN0RE9NLmFwcGVuZENoaWxkKHJlbWFpbmluZ0RheXMpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBwcm9ncmVzc0Jhci5jbGFzc0xpc3QuYWRkKFwicHJvZ3Jlc3MtYmFyXCIpO1xuICAgIHByb2dyZXNzQmFyLnRleHRDb250ZW50ID0gXCIwJVwiO1xuICAgIHByb2plY3RET00uYXBwZW5kQ2hpbGQocHJvZ3Jlc3NCYXIpO1xuXG4gICAgX3Byb2plY3RzRGl2Lmluc2VydEJlZm9yZShwcm9qZWN0RE9NLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZFwiKSk7XG4gIH1cblxuICBjb25zdCBQcmludEFycmF5VG9ET00gPSAoKCkgPT5cbiAge1xuICAgIHByb2plY3RzLmZvckVhY2goX3Byb2plY3QgPT5cbiAgICAgIHtcbiAgICAgICAgT3V0cHV0UHJvamVjdFRvRE9NKF9wcm9qZWN0KTtcbiAgICAgIH0pO1xuICB9KSgpO1xuXG4gIHJldHVybiB7IE91dHB1dFByb2plY3RUb0RPTSB9XG59KSgpO1xuXG5jb25zdCBJbmZvQm94ID0gKCgpID0+XG57XG4gIGNvbnN0IENyZWF0ZSA9IChwcm9qZWN0KSA9PlxuICB7XG4gICAgKCgpID0+XG4gICAge1xuICAgICAgY29uc3QgaW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBpbmZvQ29udGFpbmVyLmlkID0gXCJpbmZvLWNvbnRhaW5lclwiO1xuXG4gICAgICBjb25zdCBpbmZvQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGluZm9Cb3guaWQgPSBcImluZm8tYm94XCI7XG5cbiAgICAgIGNvbnN0IG1haW5JbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG1haW5JbmZvLmlkID0gXCJtYWluLWluZm9cIjtcblxuICAgICAgKCgpID0+XG4gICAgICB7XG4gICAgICAgIGNvbnN0IF9wcm9wZXJ0aWVzID0gW1wibmFtZVwiLCBcImRlc2NyaXB0aW9uXCIsIFwiZHVlRGF0ZVwiLCBcInByaW9yaXR5XCJdO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNcIik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3Byb3BlcnRpZXMubGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImluZm8tYm94XCIpO1xuICAgICAgICAgIGRpdi5pZCA9IGBpbmZvLSR7X3Byb3BlcnRpZXNbaV19YFxuXG4gICAgICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgICAgaDEudGV4dENvbnRlbnQgPSBfcHJvcGVydGllc1tpXTtcbiAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaDEpO1xuXG4gICAgICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgIHAudGV4dENvbnRlbnQgPSBwcm9qZWN0W19wcm9wZXJ0aWVzW2ldXTtcbiAgICAgICAgICBpZiAoX3Byb3BlcnRpZXNbaV0gPT09IFwiZHVlRGF0ZVwiKSBwLnRleHRDb250ZW50ID0gZm9ybWF0KHByb2plY3QuZHVlRGF0ZSwgXCJkZC9NTS95eXl5XCIpO1xuICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChwKTtcblxuICAgICAgICAgIG1haW5JbmZvLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG4gICAgICBpbmZvQm94LmFwcGVuZENoaWxkKG1haW5JbmZvKTtcblxuICAgICAgKCgpID0+XG4gICAgICB7XG4gICAgICAgIGNvbnN0IHNpZGVJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2lkZUluZm8uaWQgPSBcInNpZGUtaW5mb1wiO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaW5mby1ib3hcIik7XG4gICAgICAgIGhlYWRlci5pZCA9IFwiY2hlY2tsaXN0LWhlYWRlclwiO1xuICAgICAgICBoZWFkZXIuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcblxuICAgICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgaDEudGV4dENvbnRlbnQgPSBcIkNoZWNrbGlzdFwiO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaDEpO1xuICAgICAgICBzaWRlSW5mby5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgICAgICgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmNoZWNrbGlzdC5sZW5ndGg7IGkrKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJpbmZvLWJveFwiLCBcImNoZWNrbGlzdFwiKTtcblxuICAgICAgICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9IHByb2plY3QuY2hlY2tsaXN0W2ldLm5hbWU7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQocCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBwcm9qZWN0LmNoZWNrbGlzdFtpXS5jaGVja2VkO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgICAgICAgICAgc2lkZUluZm8uYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKClcblxuICAgICAgICBpbmZvQm94LmFwcGVuZENoaWxkKHNpZGVJbmZvKTtcbiAgICAgIH0pKCk7XG5cblxuICAgICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvQm94KTtcblxuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChpbmZvQ29udGFpbmVyKTtcbiAgICB9KSgpO1xuICB9XG5cbiAgcmV0dXJuIHsgQ3JlYXRlIH1cbn0pKCk7XG5cbkluZm9Cb3guQ3JlYXRlKFByb2plY3QoXCJXb3dcIiwgXCJtNCAzYXJmXCIsIG5ldyBEYXRlKDIwMjEsIDggLSAxLCAxNiksIFwiSGlnaFwiLCBudWxsLCBbQ2hlY2tsaXN0KFwiSW50cm9cIiwgZmFsc2UpXSkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjYwYTU1OTVkMmU3MDM3MmI2YzA0XCIpIl0sInNvdXJjZVJvb3QiOiIifQ==