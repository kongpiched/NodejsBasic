const express = require('express')
const router = express.Router()
// เรียกใช้งานดมเดล
const Product = require('../models/products')
// อัพโหลดไฟล์
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")
    }
})

const upload = multer({
    storage:storage
})
router.get('/', (req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('index',{products:doc})
    })
})

// router.get('/', async (req,res) => {
//     try {
//         const products = await Product.find().exec(err,doc)=>{
//         res.render('index', { products })}
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error retrieving products');
//     }
// });

router.get('/addForm',(req,res)=>{
    res.render('form')
})

router.get('/manage',(req,res)=>{
    res.render('manage')
})

router.post('/insert',upload.single("image"), async (req,res)=>{
    console.log(req.file);
    const data = {
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        description: req.body.description
    };

    try {
        await Product.saveProduct(data);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error saving the product');
    }
});


module.exports = router