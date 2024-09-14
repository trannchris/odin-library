const myLibrary = [];
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const closeButton = document.querySelector("dialog button");
const addButton = document.querySelector("#add-book");
const removeButton = document.querySelector(".remove");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);

  displayLibrary();
}

function displayLibrary() {
  let library = document.querySelector(".library");

  library.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const card = document.createElement("div");
    card.className = "book";

    card.innerHTML = `
            <button class="remove" onClick="removeBook(${i})">x</button>
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div>Page Count: ${book.pages}</div>
            <div>Read Status: <input type="checkbox" id="read" name="read" ${
              book.read ? "checked" : "unchecked"
            }></div>
            `;
    library.appendChild(card);
    dialog.close();
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);

  displayLibrary();
}

addButton.addEventListener("click", () => {
  dialog.showModal();
  form.reset();
});

closeButton.addEventListener("click", () => {
  form.reset();
  dialog.close();
});

form.addEventListener("submit", () => {
  const title_input = document.querySelector("#book-title").value;
  const author_input = document.querySelector("#book-author").value;
  const pages_input = document.querySelector("#book-pages").value;
  const read_input = document.querySelector("#book-status").checked;
  var pages = pages_input;

  if (title_input != "") {
    if (pages_input < 1 || pages_input == "") {
      pages = 0;
    }
    addBookToLibrary(title_input, author_input, pages, read_input);
  }
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, 1);
