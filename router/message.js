const router = require('express').Router()
let CronJob = require('cron').CronJob
const MessageModel = require('../models/message')
const nodemailer = require('nodemailer')



const coordonne = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.userId
        const { email, minute, hours } = req.body
        const message = await MessageModel.create(req.body)
        console.log(message)
        // Email message options
        const mailOption = {
        from: "trackapp195@gmail.com",
        to: message.email,
        subject: "Notification sur ta collecte journaliere",
        text: "As tu oublier de te garder un peu d'argent aujourd'hui? si oui click ici " + `https://caisse-track.herokuapp.com/`
      }

        //email transport configuration
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
           user: "trackapp195@gmail.com",
           pass: 'track12_s'
        }
     })
    
     //configuration of hours 
     let d = new Date()
      req.body.minute = d.getMinutes()
      req.body.hours = d.getHours()
       //sned email
       let job = new CronJob(`   ${req.body.minute + 1} ${req.body.hours + 1 } * * *`, function() {
         transporter.sendMail(mailOption, (error, info) => {
            if(error){ 
               console.log(error)
             }else{
                console.log('Email send: ' + info.response)
             }
          })
       }, null, true, 'Africa/Douala');
        job.start();
        console.log(job)


        return res.status(201).json({
            success: true,
            data: message
        })
    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({
                success: false,
                error: messages
            })
        }else{
            return res.status(500).json({
                success: false,
                error: 'Server Errorrrrrr'
            })
        }
    }
}

router.post('/api/notification', coordonne)



//exportation de notre router
module.exports = router