---
title: "Journal: Ending 2022-01-21"
date: "2022-01-21T22:12:03.284Z"
status: draft
author: EdPike365
tags:
  - edpike365
  - "Home Lab"
  - ProxMox
  - Kubernetes
  - WiFi
---

[Log](#log-lifo) | [Articles](#articles) | [Books](#books) | [Events](#events) | [Companies/Orgs](#companies-orgs) | [People](#people) | [Training/Classes](#training) | [Definitions](#definitions-acronyms) | [Future Research](#future-research)

---

### Summary

Sys Admin Stuff: Sourcing and upgrading family hardware. Prepping my home lab to start my Kubernetes certs. Evaluating and upgrading home network to support new WiFi 6e Mesh, 2.5Gbs networking, POE+ to support security cameras.

### Log 

- Bought **2** Dell XPS 9710s 17inch laptops for my twin daughters to start college (both are BioEngineering for now). They have great tiny bezel screens so have dimensions like a 15 inch laptop. Super cool vapor chamber tech. Extremely upgradable and easy to replace the battery. 2 NVME SSD slots. 
  - These things are super expensive. I got a good deal on one from the Dell refurb warehouse and the other one was marked down because it had an odd combination of components (neither fish nor fowl). 
  - Added NVME 4 1TB SSD to the XPS that only came with 500GB.
  - Put price watches on 64GB RAM upgrade kits, WiFi 6e cards and 1 more 2TB NVME 4 (the ones that came with them were NVME 3!).
  - Added Ubuntu dual boot to both so my daughters will learn "the way".
  - Weaning them off gaming towers kicked off a PC shuffle with my son. He inherited the nicer tower and I got his PC and another older PC as Home Lab equipment.

- Prepped old (old) Intel gaming PC (aka "black-cooler-master") to be a decent ProxMox server supplying 1 or 2 Kubernetes virtual nodes (or even 1 bare metal Kubernetes node). 
  - Wiped windows off, installed ProxMox.
  - Evaluated to see if should just scrap. AsRock X79 Mobo, socket LGA 1155, i5k, DDR3 16 GB RAM, PSU 650W.
  - Considered Xeon, but no ECC support on mobo, so why bother, but needed more vCPUs...
  - Upgraded CPU from i5 4 core, no threads, to i7 4 core, which had first gen hyperthreading, so 8 logical cores. $35 on EBay.
  - Upgraded BIOS.
  - Took out graphics card to save power/noise/heat (running headless but MB has onboard video too).
  - ProxMox now reporting 8 cores available for this node.

- Chose 2.5GHz network nics to turn another old gaming PC (aka "black-corsair")

- The 2 new Home Lab towers are living under my desk for now. This kicked off a massive re-cableing, power strip upgrade (not a casual task if you take power supplies seriously), addition of sturdier cable management basket system.

- Raspberry Pi Cluster: Choosing a 4 unit one for now.
  - Learned that Pi 4B 8GB is the one to get. 4 core Arm v8s 2.4GHz, 64bit. USB C power option, mini HDMI ports.
  - Its super popular, sold out til at least Sept 2022, except for 1 scalper charging $175. I bought 1 of those to get going, but I can't stand doing that again. So now I live on EBay and instead of $35, I'm lucky to find one below $145.
  - Visited AliExpress for first time looking for old RAM, Pis and random SBCs (Single Board Computers)
  - Evaluating POE+ hats vs USB hub. These 4Bx8 units push the upper limit of 5v x 3amps. So hats have little noisy fans :-(

- Added a USB port to the front of my Lian Li air mesh. Hole was there but cable to mount it to mobo was not. It came with the wrong screws but my collection of random, but well sorted, screws saved the day.

- I continued to expand the Linux capabilities of my PixelBook Go (i7 beast). Now I have VSCode, Ansible, cloud APIs, git. I'm trying to learn to just use that for dev.

- My Pixel 5 stone cold died, upgraded to Pixel 6 pro. Lost Google Authenticator app for the first time. I had backup rescue codes for everything but NPMjs! NPM docs say they can't do anything (but check with support anyway?). I host 2 modules there and the account is "branded", so to update the modules I'd have to host them under a new account and it would be embarrassing and confusing to others. I sent the email with low hope of ever hearing back but was actually able to recover the account with their help because I could prove that I had the GitHub account where the source code came from.

- Upgraded home WiFi, began decoupling WiFi and router/gateway from the ISP's all in one WiFi Router.
  - Upgraded Google ChromeCast Ultra to a ChromeCast TV, which sadly only comes with WiFi access by default (older ones came with LAN option). Seemed to work fine the first day. Next day it was laggy, and both(?) WiFi networks were up and down. I actually think it was just a coincidence (completely removing it made no difference) but my wife was convinced that I broke something. So I:
    - Ordered a USB-C/LAN "combiner" for the ChromeCast
    - Decided to upgrade the WiFi (which was running 802ac on the old vendor wifi router)
    - Decided to not buy another wifi router, but to dive into pfsense and access points, etc, ie "home labbing".
  - I almost went with Unifi or Omada "prosumer" grade stuff, but chickened out (for now).
  - Mesh WiFi: I chose the new-ish TP-Link AXE5400 tri-band mesh 6E system with 2 units for $300. I run them in AP (access point) mode and with LAN cable "backporting". This lets me change the WiFi 6 channel to a usable one (Pixel 6 pro can use it).
  - I'll be adding an outside Deco AP once I get the wiring setup.
  
- Began Researching/Provisioning a Home Lab Router, etc.
  - I just bought some 2.5Gbps LAN NIC cards (a 4 and a 2 port) to upgrade one of the old gaming PCs into a router/firewall etc device. It will either be ProxMox with each app as a VM, but my goal is to have it running in my home Kubernetes cluster and use container versions of the popular apps that have them, otherwise run them as dedicated VMs. I get to learn about NIC passthroughs. 
  - While researching building my own router, I learned some extra stuff:
    - HCI (Hyper converged Infrastructure) also learned about "HCI" . 
    - CXL (Compute Express Link): This is a new standard for exposing server resouces at a granular level to be used by Kubernetes, etc. Starting in late 2022, all new server equipment will be supporting CXL 1 and the standard will evolve quickly. 
    - DPUs (Data(center) Processing Unit) "super smart" NICs (or for Intel, "IPUs" Infrastructure Processing Unit). They were pioneered by Amazon to offload the networking function and to turn the attached servers into truly generic cattle. They also help handle the stress of the 10/100Gbps networking world, which chews up your server CPUs otherwise: encryption, compression/decompression.
    - Giant Switches: 10Gig networking will seem trite in just a year or so.

- Built a Kubenertes cluster on "bare metal" (was actually 3 ? nodes). I was tired of trusting the "magic clusters" created by KIND and Minikube. I used . The repo is available at.


### Articles

### Books

### Events

### Companies, Orgs

### People

### Training

### Definitions, Acronyms

### Future Research

Things I ran across and thought "Oh yeah, I need to look into that sometime, but not now."
