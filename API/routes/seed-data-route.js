const express=require("express");
const { insertData } = require("../controllers/seed-data-controller");

const router=express();

router.get("/insert-seed",insertData)

module.exports=router;