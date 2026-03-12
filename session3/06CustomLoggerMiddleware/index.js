import express from "express"

const app = express()
const PORT = 3000;

app.use(express.json())

const requestLogger = (req,res,next) => {
    const start = Date.now()
    const ts = new Date(start).toISOString();
    const method = req.method;
    const url = req.originalUrl;

    res.on("finish",()=>{
        const ms = Date.now() - start;
        const status = res.statusCode;
        console.log(`[${ts}] ${method} ${url} ${status} ${ms}ms`);
    })

    next();
}

app.use(requestLogger);

app.get('/api/products', (req, res) => {
    console.log("ressss");
    
    res.status(200).send('Products');
    console.log("ressss2");
});

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})

