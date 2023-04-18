const express = require('express')
const cors = require("cors")
const PORT = process.env.PORT || 3333
const app = express()
app.use(express.json())
app.use(cors())
app.get("/docker",(req,res)=>{
    res.status(200).send("Endpoint docker rodando bunitão!!")
})
app.get("/",(req,res)=>{
    res.status(200).send("Rodando na maciota!!")
})
app.listen(PORT,()=>{
    console.log("rodando na 3000")
})
