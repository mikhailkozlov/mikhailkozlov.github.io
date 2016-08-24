---
title: RaspberryPi Energy Meter
tags:
- side note
- RaspberryPi
- Energy Meter
- Aeotec Z-Stick
- Consept
categories:
- personal
- Energy Meter
excerpt: Have you ever wonder how much electricity is consumed by devices in your house and what are the patters of use? Or pehaps you have and EV car in garage that does not really tell you how much charge it takes? If you said yes to either one follow along.

---


Have you ever wonder how much electricity is consumed by devices in your house and what are the patters of use? Or pehaps you have and EV car in garage that does not really tell you how much charge it takes? If you said yes to either one follow along. 

## Intro

There is probably a dozen of ways to track energy from ready to use all-in-one devices to more developer friendly options like SmartThings. There is also an option to get components yourself and build it. This is what we're going to talk about.

[![image](/components/img/energy/energy_meter_small.jpg)](/components/img/energy/energy_meter.jpg)

## Components

After some clicking around, I found that Aeon Labs makes relativly inexpencive components that seem to work well. Originally set up consisted of two [Aeotec Home Energy Meters](http://aeotec.com/z-wave-home-energy-measure) with [USB Aeotec Z-Stick](http://aeotec.com/z-wave-usb-stick) on PC side. This means that not only I had run mac-mini all the time but also make sure that it stays up all the time. After a few month of back and forward I decided to opt out for Paspberry Pi. I got latest model, but I'm sure any model will do. 


## Tools

Again, there are many options out there, but if you are not guru software developer, Node.js and PHP are probably the easiest to pick up. Fortunately OpenZWave maintains [node-openzwave-shared](https://github.com/OpenZWave/node-openzwave-shared) library for Node.js. Node is fully capable to handle things on his own, but since I plan to run some rather complex operation on the server, I decided to keep code very simple on Node side and log data using http requests. To capture request I've picked PHP [Lumen](https://github.com/laravel/lumen) framework since I'm most familiar with Laravel. In order to build interactive dashboard we're going to use [Firebase](https://www.firebase.com/) service from Google and sprinkle some JS. So final result will look like this:

[![image](/components/img/energy/dashboard.jpg)](/meter)


## What is next

[Next we're going to setup Raspberry Pi](blog/2016/03/03/raspberrypi-with-aeotec-z-stick/) and get communication going between Raspberry Pi  and Z-Stick.