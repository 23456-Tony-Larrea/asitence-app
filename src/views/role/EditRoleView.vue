<template>
<div>
    <Navbar/>
    <div class="container">
<form action="" class="form-horizontal">
    <div class="form-group left">
        <label for="inputEmail3" class="col-sm-2 control-label">Nombre del Rol</label>
        <br>
        <br>
        
        <div class="col-sm-2">
            <input type="text" class="form-control" id="inputEmail3" placeholder="Nombre" v-model="form.nameRole">
        </div>
    </div>
    <br>
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-info" v-on:click="edit()">Editar</button>|
            <button type="button" class="btn btn-dark" v-on:click="exit()">Salir</button>|
            <button type="submit" class="btn btn-danger" v-on:click="deleteRole()">Eliminar</button>
        </div>
    </div>
</form>
</div>
</div>
</template>
<script>
import Navbar from '@/components/Header.vue';
import axios from 'axios';
export default{
    name:"EditRoleView",
    components:{
    Navbar
},
data:function(){
    return{
        id:null,
        form:{
            "id":"",
            "nameRole":""
        }
    }
},
mounted:function(){
    this.form.id=this.$route.params.id;
     axios.get('http://localhost:3000/roles/'+this.form.id)
    .then(data=>{
      this.form.nameRole=data.data.role.nameRole 
        
     });
},
methods:{
    edit:function(){
        this.form.id=this.$route.params.id;
        axios.put('http://localhost:3000/roles/'+this.form.id,this.form)
        .then(data=>{
            console.log(data)
            this.$toaster.success('el usuario se edito con exito.');
        });
    },
    exit:function(){
        this.$router.push('/dashboard');
    },
    deleteRole:function(){
        this.form.id=this.$route.params.id;
        axios.delete('http://localhost:3000/roles/'+this.form.id)
        .then(data=>{
            console.log(data)
            this.$toaster.success('el usuario se elimino con exito.');
            this.$router.push('/dashboard');
        });
    }
}
}
</script>
<style scoped>
.left{
text-align: left;
}
</style>