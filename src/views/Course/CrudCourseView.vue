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
                    <th class="white-text">Curso</th>
                    <th class="white-text">Acciones</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="courses in listCourses" :key="courses.id">
                <td>{{courses.id}}</td>
                <td>{{courses.courseParallelName}}</td>
                <td>
                    <v-btn fab dark small color="green" @click="formEdit(courses.id,
                    courses.courseParallelName)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn fab dark small color="red" @click="deleteCourse(courses.id)"><v-icon>mdi-delete</v-icon></v-btn>
                     </td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
    </v-card> 
      <v-dialog v-model="dialog" max-width="500">
    <v-card>
    <v-card-title class="purple darken-4 white--text">Cursos</v-card-title>
    <v-card-text>
            <v-form action="">
<v-container>
                <v-row>
                    <input hidden v-model="courses.id">
                
                    <v-col cols="12" md="4">
                            <v-text-field v-model="courses.courseParallelName" label="Curso" required>{{courses.courseParallelName}}</v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            </v-form>
            </v-card-text>         
     <v-card-actions>  
         <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="saveCourse()">Guardar</v-btn>
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
   name: 'CrudCourseView',
  components: {
      Navbar
  },
  data(){
        return {
            courses:{
                id:null,
                courseParallelName:''
            },
            listCourses:[],
            dialog:false,
            operation:''
        }
    },
    created(){
        this.show();
    },
    methods:{
    show(){
        axios.get('http://localhost:3000/courses').then(data=>{
            this.listCourses=data.data;
            console.log(data.data)
        });
    },
    create(){
        let params = {
            courseParallelName:this.courses.courseParallelName
        }
        axios.post('http://localhost:3000/courses',params).then(data=>{
            this.show();
            console.log(data)
        }); 
        this.courses.courseParallelName='';
    },
    edit(){
        let params = {
            courseParallelName:this.courses.courseParallelName,
            id:this.courses.id
        }
        axios.put('http://localhost:3000/courses/'+this.courses.id,params).then(data=>{
            this.show();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                type: 'success',
                title: 'Rol editado correctamente',
                showConfirmButton: false,
                timer: 1500
              })
            console.log(data);
        });
        this.courses.courseParallelName='';
    },
    deleteCourse(id){
        Swal.fire({        
            title: '¿Estas seguro?',
            icon: 'warning',
            text: "No podras revertir esto!",
            type: 'warning',
            confirmButtonText: 'Si, Eliminar!',
            showCancelButton: true,
       }).then(result=>{
           if((result.value)){
               axios.delete('http://localhost:3000/courses/'+id).then(data=>{
                   this.show();
                   console.log(data);
               });
           }else if(result.dismiss === 'cancel'){
               Swal.fire('Cancelado', 'El curso no fue eliminado', 'error');
           }
       });
    },
    saveCourse(){
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
        this.operation.courseParallelName='';  
    },
    formEdit(id,courseParallelName){
        this.dialog=true;
        this.operation='edit';
        this.courses.id=id;
        this.courses.courseParallelName=courseParallelName;
    }
    }
}
</script>
<style scoped>
</style>