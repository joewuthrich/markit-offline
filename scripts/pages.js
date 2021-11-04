import CommentPage from "./elements/CommentPage.js";
import ConfirmModal from "./elements/modals/ConfirmModal.js";
import NewPageModal from "./elements/modals/NewPageModal.js";

window.onload = () => {
  var defaultPage = new CommentPage("default");
  document.getElementById("tmw-comment-containers-outer").append(defaultPage);
};

document.getElementById("tmw-new-page").addEventListener("click", function () {
  var newPageModal = new NewPageModal();
});

document
  .getElementById("tmw-delete-page")
  .addEventListener("click", function () {
    new ConfirmModal();
  });
