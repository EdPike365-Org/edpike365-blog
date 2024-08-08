---
kicker: 'CLI'
title: 'Linux and PowerShell CLI in WSL: Short Guide'
subtitle: 'Useful Commands and Tips For Newbies'
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

The last char in a Powershell prompt is a greater than sign: `>`. The last char in a linux shell prompt is a dollar sign `$`.

In my instructions, when you see `PS C:\Users\yourwindowsname>`, that is a Powershell (PS) prompt for your windows user. Any text after the last `>` is what you should enter. If the user prompt is missing from the instructions, use the last one that was explicitly shown. This makes it easier to copy and paste the commands.

Over time, Powershell has implemented increasing amounts of Linux commands.

## A short list of Linux comands:

- `<anycommand> --help` will generally show helpful instructions. If you see `<xyz>`, that entire string is a place holder for an actual word, for example `ls --help`.
- `<anycommand> /some/file/path <tab>`: if a command involves a directory or file path, if you start typing, `<tab>` will usually try to **autocomplete** the path
- `ls` (list) lists files and directories
  - folders are called directories in Linux land
  - `ls -a` will show any hidden files and directories, like ones starting with a `.`. Preceeding a folder name with a `.` is common in the Linux world.
  - `ls /some/directory/path` will list the contents of the directory.
- `cd` (change directory)
  - `cd ..` backs up a level in the directory structure
  - `cd /some/directory/path` goes straight to the directory
  - `cd ~` will take you to your **home** directory. Every user gets a home directory and normal users spend all their time there, or below there in the hierarchy.
- `cat` followed by a filepath, will show the contents of a text file.
- `clear` deletes any text on your terminal screen.

## Linux Hints:

If you are prompted to commit or continue, `[Y]n`, or similar, means pressing enter will be "yes". The capital letter is the default value.

You may need to use the `sudo` argument at the beginning of a command. `sudo` tells Linux that you are pretending to be the Linux administrator. It is required to do dangerous things and just makes you verify your password. It stands for "super user do", but many people pronounce it "sudoh", not "sudo".
