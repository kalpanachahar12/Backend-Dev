import express from "express";
let router = express.Router();
import { deleteuser, usercreate, userupdate } from "../service/member.services.js";
import { createBook,bookupdate } from "../service/book.services.js";
import { createBorrowRecord,getBorrowRecords } from "../service/borrowrecord.services.js";
router.post("/member/create", async (req, res) => {
    const { name, membershipType } = req.body;
    const member = await usercreate(name, membershipType);
    res.json(member);
});
router.put("/member/update/:id", async (req, res) => {
    const { name, membershipType } = req.body;
    const member = await userupdate(req.params.id, name, membershipType);
    res.json(member);
});
router.delete("/member/delete/:id", async (req, res) => {
    const result = await deleteuser(req.params.id);
    res.json({ message: result });
});
router.post("/book/create", async (req, res) => {
    const { title, author, price } = req.body;
    const book = await createBook(title, author, price);
    res.json(book);
});
router.put("/book/update/:id", async (req, res) => {
    const { price } = req.body;
    const book = await bookupdate(req.params.id, price);
    res.json(book);
});
router.post("/borrow", async (req, res) => { 
    const result = await createBorrowRecord(req.body);
    res.json(result);
});
router.get("/borrow/all", async (req, res) => {
     console.log("req.body:", req.body); 
    const records = await getBorrowRecords();
    res.json(records);
});

export default router;