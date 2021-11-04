import Modal from "../Modal.js";

export default class UploadModal extends Modal {
  constructor() {
    super(
      `
      <div class="tmw-confirm-modal-header" style="font-weight: 800">UPLOAD JSON FILE</div>
      <input type="file" id="myFile" style="padding-bottom: 25px">
      <div id="tmw-submit-modal-text" class="tmw-modal-submit-btn">SUBMIT</div>
    `
    );

    this.children[0].style.flexDirection = "column";
    this.children[0].style.width = "30%";

    this.addEventListener("keydown", (event) => {
      if (event.key != "Enter" || event.shiftKey) return;
      event.preventDefault();
      this.upload();
    });

    this.children[0].children[3].addEventListener("click", () => {
      this.upload();
    });

    const dropArea = this.children[0].children[2];

    dropArea.addEventListener("dragover", (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    });

    dropArea.addEventListener("drop", (event) => {
      event.stopPropagation();
      event.preventDefault();
      const fileList = event.dataTransfer.files;
      console.log(fileList);
    });
  }

  upload() {
    var jsonFile = this.children[0].children[2].files[0];
    if (!jsonFile.type && jsonFile.type.startsWith("application/json")) return;
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      try {
        var importedData = JSON.parse(this.result);
        var data = JSON.parse(localStorage.getItem("comment-data"));
        data[jsonFile.name.slice(0, -5) + "𝕕𝕕"] = importedData;
        localStorage.setItem("comment-data", JSON.stringify(data));
      } catch (SyntaxError) {
        console.log("ARE YOU SURE THAT IS A JSON FILE?");
        //TODO: MAKE THIS MORE ROBUST
      }
    });
    reader.readAsText(jsonFile);
  }
}

customElements.define("tmw-upload-modal", UploadModal);
