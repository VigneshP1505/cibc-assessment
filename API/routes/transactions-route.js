const express=require("express");
const { getTransactions,getTransactionDetails, updateComment } = require("../controllers/transactions-controllers");
const { validateTransactionDetails,validateGetTransactions } = require("./validators/transactions-validators");

const router=express();

router.get("/",validateGetTransactions,getTransactions)
router.get("/:id",validateTransactionDetails,getTransactionDetails)
router.post("/update",updateComment)

module.exports=router;