export default class Modal extends HTMLElement {
  constructor(content, overwrite = true) {
    super();

    if (
      document.getElementById("tmw-modal-container") != undefined &&
      overwrite
    )
      document.getElementById("tmw-modal-container").remove();

    this.id = "tmw-modal-container";
    this.innerHTML =
      `
    <div class="tmw-modal-container-inner">
      <svg data-layer="88c460d8-8934-4c4d-9894-7ba998c3a406" preserveAspectRatio="none" 
      viewBox="5 5 20 20" class="tmw-close-modal-icon tmw-icon">
          <path d="M 25 7.014285087585449 L 22.9857120513916 5 L 15 12.98571491241455 L 7.014285087585449 
          5 L 5 7.014285087585449 L 12.98571491241455 15 L 5 22.9857120513916 L 7.014285087585449 25 L 15 
          17.01428413391113 L 22.9857120513916 25 L 25 22.9857120513916 L 17.01428413391113 15 L 25 
          7.014285087585449 Z"></path>
      </svg>` +
      content +
      `</div>`;

    this.addEventListener("click", function (event) {
      if (event.target == this) this.remove();
    });

    this.children[0].children[0].addEventListener("click", () => {
      this.remove();
    });

    document.getElementById("tmw-body").append(this);
  }
}

customElements.define("tmw-modal", Modal);
