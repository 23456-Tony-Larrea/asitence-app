<template>
<v-app>
<v-card>
<v-card-title>
    Factura
    <v-spacer></v-spacer>
        <v-btn
    class="ma-2"
    color="success"
    @click="backInvoices"
    >
    Volver
    <template v-slot:loader>
      <span>Loading...</span>
              </template>     
          </v-btn>
    </v-card-title >      
        <v-col
          cols="8"
          sm="2"
        >
          <v-text-field
            label="Numero de Factura"
            prepend-icon="mdi-card-account-details"
            v-model="product.codInvoice"
            clearable
          ></v-text-field>

     </v-col>
        <v-col
            cols="8"
            sm="2"
            >
            <v-text-field
                label="Cliente"
                prepend-icon="mdi-account"
                v-model="product.client"
                clearable
            ></v-text-field>
        </v-col>
        
        <v-col
        cols="12"
        md="6"
      >
        <v-textarea
        class="right"
          name="input-7-1"
          label="Descripcion"
          hint="Hint text"
          prepend-icon="mdi-calendar-account"
          v-model="product.description"
        ></v-textarea>
      </v-col>
<v-col
            cols="8"
            sm="2"
            >
            <v-text-field
                label="Titulo"
                class="right3"
                prepend-icon="mdi-format-title"
                v-model="product.title"
                clearable
            ></v-text-field>
        </v-col>        

<v-col
 cols="12"
  sm="2"
  class="right2">
    <v-menu
      v-model="fromDateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          label="Fecha de Factura"
          prepend-icon="event"
          readonly
          :value="fromDateDisp"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        locale="en-in"
        :min="minDate"
        :max="maxDate"
        v-model="fromDate"
        no-title
        @input="fromDateMenu = false"
      ></v-date-picker>
    </v-menu>
  </v-col>  
 <v-card-title class="up">
   Productos
 </v-card-title>
  <v-spacer></v-spacer>
 <v-simple-table class="mat-5 up">
        <template v-slot:default>
            <thead>
                <tr class="blue darken-2">
                    <th class="white-text">Nombre del Producto</th>
                    <th class="white-text">Precio</th>
                    <th class="white-text">Cantidad</th>
                    <th class="white-text">Total</th>
                    <th class="white-text">Acciones</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(invoices,k) in invoices" :key="k">
                <td>
                  <v-col
                  sm="11"
                  ><v-text-field
                    label="Nombre del Producto"
                    prepend-icon="mdi-format-title"
                    v-model="invoices.productName"
                    clearable
                    ></v-text-field>
                    </v-col>
                </td>

                <td>
                  <v-col
                  sm="6"
                  ><v-text-field
                    label="Precio"
                    prepend-icon="mdi-currency-usd"
                    v-model="invoices.productPrice"
                    @change="calculateLineTotal(invoices)"
                    type="number"
                    clearable
                    ></v-text-field>
                    </v-col>
                </td>

                <td>
                  <v-col
                  sm="6"
                  ><v-text-field
                    label="Cantidad"
                    prepend-icon="mdi-format-list-bulleted"
                    clearable
                    type="number"
                    v-model="invoices.productQuantity" @change="calculateLineTotal(invoices)"

                    ></v-text-field>
                    </v-col>
                </td>
                <td>
                  <v-col
                  sm="8"
                  ><v-text-field
                    label="Total"
                    prepend-icon="mdi-currency-usd"
                    type="number"
                    clearable
                    disabled
                    v-model="invoices.total"
                    ></v-text-field>
                    </v-col>
                </td>
                <td>
                    <v-btn fab dark small color="red" @click="deleteProduct(product.codInvoice)"><v-icon>mdi-delete</v-icon></v-btn>
                     </td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
    <v-spacer></v-spacer>
    <v-btn
    class="ma-2 up2"
    color="success"
    @click="addProduct"
    >
    Agregar Producto
    <v-icon>mdi-plus</v-icon>
    <template v-slot:loader>
      <span>Loading...</span>
              </template>     
          </v-btn>
    <v-spacer></v-spacer>
    <div>
    <v-btn
    class="ma-2 up3"
    color="success"
    @click="createInvoicePdf"
    >
    Crear Factura
    <v-icon>mdi-file-pdf</v-icon>
    <template v-slot:loader>
      <span>Loading...</span>
              </template>     
          </v-btn>
    
    <v-btn
    class="ma-2 up3"
    color="error"
    @click="cancelInvoice"
    >
    Cancelar
    <v-icon>mdi-exit-to-app</v-icon>
    <template v-slot:loader>
      <span>Loading...</span>
              </template>     
          </v-btn>      

</div>
 </v-card>
 
