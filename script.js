const addingbook = document.querySelector('.addingbook');
const container = document.querySelector('.container');
const bookholder = {
  title: 'Don Quixote',
  author: 'Miguel de Cervantes',
};

let bookcollection;

if (localStorage.getItem('links')) {
  bookcollection = JSON.parse(localStorage.getItem('links'));
} else {
  bookcollection = [{
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien',
    id: '1',
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    id: '2',
  },
  ];
}
// dynamically load the page

function bookArrangement(data) {
  const bookdetails = document.createElement('div');
  bookdetails.className = 'bookdetails';
  bookdetails.innerHTML = `<h1 class="booktitle">${data.title}</h1>

    <h3 class="author">${data.author}</h3>

    <button class="remove" type="submit" id="${data.id}" => Remove</button>
    
    <hr>`;
  container.append(bookdetails);
}

function bookremoval() {
  const remove = document.querySelectorAll('.remove');
  remove.forEach((btn) => {
    document.getElementById(btn.id).addEventListener('click', () => {
      const filtered = bookcollection.filter((elem) => elem.id !== btn.id);
      bookcollection = filtered;
      display();
      updatingstorage();
    });
  });
}

function display() {
  container.innerHTML = '';
  bookcollection.forEach((book) => {
    bookArrangement(book);
    bookremoval(book);
  });
}

// storing in localstorage
function updatingstorage() {
  localStorage.setItem('links', JSON.stringify(bookcollection));
}

display();

// adding books

const addbutton = document.querySelector('.btn');
addbutton.addEventListener('click', (event) => {
  event.preventDefault();
  const newBook = Object.create(bookholder);
  newBook.title = addingbook.elements.title.value;
  newBook.author = addingbook.elements.author.value;
  newBook.id = `${new Date().getTime()}`;
  bookcollection.push(newBook);
  bookArrangement(newBook);
  updatingstorage();
  bookremoval();
});
