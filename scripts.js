let submit = document.getElementById("submitComment");
let textbox = document.getElementById("textbox");
let dropdown = document.getElementById("dropdown");
let dropdownListContainer = document.getElementById("dropdownListContainer");
let modal = document.getElementById("myModal");
let create = document.getElementById("create");
let remove = document.getElementById("delete");
let submitInput = document.getElementById("nameInput");
let nameSubmit = document.getElementById("nameSubmit");
let dropdownList = document.getElementById("dropdownList");
let openChart = document.getElementById("openChart");
let chart = document.getElementById("chart");
let chartModal = document.getElementById("chartModal");

let editId = 0;

let commentCount = 0;

let page = "test";

window.onload = () => {
  let data = localStorage.getItem("data");

  if (!data) localStorage.setItem("data", JSON.stringify({}));
  else {
    let keys = Object.keys(data);
    loadPage(keys[keys.length - 2]);
  }

  loadCommentsFromStorage();

  loadNamesFromStorage();
};

/*
 * Add new item on submit button click
 */
submit.addEventListener("click", () => {
  addComment();
});

/**
 * Open the page name dropdown
 */
dropdown.addEventListener("click", () => {
  dropdownListContainer.style.display =
    dropdownListContainer.style.display == "flex" ? "none" : "flex";
});

/**
 * Submit a name for the page
 */
nameSubmit.onclick = () => {
  if (submitInput.value == "") return;

  addPage(submitInput.value);

  modal.style.display = "none";
};

/**
 * Check for a user removing a page
 */
remove.onclick = () => {
  dropdownListContainer.style.display = "none";

  removePage();
};

/**
 * Listener for the enter key to submit a comment
 */
document.addEventListener("keydown", (e) => {
  if (e.code !== "Enter") return;

  if (textbox == document.activeElement && e.shiftKey) return;

  if (textbox == document.activeElement) {
    e.preventDefault();

    addComment();
  }

  if (submitInput == document.activeElement && submitInput.value != "") {
    e.preventDefault();

    addPage(submitInput.value);

    modal.style.display = "none";
  }

  if (document.getElementById("editInput") == document.activeElement && 
    document.getElementById("editInput").value != "") {
    e.preventDefault();
    submitEdit();
  }
});

/**
 * Load all the names from storage into the dropaown menu
 */
function loadNamesFromStorage() {
  let data = JSON.parse(localStorage.getItem("data"));

  let keys = Object.keys(data);

  for (let i = 0; i < keys.length - 1; i += 2) {
    let pageName = keys[i].substring(0, keys[i].length - 12);

    addPage(pageName, true);
  }
}

/**
 * Remove the current page from the list of pages
 */
function removePage() {
  let data = JSON.parse(localStorage.getItem("data"));

  let keys = Object.keys(data);

  if (keys.length <= 2) return;

  for (let i = 0; i < keys.length - 1; i += 1) {
    if (dropdownList.children[i].textContent == page) {
      dropdownList.removeChild(dropdownList.children[i]);
      break;
    }
  }

  delete data[page + "comments𝕕𝕕"];
  delete data[page + "counts𝕕𝕕"];

  keys = Object.keys(data);

  page = keys[0].substring(0, keys[0].length - 12);

  localStorage.setItem("data", JSON.stringify(data));

  let height = dropdownList.style.height;

  dropdownList.style.height = height
    ? parseInt(height.substring(0, height.length - 2)) - 28 + "px"
    : "28px";

  loadPage(page);
}

/**
 * Add a new page
 * @param name the name of the new page
 * @param create if you are loading the comment from storage
 */
function addPage(name, loading = false) {
  dropdownList.appendChild;

  loadPage(name);

  modal.style.display = "none";

  if (
    Object.keys(JSON.parse(localStorage.getItem("data"))).includes(
      name + "comments𝕕𝕕"
    ) &&
    !loading
  )
    return;

  let data = JSON.parse(localStorage.getItem("data"));
  data[page + "comments𝕕𝕕"] = data[page + "comments𝕕𝕕"]
    ? data[page + "comments𝕕𝕕"]
    : [];
  data[page + "counts𝕕𝕕"] = data[page + "counts𝕕𝕕"]
    ? data[page + "counts𝕕𝕕"]
    : [];

  localStorage.setItem("data", JSON.stringify(data));

  let pageElement = document.createElement("p");
  pageElement.appendChild(document.createTextNode(name));
  pageElement.classList.add("pageNames");

  pageElement.onclick = () => {
    loadPage(name);

    dropdownListContainer.style.display = "none";
  };

  dropdownList.appendChild(pageElement);

  let height = dropdownList.style.height;

  dropdownList.style.height = height
    ? parseInt(height.substring(0, height.length - 2)) + 28 + "px"
    : "28px";
}

