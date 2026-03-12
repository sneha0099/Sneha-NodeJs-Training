import express from "express"

const router = express.Router();

function validateUser(body){
    const errors = []
    if(!body.name){
        errors.push('name is required')
    }else if(body.name.trim()===""){
        errors.push('name cannot be blank')
    }

    if(!body.email){
        errors.push("Email is required")
    }else if(!body.email.includes('@')){
        errors.push("Email is invalid")
    }

    return errors
}

router.get("/status", (req,res)=>{
    res.json({ ok: true })
})

router.post("/users", (req,res)=>{
    const ValidationErrors = validateUser(req.body)

    if(ValidationErrors.length>0){
        const firstError = ValidationErrors[0];
        const statusCode = 400

        if (firstError === 'name cannot be blank' || firstError === 'email is invalid') {
      statusCode = 422;
    }

    return res.status(statusCode).json({
        errror:{
            message: firstError,
            code: statusCode
        }

    })

}

    const user = {
        id: 1,
        name: req.body.name,
        email: req.body.email
    }

    return res.status(201).json({
        data:user
    });

})

export default router;