var editor;
const config = { attributes: true, childList: true, subtree: true };

window.onload = () => {
  editor = document.getElementsByClassName("ql-editor")[0];
  const observer = new MutationObserver(updateStorage);
  observer.observe(editor, config);
};

function updateStorage() {
  var data = localStorage.getItem("comment-data");
  if (data == undefined) data = {};
  else data = JSON.parse(data);
  var currentPage = document
    .getElementById("tmw-comment-containers-outer")
    .children[0].getName(true);

  data[currentPage][0] = editor.innerHTML;
  localStorage.setItem("comment-data", JSON.stringify(data));
}
