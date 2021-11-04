import Modal from "../Modal.js";

export default class NewPageModal extends Modal {
  constructor() {
    super(
      `
        <div class="tmw-new-page-modal-header">NEW PAGE NAME:</div>
        <div class="tmw-modal-entry-area-container">
            <input id="tmw-modal-entry-area" class="tmw-modal-entry-area tmw-comment-entry-area" placeholder="¶">` +
        "" +
        `</textarea>
        </div>
        <div id="tmw-submit-modal-text" class="tmw-modal-submit-btn">SUBMIT</div>
    `
    );

    this.children[0].style.flexDirection = "column";

    this.addEventListener("keydown", (event) => {
      if (event.key != "Enter" || event.shiftKey) return;
      event.preventDefault();
      this.submitPage();
    });

    this.children[0].children[1].addEventListener("click", () => {
      this.submitPage();
    });

    //TODO: FOCUS INPUT
  }

  submitPage() {
    var textbox = this.querySelector(".tmw-comment-entry-area");
    if (textbox.value == "") return;

    //TODO: ADD NEW PAGE HERE

    this.remove();
  }
}

customElements.define("tmw-new-page-modal", NewPageModal);
