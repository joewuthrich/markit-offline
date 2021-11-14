import EditCommentModal from "./modals/EditCommentModal.js";
import ConfirmModal from "./modals/ConfirmModal.js";

export default class Comment extends HTMLElement {
  constructor(id, text, count = 0, favourite = false) {
    super();

    this.id = id;
    this.text = text;
    this.count = count;
    this.favourite = false;

    this.classList.add("tmw-comment-container");
    this.id = this.id;
    this.addEventListener("click", function (event) {
      var icons = this.children[1].children;
      if (
        event.target == icons[1] ||
        event.target == icons[2] ||
        event.target == icons[3] ||
        event.target == icons[4] ||
        event.target == icons[2].children[0]
      )
        return;
      navigator.clipboard.writeText(this.children[0].textContent).then(
        () => {
          this.count++;
          this.children[1].children[1].innerHTML = this.count;
          this.parentElement.updateStorage();
        },
        () => {}
      );
    });

    // HTML injection doesn't matter, static webpage for now
    this.innerHTML =
      `
          <div class="tmw-comment">` +
      text +
      `</div>
          <div class="tmw-icon-container">
              <svg data-layer="713e396b-e42b-4c48-8333-7cf0799901da" preserveAspectRatio="none" 
              viewBox="1 1 20 20" class="tmw-icon tmw-copy-icon">
                  <path d="M 2.818181753158569 4.636363506317139 L 1 4.636363506317139 L 1 19.18181991577148 C 
                  1 20.18181991577148 1.818181872367859 21.00000190734863 2.818181753158569 21.00000190734863 L 
                  17.36363792419434 21.00000190734863 L 17.36363792419434 19.18181991577148 L 2.818181753158569 
                  19.18181991577148 L 2.818181753158569 4.636363506317139 Z M 19.18181991577148 1 L 6.454545497894287 
                  1 C 5.454545497894287 1 4.636363506317139 1.818181872367859 4.636363506317139 2.818181753158569 
                  L 4.636363506317139 15.54545497894287 C 4.636363506317139 16.54545593261719 5.454545497894287 
                  17.36363792419434 6.454545497894287 17.36363792419434 L 19.18181991577148 17.36363792419434 C 
                  20.18181991577148 17.36363792419434 21.00000190734863 16.54545593261719 21.00000190734863 
                  15.54545497894287 L 21.00000190734863 2.818181753158569 C 21.00000190734863 1.818181872367859 
                  20.18181991577148 1 19.18181991577148 1 Z M 19.18181991577148 15.54545497894287 L 6.454545497894287 
                  15.54545497894287 L 6.454545497894287 2.818181753158569 L 19.18181991577148 2.818181753158569 L 
                  19.18181991577148 15.54545497894287 Z"></path>
              </svg>
              <div class="tmw-comment-count">` +
      count +
      `</div>
              <svg data-layer="7aa50cf5-5258-4e5e-8822-cf76ef80e349" preserveAspectRatio="none" 
              viewBox="2 2 23.1578369140625 22" class="tmw-icon tmw-favourite-icon">
                  <path d="M 25.15789413452148 10.38315773010254 L 16.8326301574707 9.665263175964355 L 
                  13.57894802093506 2 L 10.32526302337646 9.67684268951416 L 2 10.38315773010254 L 8.322105407714844 
                  15.85999965667725 L 6.423157691955566 24 L 13.57894802093506 19.68105316162109 L 20.7347354888916 24 
                  L 18.84736824035645 15.85999965667725 L 25.15789413452148 10.38315773010254 Z M 13.57894802093506 
                  17.51578903198242 L 9.225262641906738 20.14420890808105 L 10.38315773010254 15.18842029571533 L 
                  6.538947105407715 11.85368347167969 L 11.61052703857422 11.41368389129639 L 13.57894802093506 
                  6.747367858886719 L 15.55894756317139 11.42526245117188 L 20.63052558898926 11.86526298522949 L 
                  16.78631591796875 15.19999980926514 L 17.94421005249023 20.15578842163086 L 13.57894802093506 
                  17.51578903198242 Z"></path>
              </svg>
              <svg data-layer="c510364e-51cb-42c9-8ed7-791b53439e85" preserveAspectRatio="none" 
              viewBox="3 2.99750018119812 20 20" class="tmw-icon">
                  <path d="M 3 18.83141326904297 L 3 22.99750137329102 L 7.166088104248047 22.99750137329102 
                  L 19.45326995849609 10.71031665802002 L 15.28718185424805 6.544228553771973 L 3 18.83141326904297 
                  Z M 22.6750431060791 7.488542556762695 C 23.10831642150879 7.055269241333008 23.10831642150879 
                  6.355366706848145 22.6750431060791 5.922093391418457 L 20.07540512084961 3.322455167770386 C 
                  19.64213180541992 2.889181852340698 18.94222831726074 2.889181852340698 18.50895500183105 
                  3.322455167770386 L 16.47590446472168 5.35550594329834 L 20.64199256896973 9.521595001220703 
                  L 22.6750431060791 7.488543510437012 Z"></path>
              </svg>
              <svg data-layer="88c460d8-8934-4c4d-9894-7ba998c3a406" preserveAspectRatio="none" 
              viewBox="5 5 20 20" class="tmw-icon">
                  <path d="M 25 7.014285087585449 L 22.9857120513916 5 L 15 12.98571491241455 L 7.014285087585449 
                  5 L 5 7.014285087585449 L 12.98571491241455 15 L 5 22.9857120513916 L 7.014285087585449 25 L 15 
                  17.01428413391113 L 22.9857120513916 25 L 25 22.9857120513916 L 17.01428413391113 15 L 25 
                  7.014285087585449 Z"></path>
              </svg>
          </div>`;
    this.children[1].children[1].addEventListener("click", () => {
      if (this.count <= 0) return;
      this.count--;
      this.children[1].children[1].innerHTML = this.count;
      this.parentElement.updateStorage();
    });
    var favBtn = this.children[1].children[2];
    favBtn.addEventListener("click", () => {
      this.toggleFavourite();
    });
    var editBtn = this.children[1].children[3];
    editBtn.addEventListener("click", () => {
      new EditCommentModal(this.id, this.text);
    });
    var deleteBtn = this.children[1].children[4];
    deleteBtn.addEventListener("click", () => {
      new ConfirmModal(this.id);
    });
    if (favourite) this.toggleFavourite(true);
  }

