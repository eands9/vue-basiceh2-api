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
    const pwdRetrievedSecret = await client.getSecret("password1");
    const password1=pwdRetrievedSecret.value;

    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: emailusername1,
          pass: password1,
        },
    });

    const mailOptions = {
        from: "kffsande@outlook.com",
        to: "kffsande@outlook.com",
        subject: "From vuenodemailer " + req.body.emailSubject,
        text: req.body.emailBody,
        html: '<div><table><thead><tr><th>Product ID</th><th>Name</th></tr></thead><tbody>' + req.body.emailBody + '<tr><td></td><td>$' + req.body.orderTotal + '</td></tr></tbody></table></div>',
    }

    transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log("Sent: " + info.response); 
        }
    }) 
};
