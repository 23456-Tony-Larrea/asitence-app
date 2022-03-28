const Role = require('../models/Role');

const router = require('express').Router();
router.get('/',async (req,res)=>{
    try{
        const roles = await Role.findAll();
        res.json(roles);
    }catch(err){
        res.json({message:err});
    }
});
router.get('/:id',async (req,res)=>{
    const {id}=req.params;
    const role=await Role.findByPk(id);
    if(!role){
        res.status(404).json({message:'Role not found'});
    }
    res.json({role});
});
router.post('/',async (req,res)=>{
    const {nameRole}=req.body;
    if(nameRole.length<0){
    return res.status(400).json({message:'Name is required'});
    }
    const role=await Role.create({nameRole}); 
    return res.json({role});
});
router.put('/:id',async (req,res)=>{
    const {id}=req.params;
    const {nameRole}=req.body;
    const role=await Role.findByPk(id);
    if(!role){
        res.status(404).json({message:'Role not found'});
    }
    const updatedRole=await role.update({nameRole});
    res.json(updatedRole);
});
router.delete('/:id',async (req,res)=>{
 const {id}=req.params;
 const role=await Role.findByPk(id);
 if(!role){
     res.status(404).json({message:'Role not found'});
 }
 await role.destroy();
 res.json({message:'Role deleted'});
});   
module.exports = router;