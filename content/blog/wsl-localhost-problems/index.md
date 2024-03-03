---
kicker: 'VIRTUALIZATION'
title: 'WSL Ubuntu Localhost Problems'
subtitle: 'Fix Your Problems'
date: '2021-08-25T22:12:03.284Z'
status: draft
author: EdPike365
tags:
  - WSL
  - localhost
  - Ubuntu
  - fix
  - unreachable
  - Windows
  - 'WSL 2'
---

WSL v2 (Windows Subsytem for Linux, version 2) has an ongoing major problem. When you use it to develop web apps, `localhost` is often unreachable from a web browser running in Windows.

Window's localhost is supposed to magically be mapped to Ubuntu's localhost. If you start a typical Node Express service on port 3000 on Ubuntu, then use a web browser on Windows and type `localhost:3000`, it should work.

I did not use WSL v1, but people report that it was dependable. In WSL 2, it is NOT dependable.

## Solutions, starting with the best (which is the opposite order that I found them):

1. [Disable Windows Fast Startup](https://www.windowscentral.com/how-disable-windows-10-fast-startup):
   - Somehow Fast Startup intermittantly messes up `localhost` passthrough. My hunch is that in trying to be fast, it is finalizing windows host/lmhosts config before/during the conversation with the wsl library. The magic networking config is not able to commit the magic config. If that is the case, it makes sense that if you reboot wsl (solution 2), it would fix the problem. I'll probably never confirm my theory because now that I've disabled Fast Startup, I have not had the localhost problem. Ain't nobody got time for that.
2. Reboot WSL:
   - Type `wsl --shutdown` in PowerShell (PS), then relaunch wsl and restart ubuntu.
3. Use Ubuntu's eth0 IP Address from a Windows Browser:
   - Look up and use Ubuntu's eth0 ip address. One way is typing `ip addr show eth0` in your Ubuntu shell tab (NOT PS). However, by default, that address changes every time you restart your Ubuntu, so no browser shortcut for you.
4. See how deep the rabbit hole goes:
   - Configure all sorts of host files in windows, NAT stuff, and tweak your firewall. There is something out there called, roughly, "WSL Tools" or "WSL Scripts", that **could** make all that easier. I saw it at some point but did not want to go down that rabbit hole or download some massive shell scripts. I kept looking until I found solution 3. My hunch is that it would open a whole can of irritating, and possible security related, worms. However, if you are going to actually be hosting a site on WSL Ubuntu that you want to serve on your network, I've given you a heads up to make your googling fertile. This [WSL 2 Networking](https://www.youtube.com/watch?v=yCK3easuYm4) video would definitely be helpful. Its a sad day when googling videos is more productive than reading a web page, but here we are.

## If Those Don't Work

- Make sure you can access the site from within Ubuntu. Type `curl localhost:1234` and you should get something back. If not, your service is not working.
- See what ports are being listened to by Linux: `sudo lsof -i -P -n | grep LISTEN`
- See which ports are open
- Try to telnet to it from PS in Windows.
- Maybe you have a firewall problem. If you disable Windows Firewall, and it fixes the problem, NOW you **definitely** have a firewall problem.

### Quarkus Specific

- Magic config line (this worked for me):
  > Add `quarkus.http.host=0.0.0.0` to `src\main\resources\application.properties` and restart quarkus (no magic command line args required.) Before, running `sudo lsof -i -P -n | grep LISTEN` showed java listening on `TCP 127.0.0.1:8080`. After, it shows it listening to `TCP *:8080`
- Magic command arg (this did not work):
  `./mvnw compile quarkus:dev -DdebugHost=0.0.0.0`
