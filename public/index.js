function doHttpGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.status, xhr.responseText);
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

function updateWifi() {
    let ssid = document.getElementById("ssid-input");
    let password = document.getElementById("psk-input");
    doHttpGet(`/wifi?ssid=${encodeURIComponent(ssid)}&psk=${encodeURIComponent(password)}`, () => { });
    document.getElementById('reboot-modal').style.display = 'block';
}

function reboot() {
    doHttpGet("/reboot", () => { });
}