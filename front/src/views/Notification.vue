<template>
   <v-container>
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
   <div style="text-align: center; padding:18px 0;">
        <h1>Notication</h1>
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
                      <h1 class="text-center">Service de Notification</h1>
                      <h3 class="text-center">
                         Vous permettez a l'application de vous envoie une <strong>notification</strong> via <br>
                         votre <strong>Eamil</strong>
                      </h3> 
                    </v-card-text>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Donner vos horaires</h4>
                    <h6 class="text-center grey--text">
                      Enter le temps particulier de la journee <br>
                      a laquelle vous voulez recevoir votre notification
                    </h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field label="Email" v-model="email" outlined dense color="blue" autocomplete="false"></v-text-field>
                        <v-text-field label="Minutes" v-model="minute" outlined dense color="blue" type="number"></v-text-field>
                        <v-text-field label="Hours" v-model="hours" outlined dense color="blue" type="number"></v-text-field>
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
                                @click.prevent="getCoodonne"
                              >
                                Validation
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
                                <h1>Merci pour votre confiance</h1>
                                <p>Vous recevrez votre message de notification chaque jour a {{ hours }}H : {{ minute }}Minutes</p>
                              </div>
                            </v-sheet>
                        </v-bottom-sheet>
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
        name: "Notification",
        data(){
            return{
                email: "",
                minute: null,
                hours: null,
                sheet: false
            }
        },
        methods: {
          clearField(){
            this.minute = ""
            this.hours = ""
            this.sheet = !this.sheet
          },
            async getCoodonne(){
                try {
                    const res = await fetch('http://localhost:5000/api/notification',{
                    headers: { "Content-Type": "application/json", "authorization": "Bearer " + JSON.parse(localStorage.getItem("user")) },
                    method: 'POST',
                    body: JSON.stringify({
                    email: this.email,
                    minute: this.minute,
                    hours: this.hours
                   })
                    
                })
                this.minute =  this.minute.toString().padStart(2, '0')
                this.hours = this.hours.toString().padStart(2, '0')
                //console.log(res)
                const data = await res.json()
                //console.log(data)
                    
                } catch (error) {
                    console.log(error)
                }
              }
        }
    }
</script>

<style  scoped>
.routerLink{
  text-decoration: none;
}
</style>