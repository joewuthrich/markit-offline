import Comment from "./Comment.js";

export default class CommentPage extends HTMLElement {
  constructor(name, commentList = []) {
    super();

    this.name = name;
    this.current = false;
    this.style = "width: 100%; height: 100%;display:block;";

    var data = localStorage.getItem("comment-data");
    if (data == undefined) data = {};
    else data = JSON.parse(data);

    let comments = data[name + "𝕕𝕕"] ? data[name + "𝕕𝕕"] : [];
    commentList.forEach((value) => {
      if (!(value in comments)) comments.append(value);
    });
    var biggestID = 0;
    for (var comment of comments) {
      biggestID = comment[0];
      this.appendChild(
        new Comment(comment[0], comment[1], comment[2], comment[3])
      );
    }
    data[name + "𝕕𝕕"] = comments;
    this.sortComments();
    this.commentCount = parseInt(biggestID) + 1;
    localStorage.setItem("comment-data", JSON.stringify(data));
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
      .sort(function (comment1, comment2) {
        if (comment1.favourite && comment2.favourite) {
          if (comment1.id < comment2.id) return -1;
          if (comment1.id > comment2.id) return 1;
        } else if (comment1.favourite) return -1;
        else if (comment2.favourite) return 1;
        else {
          if (comment1.id < comment2.id) return -1;
          if (comment1.id > comment2.id) return 1;
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
    data[this.name + "𝕕𝕕"] = Array.from(this.children, (item) =>
      item.toArray()
    );
    localStorage.setItem("comment-data", JSON.stringify(data));
  }
}

customElements.define("defined-page", CommentPage);
