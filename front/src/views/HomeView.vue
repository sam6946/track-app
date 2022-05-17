<template>
  <div class="home">
    <header>
      <h1>TrackApp</h1>
      <section class="aide">
        <router-link to="aide" title="Aide" class="routerLink"><li><img src="../assets/help.png" class="png" alt=""> </li></router-link>
      </section>
    </header>
    <div class="content">
      <main>
          <h1>Bienvenue sur <strong>TrackApp</strong>. Le moyen digital <br> tres simple de garde de l'argent</h1>
          <div class="btn">
          <router-link to="loginRegister" class="routerLink">
          <v-btn
            color="blue"
            elevation="2"
            dark
            x-large
          >Register/Login</v-btn> 
          </router-link>           
          </div>
        </main>
    </div>
  </div>
</template>

<script>
 

  export default {
    name: 'Home',
  }
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li{
  list-style: none;
}

div .home{
  width: 100%;
  height: 100%;
  background: url("../assets/home.jpg");
  background-size: cover;
  background-position: center;

}

header{
    display: flex;
    align-content: flex-start;
    background-color: rgb(0, 140, 255);
    color: #fff;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    width: 100vw;
    height: 8%;
}
header h1{
  font-family: Georgia, 'Times New Roman', Times, serif;
  margin-left: 10px;
}
.png{
  width: 35px;
}
section{
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 10px;
  margin-right: 10px;
}



  .content{
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.386);
    width: 100%;
    height: 92%;
  } 
  .content h1{
    color: rgba(255, 255, 255, 0.87);
    font-weight: bold;
    flex-wrap: wrap;
    font-size: 45px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    margin-top: 55px;
  }
  .btn{
    text-align: center;
    margin-top: 20px;
  }

  strong{
    color: rgb(59, 168, 219);
  }

  .routerLink{
    text-decoration: none;
  }


/* Responsi */
@media screen and (max-width:536px){
h1 {
        font-size: 16px;
    }
}

</style>
