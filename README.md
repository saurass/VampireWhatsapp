# IMPORTANT
Newer version on VampireWhatsApp (v2) is released. Please checkout it out at [VampireWhatsApp V2](https://github.com/saurass/VampireWhatsApp-V2)



# VampireWhatsapp
This Node-JS script can automate WhatsApp-Web using seleinium webdriver.


## Installing
1.  Download and Install [NodeJS](https://nodejs.org/en/download/).
2.  Download [Chrome Driver](http://chromedriver.chromium.org/downloads) latest version as per your system. (Mac/Linux/Windows)
3.  Place the downloaded driver in ChromeDriver Folder in Project.
4.  Set global path variable for this folder (ChromeDriver folder) in your system.
5.  Run 'npm install' in root directory of the project.
6.  Set up Pusher socket channel and replace KEY. (Furthur explanation in code itself)
7.  You can replace the site from where to download file to be sent. (Line 104 index.js)


## Getting Started
1.  The socket server must send data in following format which contains following properties --
        'message' => Message to be sent (In case of Images or Files 'message' => Image or file name)
        'type' => Only two types available text/file
        'mobile_number' => Required mobile number in full format without +/0/# (example- 91XXXXXXXXXX)
2.  run 'node index.js' in cmd in root directory.
3.  For the first time you need to scan QR code from your mobile (tick the checkbox keep me logged in).
4.  Now as the request is sent through socket the driver will start executing as per server command.
5.  Wooolaaah....!!! You are done now.


## Note
1.  Please tick "prevent this dialog from popping up" in the chrome instance (in future versions this problem is to be solved)
2.  Donot close the chrome instance else you will have to rescan the QR code.
3.  In case of ubuntu provide proper permission to files directory in project.


## Contributing
  Please contribute to this repo and also feel free to raise issues.
  Merge request will be accepted only after proper testing.
    
## Author
SAURASS (Saurabh Srivastava)
