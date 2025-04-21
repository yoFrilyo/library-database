// script.js
// Owen Gallegos



class Book {
    constructor(title, author, year, genre)
    {
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;

        this.checkedOut = false;
    }

    getSummary()
    {
        return `${this.title} by ${this.author} (${this.year}) - Genre: ${this.genre}`;
    }
}

let bookArray = [];

const addBookForm = document.getElementById("addBookForm");
const editBookForm = document.getElementById("editBookForm");
const searchQuery = document.getElementById("searchQuery");
const bookList = document.getElementById("bookList");
const searchResults = document.getElementById("searchResults");
const modal = document.getElementById("bookModal");



addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const genre = document.getElementById("genre").value;

    const newBook = new Book(title, author, year, genre);
    bookArray.push(newBook);
    displayBooks();
    addBookForm.reset();
});



editBookForm.addEvenetListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("editTitle").value;
    const author = document.getElementById("editAuthor").value;
    const year = document.getElementById("editYear").value;
    const genre = document.getElementById("editGenre").value;

    const bookIndex = books.findIndex((book) => book.title === title);
    if (bookIndex > -1) {
        books[bookIndex] = { title, author, year, genre };
        displayBooks();
        editBookForm.reset();
    } else {
        alert("Book not found!");
    }
});



function displayBooks()
{
    bookList.innerHTML = "";
    bookArray.forEach((book, index) => {
        const li = document.createElement("li");
        li.textContent = book.getSummary();
        li.style.cursor = "pointer";
        li.addEventListener("click", () => handleBookClick(index));
        bookList.appendChild(li);
    });
}



function searchBooks()
{
    const query = searchQuery.value.toLowerCase();
    const filteredBooks = bookArray.filter((book) =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );

    searchResults.innerHTML = "";
    filteredBooks.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = book.getSummary();
        searchResults.appendChild(li);
    });
}



function handleBookClick(index)
{
    const book = bookArray[index];

    modalText.textContent = `What would you like to do with "${book.title}" by ${book.author}?`;
    modal.classList.remove("hidden");
}



displayBooks();