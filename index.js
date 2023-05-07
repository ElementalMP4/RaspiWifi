const express = require('express');
const app = express();
var morgan = require('morgan');
const fs = require("fs");

const port = 80;

app.use(morgan("dev"));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.redirect("/index.html");
});

app.get("/wifi", (req, res) => {
    let ssid = req.query.ssid;
    let psk = req.query.psk;
    let template = fs.readFileSync('./template.txt').toString();
    let final = template.replace("{{SSID}}", ssid).replace("{{PASSWORD}}", psk);
    fs.writeFileSync("/etc/wpa_supplicant/wpa_supplicant.conf", final, { encoding: 'utf8', flag: 'w' })
    res.send(final);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});