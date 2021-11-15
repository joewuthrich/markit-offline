import ConfirmPageModal from "./modals/ConfirmPageModal.js";

export default class PageName extends HTMLElement {
  constructor(name) {
    super();

    this.innerHTML =
      `
    <div>` +
      name +
      `</div>
    <svg data-layer="88c460d8-8934-4c4d-9894-7ba998c3a406" preserveAspectRatio="none" 
    viewBox="5 5 20 20" class="tmw-icon tmw-new-page-delete-icon">
      <path d="M 25 7.014285087585449 L 22.9857120513916 5 L 15 12.98571491241455 L 7.014285087585449 
      5 L 5 7.014285087585449 L 12.98571491241455 15 L 5 22.9857120513916 L 7.014285087585449 25 L 15 
      17.01428413391113 L 22.9857120513916 25 L 25 22.9857120513916 L 17.01428413391113 15 L 25 
      7.014285087585449 Z"></path>
    </svg>`;

    this.children[0].classList.add("tmw-page-name-name");
    this.classList.add("tmw-page-name-elem");

    this.children[1].addEventListener("click", function () {
      new ConfirmPageModal(name);
    });
  }

  getNameElement() {
    return this.children[0];
  }
}

customElements.define("tmw-page-name", PageName);
