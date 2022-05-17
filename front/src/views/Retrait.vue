<template>
   <v-container>
    <div style="text-align: center; padding:18px 0; display: flex" >
   <router-link to="/dashboard" class="routerLink">
      <div class="text-center">
      <div>
        <v-btn
        class="ma-2"
        color="blue"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Retour
      </v-btn>
      </div>
   </div>
   </router-link>
   
        <h1>Retrait</h1>
    </div>    
    <!-- title -->
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window>
            <!--  -->
            <v-window-item>
              <v-row>
                <v-col cols="12" sm="6" class="blue rounded-br-x1">
                  <div style="text-align: center; padding:180px 0;">
                    <v-card-text class="white--text">
                      <h1 class="text-center">Information</h1>
                      <h3 class="text-center">
                         Montant Net du compte: <br/>
                         <strong style="background-color: green ">  {{ total }}Frs </strong>
                      </h3> 
                    </v-card-text>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Transaction</h4>
                    <h6 class="text-center grey--text">
                      Entrer  un montant negative et une decription<br>
                      votre transaction sans echec
                    </h6>
                    <v-row align="center" justify="center">
                    <div >
                      <v-col cols="12" sm="8">
                        <v-text-field label="Description" v-model="text" outlined dense color="blue" autocomplete="false"></v-text-field>
                        <v-text-field label="montant" v-model="amount" outlined dense color="blue" type="number"></v-text-field>
                        <v-text-field label="date" v-model="createdAt" outlined dense color="blue" type="date"></v-text-field>
                        <v-bottom-sheet 
                        color="blue" dark block tile 
                        
                        v-model="sheet"
                        inset
                        >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                color="blue"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                :disabled="isDisabled"
                                @click.prevent = "addVal"
                              >
                                Effectuer
                              </v-btn>
                            </template>
                            <v-sheet
                              class="text-center"
                              height="200px"
                            >
                            <router-link to="/dashboard" class="routerLink">
                              <v-btn
                                class="mt-6"
                                text
                                color="error"
                                @click="clearField"
                              >
                                close
                              </v-btn>
                            </router-link>
                              <div class="my-3">
                                <h1 style="color:green">retire avec success</h1>
                                <p>Merci pour la confiance</p>
                              </div>
                            </v-sheet>
                        </v-bottom-sheet>
                      </v-col>
                      </div>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

    export default {
        name: "Depot",
        data(){
            return{
                text: "",
                amount: null,
                createdAt: null,
                incomes: [],
                total: null,
                sheet: false,
                isDisabled: true,
                message: ""
            }
        },
        watch:{
            amount(newAmount, oldAmount){
                if(newAmount < 0 && newAmount !== null ){
                    if(Math.abs(newAmount) < this.total ){
                        return this.isDisabled = false
                    }else{
                        return this.isDisabled = true
                    }
                }else{
                    return this.isDisabled = true
                    //this.addVal()
                }
            }
        },
        //voire toutes les transactions deja effectue
        created(){
            this.currentUser()
        },
        //permet 
        computed:{
            sortedIcome(){
                let temp = []

                temp = this.incomes.sort((a, b) =>{
                    return b.createdAt - a.createdAt
                })
                return temp
            }
        },

        // check if the value is empty \\ok
        // push those information inside an array
        // loop all the amount of those objects in my array
        methods:{
            clearField(){
            this.minute = ""
            this.hours = ""
            this.sheet = !this.sheet
            },
            
            formatedDate (x){
                let date = new Date(x)
                let day = date.getDate()
                let month = date.getMonth()
                let year = date.getFullYear()
                return day + "/" + month + "/" + year
            },

            //communication avec la BD 
            async addVal(){
                try {
                    const res = await fetch('http://localhost:5000/api/transaction',{
                      headers: { "Content-Type": "application/json", "authorization": "Bearer " + JSON.parse(localStorage.getItem("user")) },
                      method: 'POST',
                      body: JSON.stringify({
                      text: this.text,
                      amount: this.amount,
                      createdAt: this.createdAt
                   })
                    
                })
                    const data = await res.json()
                
                    this.incomes = [...this.incomes, data.data]
                    this.text = ""
                    this.amount = null
                    this.createdAt = null
                    const positiveNumber = this.incomes.map(item => item.amount)
                    const garde = positiveNumber.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)
                    const retrait = (positiveNumber.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)
                    this.total = (garde - retrait).toFixed(2)
                
                    } catch (error) {
                        console.log(error)
                    }
            },

            async currentUser(){
                try {
                 const res = await fetch('http://localhost:5000/api/transaction',{
                 headers: { "Content-Type": "application/json", "authorization": "Bearer " + JSON.parse(localStorage.getItem("user")) },
                 method: 'GET',  
              })
              const data = await res.json()

              const positiveNumber = data.data.map(item => item.amount)
              //somme epagne
              const garde = positiveNumber.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)
               //somme ayant ete retire
               const retrait = (positiveNumber.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)
              //affichage de la transaction
              this.incomes = data.data
              this.total = positiveNumber.reduce((acc, item) => (acc += item), 0).toFixed(2)
                    
                } catch (error) {
                    console.warn(error)
                }
            }
            


        }
    }
</script>
<style scoped>
.routerLink{
    text-decoration: none
}
</style>