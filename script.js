let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read)
  myLibrary.push(book);

  render();
};

// add new book to library 
const table = document.querySelector('.table');

function render() {

  let book = myLibrary[myLibrary.length - 1]
  table.innerHTML += `<tr>
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.pages}</td>
  <td class="readStatus">${book.read}</td>
  <td><input id=${myLibrary.length} type="button" value="Delete" class="delete"></td>
  </tr>`

}

// check for localStorage
// if (localStorage.getItem('myLibrary') !== null) {
//   myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

//   for (let i = 0; i < myLibrary.length; i++) {
//     let book = myLibrary[i]
//     table.innerHTML += `<tr>
//   <td>${book.title}</td>
//   <td>${book.author}</td>
//   <td>${book.pages}</td>
//   <td class="readStatus">${book.read}</td>
//   <td><input id=${myLibrary.length} type="button" value="Delete" class="delete"></td>
//   </tr>`
//   }

// } else {
//   // add dummy books
//   addBookToLibrary('11/22/63', 'Stephen King', '777', 'Read');
//   addBookToLibrary('The Road', 'Cormac McCarthy', '162', 'Read');
//   addBookToLibrary('The Bell Jar', 'Sylvia Path', '232', 'Not-read');

// }

// add dummy books
  addBookToLibrary('11/22/63', 'Stephen King', '777', 'Read');
  addBookToLibrary('The Road', 'Cormac McCarthy', '162', 'Read');
  addBookToLibrary('The Bell Jar', 'Sylvia Path', '232', 'Not-read');

// show form to add book //
function openForm() {
  document.getElementById("form").style.display = "block";
}

// clear and close 'add book' form //
function closeForm() {
  document.getElementById("author").value = "";
  document.getElementById("title").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
  document.getElementById("notRead").checked = true;
  document.getElementById("form").style.display = "none";
}

// page loads to closed form
closeForm();

// add book with information from form // 
let submit = document.getElementById("submit");

submit.addEventListener('click', function () {

  let author = document.getElementById("author").value;
  let title = document.getElementById("title").value;
  let pages = document.getElementById("pages").value;
  let read = '';

  if (document.getElementById("read").checked) {
    read = 'Read';
  } else {
    read = 'Not-read'
  };

  addBookToLibrary(title, author, pages, read);

  // resets form 
  document.getElementById("author").value = "";
  document.getElementById("title").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
  document.getElementById("notRead").checked = true;

  // delete button handling
  let deleteButtons = Array.from(document.getElementsByClassName('delete'));

  deleteButtons.forEach(function (elem) {
    elem.addEventListener('click', function () {
      deleteBook(elem.id);
    });
  });

  // change read status
  let readStatus = Array.from(document.getElementsByClassName('readStatus'));
  readStatus.forEach(function (elem) {
    elem.addEventListener('click', function () {
      if (elem.innerHTML == "Read") {
        elem.innerHTML = "Not-read"
      } else {
        elem.innerHTML = "Read"
      };
    });
  });

  // update localStorage

  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

});

// add event listener to close button
let closeButton = document.getElementById("close");
closeButton.addEventListener('click', function () {
  closeForm();
});


// delete book based on row
function deleteBook(row) {

  let parent = document.getElementById('table').getElementsByTagName('tbody')[row];
  let child = parent.getElementsByTagName('tr')[0];

  parent.removeChild(child);
};

// create array of delete buttons GLOBAL
let deleteButtons = Array.from(document.getElementsByClassName('delete'));

// give functionality to each delete button GLOBAL
deleteButtons.forEach(function (elem) {
  elem.addEventListener('click', function () {
    deleteBook(elem.id);
  });
});

// change read status GLOBAL
let readStatus = Array.from(document.getElementsByClassName('readStatus'));
readStatus.forEach(function (elem) {
  elem.addEventListener('click', function () {
    if (elem.innerHTML == "Read") {
      elem.innerHTML = "Not-read"
    } else {
      elem.innerHTML = "Read"
    };
  });
});