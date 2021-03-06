import CommentPage from "./elements/CommentPage.js";
import ConfirmModal from "./elements/modals/ConfirmModal.js";
import NewPageModal from "./elements/modals/NewPageModal.js";
import SearchModal from "./elements/modals/SearchModal.js";

window.addEventListener("load", () => {
  var data = localStorage.getItem("comment-data");
  if (data == undefined) data = {};
  else data = JSON.parse(data);
  var defaultPage = new CommentPage(data["𝕕𝕕𝕕"] ? data["𝕕𝕕𝕕"] : "default");
  document.getElementById("tmw-comment-containers-outer").append(defaultPage);
});

document.getElementById("tmw-new-page").addEventListener("click", function () {
  new NewPageModal();
});

document
  .getElementById("tmw-delete-page")
  .addEventListener("click", function () {
    new ConfirmModal();
  });

document
  .getElementById("tmw-page-current-name")
  .addEventListener("click", function () {
    new SearchModal();
  });
