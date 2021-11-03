import Modal from "../Modal.js";

export default class NewPageModal extends Modal {
  constructor() {
    super(
      `
    <div class="tmw-modal-container-inner">
        <div class="tmw-comment-entry-area-container">
            <textarea id="tmw-modal-entry-area" class="tmw-comment-entry-area" placeholder="¶">` +
        "" +
        `</textarea>
        </div>
        <div id="tmw-submit-modal-text" class="tmw-comment-submit-btn">SUBMIT</div>
    </div>
    `
    );

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
