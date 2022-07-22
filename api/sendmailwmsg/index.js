const nodemailer = require("nodemailer");

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
        auth: {
        //   user: process.env.username1,
        //   pass: process.env.password1,
          user: emailusername1,
          pass: password1,
            // user: "kffsande@outlook.com",
            // pass: "Pwd4Kff5and3"
        },
        });

        const mailOptions = {
            from: "kffsande@outlook.com",
            to: "kffsande@outlook.com",
            // subject: "Test",
            // text: "Test"
            subject: req.body.emailSubject,
            text: req.body.emailBody,
            html: '<div><table><thead><tr><th>Product ID</th><th>Name</th></tr></thead><tbody>' + req.body.emailBody + '</tbody></table></div>',
            // headers: { 'x-myheader': 'test header' }
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
