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
  var response = defaultPage.addComment(textInputElement.value);
  if (response) {
    textInputElement.value = "";
    textInputElement.blur();
  }
}
