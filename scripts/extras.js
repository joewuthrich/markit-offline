import UploadModal from "./elements/modals/UploadModal.js";

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
  mouseX = event.clientX;
  seperatorIcon.style.left = seperatorIcon.offsetLeft - elementX + "px";
  commentHalf.style.width = seperatorIcon.offsetLeft - elementX + "px";
  width = window.innerWidth;
  noteHalf.style.width =
    width - seperatorIcon.offsetLeft - elementX - 25 + "px";
}

window.addEventListener("resize", () => {
  var ratio = window.innerWidth / width;
  console.log(commentHalf.offsetWidth);
  seperatorIcon.style.left = seperatorIcon.offsetLeft * ratio + "px";
  commentHalf.style.width = commentHalf.offsetWidth * ratio + "px";
  noteHalf.style.width = noteHalf.offsetWidth * ratio + "px";
  width = window.innerWidth;
});

seperatorIcon.addEventListener("mousedown", (event) => {
  document.addEventListener("mousemove", onDrag);

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", onDrag);
  });

  mouseX = event.clientX;
});
