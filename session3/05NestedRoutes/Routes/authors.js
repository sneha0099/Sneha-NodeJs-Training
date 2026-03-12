import express from "express"

const router = express.Router()

let authors = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
let books = [
 { id: 1, title: 'Clean Code', authorId: 1 },
 { id: 2, title: 'Refactoring', authorId: 1 },
 { id: 3, title: 'SICP', authorId: 2 },
];
// 
router.get("/authors", (req,res)=>{
    res.json({authors})
})

router.get("/authors/:id", (req,res)=>{
    const {id} = req.params
    
    const author = authors.find(a => a.id === parseInt(id))
    res.json({author})
})

router.get("/authors/:id/books", (req,res)=>{
    const {id} = req.params
    
    const author = authors.find(a => a.id === parseInt(id))

    if(!author){
        return res.status(400).json({err: "author not found"});
    }

    const filteredBooks = books
        .filter(book => book.authorId === author.id)
        .map(book => book.title)

    res.json({filteredBooks})
})

router.post("/authors/:id/books", (req,res)=>{
    const {title} = req.body
    const {id} = req.params

    console.log(id);
    
    const author = authors.find((author) => author.id === parseInt(id))

    console.log(author);
    
    if(!author){
        return res.status(400).json({err: "author not found"})
    }

    const newbook = {id: books.length+1, title, authorId: parseInt(id)}

    books.push({...newbook})
    console.log(books);
    

    return res.status(201).json({data: newbook,books:books, message:"new book created"})
})

export default router