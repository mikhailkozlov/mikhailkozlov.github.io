---
title: Setup RaspberryPi with Aeotec Z-Stick
tags:
- side note
- RaspberryPi
- Energy Meter
- Aeotec Z-Stick
- Consept
categories:
- personal
- Energy Meter
excerpt: Now that we have Raspberry Pi 2 Model B, Aeotec Z-Stick and Aeotec Z-Wave Home Energy Meters it is time to get the talking to each other. Pairing Aeotec Z-Stick and Aeotec Z-Wave Home Energy Meters is not a brainer, just follow instructions in the box. Getting RaspberryPi effectively communicating to Aeotec Z-Stick is a bit less trivial.

---

Now that we have [Raspberry Pi 2 Model B](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/), [Aeotec Z-Stick](http://aeotec.com/z-wave-usb-stick) and [Aeotec Z-Wave Home Energy Meter](http://aeotec.com/z-wave-home-energy-measure)s it is time to get them talking to each other. Pairing Aeotec Z-Stick and Aeotec Z-Wave Home Energy Meters is not a brainer, just follow instructions in the box. Getting Raspberry Pi effectively communicating to Aeotec Z-Stick is a bit less trivial. 

## Raspberry Pi

For the purpose of this exersize we're going to Raspbian Jessie Lite Minimal image based on Debian Jessie (at the time of writing Version: February 2016). You can follow intractions on [raspberrypi.org](https://www.raspberrypi.org/documentation/installation/installing-images/README.md) to get image etched on SD card of your choice since it varies by platform you use for this. Once your Pi is up and running you may want to jump into `raspi-config` since this is about as graphical as it is going to get on Jessie Lite distro. 

	sudo raspi-config
	
Inside this config tool you SHOULD reset default password to something more secure. In addition you can:

* Make sure your SD card's space is available to you (option #1)
* Change device hostname (available in Advanced section)
* Enable SSH server for remote access (available in Advanced section)

> If you enabled SSH server, it might be a good idea to change default port too. You can do it by changing Port value in `sudo vi /etc/ssh/sshd_config` and restaring the service `sudo /etc/init.d/ssh restart`

Now that we have basics configured it is time to update apt-get and install some packages. First run:

	sudo apt-get update
	
Once update is done, you'll need to install some basic tools:

	sudo apt-get install build-essential libssl-dev make
	
Node.js and npm do not come pre-installed, so you'll need to install them too

	sudo apt-get install nodejs npm
	
We're going to need Git, PHP, MySQL and Nginx, so we may get that out of the way too

	sudo apt-get install git nginx

To get PHP running we'll need FPM and CLI as well as some other helper

	sudo apt-get install php5-fpm php5-cli libcurl3 php5-curl
	
MySQL installation triggers setup, so be preapred to create root password and set basic security

	sudo apt-get install mysql-server php5-mysql
	
> PHP setup bring Apache server with it, but we're not going to use it to save some space. Simply run `sudo apt-get remove apache2`.

## Nginx Setup

We're not going to go in detail of setting Nginx as it is covered very well on the internet. Insted I'm just going to share my server config `/etc/nginx/sites-available/default`:

	server {
        listen 80 default_server;
        server_name _;        
        root /home/pi/myhome/public;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.php;

        location / {
                try_files $uri $uri/ /index.php?$query_string;
        }

        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }

        access_log off;
        error_log  /var/log/nginx/myhome-error.log error;

        error_page 404 /index.php;

        location ~ \.php$ {
                fastcgi_split_path_info ^(.+\.php)(/.+)$;
                fastcgi_pass unix:/var/run/php5-fpm.sock;
                fastcgi_index index.php;
                include fastcgi_params;
        }

        location ~ /\.ht {
                deny all;
        }
	}
One thing to note about Raspberry Pi is that default fastcgi params (`/etc/nginx/fastcgi_params`) did not work for me. I've had to add 

	fastcgi_param  PATH_INFO          $fastcgi_path_info;
	fastcgi_param  PATH_TRANSLATED    $document_root$fastcgi_script_name;

towards the bottom of `/etc/nginx/fastcgi_params` to get Nginx to talk to PHP-FPM.

In order to avoid any user permission issues, I usually changed nginx user to `pi`. This can be done at the top of `/etc/nginx/nginx.conf`. We would do the same for PHP in a bit.

No it is time to run 

	sudo /etc/init.d/nginx restart
		
for changes to take affect.

## PHP-FPM Setup

Again, there is plenty of tutorials on how to get PHP working with Nginx. I'll just mention that you will need to update `cgi.fix_pathinfo` in `/etc/php5/fpm/php.ini`. Find the line and set it to 0 if it is not already set:

	cgi.fix_pathinfo=0
	
Next we need to make sure that PHP-FPM is listing to the socket and we `pi` as php user. Open `/etc/php5/fpm/pool.d/www.conf` and search for 'listen'. In my case it was already set to 

	listen = /var/run/php5-fpm.sock
	
but you may need to update that. User and group settings are located at the top of the file, so set them to `pi`: 

	user = pi
	group = pi

Time to restart 
	
	sudo /etc/init.d/php5-fpm restart
	
## Node.js

It is time to get Javascript out of the "box" and start talking to Z-Stick. I've created [gihub repo](https://github.com/mikhailkozlov/myhome) to keep all relevan things in one place. Since this code will server dual purpose, we're going to place wher Nginx is epxcting it to find. Let's get to the home dir and clone it:

	cd ~/
	git clone git@github.com:mikhailkozlov/myhome.git

Now we can get inside `cd myhome` and install node dependencies:
	
	npm install
	
In most cases, you do not need to use sudo, but if it does not work try to run it with sudo. At this point you can get a coffee or even entire meal. Installing things on Pi is not fast. If you would like to know what are we installing, take a look at `package.json` in the root of the porject. 

Welcome back! Now that we have 




[![image](/components/img/energy/energy_meter_small.jpg)](/components/img/energy/energy_meter.jpg)

## Components

After some clicking around, I found that Aeon Labs makes relativly inexpencive components that seem to work well. Originally set up consisted of two [Aeotec Home Energy Meters](http://aeotec.com/z-wave-home-energy-measure) with [USB Aeotec Z-Stick](http://aeotec.com/z-wave-usb-stick) on PC side. This means that not only I had run mac-mini all the time but also make sure that it stays up all the time. After a few month of back and forward I decided to opt out for Paspberry Pi. I got latest model, but I'm sure any model will do. 


## Tools

Again, there are many options out there, but if you are not guru software developer, Node.js and PHP are probably the easiest to pick up. Fortunately OpenZWave maintains [node-openzwave-shared](https://github.com/OpenZWave/node-openzwave-shared) library for Node.js. Node is fully capable to handle things on his own, but since I plan to run some rather complex operation on the server, I decided to keep code very simple on Node side and log data using http requests. To capture request I've picked PHP [Lumen](https://github.com/laravel/lumen) framework since I'm most familiar with Laravel. In order to build interactive dashboard we're going to use [Firebase](https://www.firebase.com/) service from Google and sprinkle some JS. So final result will look like this:

[![image](/components/img/energy/dashboard.jpg)](/meter)


## What is next

Next we're going to setup Raspberry Pi and get communication going between Raspberry Pi  and Z-Stick. 