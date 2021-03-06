import UploadModal from "./elements/modals/UploadModal.js";

var editor;

window.addEventListener("load", () => {
  document.getElementById("tmw-body").style.display = "flex";
});

/**
 * Setting up dark mode
 */
let darkMode = false;
const darkModeButton = document.getElementById("tmw-dark-mode-toggle");
var data = localStorage.getItem("comment-data");
if (data == undefined) data = {};
else data = JSON.parse(data);

if (data["𝕕"]) toggleDark();

darkModeButton.addEventListener("click", function () {
  toggleDark();
});

function toggleDark() {
  darkMode = !darkMode;

  let properties = [
    "--main-background-color",
    "--container-background-color",
    "--text-color",
    "--text-hover-color",
    "--menu-item-color",
    "--modal-background-color",
    "--menu-item-color-hover",
    "--menu-background-color",
    "--shadow-color",
    "--comment-hover-background-color",
    "--menu-btn-background-color",
    "--menu-btn-background-color-hover",
  ];
  let darkColors = [
    "rgb(19, 19, 19)",
    "rgb(36, 36, 36)",
    "rgb(255, 255, 255)",
    "rgb(196, 196, 196)",
    "rgb(230, 230, 230)",
    "rgba(0, 0, 0, 0.6)",
    "rgb(200, 200, 200)",
    "rgb(43, 63, 72)",
    "rgba(100, 100, 100, 0.1607843137254902)",
    "rgb(48, 54, 57)",
    "rgb(47, 66, 43)",
    "rgb(47, 60, 44)",
  ];
  let lightColors = [
    "rgb(238, 238, 238)",
    "rgb(255, 255, 255)",
    "rgb(0, 0, 0)",
    "rgb(80, 80, 80)",
    "rgb(255, 255, 255)",
    "rgba(0, 0, 0, 0.8)",
    "rgb(212, 235, 255)",
    "rgb(114, 168, 193)",
    "rgba(0, 0, 0, 0.1607843137254902)",
    "rgb(225, 238, 255)",
    "rgb(230, 253, 225)",
    "rgb(219, 245, 213)",
  ];

  for (let i = 0; i < properties.length; i++) {
    document.documentElement.style.setProperty(
      properties[i],
      darkMode ? darkColors[i] : lightColors[i]
    );
  }

  if (darkMode) darkModeButton.innerHTML = "LIGHT MODE";
  else darkModeButton.innerHTML = "DARK MODE";

  data = JSON.parse(localStorage.getItem("comment-data"));
  data["𝕕"] = darkMode;
  localStorage.setItem("comment-data", JSON.stringify(data));
}

/**
 * Importing and exporting JSON files
 */
document
  .getElementById("tmw-export-json")
  .addEventListener("click", function () {
    localStorage.getItem("comment-data");

    let data = JSON.parse(localStorage.getItem("comment-data"));
    if (data == null) data = {};
    var page =
      data[
        document
          .getElementById("tmw-comment-containers-outer")
          .children[0].getName(true)
      ];

    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(page));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      document
        .getElementById("tmw-comment-containers-outer")
        .children[0].getName() + ".json"
    );
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });

document
  .getElementById("tmw-import-json")
  .addEventListener("click", function () {
    new UploadModal();
  });

/**
 * Make the seperator of the two boxes work
 */
const seperatorIcon = document.getElementById("tmw-seperator-icon");
const commentHalf = document.getElementById("tmw-half-comment-container");
const noteHalf = document.getElementById("tmw-half-note-container");
var elementX = 0,
  mouseX = 0;
var width = window.innerWidth;
commentHalf.style.width = window.innerWidth / 2 - 80 + "px";

function onDrag(event) {
  event.preventDefault();
  elementX = mouseX - event.clientX;
  if (commentHalf.offsetWidth - elementX < 475) {
    commentHalf.style.width = 476 + "px";
    fixEditorDimensions();
    return;
  } else if (
    window.innerWidth - (commentHalf.offsetWidth - elementX + 4 * 40) <
    475
  ) {
    commentHalf.style.width = window.innerWidth - 476 - 4 * 40 + "px";
    fixEditorDimensions();
    return;
  }
  commentHalf.style.width = commentHalf.offsetWidth - elementX + "px";
  mouseX = event.clientX;
  width = window.innerWidth;

  fixEditorDimensions();
}

