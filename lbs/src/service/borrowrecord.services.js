import BorrowRecord from "../model/borrowrecord.schema.js";
import Book from "../model/book.schema.js";
import User from "../model/member.schema.js";

async function createBorrowRecord(body) {
    try {
        const user = await User.findById(body.memberId);
        if (!user) return { message: "Member not found" };

        const book = await Book.find({ _id: { $in: body.bookIds } });
        if (book.length === 0) return { message: "No valid books found" };

        const record = new BorrowRecord({
            member: body.memberId,
            book: body.bookIds
        });
        await record.save();

        

        const totalValue = book.reduce((sum, b) => sum + b.price, 0);

        
        const baseFine = totalValue * 0.10;
        const discountRate = user.membershipType === "gold" ? 0.15 : 0.05;
        const finalFine = baseFine - (baseFine * discountRate);

        console.log("\n===== BORROWING SUMMARY =====");
        console.log(`User: ${user.name} (${user.membershipType})`);
        console.log("Books Borrowed:");
        book.forEach((b, i) => console.log(`  ${i + 1}. ${b.title} by ${b.author} - Rs.${b.price}`));
        console.log(`Total Book Value: Rs.${totalValue}`);
        console.log(`Late Fine (10%): Rs.${baseFine}`);
        console.log(`Discount (${discountRate * 100}%): -Rs.${(baseFine * discountRate).toFixed(2)}`);
        console.log(`Final Fine: Rs.${finalFine.toFixed(2)}`);
        console.log("==============================\n");

        return { record, totalValue, finalFine };

    } catch (error) {
        console.log(error);
    }
}

async function getBorrowRecords() {
    try {
        const data = await BorrowRecord
            .find()
            .populate("member")
            .populate("book");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { createBorrowRecord, getBorrowRecords };