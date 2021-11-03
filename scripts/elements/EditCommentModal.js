export default class EditCommentModal extends HTMLElement {
  constructor(id, text) {
    super();

    this.id = "tmw-modal-container";
    this.targetID = id;
    this.innerHTML =
      `
        <div class="tmw-comment-entry-container tmw-modal-entry-container">
            <div class="tmw-comment-entry-area-container">
                <textarea id="tmw-modal-entry-area" class="tmw-comment-entry-area" placeholder="¶">` +
      text +
      `</textarea>
            </div>
            <div id="tmw-submit-modal-text" class="tmw-comment-submit-btn">SUBMIT</div>
        </div>
        `;

    this.addEventListener("click", function (event) {
      if (event.target == this) this.remove();
    });

    this.addEventListener("keydown", (event) => {
      if (event.key != "Enter" || event.shiftKey) return;
      event.preventDefault();
      this.submitChange();
    });

    this.children[0].children[1].addEventListener("click", () => {
      this.submitChange();
    });

    document.getElementById("tmw-body").append(this);
  }

  submitChange() {
    var textbox = this.querySelector(".tmw-comment-entry-area");
    if (textbox.value == "") return;
    document.getElementById(this.targetID).updateText(textbox.value);
    this.remove();
  }
}

customElements.define("edit-comment-modal", EditCommentModal);
