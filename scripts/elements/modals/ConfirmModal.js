import Modal from "../Modal.js";

export default class ConfirmModal extends Modal {
  constructor(id = undefined) {
    super(
      `
      <div class="tmw-confirm-modal-header" style="font-weight: 800">ARE YOU SURE?</div>
      <div id="tmw-submit-modal-text" class="tmw-modal-submit-btn" style="font-weight: 100; font-size: 17px">YES</div>
    `
    );

    this.targetID = id;
    this.children[0].style.flexDirection = "column";
    this.children[0].style.width = "30%";

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
    this.targetID == undefined
      ? this.removePage()
      : document
          .getElementById(this.targetID)
          .parentElement.removeComment(document.getElementById(this.targetID));
    this.remove();
  }

  removePage() {
    var data = localStorage.getItem("comment-data");
    if (data == undefined) data = {};
    else data = JSON.parse(data);
    delete data[
      document
        .getElementById("tmw-comment-containers-outer")
        .children[0].getName(true)
    ];
    localStorage.setItem("comment-data", JSON.stringify(data));

    document
      .getElementById("tmw-comment-containers-outer")
      .children[0].remove();
  }
}

customElements.define("tmw-confirm-modal", ConfirmModal);
