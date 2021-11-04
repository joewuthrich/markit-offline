let textInputElement = document.getElementById("tmw-comment-entry-area");

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
