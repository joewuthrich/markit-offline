import UploadModal from "./elements/modals/UploadModal.js";

var editor;

/**
 * Setting up dark mode
 */
let darkMode = false;
let data = JSON.parse(localStorage.getItem("comment-data"));
if (data["𝕕𝕕-Dark𝕕Mo𝕕e"]) toggleDark();

document
  .getElementById("tmw-dark-mode-toggle")
  .addEventListener("click", function () {
    toggleDark();
  });

function toggleDark() {
  darkMode = !darkMode;

  let properties = [
    "--main-background-color",
    "--container-background-color",
    "--text-color",
    "--text-hover-color",
    "--menu-background-color",
    "--modal-background-color",
  ];
  let darkColors = [
    "#131313",
    "rgb(0, 0, 0)",
    "rgb(255, 255, 255)",
    "rgb(196, 196, 196)",
    "rgb(7, 60, 104)",
    "rgba(255, 255, 255, 0.1)",
  ];
  let lightColors = [
    "rgb(238, 238, 238)",
    "rgb(255, 255, 255)",
    "rgb(0, 0, 0)",
    "rgb(80, 80, 80)",
    "rgb(27, 100, 158)",
    "rgba(0, 0, 0, 0.8)",
  ];

  for (let i = 0; i < properties.length; i++) {
    document.documentElement.style.setProperty(
      properties[i],
      darkMode ? darkColors[i] : lightColors[i]
    );
  }

  data = JSON.parse(localStorage.getItem("comment-data"));
  data["𝕕𝕕-Dark𝕕Mo𝕕e"] = darkMode;
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

const seperatorIcon = document.getElementById("tmw-seperator-icon");
const commentHalf = document.getElementById("tmw-half-comment-container");
const noteHalf = document.getElementById("tmw-half-note-container");
var elementX = 0,
  mouseX = 0;
var width = window.innerWidth;

function onDrag(event) {
  event.preventDefault();
  elementX = mouseX - event.clientX;
  if (commentHalf.offsetWidth - elementX < 475) {
    commentHalf.style.width = 476 + "px";
    return;
  } else if (
    window.innerWidth - (commentHalf.offsetWidth - elementX + 4 * 40) <
    475
  ) {
    commentHalf.style.width = window.innerWidth - 476 - 4 * 40 + "px";
    return;
  }
  commentHalf.style.width = commentHalf.offsetWidth - elementX + "px";
  mouseX = event.clientX;
  width = window.innerWidth;

  editor = document.getElementsByClassName("ql-editor")[0];
  editor.style.width =
    document.getElementById("tmw-note-container-outer").offsetWidth -
    100 +
    "px";
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
  commentHalf.style.width = "50%";
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
    placeholder: "Write notes here...",
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
