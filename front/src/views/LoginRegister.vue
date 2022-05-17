<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Se connecter a son compte</h4>
                    <h6 class="text-center grey--text">connecter vous etablir votre epagne
                      <br> et consulter vos statistiques
                    </h6>
                    <v-row align="center" justify="center">
                       <!-- <div v-show="error" class="error">{{ this.error }}</div> -->
                      <v-col cols="12" sm="8">
                        <v-text-field label="Email" v-model="email" outlined dense color="blue" autocomplete="false" class="mt-16"></v-text-field>
                        <v-text-field label="Password" v-model="password" outlined dense color="blue" autocomplete="false" type="password"></v-text-field>
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox label="Remember Me" class="mt-n1" color="blue" ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <!-- <span class="caption blue--text">Forget password</span> -->
                          </v-col>
                        </v-row>
                        <v-btn color="blue" @click.prevent="postInfo" dark block tile> CONNECTER </v-btn>
                        <!-- <h5 class="text-center grey--text mt-4 mb-3">Or Log in using</h5> -->
                        <!-- <div class="d-flex justify-space-between align-center mx-10 mb-16">
                          <v-btn depress outlined color="grey">
                            <v-icon color="red">fab fa-google</v-icon>
                          </v-btn>
                          <v-btn depress outlined color="grey">
                            <v-icon color="blue">fab fa-facebook</v-icon>
                          </v-btn>
                          <v-btn depress outlined color="grey">
                            <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                          </v-btn>
                        </div> -->
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" sm="6" class="blue rounded-b1-x1">
                  <div style="text-align:center; padding: 180px 0;">
                    <v-card-text class="white--text">
                        <v-alert
                        v-show="error" 
                          dense
                          border="left"
                          type="warning"
                        >
                           <strong>{{ error }}</strong> 
                        </v-alert>
                      <h3 class="text-center">Pas encore de compte?</h3>
                      <h6 class="text-center">
                        clic sur <strong>S'ENREGISTRE</strong> pour creer votre compte
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click.prevent="step++">S'ENREGISTRE</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>

            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" sm="6" class="blue rounded-br-x1">
                  <div style="text-align: center; padding:180px 0;">
                    <v-card-text class="white--text">
                     <v-alert
                        v-show="error" 
                          dense
                          border="left"
                          type="warning"
                        >
                           <strong>{{ error }}</strong> 
                        </v-alert>
                      <h3 class="text-center"> deja un compte?</h3>
                      <h6 class="text-center">
                        Ok click sur le boutton si dessous <br>
                        pour vous connecter sur votre compte
                      </h6> 
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">SE CONNECTER</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Creation D'un compte</h4>
                    <h6 class="text-center grey--text">
                      Entre vos infromation valider <br>
                      .....
                    </h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field label="First Name" v-model="name" outlined dense color="blue" autocomplete="false" class="mt-4"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field label="Last Name" v-model="lastName" outlined dense color="blue" autocomplete="false" class="mt-4"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-text-field label="Email" v-model="email" outlined dense color="blue" autocomplete="false"></v-text-field>
                        <v-text-field label="Password" v-model="password" outlined dense color="blue" type="password"></v-text-field>
                        <v-text-field label="ConfirmPassword" v-model="confirmPassword" outlined dense color="blue" type="password"></v-text-field>
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox label="Iaccept condition" class="mt-n1" color="blue"></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text ml-n4">Terms & Conditions</span>
                          </v-col>
                        </v-row>
                        <v-btn color="blue" dark block tile @click.prevent="getInfo">S'ENREGISTRE</v-btn>
                        <!-- <h5 class="text-center grey--text mt-4 mb-3">Or Sign up using</h5> -->
                        <!-- <div class="d-flex justify-space-between align-center mx-10 mb11">
                          <v-btn depressed outlined color="grey">
                            <v-icon color="red">fab fa-google</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="blue">fab fa-facebook</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                          </v-btn>
                        </div> -->
                      </v-col>
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
    name: 'Home-view',

    data(){
      return{
        step: 1,
        name: "",
        lastName: "",
        email: "",
        password:"",
        confirmPassword:"",
        errorDis: "",
        error:""
      }
    },
    methods:{
      
          
          async postInfo(){
            try{
              const res = await fetch('http://localhost:5000/api/login',{
                headers: { 'Content-type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                  }) 
              })
              const data = await res.json()
              if(data.errors){
                this.errorDis = true
                this.error = data.errors 
                return
              }
              if(data.user){
                this.errorDis = false
                this.error = ""
                localStorage.setItem('user', JSON.stringify(data.token))
                this.$router.push({ name: 'dashboard' })
                return
              }
            }catch(e){
              console.log(e)
            }
          
        },
        //REGISTRATION PART
      async getInfo(){
      try {
        const res = await fetch('http//localhost:5000/api/register', {
          method: "POST",
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        })
      })
      const data = await res.json()
            console.log(data)
              if(data.errors){
                this.error = data.errors
                this.errorDis = true
                return
              }
              //console.log(data.user)
               if(data.user){
                 this.errorDis = false
                 this.error = ""
                 localStorage.setItem('user', JSON.stringify(data.token))

                 console.log(data)
                 this.$router.push({ name: 'dashboard' })
                 return
               }
      } catch (error) {
        console.log(error)
      }
    } 
    },

    //reister sector
   
  }
</script>
<style scoped>
.v-application .rounded-b1-x1{
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-x1{
  border-bottom-right-radius: 300px !important;
}

.error{
  text-align: center;
  font-size: 12px;
  color: rgba(20, 11, 11, 0.18);
}
</style>
