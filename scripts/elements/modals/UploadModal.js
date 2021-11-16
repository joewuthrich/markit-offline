import Modal from "../Modal.js";
import CommentPage from "../CommentPage.js";
import OverwriteModal from "./OverwriteModal.js";

export default class UploadModal extends Modal {
  constructor() {
    super(
      `
      <div class="tmw-confirm-modal-header tmw-upload-modal-header" 
        style="font-weight: 800">UPLOAD JSON FILE</div>
      <input type="file" id="myFile" style="padding-bottom: 10px; padding-top: 5px">
      <div class="tmw-confirm-modal-header tmw-upload-modal-header" 
        style="font-weight: 800">NEW PAGE NAME</div>
      <div class="tmw-modal-input-container" style="margin-top: -15px;">
          <div class="tmw-modal-spacer"></div>
          <div class="tmw-modal-entry-area-container">
            <input id="tmw-modal-entry-area" class="tmw-modal-entry-area 
              tmw-comment-entry-area" placeholder="¶"></input>
          </div>
          <div class="tmw-modal-spacer"></div>
        </div>
      <div class="tmw-modal-submit-btn">SUBMIT</div>
    `
    );

    this.children[0].style.flexDirection = "column";
    this.children[0].style.width = "30%";

    this.addEventListener("keydown", (event) => {
      if (event.key != "Enter" || event.shiftKey) return;
      event.preventDefault();
      this.upload();
    });

    this.children[0].children[5].addEventListener("click", () => {
      this.upload();
    });

    const dropArea = this.children[0].children[2];
    // if (file) {
    //   dropArea.value = file;
    //   this.children[0].children[4].children[1].children[0].value =
    //     file.name.slice(0, -5);
    // }
    dropArea.ondragover = dropArea.ondragenter = function (event) {
      event.preventDefault();
    };

    dropArea.ondrop = (event) => {
      dropArea.files = event.dataTransfer.files;
      this.children[0].children[4].children[1].children[0].value =
        dropArea.files[0].name.slice(0, -5);
      event.preventDefault();
    };

    dropArea.onchange = () => {
      this.children[0].children[4].children[1].children[0].value =
        dropArea.files[0].name.slice(0, -5);
    };
  }

  upload() {
    var jsonFile = this.children[0].children[2].files[0];
    if (!jsonFile.type && jsonFile.type.startsWith("application/json")) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        var importedData = JSON.parse(reader.result);
        var data = JSON.parse(localStorage.getItem("comment-data"));
        var nameInput =
          this.children[0].children[4].children[1].children[0].value;
        if (data[nameInput + "𝕕𝕕"]) {
          new OverwriteModal(importedData, nameInput);
          this.style.display = "none";
          return;
        }
        data[nameInput + "𝕕𝕕"] = importedData;
        localStorage.setItem("comment-data", JSON.stringify(data));

        document
          .getElementById("tmw-comment-containers-outer")
          .childNodes.forEach((element) => {
            element.remove();
          });
        var newPage = new CommentPage(nameInput);
        document.getElementById("tmw-comment-containers-outer").append(newPage);
        this.remove();
      } catch (error) {
        console.log("ARE YOU SURE THAT IS A JSON FILE?");
        console.log(error);
        //TODO: MAKE THIS MORE ROBUST
      }
    });
    reader.readAsText(jsonFile);
  }
}

customElements.define("tmw-upload-modal", UploadModal);