  getHTMLElement() {
    return this;
  }

  toggleFavourite(load = false) {
    var favElement = this.children[1].children[2];
    if (this.favourite) {
      favElement.classList.remove("tmw-active-favourite-icon");
      favElement.children[0].setAttribute(
        "d",
        "M 25.15789413452148 10.38315773010254 L 16.8326301574707 " +
          "9.665263175964355 L 13.57894802093506 2 L 10.32526302337646 9.67684268951416 L 2 10.38315773010254 L " +
          "8.322105407714844 15.85999965667725 L 6.423157691955566 24 L 13.57894802093506 19.68105316162109 L " +
          "20.7347354888916 24 L 18.84736824035645 15.85999965667725 L 25.15789413452148 10.38315773010254 Z M " +
          "13.57894802093506 17.51578903198242 L 9.225262641906738 20.14420890808105 L 10.38315773010254 " +
          "15.18842029571533 L 6.538947105407715 11.85368347167969 L 11.61052703857422 11.41368389129639 L " +
          "13.57894802093506 6.747367858886719 L 15.55894756317139 11.42526245117188 L 20.63052558898926 " +
          "11.86526298522949 L 16.78631591796875 15.19999980926514 L 17.94421005249023 20.15578842163086 L " +
          "13.57894802093506 17.51578903198242 Z"
      );
      this.favourite = false;
    } else {
      favElement.classList.add("tmw-active-favourite-icon");
      favElement.children[0].setAttribute(
        "d",
        "M 13.57894515991211 19.68105506896973 L 20.7347354888916 " +
          "24.00000190734863 L 18.83579063415527 15.86000061035156 L 25.15789413452148 10.38315963745117 L " +
          "16.8326301574707 9.676843643188477 L 13.57894515991211 2 L 10.32526111602783 9.676843643188477 L " +
          "1.999999403953552 10.38315963745117 L 8.322103500366211 15.86000061035156 L 6.423157215118408 " +
          "24.00000190734863 L 13.57894515991211 19.68105506896973 Z"
      );
      this.favourite = true;
    }
    if (!load) this.parentElement.sortComments();
  }

  updateText(text) {
    this.text = text;
    this.children[0].innerHTML = text;
    this.parentElement.updateStorage();
  }

  toString() {
    return this.id;
  }

  toArray() {
    return [this.id, this.text, this.count, this.favourite];
  }

  getText() {
    return this.text;
  }
}

customElements.define("defined-comment", Comment);
