<template>

<div>
    <div class="container">
        <Navbar/>
    </div>
    <v-card class="mx auto mt-2 container" color="transparent"  elevation="1000">
        <v-btn class="mx2" fab dark color="#009688" @click="formNew()"><v-icon>mdi-plus</v-icon></v-btn>    
   <v-simple-table class="mat-5">
        <template v-slot:default>
            <thead>
                <tr class="blue darken-2">
                    <th class="white-text">ID</th>
                    <th class="white-text">Nombres del usuario</th>
                    <th class="white-text">Apellidos del usuario</th>
                    <th class="white-text">email</th>                 
                    <th class="white-text">Rol</th>
                    <th class="white-text">Acciones</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="users in listUsers" :key="users.id">
                <td>{{users.id}}</td>
                <td>{{users.firstName}}</td>
                <td>{{users.lastName}}</td>
                <td>{{users.email}}</td>

                <td>{{users.RoleId}}</td>
                <td>
                    <v-btn fab dark small color="green" @click="formEdit(users.id,users.firstName,users.lastName,users.email,users.password,users.RoleId)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn fab dark small color="red" @click="deleteUser(users.id)"><v-icon>mdi-delete</v-icon></v-btn>
                     </td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
    </v-card> 
      <v-dialog v-model="dialog" max-width="500">
    <v-card>
    <v-card-title class="purple darken-4 white--text">Usuarios</v-card-title>
    <v-card-text>
            <v-form action="">
<v-container>
                <v-row>
                    <input hidden v-model="users.id">
                
                    <v-col cols="12" md="4">
                            <v-text-field v-model="users.firstName" label="Nombres" required >{{users.firstName}}</v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                            <v-text-field v-model="users.lastName" label="Apellidos" required >{{users.lastName}}</v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                            <v-text-field v-model="users.email" label="Email" required >{{users.email}}</v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                            <v-text-field v-model="users.password" label="Contraseña" required >{{users.password}}</v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                            <v-text-field v-model="users.RoleId" label="Rol" required>{{users.RoleId}}</v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            </v-form>
            </v-card-text>         
     <v-card-actions>  
         <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="saveUser()">Guardar</v-btn>
            <v-btn color="red darken-1" type="submit" text @click="dialog = false">Cancelar</v-btn>
    </v-card-actions>         
            
    </v-card>

    </v-dialog>  
</div>
</template>
<script>
    import Navbar from '@/components/Header.vue';
    import axios from 'axios';
    import Swal from 'sweetalert2';
export default {
   name: 'CrudUsersView',
  components: {
      Navbar
  },
  data(){
        return {
            users:{
                id:null,
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                RoleId:''
            },
            listUsers:[],
            dialog:false,
            operation:''
        }
    },
    created(){
        this.show();
    },
    methods:{
    show(){
        axios.get('http://localhost:3000/users').then(data=>{
            this.listUsers=data.data.users;
            console.log(data.data.users)
        });
    },
    create(){
        let params = {
            firstName:this.users.firstName,
            lastName:this.users.lastName,
            email:this.users.email,
            password:this.users.password,
            RoleId:this.users.RoleId
        }
        axios.post('http://localhost:3000/users/register',params).then(data=>{
            this.show();
            console.log(data)
        }); 
        this.users.firstName='';
        this.users.lastName='';
        this.users.email='';
        this.users.password='';
        this.users.RoleId='';

    },
    edit(){
        let params = {
           id:this.users.id,
           firstName:this.users.firstName,
            lastName:this.users.lastName,
            email:this.users.email,
            password:this.users.password,
            RoleId:this.users.RoleId
            }
        axios.put('http://localhost:3000/users/'+this.users.id,params).then(data=>{
            this.show();
            Swal.fire({
                position: 'center',
                icon: 'success',
                type: 'success',
                title: 'Usuario editado correctamente',
                showConfirmButton: false,
                timer: 1500
              })
            console.log(data);
        });
        this.users.firstName='';
        this.users.lastName='';
        this.users.email='';
        this.users.password='';
        this.users.RoleId='';
},
    deleteUser(id){
        Swal.fire({        
            title: '¿Estas seguro?',
            icon: 'warning',
            text: "No podras revertir esto!",
            type: 'warning',
            confirmButtonText: 'Si, Eliminar!',
            showCancelButton: true,
       }).then(result=>{
           if((result.value)){
               axios.delete('http://localhost:3000/users/'+id).then(data=>{
                   this.show();
                   console.log(data);
               });
           }else if(result.dismiss === 'cancel'){
               Swal.fire('Cancelado', 'El rol no fue eliminado', 'error');
           }
       });
    },
    saveUser(){
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
        this.operation.firstName='';
        this.operation.lastName='';
        this.operation.email='';
        this.operation.password='';
        this.operation.RoleId='';
    },
    formEdit(id,firstName,lastName,email,password,RoleId){
        this.dialog=true;
        this.operation='edit';
        this.users.id=id;
        this.users.firstName=firstName;
        this.users.lastName=lastName;
        this.users.email=email;
        this.users.password=password;
        this.users.RoleId=RoleId;
    }
    }
}
</script>
<style scoped>
</style>