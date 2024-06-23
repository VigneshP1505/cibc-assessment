const express=require("express");
const transactions=require("./transactions-route")
const seed=require("./seed-data-route")

const router=express.Router();

router.use("/transactions",transactions)
router.use("/seed",seed)


router.get("/health",(_,res)=>{
    return res.send("API is healthy!")
})

module.exports=router;