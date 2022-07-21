const nodemailer = require("nodemailer");
// const express=require('express');
// const app=express();

// app.use(express.static('public'));
// app.use(express.json())

module.exports = async function (context, req) {
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        // host: "smtp.gmail.com",
        // port: 465,
        // secure: true,
        // service: "gmail",
        auth: {
        //   user: process.env.EMAIL,
        //   pass: process.env.PASSWORD,
            user: "kffsande@outlook.com",
            pass: "Pwd4Kff5and3"
        },
        });

    //   let mailIDs = await getMailIDs();
    //   for (i = 0; i < mailIDs.length; i++) {
    //     await transporter.sendMail({
    //       from: "abc@gmail.com",
    //       to: `${mailIDs[i]}`,
    //       subject: "Test Mail",
    //       text: {
    //         path: `emailBody.txt`,
    //       },
    //     });
    //   }

        const mailOptions = {
            from: "kffsande@outlook.com",
            to: "kffsande@outlook.com",
            // subject: req.body.name + "'s order is shown below...",
            subject: "Test Subject 8",
            text: "Wow! That's Easy"
        }

        transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
                console.log(error);
                res.send('error');
            }else{
                console.log("Sent: " + info.response); 
            }
        }) 
};