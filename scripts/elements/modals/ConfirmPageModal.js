import Modal from "../Modal.js";
import CommentPage from "../CommentPage.js";

export default class ConfirmPageModal extends Modal {
  constructor(name) {
    super(
      `
      <div class="tmw-delete-page-modal-header" style="font-weight: 800">ARE YOU SURE YOU WANT TO DELETE THIS PAGE?</div>
      <div id="tmw-submit-modal-text" class="tmw-modal-submit-btn" style="font-weight: 100; font-size: 17px">YES</div>
    `
    );

    this.children[0].style.flexDirection = "column";
    this.children[0].style.width = "40%";
    this.children[0].style.minWidth = "400px";
    this.name = name;

    this.addEventListener("keydown", (event) => {
      if (event.key != "Enter" || event.shiftKey) return;
      event.preventDefault();
      this.confirm();
    });

    this.children[0].children[2].addEventListener("click", () => {
      this.confirm();
    });
  }

  confirm() {
    var data = localStorage.getItem("comment-data");
    if (data == undefined) data = {};
    else data = JSON.parse(data);
    delete data[this.name + "𝕕𝕕"];
    localStorage.setItem("comment-data", JSON.stringify(data));

    if (
      document.getElementById("tmw-comment-containers-outer").children[0]
        .name == this.name
    ) {
      document
        .getElementById("tmw-comment-containers-outer")
        .childNodes.forEach((element) => {
          element.remove();
        });

      var newPage = new CommentPage("default");
      document.getElementById("tmw-comment-containers-outer").append(newPage);
    }
    this.remove();
  }
}

customElements.define("tmw-confirm-page-modal", ConfirmPageModal);
