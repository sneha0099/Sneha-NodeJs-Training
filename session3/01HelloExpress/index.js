import express from "express"

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("welcome to Express!")
})

app.get("/about",(req,res)=>{
    res.json({ name: 'My API', version: '1.0' })
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});
