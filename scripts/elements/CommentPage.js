import Comment from "./Comment.js";
const ID_ASC = 0;
const ID_DESC = 1;
const ALPHA_ASC = 2;
const ALPHA_DESC = 3;
const USE_ASC = 4;
const USE_DESC = 5;

export default class CommentPage extends HTMLElement {
  constructor(name, commentList = []) {
    super();

    this.name = name;
    this.current = false;
    this.classList.add("tmw-comment-page");

    var data = localStorage.getItem("comment-data");
    if (data == undefined) data = {};
    else data = JSON.parse(data);

    data["𝕕𝕕𝕕𝕕"] == null ? (this.sort = 0) : (this.sort = data["𝕕𝕕𝕕𝕕"]);

    let comments = data[name + "𝕕𝕕"] ? data[name + "𝕕𝕕"] : [[""]];
    commentList.forEach((value) => {
      if (!(value in comments)) comments.append(value);
    });
    var biggestID = 0;
    if (comments.length > 1) {
      for (var comment of comments.slice(1)) {
        parseInt(comment[2]) > biggestID
          ? (biggestID = comment[2])
          : (biggestID = biggestID);
        this.appendChild(
          new Comment(comment[0], comment[1], comment[2], comment[3])
        );
      }
    }
    data[this.name + "𝕕𝕕"] = comments;
    data["𝕕𝕕𝕕"] = this.name;

    var editor = document.getElementsByClassName("ql-editor")[0];
    editor.innerHTML = comments[0];

    this.sortComments();
    this.commentCount = parseInt(biggestID) + 1;
    localStorage.setItem("comment-data", JSON.stringify(data));

    if (name.length > 18)
      document.getElementById("tmw-page-current-name").children[0].innerHTML =
        name.slice(0, 18) + "...";
    else
      document.getElementById("tmw-page-current-name").children[0].innerHTML =
        name;
  }

  addComment(comment) {
    if (comment == "") return false;
    var commentList = this.children;
    for (let prevComment of commentList)
      if (comment == prevComment.getText()) return false;
    navigator.clipboard.writeText(comment).then(
      () => {},
      () => {}
    );
    let data = JSON.parse(localStorage.getItem("comment-data"));
    comment = new Comment(this.commentCount++, comment);
    data[this.name + "𝕕𝕕"].push(comment.toArray());
    this.appendChild(comment);
    localStorage.setItem("comment-data", JSON.stringify(data));
    this.sortComments();
    return true;
  }

  removeComment(comment) {
    this.removeChild(comment);
    this.updateStorage();
  }

  setCurrent() {
    this.current = true;
  }

  setNotCurrent() {
    this.current = false;
  }

  sortComments() {
    let children = [].slice.call(this.childNodes);
    children
      .sort((comment1, comment2) => {
        switch (this.sort) {
          case ID_ASC:
            if (comment1.favourite && comment2.favourite) {
              if (comment1.id < comment2.id) return 1;
              if (comment1.id > comment2.id) return -1;
            } else if (comment1.favourite) return 1;
            else if (comment2.favourite) return -1;
            else {
              if (comment1.id < comment2.id) return 1;
              if (comment1.id > comment2.id) return -1;
            }
            break;
          case ID_DESC:
            if (comment1.favourite && comment2.favourite) {
              if (comment1.id < comment2.id) return -1;
              if (comment1.id > comment2.id) return 1;
            } else if (comment1.favourite) return -1;
            else if (comment2.favourite) return -1;
            else {
              if (comment1.id < comment2.id) return -1;
              if (comment1.id > comment2.id) return 1;
            }
            break;
          case ALPHA_ASC:
            if (comment1.favourite && comment2.favourite) {
              if (comment1.text < comment2.text) return 1;
              if (comment1.text > comment2.text) return -1;
            } else if (comment1.favourite) return 1;
            else if (comment2.favourite) return -1;
            else {
              if (comment1.text < comment2.text) return 1;
              if (comment1.text > comment2.text) return -1;
            }
            break;
          case ALPHA_DESC:
            if (comment1.favourite && comment2.favourite) {
              if (comment1.text < comment2.text) return -1;
              if (comment1.text > comment2.text) return 1;
            } else if (comment1.favourite) return 1;
            else if (comment2.favourite) return -1;
            else {
              if (comment1.text < comment2.text) return -1;
              if (comment1.text > comment2.text) return 1;
            }
            break;
          case USE_ASC:
            if (comment1.favourite && comment2.favourite) {
              if (comment1.count < comment2.count) return -1;
              if (comment1.count > comment2.count) return 1;
            } else if (comment1.favourite) return 1;
            else if (comment2.favourite) return -1;
            else {
              if (comment1.count < comment2.count) return 1;
              if (comment1.count > comment2.count) return -1;
            }
            break;
          case USE_DESC:
            if (comment1.favourite && comment2.favourite) {
              if (comment1.count < comment2.count) return 1;
              if (comment1.count > comment2.count) return -1;
            } else if (comment1.favourite) return 1;
            else if (comment2.favourite) return -1;
            else {
              if (comment1.count < comment2.count) return -1;
              if (comment1.count > comment2.count) return 1;
            }
            break;
        }
      })
      .forEach((child) => this.appendChild(child));
    this.updateStorage();
  }

  contains(text) {
    for (comment in this.commentList) {
      if (comment.text == text) return true;
    }
    return false;
  }

  updateStorage() {
    let data = JSON.parse(localStorage.getItem("comment-data"));
    if (data == null) data = {};
    data[this.name + "𝕕𝕕"] = [
      data[this.name + "𝕕𝕕"] ? data[this.name + "𝕕𝕕"][0] : "",
      ...Array.from(this.children, (item) => item.toArray()),
    ];
    localStorage.setItem("comment-data", JSON.stringify(data));
  }

  /**
   * @param {Boolean} storage if it should return the storage name or not
   */
  getName(storage = false) {
    return storage ? this.name + "𝕕𝕕" : this.name;
  }
}

customElements.define("defined-page", CommentPage);
