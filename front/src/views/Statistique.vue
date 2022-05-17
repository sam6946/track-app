<template>
    <div class="container">
     <v-card
    class="mx-auto text-center"
    color="blue"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            F{{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
        Transaction effectuer 
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn block text> <router-link to="dashboard" class="router"> Retour </router-link> </v-btn>
    </v-card-actions>
   </v-card>
        <div class="content"> 
            <section>
                <h1>Description du Tableau de statistique</h1>
                <p><strong>F</strong>: qui est l'unite en Francfa</p> 
                <p><strong>-</strong>: qui est la pour symbolise les valeurs negative</p>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Statistique",
         data: () => ({
      value: [],
      incomes: [],
    }),
     created(){
            this.currentUser()
        },
        methods:{
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
              const amounts = this.incomes.map(item => this.value.push(item.amount))
                    
            } catch (error) {
                    console.log(error)
                }            
          }
        }
    }
</script>

<style  scoped>

.router{
    color: #fff;
    text-decoration: none;
    font-size: 25px;
}
.content{
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

</style>