import CommentPage from "./CommentPage.js"
import Comment from "./Comment.js"

let textInputElement = document.getElementById("tmw-comment-entry-area");
let commentCount = 0;

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
  if (textInputElement.value == "")
    return;
  var commentList = document.getElementById("tmw-comment-containers-outer").children;
  for (let comment of commentList)
    if (textInputElement.value == comment.toString()) return;
  new Comment(commentCount++, textInputElement.value, 1);
  navigator.clipboard.writeText(textInputElement.value).then(() => {},() => {});
  textInputElement.value = "";
  textInputElement.blur();
}

