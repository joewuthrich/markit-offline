import Modal from "../Modal.js";
import CommentPage from "../CommentPage.js";

export default class OverwriteModal extends Modal {
  constructor(file, name) {
    super(
      `
      <div class="tmw-confirm-modal-header tmw-upload-modal-header tmw-exists-modal-header">THIS PAGE ALREADY EXISTS</div>
      <div class="tmw-modal-overwrite-container">
        <div class="tmw-modal-submit-btn">OVERWRITE</div>
        <div class="tmw-modal-submit-btn">RETURN</div>
      </div>
    `,
      false
    );

    this.file = file;
    this.name = name;

    this.children[0].style.flexDirection = "column";
    this.children[0].style.width = "30%";

    this.addEventListener("keydown", (event) => {
      if (event.key != "Enter" || event.shiftKey) return;
      event.preventDefault();
      this.upload();
    });

    this.children[0].children[2].children[0].addEventListener("click", () => {
      this.upload();
    });

    this.children[0].children[2].children[1].addEventListener("click", () => {
      this.return();
    });
  }

  return() {
    this.remove();
    document.getElementById("tmw-modal-container").style.display = "flex";
  }

  upload() {
    var importedData = this.file;
    var data = JSON.parse(localStorage.getItem("comment-data"));
    data[this.name + "𝕕𝕕"] = importedData;
    localStorage.setItem("comment-data", JSON.stringify(data));
    document
      .getElementById("tmw-comment-containers-outer")
      .childNodes.forEach((element) => {
        element.remove();
      });
    var newPage = new CommentPage(this.name);
    document.getElementById("tmw-comment-containers-outer").append(newPage);
    this.remove();
    document.getElementById("tmw-modal-container").remove();
  }
}

customElements.define("tmw-overwrite-modal", OverwriteModal);
