import CommentPage from "./elements/CommentPage.js";
import NewPageModal from "./elements/modals/NewPageModal.js";

window.onload = () => {
  var defaultPage = new CommentPage("default");
  document.getElementById("tmw-comment-containers-outer").append(defaultPage);
};

document.getElementById("tmw-new-page").addEventListener("click", function () {
  var newPageModal = new NewPageModal();

  document
    .getElementById("tmw-comment-containers-outer")
    .childNodes.forEach((element) => {
      element.remove();
    });

  var newPage = new CommentPage("new");
  document.getElementById("tmw-comment-containers-outer").append(newPage);
});
