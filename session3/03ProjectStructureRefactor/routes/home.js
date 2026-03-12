import express from  "express"

const router = express.Router();

router.get("/", (req,res)=>{
    res.json({ name: 'My API', version: '1.0' })
})

export default router