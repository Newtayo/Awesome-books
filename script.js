let books;
if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
} else {
  books = [{ title: 'Oromay', author: 'Bealu Girma', id: 'id1' },
    { title: 'Fikir Esike mekabir', author: 'Dr. Hadis Alemayehu', id: 'id2' },
    { title: 'Dertogada', author: "Yisma'eke worku", id: 'id3' },
    { title: 'Emegua', author: 'Dr. Alemayehu Wase', id: 'id4' }];
}

function savedBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBooks(idToDelete) {
  books = books.filter((book) => {
    if (book.id === idToDelete) {
      return false;
    }
    return true;
  });
  savedBooks();
}

function render() {
  const cont = document.querySelector('.container');
  cont.innerHTML = '';
  books.forEach((book) => {
    const elem = document.createElement('div');
    elem.className = 'book-cont';
    elem.innerHTML = `<p class="title">${book.title}</p>
    <p class="author">${book.author}</p>
    <button id=${book.id} class="remove">Remove</button>`;
    cont.appendChild(elem);

    const removeBtn = elem.querySelector('.remove');
    removeBtn.addEventListener('click', (e) => {
      const deleteButton = e.target;
      const idToDelete = deleteButton.id;
      removeBooks(idToDelete);
      render();
    });
  });
}

render();

function addBooks() {
  const newTitle = document.querySelector('.new-title').value;
  const newAuthor = document.querySelector('.new-author').value;
  const id = `${new Date().getTime()}`;
  books.push({ title: newTitle, author: newAuthor, id });
  render();
  savedBooks();
}

const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => {
  addBooks();
});
