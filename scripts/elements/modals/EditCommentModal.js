import Modal from "../Modal.js";

export default class EditCommentModal extends Modal {
  constructor(id, text) {
    super(
      `
      <div class="tmw-comment-entry-area-container">
          <textarea id="tmw-modal-entry-area" class="tmw-comment-entry-area" placeholder="¶">` +
        text +
        `</textarea>
      </div>
      <div id="tmw-submit-modal-text" class="tmw-comment-submit-btn">SUBMIT</div>
    `
    );

    this.targetID = id;

    this.addEventListener("keydown", (event) => {
      if (event.key != "Enter" || event.shiftKey) return;
      event.preventDefault();
      this.submitChange();
    });

    this.children[0].children[2].addEventListener("click", () => {
      this.submitChange();
    });

    var commentEntryArea = this.querySelector(".tmw-comment-entry-area");

    commentEntryArea.focus();
    commentEntryArea.setSelectionRange(text.length, text.length);
  }

  submitChange() {
    var textbox = this.querySelector(".tmw-comment-entry-area");
    if (textbox.value == "") return;
    document.getElementById(this.targetID).updateText(textbox.value);
    this.remove();
  }
}

customElements.define("tmw-edit-modal", EditCommentModal);
