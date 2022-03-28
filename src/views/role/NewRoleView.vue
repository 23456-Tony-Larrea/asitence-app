<template>
<div>
<Navbar/>
<div>
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
            <button type="submit" class="btn btn-info" v-on:click="save()">Guardar</button>
            <button type="button" class="btn btn-dark" v-on:click="exit()">Salir</button>
           
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
    name:"NewRoleView",
    data: function() {
        return {
            form: {
                "id": "",
                "nameRole": ""
            }
        }
    },
components:{
    Navbar
},
methods:{
    save:function(){
        axios.post('http://localhost:3000/roles',this.form).then(data=>{
            console.log(data);
            this.$router.push('/roles');
        });
    },
    exit:function(){
        this.$router.push('/roleMain');
    }
}
}

</script>
<style scoped>
.left{
    text-align:left;
}
</style>