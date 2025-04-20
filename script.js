


let books = [];

const addBookForm = document.getElementById("addBookForm");
const editBookForm = document.getElementById("editBookForm");
const searchQuery = document.getElementById("searchQuery");
const bookList = document.getElementById("bookList");
const searchResults = document.getElementById("searchResults");



addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const genre = document.getElementById("genre").value;

    const newBook = { title, author, year, genre };
    books.push(newBook);
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
    books.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = "${book.title} (${book.year}) - Genre: ${book.genre}";
        bookList.appendChild(li);
    });
}



function searchBooks()
{
    const query = searchQuery.value.toLowerCase();
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );

    searchResults.innerHTML = "";
    filteredBooks.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = '${book.title} by ${book.author} (${book.year}) - Genre: ${book.genre}';
        searchResults.appendChild(li);
    });
}



displayBooks();
