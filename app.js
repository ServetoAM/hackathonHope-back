const connection = require('./db-config');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/index.routes');
const nodemailer = require("nodemailer");



const port = process.env.PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors())
app.use('/api', router);

app.get("/", (req, res) => {
    res.send("Welcome");
});

// var transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 8000,
//   auth: {
//     user: "203ea88d146438",
//     pass: "4f3adf06e42d7e"
//   }
// });

// transport.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

app.post("/contact", cors(), async (req, res) => {
	let { message } = req.body
	const transport = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	})

	await transport.sendMail({
		from: process.env.MAIL_FROM,
		to: "test@test.com",
		subject: "test email",
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>On vous a contacté!</h2>
        <p>"${message}"</p>
    
        <p>All the best, Darwin</p>
         </div>
    `
	})
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;