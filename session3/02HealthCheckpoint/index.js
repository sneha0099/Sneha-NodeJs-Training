import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = 3000;

app.use(express.json())

app.get("/health", (req,res)=>{
    res.json({ status: 'OK', 
        uptime: process.uptime(), 
        timestamp: new Date().toISOString()})
})

app.get("/info", (req,res)=>{
    res.json({ node: process.version, 
            platform: process.platform })
})

app.get("/env", (req,res)=>{
    res.json( { environment: process.env.NODE_ENV})
})


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})