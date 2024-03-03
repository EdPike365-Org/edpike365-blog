---
kicker: 'CLI'
title: 'Linux and PowerShell CLI in WSL: Short Guide'
subtitle: 'Useful Commands and Tips'
date: '2024-01-10T22:12:03.284Z'
status: published
author: EdPike365
tags:
  - CLI
  - WSL
  - PowerShell
  - Linux
  - Bash
---

## Linux vs Windows PS Commands

In my instructions, when you see `PS C:\Users\yourwindowsname>`, that is a Powershell prompt for your user. Any text after the `>` is what you should enter. If the user prompt is missing from the instructions, you are using the last one that was explicitly shown. This makes it easier to copy and paste.

The last char in a Powershell prompt is a greater than sign: `>`. The last char in a linux shell prompt is a dollar sign `$`.

## A short list of Linux comands:

- `<anycommand> --help` will generally show helpful instructions. If you see `<xyz>`, that entire string is a place holder for an actual word, for example `ls --help`.
- `ls` (list) list files and directories (folders are called directories in Linux land). `ls -a` will show any hidden files and directories, like ones starting with a `.`.
- `cd` (change directory), `cd ..` backs up a level.
- `cat` followed by a filepath, will show the contents of a text file.
- `clear` deletes any text on your terminal screen.

Linux Hint: If you are prompted to commit or continue, `[Y]n`, or similar, means pressing enter will be "yes".

You will use `sudo`. It is explained in my [WSL Linux]() blog post. TLDR: `sudo` tells Linux that you are pretending to be the Linux administrator. It is required to do dangerous things and just makes you verify your password.
