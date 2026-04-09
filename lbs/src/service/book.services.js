import Book from "../model/book.schema.js";

export async function createBook(title,author,price) {
    try {
        const book = new Book({
            title,
            author,
            price
        });
        await book.save();
        return book;
    } catch (error) {
        console.log("book create error:", error);
        return null;
    }
}

export async function bookupdate(book_id, price) {
    try {
        const book = await Book.findByIdAndUpdate(
            book_id,
            { price},
            { new: true }
        );
        if (!book) {
            return "not found";
        }
        return book;
    } catch (error) {
        console.log("book update error:", error);
        return null;
    }
}