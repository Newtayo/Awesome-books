/* eslint-disable max-classes-per-file */
const addBtn = document.querySelector('.add');

let books;
class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
} else {
  const book1 = new Books('Oromay', 'Bealu Girma', 'id1');
  const book2 = new Books('Fikir Esike mekabir', 'Dr. Hadis Alemayehu', 'id2');
  const book3 = new Books('Dertogada', "Yisma'eke worku", 'id3');
  const book4 = new Books('Emegua', 'Dr. Alemayehu Wase', 'id4');
  books = [book1, book2, book3, book4];
}

function savedBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

class Admin {
  addBooks() {
    const newTitle = document.querySelector('.new-title').value;
    const newAuthor = document.querySelector('.new-author').value;
    const id = `${new Date().getTime()}`;
    const book = new Books(newTitle, newAuthor, id);
    books.push(book);
    savedBooks();
    return this;
  }

  removeBooks(idToDelete) {
    books = books.filter((book) => {
      if (book.id === idToDelete) {
        return false;
      }
      return true;
    });
    savedBooks();
    return this;
  }
}

const adminUser = new Admin();

function render() {
  const cont = document.querySelector('.container');
  cont.innerHTML = '';
  books.forEach((book) => {
    const elem = document.createElement('div');
    elem.className = 'book-cont';
    elem.innerHTML = `<p class="title">"${book.title}" </p>
    <p class="author">by ${book.author}</p>
    <button id=${book.id} class="remove">Remove</button>`;
    cont.appendChild(elem);

    const removeBtn = elem.querySelector('.remove');
    removeBtn.addEventListener('click', (e) => {
      const deleteButton = e.target;
      const idToDelete = deleteButton.id;
      adminUser.removeBooks(idToDelete);
      render();
    });
  });
}

render();

addBtn.addEventListener('click', () => {
  adminUser.addBooks();
  render();
});