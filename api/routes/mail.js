const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const router = require("express").Router();

router.post("/", async (req, res) => {
  let transporter, mailOptions;

  transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })
  );

  let mailOutput = `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Document</title>
    <style></style>
  </head>
  <body
    style="
  padding: 50px 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #0f0f0e;
  overflow: hidden;
"
  >
    <div id="main">
      <div
        id="mail_container"
        style="
      max-width: 600px;
      background-color: #1d1d1d;
      font-family: sans-serif;
      text-align: center;
      position: relative;
      margin: auto;
    "
      >
        <div id="upper_container" style="padding-top: 100px; color: #fff; font-size: 24px;">
          <h2>AUNG SHOP</h2>
          <div
            style="
          border-bottom: 2px solid #7f7f8077;
          width: 50%;
          margin: 30px auto;
        "
          ></div>
          <h2 style="color: #fff; font-size: 24px; margin-bottom: 15px">
            Dear Customer,
          </h2>
          <p
            style="
          font-size: 16px;
          color: #7f7f80;
          width: 80%;
          margin: 10px auto;
          word-spacing: 2px;
          letter-spacing: 0.2px;
          line-height: 22px;
        "
          >
            Your email address is ${req.body.email}, and you will be receiving more news
            from Aung Shop.
          </p>
        </div>
        <div
          style="
        flex-shrink: 0;
        width: 100%;
        height: 82px;
        background-color: #1d1d1d;
        align-self: flex-end;
        display: grid;
        place-items: center;
        padding: 50px 0;
      "
        >
          <div style="width: 100%">
            <p style="font-size: 14px; color: #636b70">
              Happy welcome from Aung Shop,
            </p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
  `;

  // Mail options
  mailOptions = {
    from: "AUNG SHOP",
    to: req.body.email,
    subject: "New subscription",
    html: mailOutput,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email could not be sent:", error);
      res.sendStatus(500);
    } else {
      console.log("Message sent successfully!");
      res.sendStatus(200);
    }
  });
});

module.exports = router;