window.addEventListener("resize", resizeElements);
window.addEventListener("load", resizeElements);

function resizeElements() {
  if (window.innerWidth < 1110) {
    noteHalf.style.display = "none";
    seperatorIcon.style.display = "none";
    commentHalf.style.flex = "1";
    for (var element of document.getElementsByClassName("tmw-spacer-right")) {
      element.style.display = "none";
    }
  } else {
    noteHalf.style.display = "flex";
    seperatorIcon.style.display = "block";
    commentHalf.style.flex = "";
    for (var element of document.getElementsByClassName("tmw-spacer-right")) {
      element.style.display = "block";
    }
  }
  var ratio = window.innerWidth / width;
  commentHalf.style.width = commentHalf.offsetWidth * ratio + "px";
  width = window.innerWidth;
}

seperatorIcon.addEventListener("mousedown", (event) => {
  document.addEventListener("mousemove", onDrag);

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", onDrag);
  });

  mouseX = event.clientX;
});

seperatorIcon.addEventListener("dblclick", () => {
  elementX = 0;
  mouseX = 0;
  commentHalf.style.width = window.innerWidth / 2 - 80 + "px";
  fixEditorDimensions();
});

/**
 * Include the Quill editor
 */
window.addEventListener("load", () => {
  var quill = new Quill("#tmw-note-container", {
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
    },
    placeholder: "Write notes here ¶",
    theme: "snow",
    scrollingContainer: document.getElementById(
      "tmw-note-container-inner-inner"
    ),
  });

  fixEditorDimensions();
});

window.addEventListener("resize", fixEditorDimensions);

function fixEditorDimensions() {
  editor = document.getElementsByClassName("ql-editor")[0];

  editor.style.height =
    document.getElementById("tmw-note-container").offsetHeight - 25 + "px";

  editor.style.width =
    document.getElementById("tmw-note-container-outer").offsetWidth -
    100 +
    "px";
}

window.addEventListener("load", function () {
  var data = localStorage.getItem("comment-data");
  if (data == undefined) data = {};
  else data = JSON.parse(data);

  data["𝕕𝕕𝕕𝕕"] == null ? (data["𝕕𝕕𝕕𝕕"] = 0) : data["𝕕𝕕𝕕𝕕"];

  var display = document.getElementById("tmw-sort-page");

  switch (data["𝕕𝕕𝕕𝕕"]) {
    case 0:
      display.innerHTML = "SORT: TIME ASC";
      break;
    case 1:
      display.innerHTML = "SORT: TIME DESC";
      break;
    case 2:
      display.innerHTML = "SORT: ALPHABETICALLY ASC";
      break;
    case 3:
      display.innerHTML = "SORT: ALPHABETICALLY DESC";
      break;
    case 4:
      display.innerHTML = "SORT: COUNT ASC";
      break;
    case 5:
      display.innerHTML = "SORT: COUNT DESC";
      break;
  }
});

document.getElementById("tmw-sort-page").addEventListener("click", function () {
  var data = localStorage.getItem("comment-data");
  if (data == undefined) data = {};
  else data = JSON.parse(data);

  data["𝕕𝕕𝕕𝕕"] == null ? (data["𝕕𝕕𝕕𝕕"] = 0) : data["𝕕𝕕𝕕𝕕"];
  data["𝕕𝕕𝕕𝕕"] = (data["𝕕𝕕𝕕𝕕"] + 1) % 6;

  var page = document.getElementById("tmw-comment-containers-outer")
    .children[0];

  page.sort = data["𝕕𝕕𝕕𝕕"];
  page.sortComments();

  switch (data["𝕕𝕕𝕕𝕕"]) {
    case 0:
      this.innerHTML = "SORT: TIME ASC";
      break;
    case 1:
      this.innerHTML = "SORT: TIME DESC";
      break;
    case 2:
      this.innerHTML = "SORT: ALPHABETICALLY ASC";
      break;
    case 3:
      this.innerHTML = "SORT: ALPHABETICALLY DESC";
      break;
    case 4:
      this.innerHTML = "SORT: COUNT ASC";
      break;
    case 5:
      this.innerHTML = "SORT: COUNT DESC";
      break;
  }

  localStorage.setItem("comment-data", JSON.stringify(data));
});
