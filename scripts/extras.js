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
