<template>
    <div class="container">
        <header class="tete">
            <h3>TrackApp</h3>
        </header>
        <div class="content">
            <section class="presentation">
                <h1>C'est quoi <strong>TrackApp</strong>?</h1>
                <p>C'est une application ou un moyen digital de garde de l'argent</p>
                <h1>Comment devenire un client ou un utilisateur de <strong>TrackApp</strong></h1>
                <p>C'est tres simple tout d'abord vous enregistrez <router-link to="/loginRegister" class="router-link">ici</router-link> entrant des informations fiable</p>
            </section>
            <section class="depot">
                <h1>Comment effectuer son premier depot?</h1>
                <p>C'est tres simple vous allez click sur <router-link to="/depot" class="router-link">Depot</router-link> et commence votre premier depot</p>
                <h4>condition du depot</h4>
                <p class="desc">=> Lavaleur doit etre positive biensur</p>
                <p class="desc">=> Vous ajoutez une description au choix sur votre depot la date est facultative</p>
            </section>
            <section class="retrait">
                <h1>Comment effectuer son premier retrait?</h1>
                <p>C'est tres simple vous allez click sur <router-link to="/retrait" class="router-link">retrait</router-link> et effectuer votre premier retrait</p>
                <h4>condition du retrait</h4>
                <p class="desc">=> Lavaleur doit etre negative et in ferieure a la valeur deja garde biensur</p>
                <p class="desc">=> Vous ajoutez une description au choix sur votre depot la date est facultative</p>
            </section>  
            <section class="message">
                <h1>Comment recevoir un <span>Email</span></h1>
                <p>
                    tout dabord vous devez entrer votre email et ensuite indique l'heure a laquelle vous aimeriez etre notifier
                </p>
            </section>          
        </div>
    </div>
</template>

<script>
    export default {
        name: "Aide"
    }
</script>

<style  scoped>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

h1, h2 {
    font-weight: bold;
    text-decoration: underline;
    line-height: 45px;
}

h4{
    font-size: 20px;
}

h3{
    font-size: 35px;
    font-weight: bold;
}

p{
    font-size: 25px;
}

header{
    display: flex;
    align-content: flex-start;
    background-color: rgb(0, 140, 255);
    color: #fff;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    width: 100vw;
    height: 20%;
}

header h1{
    margin-left: 25px;
    font-weight: bold;
}
.content{
    text-align: center;
}

.content section{
    border: solid black 1px;
    margin: 25px;
    box-shadow: 2px 2px 5px 5px;
}

router-link{
    text-decoration: none;
}
strong{
    color: rgb(0, 140, 255);
}



</style>