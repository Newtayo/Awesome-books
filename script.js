const addBtn = document.querySelector('.add');
const todaysDate = document.querySelector('.date');
const cont = document.querySelector('.container');
const date = new Date();

function addExtenssion() {
  const day = date.getDate();
  let str = '';

  if (day === 1) {
    str = 'st';
  } else if (day === 2) {
    str = 'nd';
  } else if (day === 3) {
    str = 'rd';
  } else {
    str = 'th';
  }
  return str;
}

function getMonthName(monthNumber) {
  date.setMonth(monthNumber);
  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

const currentDate = `${getMonthName(date.getMonth())} ${date.getDate()}${addExtenssion()} ${date.getFullYear()} ${date.toLocaleString('en-US', {
  hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
})}`;

todaysDate.innerHTML = currentDate;

let books;
class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  savedBooks() {
    localStorage.setItem('books', JSON.stringify(books));
    return this;
  }

  addBooks() {
    const newTitle = document.querySelector('.new-title').value;
    const newAuthor = document.querySelector('.new-author').value;
    const id = `${new Date().getTime()}`;
    const book = new Books(newTitle, newAuthor, id);
    books.push(book);
    this.savedBooks();
    return this;
  }

  removeBooks(idToDelete) {
    books = books.filter((book) => {
      if (book.id === idToDelete) {
        return false;
      }
      return true;
    });
    this.savedBooks();
    return this;
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

const adminUser = new Books();

function render() {
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

const listBooks = document.getElementById('list-books');
const newData = document.querySelector('.new-data');
const link = document.getElementById('list');
const addbooklink = document.getElementById('addbook');
const addbookbutton = document.getElementById('addbooklink');
const heading = document.querySelector('.heading');
const contactlink = document.getElementById('contactlink');
const contact = document.getElementById('contact');
const contactdetail = document.querySelector('.contactdetail');

listBooks.addEventListener('click', () => {
  newData.classList.add('hide');

  link.classList.add('blue');
  heading.classList.remove('hide');
  cont.classList.remove('hide');

  addbooklink.classList.remove('blue');
  contact.classList.remove('blue');
  contactdetail.classList.add('hide');
});

addbookbutton.addEventListener('click', () => {
  heading.classList.add('hide');
  cont.classList.add('hide');
  addbooklink.classList.add('blue');
  newData.classList.remove('hide');
  link.classList.remove('blue');
  contact.classList.remove('blue');
  contactdetail.classList.add('hide');
});

contactlink.addEventListener('click', () => {
  heading.classList.add('hide');
  cont.classList.add('hide');
  contact.classList.add('blue');
  newData.classList.add('hide');
  link.classList.remove('blue');
  cont.classList.add('hide');
  contactdetail.classList.remove('hide');
  addbooklink.classList.remove('blue');
});