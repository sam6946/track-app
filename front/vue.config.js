const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: path.resolve(__dirname, '../public'),
  // devServer: {
  //   proxy:{
  //     '/api':{
  //       target: "http://localhost:5000/"                //'https://caisse-track.herokuapp.com//'
  //     }
  //   }
  // }
})
