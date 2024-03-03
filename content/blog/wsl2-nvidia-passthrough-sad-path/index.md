---
kicker: 'VIRTUALIZATION'
title: 'WSL2 and NVIDIA GPU Passthrough: The Sad Path'
subtitle: 'GPU Accelerate your Linux VMs'
date: '2024-01-10T22:12:03.284Z'
status: published
author: EdPike365
tags:
  - Windows
  - WSL2
  - NVIDIA
  - GPU
  - Ubuntu
---

    What to do when Happy Path isn't working for you.

Use GPU accleration on Windows Subsystem For Linux. This is useful for, among other things, acclerating AI jobs like Machine Learning (ML). GPU acceleration is especially useful for using AI in combination with video processing, in packages like DeepLabCut and SLEAP.

# Overview

This tutorial is written for beginners. It has acronym definitions, tech explanations, and useful asides. It was originally written to help a bio major use [Machine Vision](https://en.wikipedia.org/wiki/Machine_vision) apps to analyse lab animals.

## GPU's and AI

GPUs ([Graphical Processing Units](https://en.wikipedia.org/wiki/Graphics_processing_unit), aka Video Cards) were developed to render 3D environments for games and CAD. This requires a lot of matrix math, or Linear Algebra, and GPUs have hardware dedicated to these calculations. The graphics math objects that are being calculated are called [tensors](https://en.wikipedia.org/wiki/Tensor).

[NVIDIA](https://en.wikipedia.org/wiki/Nvidia) realized that non-graphics apps could use their GPU hardware to do "general" math computing. They created a software/hardware platform called [CUDA](https://en.wikipedia.org/wiki/CUDA) to let you write code to access the hardware for math. Only AI library code writers need to write CUDA code. Libraries like DeepLabCut and [PyTorch](https://www.run.ai/guides/gpu-deep-learning/pytorch-gpu) know how to leverage CUDA to speed up the work.

### CUDA Cores

"CUDA cores" refers to the physical units inside the GPUs that CUDA uses to compute. They are much more efficient than using generic "cores" from your [CPU](https://en.wikipedia.org/wiki/Central_processing_unit).

Different GPUs have different numbers of CUDA cores and, generally, the number per GPU is increasing rapidly.

### Tensor Cores

CUDA cores live in GPU's and are **_leveraged_** to do the AI math. **_Tensor Cores_** were designed more recently based on lessons learned from CUDA cores. Tensor cores are **_only_** meant to do AI math calculations and are very fast, though somewhat less accurate than CUDA cores. NVIDIAs [H100 Tensor Core GPU](https://www.nvidia.com/en-us/data-center/h100/) dominates the market in this field. NVIDIA CUDA gives programmers access to Tensor Cores as well as CUDA cores. See also: Google's [Tensor Process Unit (TPU)](https://en.wikipedia.org/wiki/Tensor_Processing_Unit).

## WSL 2 and GPUs

WSL (Windows Subsystem for Linux) lets you install Linux VMs that run on top of Windows. The integration is tight but resource light and largely invisible. That means you can run Linux OS's and apps without having [dual boot](https://www.tomshardware.com/how-to/dual-boot-linux-and-windows-11), a [cloud VM](https://cloud.google.com/compute/docs/create-linux-vm-instance) (virutal machine), or a seperate computer.

WSL 2 was released in May 2019. Its is much better than WSL 1 (in most ways), and continues to get better. You can compare features [here](https://learn.microsoft.com/en-us/windows/wsl/compare-versions).

Recently, WSL 2 started supporting GPU "passthrough". That means you can run apps that need to use your GPU in Linux.

Trivia: Above, passthrough is in quotes because technically the WSL2 drivers are just lightweight wrappers/linkers that send off GPU instructions to the windows graphics driver through symlinking: /lib/wsl/lib/libcuda to C:\Windows\System32\lxss\lib\libcuda. Remember this if you start getting weird error messages regarding `libcuda`. Actual GPU Passthrough in the classic sense is only for use on VM servers. Sadly, you may see documentation for actual passthrough when looking for WSL2 "passthroug".

# Windows OS Setup

Windows versionioning [is horribly confusing](https://www.tenforums.com/general-support/183979-confusion-version-numbers.html). I tried to find what minimum versions of Windows 10 and 11 you need to run WSL 2, and furthermore, which versions of the OS support GPU passthrough.

Support for WSL2:

- Windows 11
- Windows 10, version 21H2 (or 2004?) or higher, with OS Build 19041 or higher, x64 CPU

To find your version (and build) of Windows, click on your Windows search bar and enter "about your PC".

[image here]

In the example above, the OS is Windows 11 so it automatically supports WSL2. The OS build is 22621.2861.

[Update windows](https://support.microsoft.com/en-us/windows/get-the-latest-windows-update-7d20e88c-0568-483a-37bc-c3885390d212#:~:text=Also%20note%20the%20following%3A,updates%20are%20available%2C%20install%20them.) if necessary.

If your Windows needed updating, you should figure out why its was not auto-updating, but thats beyond the scope of this tutorial.

Optional: [Set Windows Taskbar to be on the left side](https://answers.microsoft.com/en-us/windows/forum/all/how-do-u-move-the-taskbar-to-the-left-side-of-the/8618c19d-2b72-4dc8-b671-83899fb3c005), rather than the center, of the screen. This makes the location of taskbar icons and the search bar more consistent, no matter how many apps are open or closed.

## Windows Terminal App

From here out, we will be opening various terminals for Linux and Powershell. **_Windows Terminal_** makes that easier but we need to install it.

Windows Terminal is much better than the default Powershell (PS) app which comes already installed. Windows Terminal is a more modern, fast, efficient, powerful, and productive terminal application for users of command-line tools and shells like Command Prompt, PowerShell, and WSL. Its main features include multiple tabs, panes, Unicode and UTF-8 character support, a GPU accelerated text rendering engine, and custom themes, styles, and configurations.

You don't **_have_** to install Windows Terminal, but from here on, I assume you have it.

- [Install Windows Terminal from MS Store](https://apps.microsoft.com/detail/9N0DX20HK701?rtc=1&hl=en-us&gl=US).

- Recommended: Pin Windows Terminal to your status bar.
  I have Powershell and Terminal pinned to my taskbar in the image below.

  image here

- Recommended: [set Windows Terminal as your default terminal app](https://learn.microsoft.com/en-us/windows/terminal/install#set-your-default-terminal-application).

# WSL 2

I have instructions below to get WSL 2 ready on Windows 11. Or you can use [Microsoft's WSL installation instructions](https://learn.microsoft.com/en-us/windows/wsl/install). If you are running Windows 10, **_definitely_** use [Microsoft's instructions](https://learn.microsoft.com/en-us/windows/wsl/install).

Microsoft has a less beginner friendly, and more gotcha prone, tutorial to [get started with GPU acceleration for ML in WSL](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gpu-compute). NVIDIA also has a [tutorial](https://docs.nvidia.com/cuda/wsl-user-guide/index.html) with similar problems. Both are still useful for fallbacks if mine is not working for you.

If you want to install WSL 2 quickly, and not learn much, go to the Microsoft Store and [install WSL from there](https://apps.microsoft.com/detail/9P9TQF7MRM4R?hl=en-us&gl=US). You will need a "Microsoft account". Optional: Make sure apps installed from the Microsoft Store [auto update](https://support.microsoft.com/en-us/windows/turn-on-automatic-app-updates-70634d32-4657-dc76-632b-66048978e51b).

If you install WSL from the store, skip down to "Ubuntu" below.

Optional: further WSL reading: [complete WSL docs](https://learn.microsoft.com/en-us/windows/wsl/), and [WSL commands](https://learn.microsoft.com/en-us/windows/wsl/basic-commands).

From here on, `WSL` means `WSL 2`.

## Linux vs Windows PS Commands

In my instructions, when you see `PS C:\Users\yourwindowsname>`, that is a Powershell prompt for your user. Any text after the `>` is what you should enter. If the user prompt is missing from the instructions, you are using the last one that was explicitly shown. This makes it easier to copy and paste.

The last char in a Powershell prompt is a greater than sign: `>`. The last char in a linux shell prompt is a dollar sign `$`.

A short list of Linux comands:

- `<anycommand> --help` will generally show helpful instructions. If you see `<xyz>`, that entire string is a place holder for an actual word, for example `ls --help`.
- `ls` (list) list files and directories (folders are called directories in Linux land). `ls -a` will show any hidden files and directories, like ones starting with a `.`.
- `cd` (change directory), `cd ..` backs up a level.
- `cat` followed by a filepath, will show the contents of a text file.
- `clear` deletes any text on your terminal screen.

## Get Existing WSL Installation Info

Before we start making changes, lets gather some info about the current state of your WSL.

Open Windows Power Shell (i.e. PS).

Check if WSL is installed. Enter:
`PS C:\Users\yourwindowsname>wsl`

If WSL is not working, it will say that `wsl` is not recognized.

If WSL is working, you will be logged into a special Linux terminal prompt like:

`yourlinuxname@computername:/mnt/c/Users/yourwindowsname$`

The `/mnt/c/Users/yourwindwsname` is your **_Windows_** user folder. It is [mounted](https://www.ibm.com/docs/ru/aix/7.1?topic=systems-mounting) (hence `mnt`) into your Linux VM.

If you type `ls` (list), you will see the files in the directory (called folders in Windows). If you navigate to the folder using the normal Windows file browser, you will see the same files. In either case, you should see your personal standard windows folders: Desktop, Downloads, etc.

I called this terminal prompt "special" because opening at a mount path is not normal. If you open a Linux terminal tab in Windows Terminal, the prompt will look like `yourlinuxname@computername:~$`. The mnt path `/mnt/c/Users/yourwindowsname` is replaced with the `~` (tilda) sign. The tilda key is in the upper left corner of your keyboard. Tilda is a special symbol for a user's Linux user [home directory](https://www.javatpoint.com/linux-home-directory).

Type `exit` to exit the wsl linux command prompt from within PS. It can take a second or two to exit, so don't spam `exit` or you might exit the Windows Terminal PS tab as well.

Run `PS C:\Users\yourwindowsname>wsl --version`

You should leave this PS tab open and not use it again. We want to keep the info form our old WSL state so we can look at it later if we want to.

## Install or Update WSL

Open **_an additional_** Windows Power Shell (i.e. PS) tab in .

If, above, WSL was NOT installed:

- Install it: `wsl --install`

  Beginning in Windows version (OS build?) 19044 or higher, running the `wsl --install` command will, behind the scenes, install WSL from the [Microsoft Store](https://apps.microsoft.com/search?query=wsl+ubuntu&hl=en-us&gl=US). In the old days (and in many old tutorials), using `wsl --install` was called "manual installation" and installed WSL differently from using the Microsoft Store installation. These days, they both install from the MS Store.

  In addition to WSL, this will install the default MS (Microsoft) "Ubuntu" distribution. The version will be whatever version of Ubuntu is the highest current Ubuntu LTS release in the Microsoft Store. The store may take a few days to list the latest Canonical Ubuntu LTS. As of Jan 2024, thats Ubuntu 22.04.

If WSL was already installed:

- Upgrade it to the latest: `wsl --update`

  If the old version was installed "manually", it will be automatically updated to the MS Store version.

Once WSL is installed or updated, see what version it is and compare it to the PS shell that we created earlier. Enter:
`PS C:\Users\yourwindowsname>wsl --version`

You will see something like:

```text
WSL version: 2.0.9.0
Kernel version: 5.15.133.1-1
WSLg version: 1.0.59
MSRDC version: 1.2.4677
Direct3D version: 1.611.1-81528511
DXCore version: 10.0.25131.1002-220531-1700.rs-onecore-base2-hyp
Windows version: 10.0.22621.2861
```

NOTE: The above came from a machine running Windows 11 pro, but it shows Windows version 10. Thats because Windows 11 is actually "Windows 10" with a subversion (or OS build) of 22000 or higher. Even more crazily, if you dig a little deeper, you'll find [both 10 and 11 are actually Windows NT](https://superuser.com/questions/1744404/why-does-windows-10-list-windows-nt-as-os). Personally, if it were not for gaming, I'd only use Linux.

To see more details on the Linux **_Kernel version_**, enter: `PS C:\Users\yourusername>wsl cat /proc/version`

You will see something like:

`Linux version 5.15.133.1-microsoft-standard-WSL2 (root@1c602f52c2e4) (gcc (GCC) 11.2.0, GNU ld (GNU Binutils) 2.37) #1 SMP Thu Oct 5 21:02:42 UTC 2023`

    Useful Trivia: Microsoft is mentioned in the string above because they build their own Linux kernel from the latest stable branch of the mainstream [Linux kernel](https://en.wikipedia.org/wiki/Linux_kernel). It is modified to make WSL2 magic work.

    The "Linux version" mostly matches the "Kernel version" from above. Linux and Kernel are used almost interchangeably in various WSL docs on the internet. This can be confusing. The "Kernel version" refers to the generic Linux kernel that Microsft's custom "Linux version" was based on. Any WSL Linux VM uses the listed kernel version.

NOTE: The `cat /proc/version` command above, followed by a filepath, will show the contents of a text file. It is a Linux command, but we can use it in PowerShell. Modern Windows PS lets you use some Linux commands like `cat`. Future versions of Windows might run on customized Linux kernels, as VMs, to support legacy Windows apps, letting Windows evolve more quickly as a flavor of Linux (e.g. Ubuntu).

The kernel version that supports GPU passthrough is `5.10.43.3` or higher.

If you just updated wsl, compare the info between this PS tab and the earlier PS tab from when we started.

It is strongly recommended that you **_reboot Windows_** at this point. That does NOT mean only close Windows Terminal, but to **_reboot the entire Windows OS_**.

## WSL Ubuntu VMs

Open a PS tab in Windows Terminal.

List the VM's that you already have in PS with `wsl -l`. If you have not modified your WSL installation, you should see:

```
PS C:\Users\yourwindowsuser> wsl -l
Windows Subsystem for Linux Distributions:
Ubuntu (Default)
```

The "Ubuntu" listed is the default one that comes with WSL. It is listed in the [MS Store](https://apps.microsoft.com/search?query=wsl+ubuntu&hl=en-us&gl=US) as "Ubuntu". The version that it actually installs changes over time. It is actually just a convenience label, or placeholder, that will actually install the highest LTS version of Ubuntu. In the list from the MS store below, that will be Ubuntu 22.04.03 LTS.

[image here]

The `(Default)` that follows "Ubuntu" means its the default VM that will be launched if you type `wsl` in the PS prompt.

To see your Ubuntu VM version, **_open an Ubuntu tab_** in Windows Terminal and run `$lsb_release -a`. You will see something like:

```bash
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.2 LTS
Release:        22.04
Codename:       jammy
```

### Automatic Updates

WSL 2 will be automatically updated by the MS Store. That will update wsl.exe and the shared MS Linux Kernel. HOWEVER, it will not update the actual virtual machines (VMs).

### Optional: Install an Additional VM

You can install various [versions of Linux in WSL](https://learn.microsoft.com/en-us/windows/wsl/compare-versions).

You can install it from the [Microsoft Store](https://apps.microsoft.com/search?query=wsl+ubuntu&hl=en-us&gl=US), or use the directions below to do it with the command line.

- Open a PS (Powershell) tab
- List the available VMs: `wsl --list --online` (or wsl -l -o)

```bash
PS C:\Users\edpik> wsl --list --online
The following is a list of valid distributions that can be installed.
Install using 'wsl.exe --install <Distro>'.

NAME                                   FRIENDLY NAME
Ubuntu                                 Ubuntu
Debian                                 Debian GNU/Linux
kali-linux                             Kali Linux Rolling
Ubuntu-18.04                           Ubuntu 18.04 LTS
Ubuntu-20.04                           Ubuntu 20.04 LTS
Ubuntu-22.04                           Ubuntu 22.04 LTS
OracleLinux_7_9                        Oracle Linux 7.9
OracleLinux_8_7                        Oracle Linux 8.7
OracleLinux_9_1                        Oracle Linux 9.1
openSUSE-Leap-15.5                     openSUSE Leap 15.5
SUSE-Linux-Enterprise-Server-15-SP4    SUSE Linux Enterprise Server 15 SP4
SUSE-Linux-Enterprise-15-SP5           SUSE Linux Enterprise 15 SP5
openSUSE-Tumbleweed                    openSUSE Tumbleweed
```

The "Ubuntu" option will install the highest Ubuntu LTS version listed in the store. Above, 'Ubuntu' is identical to installing 'Ubuntu-22.04'. Details [here](https://devblogs.microsoft.com/commandline/upgrading-ubuntu/).

Install Ubuntu 20: `wsl --install -d Ubuntu-22.04`

Confirm that its installed: `wsl -l -v`

```text
  NAME            STATE           VERSION
* Ubuntu          Running         2
  Ubuntu-20.04    Running         2
```

The `*` marks the default VM.

Optional: Set Ubuntu-20.04 to be the default VM `wsl --set-default Ubuntu-20.04`.

Verify the change: `wsl -l -v`

TODO
Ubuntu's instructions to [install Ubuntu on WSL2 and get started with graphical applications](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-11-with-gui-support#1-overview). Follow the "Microsoft Store" path.

## Configure Ubuntu VMs

### Updating Your VMs

Neither Windows nor the MS Store will automatically [update or upgrade](https://www.cyberciti.biz/faq/upgrade-update-ubuntu-using-terminal/) your Linux distribution(s). If you just now installed your VMs, skip this.

- Open an Ubuntu tab in MS Terminal.
- Refresh the list of available updates: `sudo apt update`
- Apply all the availabe updates: `sudo apt upgrade`

We'll implement some of the [advanced settings configuration in WSL](https://learn.microsoft.com/en-us/windows/wsl/wsl-config).

### Enable SystemD on Ubuntu

SystemD has been the default service manager since Debian 8/Ubuntu 15 in 2015 ish. It was not available in WSL1. WSL2 VMs support it, but disables it by default at time of writing.

You can and should enable SystemD unless you are running on an extremely performance constrained computer. Code examples for Ubuntu almost always assume you have are running systemd and can use `systemctl`. SystemD is going to make your life much easier but it will slow down your WSL bootup, and take a bit more RAM.

Each VM has a special file in its file system, `/ect/wsl.conf`, that WSL uses when launching that VM. That file is where we set our `systeemd=true` flag.

- Launch Windows Powershell (PS)

- Then launch WSL in command line mode: `PS C:\Users\yourusername> wsl`

  This will change the PS prompt to a special bash prompt, mounted to our Windows user folder: `yourlinuxname@yourcomputer:/mnt/c/Users/yourwindowsname$`

- Check if the conf file exists:

```bash
  $ cat /etc/wsl.conf
  cat: /etc/wsl.conf: No such file or directory
```

- If the file does not exist, paste and run this:

```bash
  {
  cat <<EOT
  [boot]
  systemd=true
  EOT
  } | sudo tee /etc/wsl.conf
```

- Sudo will cause a password prompt, then results are "teed" out to the CLI:

```bash
[sudo] password for yourlinuxname:
[boot]
systemd=true
```

- If `/etc/wsl.conf` DOES already exists, add the `systemd=true` flag manually and save. The text editor [nano](https://linuxize.com/post/how-to-use-nano-text-editor/) is included in Ubuntu by default and is easier to use than `vim`.

```bash
$ nano /etc/wsl.conf
```

- In nano, edit, save, and exit: `ctrl+w` (write to file) then `ctrl+x` (exit)

Confirm file content:

```bash
 $ cat /etc/wsl.conf
 [boot]
 systemd=true
```

- Exit WSL, restart WSL:

```bash
$ exit
logout
PS C:\Users\edpik> wsl --shutdown
PS C:\Users\edpik> wsl
```

- Use this script to check if SystemD is running:

```bash
systemctl --no-pager status user.slice > /dev/null 2>&1 && echo 'OK: Systemd is running' || echo 'FAIL: Systemd not running'
```

You should get `OK: Systemd is running`

## Optional: Customize Windows Terminal

### Default Terminal Profile

[Microsofts directions to set your Default Profile/VM](https://learn.microsoft.com/en-us/windows/terminal/install#set-your-default-terminal-profile).

When you open Windows Terminal, a tab opens automatically, showing the "default" terminal. The terminal types are called "profiles". The default is originally "Powershell", but it can be changed to "Ubuntu xyz", "Azure Cloud Shell", etc. To change which profile opens by default when you open Windows Terminal:

https://learn.microsoft.com/en-us/windows/terminal/install#set-your-default-terminal-profile

- open Windows Terminal
- open settings
- Click on "Startup" in the left nav pane
- Set the version in the "Default profile" selector widget
  NOTE: you will likely see "Ubuntu" listed, as well as specific "Ubuntu xyz" versions. This is confusing. The "Ubuntu" version will not show up in the "+" button to create a new tab. If you open the Windows Terminal JSON Config (instructions below), you will note that `"hidden": true,`. The entire generic "Ubuntu" option here and in the MS Store is confusing and should be removed IMHOP.
- Save

### Custom Profile Names

Changing the name of a **_single terminal tab_**:

- right click on the tab
- select "Rename Tab"
  - This only sets it for that single tab. New tabs for the same VM will have the original name. This approach does not scale.

You can control the **_tab name and/or icon_** for **_every tab_** of a particular profile. This is especially helpful if you have installed multiple instances of the same Ubuntu VM:

- open Windows Terminal
- open settings
- look in the lower left corner and click on "Open JSON File".
- Use [Dynamic profiles in Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/dynamic-profiles) to make changes.
- Use [Why isn't it possible to install multiple instances of a given distro without using hacks/workarounds?](https://github.com/microsoft/WSL/issues/9977) to give different tab names to different installations of the same version of Ubuntu VM.

## GPU Drivers For Windows OS

NVIDIA drivers for Windows 11, or Windows 10 version 21H2, should support [DirectML](https://learn.microsoft.com/en-us/windows/ai/directml/dml-intro) and passthrough. Update your GPU drivers on **WINDOWS** to the latest ones using the below methods, in order of ease:

Option 1: Use GeForce Experience:

- Already installed?

  - Use the NVIDIA tray icon, usually found in the "hidden icons" area on the right side of your task bar
    - Right Click on it and choose `NVIDIA Geforce Experience`

- Not installed? Install at [GeForce Experience](https://www.nvidia.com/en-gb/geforce/geforce-experience/?ncid=afm-chs-44270&ranMID=44270&ranEAID=kXQk6*ivFEQ&ranSiteID=kXQk6.ivFEQ-kLwAZYidNlqv.KYDdfyokQ)

- Once opened:
  - option 1: click Drivers -> "Check for updates" will be in the top middle
  - option 2: click on the gear symbol in upper right corner, in the "general" tab, at the bottom, check the "DOWNLOADS" box

Option 2: Install manually From Web: [using your GPU info](https://www.nvidia.com/download/index.aspx)

- You should get and accept the option to install GeForce Experience which can do auto updates.

Option 3: Use Windows Update: "check for updates"
Option 4: [Use Windows Device Manager](https://support.microsoft.com/en-us/windows/update-drivers-manually-in-windows-ec62f46c-ff14-c91d-eead-d7126dc1f7b6#:~:text=In%20the%20search%20box%20on,Select%20Update%20Driver.): right click on your NVIDIA card, select update driver

## CUDA on WSL

If you like marketing talk, NVIDIA explains [why CUDA on WSL is awesome](https://developer.nvidia.com/cuda/wsl).

Since roughly September 2020, NVIDIA GPU drivers for Windows support WSL, include [CUDA](https://developer.nvidia.com/about-cuda), traditional [DirectX](https://en.wikipedia.org/wiki/DirectX), **_and_** the newer [Direct ML](https://learn.microsoft.com/en-us/windows/ai/directml/dml-intro) support.

Once a Windows NVIDIA GPU driver is installed on the system, CUDA automatically becomes available within WSL (if you are running version `5.10.43.3`, as described above). The CUDA driver installed on Windows host will be stubbed, or sym linked, inside the WSL as `libcuda.so`, therefore users _**MUST NOT**_ install any NVIDIA GPU Linux driver **_within_** WSL. It will override the symlink and passthrough with CUDA will not work.

If you need more help, read Microsoft's [Enable NVIDIA CUDA on WSL](https://learn.microsoft.com/en-us/windows/ai/directml/gpu-cuda-in-wsl). Go to NVIDIAs [WSL User Guide](https://docs.nvidia.com/cuda/wsl-user-guide/index.html) for more information, though it is incomplete and a little confusing.

### Test That Passthrough Works

We are running 2 tests.

#### Test With nvidia-smi

NVIDIA has an app called `nvidia-smi`. SMI is short for [System Management Interface](https://developer.nvidia.com/nvidia-system-management-interface).

If run `nvidia-smi.exe` from within a windows directory, even from your Ubuntu VM command prompt, it will show the **_Windows OS_** processes running on your GPU. In your Ubuntu prompt, copy, paste `/mnt/c/Windows/system32/nvidia-smi.exe`, then press enter:

screenshot here

If passthrough to WSL is working, you should be able to run it from an Ubuntu command prompt as `nvidia-smi` and get similar results showing what apps it is running inside the current **_Ubuntu VM OS_**. However the list will probably be shorter:

screenshot here

#### Test with TensorFlow and Python

Microsoft has a tutorial that ends with a quick TensorFlow (TF) test of your setup. Its worth doing that part because our goal is to use DeepLabCut and it uses TF under the blankets.

Note that I'm using the Anaconda normal installation, not miniconda, but it is totally compatible with the TF test. The test is halfway down the page at https://docs.microsoft.com/en-us/windows/win32/direct3d12/gpu-tensorflow-wsl. I've reproduced it here:

**_Step 1: Install Anaconda in Ubuntu_**

- Open an Ubuntu terminal in Windows Terminal.
- Before you follow the [instructions to install Anaconda on Linux](https://docs.anaconda.com/free/anaconda/install/linux/), check out these helpful tips:
  - Ubuntu is in the "Debian" family
  - If you are running Windows and a GPU, you are running "Linux x86".
  - I recommend setting auto_activate_base to False unless you only plan to use this VM for Anaconda stuff. If you do make it activate by default, everything should still work but it will be slower and possibly confusing when you launch the VM to do other things.

**_Step 2: Install Tensorflow_**

Tensorflow is picky about its enviroment, e.g. the version of Python, etc. We will isolate those dependencies in their own enviroment.

| NOTE: `pip install` installs software at the global level of your VM, so it's accessible to any Anaconda env. `conda install` only installs software libraries, or modules, in the current Anaconda environment, which will have its own directory that holds the environments installed libraries. TODO make sure this is true.

Create an Anconda environment (aka "env"), and activate it:

```bash
conda create --name directml python=3.6

conda activate directml

pip install tensorflow-directml
```

**_Step 3: Run the Test_**

Verify that it runs correctly by adding two tensors. You will need iPython. It is already installed in the default "base" env, but not in any additional environments, like our new `directml` env. The `directml` env does not have it so we have to install it before we can use it:

```bash
conda install ipython

ipython
```

You are now in an interactive python environment and you can paste the code below to run the test. It makes TensorFlow (tf) create some matrixes. It will look odd, with `...` between lines, but it runs.

```python
import tensorflow.compat.v1 as tf

tf.enable_eager_execution(tf.ConfigProto(log_device_placement=True))

print(tf.add([1.0, 2.0], [3.0, 4.0]))
```

Output should look like, with minor variations. You may have an additonal tf compatible adapter, e.g. an Intel video device that is on your motherboard and used when you are not running your GPU. This is typical on a laptop to save battery power. Apparently, it can also be leveraged to help do tensor calculations (linear algebra).

```python

// some driver loading messages here...

2020-06-15 11:27:18.235973: I tensorflow/core/common_runtime/dml/dml_device_factory.cc:45] DirectML device enumeration: found 1 compatible adapters.

2020-06-15 11:27:18.240065: I tensorflow/core/common_runtime/dml/dml_device_factory.cc:32] DirectML: creating device on adapter 0 (NVIDIA xyz)

2020-06-15 11:27:18.323949: I tensorflow/stream_executor/platform/default/dso_loader.cc:60] Successfully opened dynamic library libdirectml.so.ba106a7c621ea741d21598708ee581c11918380

2020-06-15 11:27:18.337830: I tensorflow/core/common_runtime/eager/execute.cc:571] Executing op Add in device /job:localhost/replica:0/task:0/device:DML:0

tf.Tensor([4. 6.], shape=(2,), dtype=float32)
```

## Gotchas about "Compiling New CUDA Apps"

This article is NOT about creating new CUDA apps, but it **is** worth noting two big gotchas if you try to set up a CUDA **_development_** env or if you are reading other tutorials about using GPU passthrough in general.

1. Do NOT confuse the **_CUDA Toolkit_** for the **_Host OS GPU Driver_** OR the **_NVIDIA Container Toolkit_** (explained below). Some of the docs out there are **_mushy_** and you can easily get mislead into similar use cases, like using CUDA on standalone Linux servers, or CUDA containers on Kubernetes nodes. If you are not careful you will nuke your Windows/WSL ecosystem.

2. One has to be very careful here as the default CUDA Toolkit comes packaged with a driver, and it is easy to overwrite the WSL 2 NVIDIA driver, inside the Ubuntu VM, with the default installation. IF you actually are interested in developing CUDA apps on WSL, use the special separate CUDA Toolkit for WSL 2 (Ubuntu) available from the [CUDA Toolkit Downloads](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0) page to avoid this overwriting.

### Compiling New CUDA Apps

This article is NOT about creating new CUDA apps, but it **is** worth noting two big gotchas if you try to set up a CUDA **_development_** env or if you are reading other tutorials about using GPU passthrough in general.

1. Do NOT confuse the **_CUDA Toolkit_** for the **_Host OS GPU Driver_** OR the **_NVIDIA Container Toolkit_** (explained below). Some of the docs out there are **_mushy_** and you can easily get mislead into similar use cases, like using CUDA on standalone Linux servers, or CUDA containers on Kubernetes nodes. If you are not careful you will nuke your Windows/WSL ecosystem.

2. One has to be very careful here as the default CUDA Toolkit comes packaged with a driver, and it is easy to overwrite the WSL 2 NVIDIA driver, inside the Ubuntu VM, with the default installation. IF you actually are interested in developing CUDA apps on WSL, use the special separate CUDA Toolkit for WSL 2 (Ubuntu) available from the [CUDA Toolkit Downloads](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0) page to avoid this overwriting.

[Anaconda and Jupyter Notebook Install Instructions - Ubuntu & Windows+WSL](https://mas-dse.github.io/startup/anaconda-ubuntu-install/)

GPU Passthrough

Any **_current_** version of Windows 11 should work for GPU passhthrough as long as you have the correct GPU drivers (below). If you are runing Windows 10, you need `version` 21H2 or greater, and `OS build` greater than `20145`.
