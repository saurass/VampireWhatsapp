/*
|================================================================
|Socket Server Connection (USING PUSHER PUBLIC CHANNEL)
|================================================================
|   + Using npm pusher-js here as client for node.
|   + Using npm selenium WebDriver
|   + Using file_downloader for file download from remote URL.
|   + In case of changes only change the keys and api key.
|----------------------------------------------------------------
|   Currently no private channel is used. Can be updated.
|   Just change socket initializing method here.
|================================================================
*/
process.on('uncaughtException', function (err) {
    console.log("===============================================================");
    console.log("                ***** PROGRAM INITIALIZED *****                ");
    console.log("---------------------------------------------------------------");
});
const Pusher = require('pusher-js');
const Downloader = require("file_downloader");
const Webdriver = require("selenium-webdriver");
const By = Webdriver.By;
const until = Webdriver.until;


/*
|---------------------------------------------------------------
|   Initializing SocketListener (use NPM pusher-js)
|	Replace YOUR_PUSHER_API_KEY with your API key
|---------------------------------------------------------------
*/
const socket = new Pusher('YOUR_PUSHER_API_KEY', {
    cluster: 'ap2'
});
var channel = socket.subscribe('my-channel');


/*
|---------------------------------------------------------------
|   Listening to socket [Initialize decisionMaker function here]
|---------------------------------------------------------------
*/
channel.bind('my-event', function (data) {
    var type = data.type;
    var message = data.message;
    message = message.replace('-*/', ' ');
    var mobile_number = data.mobile_number;
    decisionMaker(type, message, mobile_number);
});


/*
|----------------------------------------------------------------
|   +  Starting Browser Instance
|   +  requires latest version chrome driver
|----------------------------------------------------------------
|       INITIATED AS SOON AS THIS MODULE IS INITIATED
|----------------------------------------------------------------
*/
var driver = new Webdriver.Builder().forBrowser("chrome").build();
driver.get("https://web.whatsapp.com");


/*
|--------------------------------------------------------------
|   Based on request the function will call required function
|--------------------------------------------------------------
*/
function decisionMaker(type, message, mobile_number) {
    if (type === 'text')
        sendText(message, mobile_number);
    if (type === 'file')
        sendFile(message, mobile_number);
}


/*
|--------------------------------------------------------------
|   SendText function to send plain messages
|--------------------------------------------------------------
*/
function sendText(message, mobile_number) {
	driver.executeScript("window.alert=function(){return true;}");
    console.log("#                     Sending Text Message                    #");
    driver.get("https://web.whatsapp.com/send?phone=" + mobile_number + '&text=' + message);
    sendTextDomManager();
}


/*
|--------------------------------------------------------------
|   SendText function to send any type of file
|--------------------------------------------------------------
*/
function sendFile(message, mobile_number) {
	driver.executeScript("window.alert=function(){return true;}");
    console.log("#                     Sending File Message                    #");
    downloadFile(message);
    driver.get("https://web.whatsapp.com/send?phone=" + mobile_number + '&text=' + message);
    sendFileDomManager(message);
}

function downloadFile(message) {
    var fileBaseUrl = "https://ENTER_BASE_ADDRESS_OF_WEBSITE_HERE.com";
    var fileUrl = fileBaseUrl + message;
    var fileSavePath = "./files/";
    Downloader(fileUrl, fileSavePath);
    console.log("#                    File Download Success                    #");
}


/*
|--------------------------------------------------------------
|   This function waits for DOM to be ready and then sends text
|--------------------------------------------------------------
*/
function sendTextDomManager() {
    var query = driver.wait(until.elementLocated(By.css('button[class="_2lkdt"]')));
    query.click();
    console.log("#                     Wooohooo... Done !!!                    #");
    console.log("===============================================================\n\n");
}


/*
|----------------------------------------------------------------
|   +   uploadFile function for whatsapp-web
|   +   requires filename to be given as param
|----------------------------------------------------------------
|    * INITIATE ONLY AFTER THE DOM IS COMPLETELY LOADED *
|----------------------------------------------------------------
*/
function sendFileDomManager(filename) {
    var query = driver.wait(until.elementLocated(By.css('div[title="Attach"]')));
    query.click();

    var xyz = driver.wait(until.elementLocated(By.css('input[type="file"]')));
    xyz.sendKeys(process.cwd()+"\\files\\" + filename);

    var abc = driver.wait(until.elementLocated(By.css('div[class="_3nfoJ"]')));
    abc.click();

    console.log("#                     Wooohooo... Done !!!                    #");
    console.log("===============================================================\n\n");
}