/**
 * Load a page onto the screen.
 * @param name the name of the page.
 */
function loadPage(name) {
  let currentComments = document.getElementById("currentComments");
  currentComments.innerHTML = "";

  submitInput.value = "";

  page = name;

  dropdown.textContent = name;

  loadCommentsFromStorage();
}

/**
 * Add a comment to the page
 * @param comment the comment to add to the page
 * @param count the number of times the comment has been copied
 * @param old if the comment has existed before
 * @param index the index of the element in the saved data
 */
function addComment(
  comment = textbox.value,
  count = 0,
  old = false,
  index = undefined
) {
  let commentDiv = document.getElementById("currentComments");

  if (comment == "") return;

  commentDiv.appendChild(createComment(comment, count, index));

  if (!old) addCommentToStorage(comment);

  textbox.value = "";

  textbox.focus();
}

/**
 * Add a comment to the list of data.
 * @param comment the comment to add to the list
 */
function addCommentToStorage(comment) {
  let data = JSON.parse(localStorage.getItem("data"));
  let comments = data[page + "comments𝕕𝕕"] ? data[page + "comments𝕕𝕕"] : [];
  let counts = data[page + "counts𝕕𝕕"] ? data[page + "counts𝕕𝕕"] : [];

  comments.push(comment);
  counts.push(0);

  data[page + "comments𝕕𝕕"] = comments;
  data[page + "counts𝕕𝕕"] = counts;

  localStorage.setItem("data", JSON.stringify(data));
}

/**
 * Remove a comment from storage
 * @param comment the comment to remove from the list
 */
function removeCommentFromStorage(element) {
  let index = element.id;

  let data = JSON.parse(localStorage.getItem("data"));
  let comments = data[page + "comments𝕕𝕕"] ? data[page + "comments𝕕𝕕"] : [];
  let counts = data[page + "counts𝕕𝕕"] ? data[page + "counts𝕕𝕕"] : [];

  comments[index] = undefined;
  counts[index] = undefined;

  data[page + "comments𝕕𝕕"] = comments;
  data[page + "counts𝕕𝕕"] = counts;

  localStorage.setItem("data", JSON.stringify(data));
}

/**
 *  Load the comments from the storage into the current page.
 */
function loadCommentsFromStorage() {
  let data = JSON.parse(localStorage.getItem("data"));
  let comments = data[page + "comments𝕕𝕕"] ? data[page + "comments𝕕𝕕"] : [];
  let counts = data[page + "counts𝕕𝕕"] ? data[page + "counts𝕕𝕕"] : [];

  for (let index in comments) {
    if (comments[index])
      addComment(comments[index], counts[index], true, index);
  }

  commentCount = comments.length;
}

/**
 * Copy text to the clipboard.
 * @param element the <p> element to copy the text from
 */
function copyToClipboard(element) {
  navigator.clipboard.writeText(element.textContent).then(
    () => {
      increaseCount(element);
    },
    (e) => {}
  );
}

/**
 * Increase the count of the comment.
 */
function increaseCount(element) {
  let count = element.parentNode.children[1];
  let number = parseInt(count.textContent);
  count.innerHTML = ++number;

  let data = JSON.parse(localStorage.getItem("data"));
  let counts = data[page + "counts𝕕𝕕"] ? data[page + "counts𝕕𝕕"] : [];

  counts[element.id] = number;

  data[page + "counts𝕕𝕕"] = counts;

  localStorage.setItem("data", JSON.stringify(data));
}

/**
 * Creates a comment component.
 * @returns the comment div
 */
