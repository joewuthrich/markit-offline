import Modal from "../Modal.js";
import CommentPage from "../CommentPage.js";
import PageName from "../PageName.js";

export default class SearchModal extends Modal {
  constructor() {
    super(
      `
        <div class="tmw-new-page-modal-header">SEARCH PAGE NAME:</div>
        <div class="tmw-modal-input-container">
          <div class="tmw-modal-spacer"></div>
          <div class="tmw-modal-entry-area-container">
            <input id="tmw-modal-entry-area" class="tmw-modal-entry-area tmw-comment-entry-area" placeholder="¶"></input>
          </div>
          <div class="tmw-modal-spacer"></div>
        </div>
        <div id="tmw-search-page-list"></div>
    `
    );

    this.children[0].style.flexDirection = "column";
    this.children[0].style.width = "40%";
    this.children[0].style.minWidth = "380px";
    this.string = "";

    this.children[0].children[2].children[1].children[0].addEventListener(
      "keyup",
      () => {
        this.string =
          this.children[0].children[2].children[1].children[0].value;
        this.searchPages();
      }
    );

    this.searchPages();
  }

  searchPages() {
    var data = localStorage.getItem("comment-data");
    if (data == undefined) data = {};
    else data = JSON.parse(data);

    this.children[0].children[3].innerHTML = "";

    Object.keys(data).forEach((key) => {
      if (key != "𝕕" && key != "𝕕𝕕𝕕" && key != "𝕕𝕕𝕕𝕕") {
        if (key.toLowerCase().startsWith(this.string.toLowerCase())) {
          var slicedKey = key.slice(0, -4);
          var div = new PageName(slicedKey);
          div.getNameElement().addEventListener("click", () => {
            this.loadNewPage(slicedKey);
          });
          this.children[0].children[3].appendChild(div);
        }
      }
    });
  }

  loadNewPage(name) {
    document
      .getElementById("tmw-comment-containers-outer")
      .childNodes.forEach((element) => {
        element.remove();
      });

    var newPage = new CommentPage(name);
    document.getElementById("tmw-comment-containers-outer").append(newPage);

    this.remove();
  }
}

customElements.define("tmw-search-modal", SearchModal);
