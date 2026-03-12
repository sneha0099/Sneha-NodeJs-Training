import express from "express"
import products from "./routes/product.js"
const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Helloww")
})

app.use("/api", products)
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
    
})