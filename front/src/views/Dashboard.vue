<template>
    <div class="body">
    <div class="side-menu">
        <div class="brand-name">
            <h2>TrackApp</h2> 
        </div>
        <ul>
            <li><img src="../assets/house.svg" class="svg" alt="">&nbsp; <span>Dashboard</span> </li>
            <router-link to="depot" class="routerLink"><li><img src="../assets/money-transfer.svg" class="svg" alt="">&nbsp;<span>Depot</span> </li></router-link>
            <router-link to="retrait" class="routerLink"><li><img  src="../assets/tent-arrow.svg" class="svg" alt="">&nbsp;<span>Retrait</span> </li></router-link>
            <router-link to="notification" class="routerLink"><li><img src="../assets/notification.svg" class="svg" alt="">&nbsp;<span>Notification</span> </li></router-link>
            <router-link to="statistique" class="routerLink"><li><img src="../assets/money-trend.svg" class="svg" alt="">&nbsp;<span>Statistique</span> </li></router-link>
            <router-link to="historique" class="routerLink"><li><img src="../assets/history.svg" class="svg"  alt="">&nbsp; <span>Historique</span></li></router-link>
            <router-link to="aide" class="routerLink"><li><img src="../assets/help.svg" class="svg" alt="">&nbsp;<span>Aide</span> </li></router-link>
        </ul>
    </div>
    <div class="container">
        <div class="header">
            <div class="nav">
                <div class="user">
                    <v-btn icon v-on:click.prevent="logUserOut"  class="clickable" title="logout">
                        <v-icon color="blue">mdi-logout</v-icon>
                    </v-btn>
                     <h3>{{ user.name }}</h3> 
                    <div class="img-case">
                       
                        <img src="../assets/user.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="cards">
                <div class="card">
                    <div class="box">
                        <h1>{{ total }} <em>Frcs</em></h1>
                        <h3>Montant</h3>
                    </div>
                    <div class="icon-case">
                        <img  src="../assets/income.png" alt="">
                    </div>
                </div>
                <router-link to="/notification" class="routerPage">
                    <div class="card">
                        <div class="box">
                            <h1>Notification</h1>
                        </div>
                        <div class="icon-case">
                            <img class="png-img" src="../assets/notification.png" alt="">
                        </div>
                    </div>
                </router-link>
                <router-link to="/historique" class="routerPage">
                    <div class="card">
                        <div class="box">
                            <h1>Historique</h1>
                        </div>
                        <div class="icon-case">
                            <img class="png-img"  src="../assets/historique.png" alt="">
                        </div>
                    </div>
                </router-link>
                <router-link to="/aide" class="routerPage">
                    <div class="card">
                        <div class="box">
                            <h1>Aide</h1>
                        </div>
                        <div class="icon-case">
                            <img class="png-img" src="../assets/help.png" alt="">
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="content-2">
                <div class="recent-payments">
                    <div class="title">
                        <h2>Statistique </h2>
                    </div>
                    <table>
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
                                    ${{ item.value }}
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
                            </v-card-actions>
                        </v-card>
                    </table>
                </div>
                <!-- <div class="new-students">
                </div> -->
            </div>            
        </div>
    </div>
            <!--  button with scroll effet -->
    </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode"
    export default {
        name: "dashboard",
        data: () =>{
            return{
                user:{},
                userName: "",
                userEmail: "",
                value: [],
                incomes: [],
                total: null
            }
        },

        methods:{
            //function to deconnect the user
            logUserOut(){
                localStorage.removeItem("user")
                this.$router.push("/")
            },

            //function to decode the user name
            async getCurrentUser(){
                let currentUser = JSON.parse(localStorage.getItem("user"))
                try{
                    let decoded = VueJwtDecode.decode(currentUser)
                    this.user = decoded
                } catch(err){
                    this.user = err
                }
            },
            //GET the statistique of currentUser
            async userStat(){
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
        },
        created(){
            this.getCurrentUser()
            this.userStat()
        }
    }
</script>

<style scoped>
.svg{
    width: 30%;
    height: 30%;
    cursor: pointer;
}
.png-img{
    width: 50px;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.body {
    min-height: 100vh;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}

strong{
    color: #fff;
}
h2 {
    color: #444;
}

h3 {
    color: #999;
}

.btn {
    background: #f05462;
    color: white;
    padding: 5px 10px;
    text-align: center;
}

.btn:hover {
    color: rgb(0, 140, 255);
    background: white;
    padding: 3px 8px;
    border: 2px solid rgb(0, 140, 255);
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 15px 10px;
    border-bottom: 2px solid #999;
}

table {
    padding: 10px;
}

th,
td {
    text-align: left;
    padding: 8px;
}

.side-menu {
    position: fixed;
    background: rgb(0, 140, 255);
    width: 20vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.side-menu .brand-name {
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.side-menu li {
    font-size: 24px;
    padding: 10px 40px;
    color: white;
    display: flex;
    align-items: center;
}

.side-menu li:hover {
    background: white;
    color: #f05462;
}

.container {
    position: absolute;
    right: 0;
    width: 80vw;
    height: 100vh;
    background: #f1f1f1;
}

.container .header {
    position: fixed;
    top: 0;
    right: 0;
    width: 80vw;
    height: 10vh;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.container .header .nav {
    width: 90%;
    display: flex;
    align-items: center;
}

.container .header .nav .search {
    flex: 3;
    display: flex;
    justify-content: center;
}

.container .header .nav .search input[type=text] {
    border: none;
    background: #f1f1f1;
    padding: 10px;
    width: 50%;
}

.container .header .nav .search button {
    width: 40px;
    height: 40px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container .header .nav .search button img {
    width: 30px;
    height: 30px;
}

.container .header .nav .user {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container .header .nav .user img {
    width: 40px;
    height: 40px;
}

.container .header .nav .user .img-case {
    position: relative;
    width: 50px;
    height: 50px;
}

.container .header .nav .user .img-case img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.container .content {
    position: relative;
    margin-top: 10vh;
    min-height: 90vh;
    background: #f1f1f1;
}

.container .content .cards {
    padding: 20px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

.container .content .cards .card {
    width: 250px;
    height: 150px;
    background: white;
    margin: 20px 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.container .content .content-2 {
    min-height: 60vh;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
}

.container .content .content-2 .recent-payments {
    min-height: 50vh;
    flex: 5;
    background: white;
    margin: 0 25px 25px 25px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
}

.container .content .content-2 .new-students {
    flex: 2;
    background: white;
    min-height: 50vh;
    margin: 0 25px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
}

.container .content .content-2 .new-students table td:nth-child(1) img {
    height: 40px;
    width: 40px;
}

.routerLink{
    text-decoration: none;
    color: #f1f1f1;
}
.routerLink:hover{
    color: darkorange;
}

@media screen and (max-width: 1050px) {
    .side-menu li {
        font-size: 18px;
    }
}

@media screen and (max-width: 940px) {
    .side-menu li span {
        display: none;
    }
    .side-menu {
        align-items: center;
    }
    .side-menu li img {
        width: 40px;
        height: 40px;
    }
    .side-menu li:hover {
        background: #fff;
        padding: 8px 38px;
        border: 2px solid rgb(36, 99, 128);
        color: #000;
    }
}

@media screen and (max-width:536px) {
    .brand-name h1 {
        font-size: 16px;
    }
    .container .content .cards {
        justify-content: center;
    }
    .side-menu li img {
        width: 30px;
        height: 30px;
    }
    .container .content .content-2 .recent-payments table th:nth-child(2),
    .container .content .content-2 .recent-payments table td:nth-child(2) {
        display: none;
    }
}
</style>