import express from "express"
import authors from "./Routes/authors.js"

const app = express()
const PORT = 3000;

app.use(express.json())

app.use("/api",authors )

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})