</v-app>
</template>
<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import Swal from 'sweetalert2';
export default {
    name:'CreateInvoiceView',
    data(){
        return{
            fromDateMenu: false,
            fromDate: new Date(),
            minDate: new Date(),
            maxDate: new Date().setFullYear(new Date().getFullYear() + 1),
            products: [],
            product: {
                codInvoice: '',
                client: '',
                description: '',
                title: '',
                dateInvoice:'',
                           },
            invoices:[{   
                productName:'',
                productPrice:'',
                productQuantity:'',
                total:0
            }],
               
            }
                       
    },
    methods:{
        addProduct(){
             this.invoices.push({
                productName: '',
                productPrice: '',
                productQuantity: '',
                total:0
              
          })
           
        },
        calculateLineTotal(invoices){
            var total = parseFloat(invoices.productPrice)*parseFloat(invoices.productQuantity);
            if(!isNaN(total)){
              invoices.total=total.toFixed(2);  
            }
        },
        deleteProduct(index){
            this.invoices.splice(index,1)
        }, 
        backInvoices(){
            this.$router.push('/users')
        },
        
          cancelInvoice(){
            Swal.fire({
              icon: 'error'
              ,title: 'Cancelado'
              ,text: 'Factura Cancelada',
              showConfirmButton: false,
              footer:'<a href="/products">Regresar</a>'
            })
          },
             createInvoicePdf(){
            const pdf = new jsPDF();  
            pdf.autoTable({html: '#table'});
              
          var columns=[
            {title:'Nombre del Producto',dataKey:'productName'},
            {title:'Precio',dataKey:'productPrice'},
            {title:'Cantidad',dataKey:'productQuantity'},
            {title:'Total',dataKey:'total'},
          ];
          var rows=[];
          for(var i=0;i<this.invoices.length;i++){
            rows.push({
              productName:this.invoices[i].productName,
              productPrice:this.invoices[i].productPrice,
              productQuantity:this.invoices[i].productQuantity,
              total:this.invoices[i].total,
            });
          }
          pdf.autoTable(columns,rows,{
            theme:'grid',
            styles:{
              overflow:'linebreak',
              fontSize:12,
              cellPadding:2,
              valign:'middle',
              halign:'center',
              rowHeight:2,
              lineWidth:0.5,
              lineColor:'#000',
              fillColor:'#fff',
              textColor:'#000',
              fontStyle:'normal',
              
              fillStyle:'DF',
              columnWidth: 'wrap',
              columnStyles: {
                0: {columnWidth: 'auto'},
                1: {columnWidth: 'auto'},
                2: {columnWidth: 'auto'},
                3: {columnWidth: 'auto'},
              },
            },
            headerStyles:{
              fillColor:'#a2b9bc',
              textColor:'#fff',
              fontStyle:'bold',
              fontSize:8,
              halign:'center',
              valign:'middle',
              lineWidth:0.1,
              lineColor:'#000',
              fillStyle:'DF',
            },
            margin: {top:2,left:4,right:4,bottom:4},
            columnStyles:{
              0:{columnWidth:50},
              1:{columnWidth:50},
              2:{columnWidth:50},
              3:{columnWidth:50},
            },
            drawHeaderCell: function(cell, data) {
              if (data.column.dataKey === 'productName') {
                cell.styles.halign = 'left';
              }
            },
            drawCell: function(cell, data) {
              if (data.column.dataKey === 'productName') {
                cell.styles.halign = 'left';
              }
            },
          });
          pdf.text('Seleccion de productos',50,10,0);
          pdf.text('Codigo de la factura: '+this.product.codInvoice,0,80,0);
          pdf.text('Fecha de la factura: '+this.product.dateInvoice,100,90,0);
          pdf.text('Cliente: '+this.product.client,100,100,0);
          pdf.save('Factura.pdf');
          pdf.setLanguage('es');
          pdf.setFont('times');
        
         Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Factura generada',
  showConfirmButton: false,
  timer: 30000
})
          },   
        },
    computed:{
        fromDateDisp(){
            return this.fromDate.toLocaleDateString('es-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        },
        
    },
    created(){
        this.product.dateInvoice = this.fromDateDisp
    },

    mounted(){
    },
    
}
</script>
<style>
.right{  
    left: 38%;
    width: 300px;
    position: relative;
    bottom: 200px;
}
.right1{
    left: 300%;
    position: relative;
    bottom: 400px;
}
.right2{
    left: 50%;
    position: relative;
    bottom: 395px;
}
.right3{
    left: 334%;
    position: relative;
    bottom: 400px;
}
.up{
    bottom:400px;
    position: relative;
    left: 0%;
}
.up2{
    bottom:400px;
    position: relative;
    left: 0%;
}
.up3{
    bottom:400px;
    position: relative;
    left: 70%;
}
</style>