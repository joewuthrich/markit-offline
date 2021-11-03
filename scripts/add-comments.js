import CommentPage from "./CommentPage.js";

let textInputElement = document.getElementById("tmw-comment-entry-area");
let defaultPage;

window.onload = () => {
  defaultPage = new CommentPage("default");
  document.getElementById("tmw-comment-containers-outer").append(defaultPage);
};

textInputElement.addEventListener("keydown", function (e) {
  if (
    document.activeElement != textInputElement ||
    e.key != "Enter" ||
    e.shiftKey
  )
    return;
  e.preventDefault();
  addComment();
});

document
  .getElementById("tmw-comment-submit-btn")
  .addEventListener("click", function () {
    addComment();
  });

function addComment() {
  var pages = document.getElementById(
    "tmw-comment-containers-outer"
  ).childNodes;
  for (var page of pages) {
    if (page.style.display != "none") {
      pages = page;
      break;
    }
  }
  var response = page.addComment(textInputElement.value);
  if (response) {
    textInputElement.value = "";
    textInputElement.blur();
  }
}

document.getElementById("tmw-new-page").addEventListener("click", function () {
  document
    .getElementById("tmw-comment-containers-outer")
    .childNodes.forEach((element) => {
      element.remove();
    });
  var newPage = new CommentPage("new");
  document.getElementById("tmw-comment-containers-outer").append(newPage);
});