function createComment(value, number, index) {
  let contDiv = document.createElement("div");

  let div = document.createElement("div");
  div.classList.add("commentContainer");

  let editDeleteDiv = document.createElement("div");
  editDeleteDiv.classList.add("editDeleteDiv");

  let dButton = document.createElement("p");
  dButton.appendChild(document.createTextNode(String.fromCharCode("10005")));
  dButton.classList.add("deleteX");
  dButton.addEventListener("click", () => {
    removeCommentFromStorage(dButton.parentNode.children[0]);
    let commentBox = dButton.parentNode.parentNode;
    commentBox.parentNode.removeChild(commentBox);
  });

  let editButton = document.createElement("p");
  editButton.appendChild(document.createTextNode(String.fromCharCode("9998")));
  editButton.classList.add("editBtn");
  editButton.addEventListener("click", () => {
    document.getElementById("editModal").style.display = "block";
    let editInput = document.getElementById("editInput")
    editId = editButton.parentNode.parentNode.children[0].id
    editInput.value = editButton.parentNode.parentNode.children[0].innerHTML
    editInput.focus();
  });
  editDeleteDiv.appendChild(editButton);
  editDeleteDiv.appendChild(dButton);

  let comment = document.createElement("p");
  comment.appendChild(document.createTextNode(value));
  comment.classList.add("comment");
  comment.id = index || commentCount++;

  let count = document.createElement("p");
  count.appendChild(document.createTextNode(number));
  count.classList.add("count");

  div.addEventListener("click", (event) => {
    comment = div.children[0];
    if (
      !event.target.classList.contains("editBtn") &&
      !event.target.classList.contains("deleteX")
    )
      copyToClipboard(comment);
  });

  div.appendChild(comment);
  div.appendChild(count);

  div.appendChild(editDeleteDiv);
  contDiv.appendChild(div);

  return contDiv;
}

/**
 * Open the modal
 */
create.onclick = () => {
  dropdownListContainer.style.display = "none";

  modal.style.display = "block";

  submitInput.focus();
};

/**
 * Close the modal
 */
window.addEventListener("click", function (event) {
  if (event.target == modal) modal.style.display = "none";
});

/**
 * Open the chart
 */
var myChart;
openChart.onclick = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  let comments = data[page + "comments𝕕𝕕"] ? data[page + "comments𝕕𝕕"] : [];
  let counts = data[page + "counts𝕕𝕕"] ? data[page + "counts𝕕𝕕"] : [];

  if (myChart) myChart.destroy();

  let final_comments = [];
  let final_counts = [];

  sortArrays(comments, counts);

  for (let i = 0; i < (comments.length > 6 ? 6 : comments.length); i++) {
    if (comments[i] != null) {
      final_comments.push(comments[i]);
      final_counts.push(counts[i]);
    }
  }

  myChart = new Chart(chart, {
    type: "bar",
    data: {
      labels: final_comments,
      datasets: [
        {
          data: final_counts,
          backgroundColor: [
            "#ff3333",
            "#ff4f4f",
            "#ff6e6e",
            "#ff9191",
            "#ffb0b0",
          ],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Graph of Common Issues for " + page,
      },
      legend: {
        display: true,
        position: "right",
      },
      tooltips: {
        callbacks: {
          title: (items, data) => {
            return data.labels[items[0].index].split(/\s|\n/g);
          },
        },
      },
      animation: {
        onComplete: function () {
          var chartInstance = this.chart;
          var ctx = chartInstance.ctx;
          ctx.textAlign = "center";
          ctx.overflow = "hidden";
          Chart.helpers.each(
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              Chart.helpers.each(
                meta.data.forEach(function (bar, index) {
                  final_comments[index]
                    .split(/\s|\n/g)
                    .forEach((element, i) => {
                      ctx.fillStyle = "white";
                      ctx.fillText(
                        element,
                        bar._model.x,
                        bar._model.y + i * 11 + 11
                      );
                    });
                }),
                this
              );
            }),
            this
          );
        },
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Number of Occurances",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
            },
          },
        ],
      },
    },
  });

  chartModal.style.display = "block";
};

/**
 * Close the chart
 */
window.addEventListener("click", function (event) {
  if (event.target == chartModal) {
    chartModal.style.display = "none";
  }
});

/**
 * Close the edit modal
 */
 window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("editModal")) {
    document.getElementById("editModal").style.display = "none";
  }
});

document.getElementById("editSubmit").addEventListener("click", function () {
  submitEdit();
});

/**
 * Submit the edit
 */
function submitEdit() {
  let value = document.getElementById("editInput").value
  if (value == "") return

  document.getElementById(editId).innerHTML = value

  let data = JSON.parse(localStorage.getItem("data"));
  data[page + "comments𝕕𝕕"][editId] = value
  localStorage.setItem("data", JSON.stringify(data));

  document.getElementById("editInput").value = ""
  document.getElementById("editModal").style.display = "none";
}


/**
 * Sort two arrays together based on a single one
 * @returns an array, where [0] is the first list and [1] is the second list.
 */
function sortArrays(array_1, array_2) {
  var list = [];
  for (var j = 0; j < array_1.length; j++)
    list.push({ a1: array_1[j], a2: array_2[j] });

  list.sort(function (a, b) {
    return a.a2 > b.a2 ? -1 : a.a2 == b.a2 ? 0 : 1;
  });

  for (var k = 0; k < list.length; k++) {
    array_1[k] = list[k].a1;
    array_2[k] = list[k].a2;
  }

  return [array_1, array_2];
}
