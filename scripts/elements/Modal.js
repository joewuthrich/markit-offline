export default class Modal extends HTMLElement {
  constructor(content) {
    super();

    if (document.getElementById("tmw-modal-container") != undefined)
      document.getElementById("tmw-modal-container").remove();

    this.id = "tmw-modal-container";
    this.innerHTML =
      `
    <div class="tmw-modal-container-inner">` +
      content +
      `</div>`;

    this.addEventListener("click", function (event) {
      if (event.target == this) this.remove();
    });

    document.getElementById("tmw-body").append(this);
  }
}

customElements.define("tmw-modal", Modal);
