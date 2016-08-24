---
title: Running Node.js as a Service
tags:
- side note
- RaspberryPi
- Energy Meter
- Aeotec Z-Stick
- Concept
- Node.js
categories:
- personal
- Energy Meter
excerpt: It is no secret that making sure that you data is flowing is biggest concern for reliable statistics (and pretty pictures). Fortunately systemd now available on all popular Linux distributions so we do not have to write much.

---

Now that [we have](/blog/2016/02/20/raspberrypi-energy-meter/) [Raspberry Pi 2 Model B](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/), [Aeotec Z-Stick](http://aeotec.com/z-wave-usb-stick) and [Aeotec Z-Wave Home Energy Meter](http://aeotec.com/z-wave-home-energy-measure)s talking to each other we need to make sure we can listen.

## Node.js as a Service

It is no secret that making sure that you data is flowing is biggest concern for reliable statistics (and pretty pictures). Fortunately systemd now available on all popular Linux distributions so we do not have to write much. Mike MacCana has a [great write up on bigger subject of Node.js as service](https://certsimple.com/blog/deploy-node-on-linux#node-linux-service-systemd) but we're going to user only interesting to us part.

## Service.js

Service.js is set to `value changed` event on meters. Furthermore it is only looking for changes in power and energy. Once event occurs and it is power or energy change it will send HTTP request to Lumen based logging service. You can test script by running

    node service.js

Now, you can check MySQL to see if data is inserted in tables. By default logging is turn off, so if you see any issue, it is probably good to uncomment `console.log` parts of the service.js. Once you sure that data is making its way into SQL, it is time to hand off service monitoring to operation system.


## Service Definition

You can find example service definition [myapp.service in github repo](https://github.com/mikhailkozlov/myhome/blob/pi/myapp.service). Depending on your setup you'll have to update path and copy your service file into the `/etc/systemd/system` directory. Then run

    systemctl daemon-reload

to let systemd know about new service and start your service:

    systemctl start myapp

 It is important that there is no other connections to Z-stick at the same time. Systemd will quietly fail if you have another script with open connection.

## Working with service

Just like with any other service, you can use `start`, `stop` commands to start or stop service.


## What is next

Next we're going to look at setting up NoSQL storage service to power up dashboard.