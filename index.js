const express = require('express');
const app = express();
var morgan = require('morgan');
const fs = require("fs");
var exec = require('child_process').exec;

const port = 80;

app.use(morgan("dev"));
app.use(express.static('public'));

function execute(command, callback) {
    exec(command, function (error, stdout, stderr) { callback(stdout); });
}

function reboot() {
    execute('shutdown -r now', function (callback) {
        console.log(callback);
    });
}

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

app.get("/reboot", (req,res) => {
    res.send("OK");
    reboot();
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});