const express=require('express');
const cors=require('cors');
const app=express();
app.set('port',process.env.PORT||3000);
const users=require('./routes/users');
const roles=require('./routes/roles');
const products=require('./routes/products');
app.use(express.json());
app.use(cors());
//routes
app.use('/products',products);
app.use('/users',users);
app.use('/roles',roles);

app.listen(app.get('port'),()=>{
        console.log('listening on port',app.get('port'))
});