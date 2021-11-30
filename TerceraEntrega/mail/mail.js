const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rosamond.cormier45@ethereal.email',
        pass: '7sp9PCSnB21PQX22tV'
    }
});

const mailOptions = (op, us, dat)=>{
    return {
        from: 'Servidor Node.js',
        to: ['rosamond.cormier45@ethereal.email'],
        subject: `${op} del user ${us}, Fecha y hora: ${dat}`,
        html: `<h1 style="color: blue;">El usuario ${us} ha hecho un ${op} en su cuenta</h1>`
    }
};

module.exports={
    transporter,
    mailOptions
};