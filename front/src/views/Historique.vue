<template>
    <div class="container">
        <div class="header">
            <section class="nav-btn">
                <router-link to="/dashboard" class="routerLink">
                    <div >
                    <div>
                        <v-btn
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
            </section>
            <section>
                <h1>Historique des dernieres transaction</h1>
            </section>
        </div>
        <div class="contentCards">
        <div v-for="income in incomes" :key="income.id" class="cards">
            <v-card
                class="mx-auto"
                max-width="344"
                outlined
             >
                <v-list-item three-line>
                <v-list-item-content>
                    <div class="text-overline mb-4">
                    jour: <span class="date">{{ formatedDate(income.createdAt) }}</span>
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                    Montant: <span :class="income.amount < 0 ? 'red' : 'green' ">{{ income.amount}}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle>Description: <span>{{ income.text }}</span> </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                    tile
                    size="80"
                    color="blue"
                ></v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                </v-card-actions>
         </v-card>
        </div>            
        </div>
    </div>
</template>

<script>
  export default {
    name: "Historique",  
    data: () => ({
      show: false,
      incomes: [],
      text: "",
      amount: null,
      createdAt: null,
      total: null,
    }),
     created(){
      this.currentUser()
    },
    methods:{
        formatedDate (x){
            let date = new Date(x)
            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()
            //return day + "/" + month + "/" + year
            if(day <= 9){
                return "0" + day + "/" +  month + "/" + year
            }else if(month <= 9){
                return  day + "/" + "0" + month + "/" +  year
            }
            else{
                return day + "/" + month + "/" + year
            }
        },
        async currentUser(){
                   try {
            const res = await fetch('http://localhost:5000/api/transaction',{
            headers: { 'Content-type': 'application/json', 'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("user")) },
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
                    
      } catch (error) {
             console.log(error)
            }
        }
    }
  }
</script>

<style  scoped>
*{
    font-family:  sans-serif;
}
.container{
    background: rgba(rgb(70, 39, 39), rgb(31, 46, 31), rgb(38, 38, 68), 0.1);
}

.contentCards{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.cards{
    margin-top: 10px;
}

.routerLink{
    text-decoration: none;
}

.header{
    display: flex;
}

.header section h1{
    margin-left: 40px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>