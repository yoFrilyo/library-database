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

    checkout()
    {
        if (this.checkedOut) {
            alert(`"${this.title}" is already checked out.`);
            return;
        }
        this.checkedOut = true;
    }

    edit()
    {
        document.getElementById("editTitle").value = this.title;
        document.getElementById("editAuthor").value = this.author;
        document.getElementById("editYear").value = this.year;
        document.getElementById("editGenre").value = this.genre;

        editModalOverlay.style.display = "flex";
    }
}

let bookArray = [];
let selectedBookIndex = null;
let currentPrompt = null;

const addBookForm = document.getElementById("addBookForm");
const editBookForm = document.getElementById("editBookForm");
const editModalOverlay = document.getElementById("editModalOverlay");
const searchQuery = document.getElementById("searchQuery");
const bookList = document.getElementById("bookList");
const searchResults = document.getElementById("searchResults");
const prompt = document.getElementById("promptMenu");



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



// editBookForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const title = document.getElementById("editTitle").value;
//     const author = document.getElementById("editAuthor").value;
//     const year = document.getElementById("editYear").value;
//     const genre = document.getElementById("editGenre").value;

//     const bookIndex = bookArray.findIndex((book) => book.title === title);
//     if (bookIndex > -1) {
//         bookArray[bookIndex] = { title, author, year, genre };
//         displayBooks();
//         editBookForm.reset();
//     } else {
//         alert("Book not found!");
//     }
// });



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
    //selectedBookIndex = index;

    // prompt.style.display = "block";

    // document.onclick = function (e) {
    //     if (e.target.tagName === "LI") {
    //         prompt.style.left = `${e.pageX}px`;
    //         prompt.style.top = `${e.pageY}px`;
    //     }
    // };

    selectedBookIndex = index;
    const promptMenu = document.getElementById("promptMenu")
    const bookItems = bookList.querySelectorAll("li");

    if (currentPrompt && currentPrompt.parentNode) {
        curentPrompt.remove();
    }

    const newPrompt = promptMenu.cloneNode(true);
    newPrompt.style.display = "block";
    currentPrompt = newPrompt

    const clickedItem = bookItems[index];
    clickedItem.after(newPrompt);

    newPrompt.innerHTML =
        `<button onclick="handlePromptAction('checkout')">Checkout</button>` +
        `<button onclick="handlePromptAction('edit')">Edit</button>` +
        `<button onclick="handlePromptAction('delete')">Delete</button>` +
        `<button onclick="handlePromptAction('cancel')">Cancel</button>`;
}

function hidePrompt() {
    prompt.style.display = "none";
}


function handlePromptAction(action) {
    const book = bookArray[selectedBookIndex];
    if (!book) return;

    switch (action) {
        case "checkout":
            book.checkout();
            break;
        case "edit":
            book.edit();
            break;
        case "delete":
            if (confirm(`Delete "${book.title}"?`)) {
                bookArray.splice(selectedBookIndex, 1);
            }
            break;
        case "cancel":
        default:
            break;
    }

    hidePrompt();
    displayBooks();
}



editBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("editTitle").value;
    const author = document.getElementById("editAuthor").value;
    const year = document.getElementById("editYear").value;
    const genre = document.getElementById("editGenre").value;

    if (selectedBookIndex == null) {
        return;
    }
    
    bookArray[selectedBookIndex].title = title;
    bookArray[selectedBookIndex].author = author;
    bookArray[selectedBookIndex].year = year;
    bookArray[selectedBookIndex].genre = genre;

    editModalOverlay.style.display = "none";
    displayBooks();
});



closeEditModal()
{
    editModalOverlay.style.display = "none";
    displayBooks();
}


displayBooks();
