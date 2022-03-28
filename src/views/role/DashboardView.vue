<template>
    
    <div class="container">
    <Navbar/>
     <div class="container">
    <button class="btn btn-success" type="button" v-on:click="newRole()">Nuevo Rol</button>
    </div>
   
    <div>
       <table class="table table-hover" >
  <thead>
    <tr>
    <th scope="col">ID</th>
      <th scope="col">Nombre de roles</th>
      </tr>
  </thead>
  
  <tbody>
    <tr v-for="roles in listRoles" :key="roles.id" v-on:click="edit(roles.id)">
    <th scope="row">{{roles.id}}</th>
      <td>{{roles.nameRole}}</td>
        <td>
        </td>
       </tr>
    </tbody>
</table>
    </div>
    </div>
</template>
<script>
import Navbar from '@/components/Header.vue'
import axios from 'axios';
export default {
    name:"DashboardView",
    data(){
        return{
        listRoles:null
        }
     },
    components:{
        Navbar
    },
    methods:{
        newRole(){
            this.$router.push('/newRole')
        },
        edit(id){
            this.$router.push('/edit/'+id)
          
        }
    },
    mounted:function() {
        let url="http://localhost:3000/roles";
        axios.get(url).then(data=>{
           this.listRoles = data.data;
            console.log(data)
        });

    }
}
</script>
<style scoped>
</style>