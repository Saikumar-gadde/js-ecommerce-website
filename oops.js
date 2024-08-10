class Library{

    constructor(category, book){
        this.allBooks = [];
        this.category = category;
        this.book = book
    }


    pushBooks(books){
       return this.allBooks.push(...books)
    }


    searchBook(){
       const book =  this.allBooks.find((book) => book === this.book);

       return book  ? book : "Book is Not available"
    }

    categoryBooks(){

        const categoryWiseBooks = this.allBooks.filter((book) => book.category === this.category);


        return categoryWiseBooks

    }



}

const myLibrary = new Library("College", "Hindi");



const books = [
    {
        book: "Telugu",
        category: "School",

    },
    {
        book: "Hindi",
        category: "School"
    }, {
        book : "maths",
        category: "College"
    },

    {
        book : "Propability",
        category: "College"
    }
]



let allBooksData = myLibrary.pushBooks(books)


const category = myLibrary.categoryBooks()
