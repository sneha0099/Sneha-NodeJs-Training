import express from "express"

const router = express.Router();

let products = [
 { id: 1, name: 'Laptop', category: 'tech', price: 999 },
 { id: 2, name: 'Phone', category: 'tech', price: 499 },
 { id: 3, name: 'Desk', category: 'furniture', price: 299 },
 { id: 4, name: 'Chair', category: 'furniture', price: 199 },
];


router.get('/products',(req,res)=>{
    const {category, sort, page, limit} = req.query;

    let filteredProducts = [...products];

    if(category){
        filteredProducts = filteredProducts.filter(item => item.category===category);
    }
    

    if(sort){
        const [field, direction] = sort[0] === '-' ? [sort.slice(1), 'desc'] : [sort, 'asc'];
        filteredProducts = filteredProducts.sort((a,b)=>{
            if(direction==='desc'){
                return b[field] - a[field]
            }else if(direction==='asc'){
                return a[field] - b[field]
            }
        })
    }

    let paginatedProducts = filteredProducts

    if(page && limit){
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        paginatedProducts = filteredProducts.slice(startIndex,endIndex)
    
    }

    res.json({data: paginatedProducts, total: paginatedProducts.length, page,limit})
})

export default router;