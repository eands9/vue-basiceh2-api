const nodemailer = require("nodemailer");
// const express=require('express');
// const app=express();

// app.use(express.static('public'));
// app.use(express.json())

module.exports = async function (context, req) {

    const { DefaultAzureCredential } = require("@azure/identity");
    const { SecretClient } = require("@azure/keyvault-secrets");
    const credential = new DefaultAzureCredential();
    const vaultName = "vue-basiceh2KV";
    const url = `https://${vaultName}.vault.azure.net`;
    const client = new SecretClient(url, credential);
    
    const userRetrievedSecret = await client.getSecret("emailusername1");
    const emailusername1=userRetrievedSecret.value;
    console.log(emailusername1)
    const pwdRetrievedSecret = await client.getSecret("password1");
    const password1=pwdRetrievedSecret.value;
    console.log(password1)

    let transporter = nodemailer.createTransport({
        service: "hotmail",
        // host: "smtp.gmail.com",
        // port: 465,
        // secure: true,
        // service: "gmail",
        auth: {
          user: emailusername1,
          pass: password1,
            // user: "kffsande@outlook.com",
            // pass: "Pwd4Kff5and3"
        },
        });


        const mailOptions = {
            from: "kffsande@outlook.com",
            to: "kffsande@outlook.com",
            // subject: req.body.name + "'s order is shown below...",
            subject: "Test Subject 10 from vuenodemailer2",
            text: "Wow! That's Easy"
        }

        transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
                console.log(error);
                // res.send('error');
            }else{
                console.log("Sent: " + info.response); 
            }
        }) 
};