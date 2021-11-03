import CommentPage from "./elements/CommentPage.js";
import Modal from "./elements/Modal.js";

window.onload = () => {
  var defaultPage = new CommentPage("default");
  document.getElementById("tmw-comment-containers-outer").append(defaultPage);
};

document.getElementById("tmw-new-page").addEventListener("click", function () {
  document
    .getElementById("tmw-comment-containers-outer")
    .childNodes.forEach((element) => {
      element.remove();
    });

  var newPage = new CommentPage("new");
  document.getElementById("tmw-comment-containers-outer").append(newPage);
});
