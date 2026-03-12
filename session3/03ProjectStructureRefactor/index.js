import express from "express"
import home from './routes/home.js'
import api from './routes/api.js'

const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/", (req,res)=>{
    res.send( 'Welcome to Express!')
})

app.use('/about', home);
app.use('/api', api)

app.listen(PORT, ()=>{
    console.log(`listening on the ${PORT}`)
})