const Product= require('../models/Product');

const router = require('express').Router();

router.get('/',async (req, res,)=>{
    const products= await Product.findAll();
    res.json({products});
    });

router.get('/:id',async (req, res)=>{
    const {id}=req.params;
    const product=await Product.findByPk(id);
    if(!product){
        return res.status(404).send('Product not found');
    }
    res.json({product});
    }
);
router.post('/',async (req, res)=>{
    const {nameProduct, category,maker,price} = req.body;
    const product= await Product.create({nameProduct, category,maker,price});
    res.json(product);
});
router.put('/:id',async (req, res)=>{
    const {id}=req.params;
    const {nameProduct, category,maker,price}=req.body;
    const product=await Product.findByPk(id);
    if(!product){
        return res.status(404).send('Product not found');
    }
    const updatedProduct=await product.update({nameProduct, category,maker,price});
    res.json(updatedProduct);
});
router.delete('/:id',async(req, res)=>{
    const {id}=req.params;
    const product=await Product.findByPk(id);
    if(!product){
        return res.status(404).send('Product not found');
    }
    await product.destroy();
    res.json({msg:'Product deleted'});
});
module.exports=router;