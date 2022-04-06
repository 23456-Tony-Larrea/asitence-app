<template>

<div>
   
    
    <v-card class="mx auto mt-2 container " color="transparent"  elevation="1000"  >
    <v-btn class="mx2" fab dark color="#009688" @click="formNew()"><v-icon>mdi-plus</v-icon></v-btn> 
    <v-simple-table class="mat-5">
        <template v-slot:default>
            <thead>
                <tr class="blue darken-2">
                    <th class="">Codigo del producto </th>
                    <th class="white-text">Nombre del Producto</th>
                    <th class="white-text">Categoria</th>
                    <th class="white-text">Fabricante</th>
                    <th class="white-text">Precio</th>
                    <th class="white-text">Acciones</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="products in listProducts" :key="products.codProduct">
                <td>{{products.codProduct}}</td>
                <td>{{products.nameProduct}}</td>
                <td>{{products.category}}</td>
                <td>{{products.maker}}</td>
                <td>{{products.price}}</td>
                <td>
                    <v-btn fab dark small color="green" @click="formEdit(products.codProduct,products.nameProduct,products.category,products.maker,products.price)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn fab dark small color="red" @click="deleteProduct(products.codProduct)"><v-icon>mdi-delete</v-icon></v-btn>
                     </td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
    </v-card> 
      <v-dialog v-model="dialog" max-width="500">
    <v-card>
    <v-card-title class="purple darken-4 white--text">Productos</v-card-title>
    <v-card-text>
            <v-form action="">
<v-container>
                <v-row>
                    <input hidden v-model="products.codProduct">
                
                    <v-col cols="12" md="4">
                            <v-text-field v-model="products.nameProduct" label="Nombre" required >{{products.nameProduct}}</v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                            <v-text-field v-model="products.category" label="Categoria" required>{{products.category}}</v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                            <v-text-field v-model="products.maker" label="Fabricante" required>{{products.maker}}</v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                            <v-text-field v-model="products.price" label="Precio" required>{{products.price}}</v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            </v-form>
            </v-card-text>         
     <v-card-actions>  
         <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="saveProduct()">Guardar</v-btn>
            <v-btn color="red darken-1" type="submit" text @click="dialog = false">Cancelar</v-btn>
    </v-card-actions>         
            
    </v-card>

    </v-dialog>  
</div>
</template>
<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
export default {
   name: 'CrudProductsView',
 
  data(){
        return {
            products:{
                codProduct:null,
                nameProduct:'',
                category:'',
                maker:'',
                price:''
            },
            listProducts:[],
            dialog:false,
            operation:''
        }
    },
    created(){
        this.show();
    },
    methods:{
    show(){
        axios.get('http://localhost:3000/products').then(data=>{
            this.listProducts=data.data.products;
            console.log(data.data.products)
        });
    },
    create(){
        let params = {
            nameProduct:this.products.nameProduct,
            category:this.products.category,
            maker:this.products.maker,
            price:this.products.price
        }
        axios.post('http://localhost:3000/products',params).then(data=>{
            this.show();
            console.log(data)
        }); 
        this.products.nameProduct='';
        this.products.category='';
        this.products.maker='';
        this.products.price='';

    },
    edit(){
        let params = {
            nameProduct:this.products.nameProduct,
            category:this.products.category,
            maker:this.products.maker,
            price:this.products.price,
            codProduct:this.products.codProduct
        }
        axios.put('http://localhost:3000/products/'+this.products.codProduct,params).then(data=>{
            this.show();
            Swal.fire({
                position: 'center',
                icon: 'success',
                type: 'success',
                title: 'Producto editado correctamente',
                showConfirmButton: false,
                timer: 1500
              })
            console.log(data);
        });
        this.products.nameProduct='';
        this.products.category='';
        this.products.maker='';
        this.products.price='';
    },
    deleteProduct(codProduct){
        Swal.fire({        
            title: '¿Estas seguro?',
            icon: 'warning',
            text: "No podras revertir esto!",
            type: 'warning',
            confirmButtonText: 'Si, Eliminar!',
            showCancelButton: true,
       }).then(result=>{
           if((result.value)){
               axios.delete('http://localhost:3000/products/'+codProduct).then(data=>{
                   this.show();
                   console.log(data);
               });
           }else if(result.dismiss === 'cancel'){
               Swal.fire('Cancelado', 'El rol no fue eliminado', 'error');
           }
       });
    },
    saveProduct(){
        if(this.operation=='create'){
            this.create();
    }
        if(this.operation=='edit'){
            this.edit();
        }
        this.dialog=false;
    },
    formNew(){
        this.dialog=true;
        this.operation='create';
        this.operation.nameProduct='';
        this.operation.category='';
        this.operation.maker='';
        this.operation.price='';
    },
    formEdit(codProduct,nameProduct,category,maker,price){
        this.dialog=true;
        this.operation='edit';
        this.products.codProduct=codProduct;
        this.products.nameProduct=nameProduct;
        this.products.category=category;
        this.products.maker=maker;
        this.products.price=price;
    }
    }
}
</script>
<style scoped>
    
</style>