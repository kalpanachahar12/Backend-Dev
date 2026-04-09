import mongoose from "mongoose";

const borrowRecordSchema = new mongoose.Schema(
    {
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        book: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "book",
                required: true
            }
        ]
    },
    {
        timestamps: true
    }
);

const BorrowRecord =
    mongoose.models.BorrowRecord ||
    mongoose.model("BorrowRecord", borrowRecordSchema);

export default BorrowRecord;