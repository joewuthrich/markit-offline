export default class CommentPage {
    constructor(name, commentList = []) {
        this.name = name;
        this.commentList = commentList;
        this.current = false;
    }

    addComment(comment) {
        this.commentList.append(comment);
    }

    removeComment(id) {
        this.commentList.splice(id, 1);
    }

    setCurrent() {
        this.current = true;
    }

    setNotCurrent() {
        this.current = false;
    }

    contains(text) {
        for (comment in this.commentList) {
            if (comment.text == text)
                return true;
        }
        return false;
    }
}