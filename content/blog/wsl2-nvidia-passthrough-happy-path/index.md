---
kicker: 'VIRTUALIZATION'
title: 'WSL2 and NVIDIA GPU Passthrough: The Happy Path'
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

Run a Linux Virtual Machine (VM) from within Windows using Windows Subsystem For Linux v2 (WSL2). Enable your NVIDIA GPU to acclerate your Linux apps.

## Why Use Virtual Machines?

Software projects, including ones running in abstraction layers like Anaconda, can still manage to corrupt your Windows environment, or almost worse, make you **_think_** that you **_might have_**. That can lead you down a path of uninstalling/reintstalling various apps, or even Windows itself, when some app stops working correctly **_maybe_** after you installed some software package in pip, etc., or installing a full app that you needed for work or school. Or **_maybe_** a Windows or NVIDIA or Anaconda, or who knows what, update ran and broke the app that way. You are unlikely to know for sure. Worse yet, you are more likely to cause a problem when you are rushing, half asleep, to meet a deadline. Now you are now in hell.

That is why, if at all possible, you should work in virtual environments (<a target="_blank" href="https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-virtual-machine">VMs</a> or <a target="_blank" href="https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-container">containers</a>) when possible. They completely isolate Windows OS, and the apps, like most games, that can only run natively installed (**_not_** in a virtual enviroment). VMs and containers can be destroyed and rebuilt much more easily. Any damage is **_contained_**.

This lets you keep Windows pristine (and ready to game) while also being able to have software projects. NVIDIA <a target="_blank" href="https://docs.nvidia.com/cuda/wsl-user-guide/index.html#getting-started-with-cuda-on-wsl">agrees</a>.

Once you master using GPU accelerated Linux VMs, you can completely seperate your Windows Gaming environment from your Linux working environments, like an Operating System <a target="_blank" href="https://www.thenationalnews.com/lifestyle/fashion/a-brief-history-of-the-mullet-business-up-front-and-party-at-the-back-1.1157460">mullet</a>.

# Why I Wrote This

This tutorial is written for beginners **_in a hurry_**. Its TLDR all the way. It assumes that you have little to no knowledge of PowerShell, WSL, or Linux.

I wrote this because tutorials for setting up WSL are generally incomplete, out of date, or simply wrong. They are not very useful for new programmers, or non programmers who just need to get some Linux app to run "real quick".

If this tutorial doesn't work, or your situation is more complicated, or you want to understand what you are actually doing, use my tutorial: <a target="_blank" href="/blog/wsl2-nvidia-passthrough-sad-path/">WSL2 and NVIDIA GPU Passthrough: The Sad Path</a>. It points out gotchas, has acronym definitions, tech explanations, and useful asides.

## Tutorial Overview

Below, we will:

- Set up Windows 11 to run WSL2
- Install an Ubuntu 22 Linux VM
- Install Anaconda in the Linux VM
- Enable GPU passthrough
- Test it with nvidia-smi and a simple Tensorflow app

## WSL 2 and GPUs

WSL 2 <a target="_blank" href="https://learn.microsoft.com/en-us/windows/wsl/compare-versions">is much better than</a> WSL 1 in most ways. WSL 2 supports GPU "passthrough". That means you can run apps in WSL 2 Linux VMs and they will have access to your GPU.

From here on, WSL also means WSL 2.

NVIDIA is a little vague on <a target="_blank" href="https://docs.nvidia.com/cuda/wsl-user-guide/index.html#known-limitations-for-linux-cuda-applications">which GPUs support WSL 2</a>. Seems like most <a target="_blank" href="https://en.wikipedia.org/wiki/Pascal_(microarchitecture)">Pascal microarchitecture</a> or later GPUs will work, which means GTX 1060 6 GB or higher, all GTX 1070 and 1080s, with the exceptoin of "Tesla" cards. All Turing (16xx and 20xx), Ampere (30xx), and Ada Lovelace (40xx) series GPUs, both GTX and RTX, will work.

We will install NVIDIA GeForce Game Ready or NVIDIA RTX Quadro Windows 11 display driver on your system with a compatible GeForce or NVIDIA RTX/Quadro card later in the tutorial.

# Windows OS Setup

Technically, you can run WSL 2 on Windows 10, version 19041.0 or higher, but I'm going to assume you are on Windows 11.

Pro Tip: Microsoft (MS) doesn't want you to know, but you can <a target="_blank" href="https://www.howtogeek.com/871189/you-can-install-and-use-windows-11-without-a-product-key/">legally install and use Windows 11 indefinitely for free</a>. If your computer says it can't support Windows 11, be aware that it probably can if you update your BIOS.

<a target="_blank" href="https://support.microsoft.com/en-us/windows/get-the-latest-windows-update-7d20e88c-0568-483a-37bc-c3885390d212#:~:text=Also%20note%20the%20following%3A,updates%20are%20available%2C%20install%20them.">Update windows</a> if necessary, then reboot Windows.

## Windows Terminal App

From here out, we will be opening various terminals for Linux and Powershell. **_Windows Terminal_** makes that easier, but we need to install it. You don't **_have_** to install Windows Terminal, but from here on, I assume you have.

- <a target="_blank" href="https://apps.microsoft.com/detail/9N0DX20HK701?rtc=1&hl=en-us&gl=US">Install Windows Terminal from the MS Store</a>.

- Recommended: Pin Windows Terminal to your status bar:

  - Open the Start menu and search for "Windows Terminal".
  - Once you've found it, right-click on it and select "Pin to Taskbar".

- Recommended: <a target="_blank" href="https://learn.microsoft.com/en-us/windows/terminal/install#set-your-default-terminal-application">set Windows Terminal as your default terminal app</a>.

# WSL 2

WSL can be installed by PowerShell command line, or from the Microsoft Store. Until recently, the one you used was a big deal, but since Nov 2022, both methods install the same exact thing. Don't let the tutorials out there fool you.

<a target="_blank" href="https://apps.microsoft.com/detail/9P9TQF7MRM4R?hl=en-us&gl=US">Install WSL</a> from the MS Store.

<a target="_blank" href="https://apps.microsoft.com/detail/9PN20MSR04DW?hl=en-US&gl=US">Install Ubuntu 22.04.x LTS</a> from the MS Store.

**_Highly Recommended:_** My short guide to <a target="_blank" href="/blog/wsl-cli/">Linux and PowerShell CLI in WSL: Short Guide</a>. It covers the differences between using PowerShell and Linux terminals, relative Windows/Linux file paths, and list a few critical Linux commands that we use below.

    Quick Example: WSL Linux VMs map/mount to your Windows files in folders like "Desktop" and "Downloads". That means you can download a file from your web browser in Windows, into your Windows Downloads folder, and then access it from your Linux command line.

Optional: Skim the <a target="_blank" href="https://learn.microsoft.com/en-us/windows/wsl/">complete WSL docs</a>, and <a target="_blank" href="https://learn.microsoft.com/en-us/windows/wsl/basic-commands">WSL commands</a>.

**_Reboot Windows_** at this point. That means close Windows Terminal AND **_reboot the entire Windows OS_**.

## Review WSL Installation Info

<a target="_blank" href="https://pureinfotech.com/use-tabs-panes-terminal-windows-11/">Open a Windows PowerShell (PS) tab</a> in Windows Terminal.

Run `PS C:\Users\yourwindowsname>wsl --version` (starting past the `>`)

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

To know more about this info, like why Windows version says "10" even though you are running "11", go to my <a target="_blank" href="/blog/wsl2-nvidia-passthrough-sad-path/">more detailed tutorial</a>.

List the VM's that you have installed with `wsl -l -v`. If you have not modified your WSL installation, you should see:

```bash
PS C:\Users\yourwindowsuser> wsl -l -v
  NAME            STATE           VERSION
* Ubuntu-22.04    Running         2
```

The asterisk means it is the default VM that launches when you run WSL from PowerShell. This is NOT the same thing as the default terminal that launches when you run Windows Terminal.

## Review Ubuntu VM Info

To see your Ubuntu VM version, **_open an Ubuntu tab_** in Windows Terminal and run `$lsb_release -a`. You will see something like:

```bash
yourlinuxuser@yourcomputer:~$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.2 LTS
Release:        22.04
Codename:       jammy
yourlinuxuser@yourcomputer:~$
```

## Update The Ubuntu VM

The MS Store will automatically update your **_WSL software_**, and the core Linux Kernel **_but NOT your Linux VMs_**. We will update your VM manually.

You will use `sudo` (super user do). It is explained in my <a target="_blank" href="/blog/wsl-cli/">Linux and PowerShell CLI in WSL: Short Guide</a> blog post. TLDR: `sudo` tells Linux that you are pretending to be the Linux administrator. It is required to do dangerous things. It makes you verify your VM password.

- Open an Ubuntu tab in Windows Terminal.
- Refresh the list of available updates in your `apt` package manager: `sudo apt update`
- Apply all the availabe updates: `sudo apt upgrade`.

Linux Hint: If you are prompted to commit or continue, `[Y]n`, or similar, means pressing enter will be "yes".

## Enable SystemD on Ubuntu

You should enable <a target="_blank" href="https://en.wikipedia.org/wiki/Systemd">SystemD</a>. Code examples for Ubuntu almost always assume you are running systemd and can use `systemctl`, the SystemdD system control app. SystemD is going to make your life much easier but it will slow down your WSL bootup a little, and take a bit more RAM. If the instructions below are not clear enough, <a target="_blank" href="https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/">try Microsofts instructions</a>.

Each WSL VM has a special file in its own file system, `/etc/wsl.conf`. WSL uses it when launching that VM. That file is where we set our `systemd=true` flag.

- Open a Powershell (PS) tab in Windows Terminal

- Launch WSL in command line mode: `PS C:\Users\yourusername>wsl`

  This will change the PS prompt to a special bash prompt, mounted to our Windows user folder: `yourlinuxname@yourcomputer:/mnt/c/Users/yourwindowsname$`

- Check if the conf file exists:

```bash
  $ cat /etc/wsl.conf
  cat: /etc/wsl.conf: No such file or directory
```

- If the file does not exist, copy and paste the code below to your command line, then press enter:

```bash
  {
  cat <<EOT
  [boot]
  systemd=true
  EOT
  } | sudo tee /etc/wsl.conf
```

- Sudo will cause a password prompt, then the results are "teed" (copied) out to the terminal:

```bash
[sudo] password for yourlinuxname:
[boot]
systemd=true
```

- If `/etc/wsl.conf` DOES already exists you will get a file does not exist error. Add the `systemd=true` flag manually below the [boot] section and save. If the `[boot]` section does not exist, add it first; at the bottom of the file is fine.

The text editor <a target="_blank" href="https://linuxize.com/post/how-to-use-nano-text-editor/">nano</a> is included in Ubuntu by default and is easier to use than `vim`.

```bash
$ sudo nano /etc/wsl.conf
```

- In nano, edit the text
- Save the changes: `ctrl+w` (write to file). If you did not type sudo, it may not let you write to the file.
- Exit nano: `ctrl+x` (exit)

Confirm file content:

```bash
 $ cat /etc/wsl.conf
 [boot]
 systemd=true
```

- Exit the Linux VM by typing `exit` and then press the enter key. It will print out `logout`. It can take a few seconds, don't spam it:

```bash
$ exit
logout
```

- Shutdown WSL: `PS C:\Users\yourwindowsuser> wsl --shutdown` (Windows Terminal, and your tabs, will stay open)
- Restart WSL: `PS C:\Users\yourwindowsuser> wsl`

Open **_a new_** Ubuntu tab in Windows Terminal:

- Copy, paste and run this script to check if SystemD is running:

```bash
systemctl --no-pager status user.slice > /dev/null 2>&1 && echo 'OK: Systemd is running' || echo 'FAIL: Systemd not running'
```

You should get `OK: Systemd is running`

You can also check SystemD with the command `$systemctl list-unit-files --type=service` which should show your services’ status. Remember, that $ sign is there to remind you that this a Linux prompt. Do not include it in your command.

If its working, you should close the older Ubuntu tabs in Windows Terminal.

# GPU Drivers For Windows OS

NVIDIA Game Ready drivers for Windows 11, or Windows 10 version 21H2, should support <a target="_blank" href="https://learn.microsoft.com/en-us/windows/ai/directml/dml-intro">DirectML</a> and passthrough. The magic happens because the WSL VMs have a symlink to the actual Windows drivers. Update your GPU drivers on **WINDOWS** (NOT Ubuntu) to the latest drivers using the below methods, in order of ease:

## Option 1: Use GeForce Experience

- Already installed?

  - Use the NVIDIA tray icon, usually found in the "hidden icons" area on the right side of your task bar in Windows
  - Right Click on it and choose `NVIDIA Geforce Experience`

- Not installed? Install it at <a target="_blank" href="https://www.nvidia.com/en-gb/geforce/geforce-experience/">GeForce Experience</a>.

- Once opened:
  - option A: click Drivers -> "Check for updates" will be in the top middle. There may be a dropdown with an option for "Studio Drivers". Do not install those, install the Game Ready ones. We are not sure that NVIDIA studio drivers are a problem and are looking into it.
  - option B: click on the gear symbol in upper right corner, in the "general" tab, at the bottom, check the "DOWNLOADS" box

## Option 2: Install manually From the Web

- Get your <a target="_blank" href="https://www.microsoft.com/en-us/windows/learning-center/how-to-check-gpu">GPU info from Windows</a>.
- Use it to <a target="_blank" href="https://www.nvidia.com/download/index.aspx">download your driver from NVIDIA</a>.
- While you are <a target="_blank" href="https://www.avg.com/en/signal/how-to-update-graphics-drivers#:~:text=Go%20to%20the%20Nvidia%20homepage,Then%20click%20Download.">installing the drivers</a>, you should get and accept the option to install GeForce Experience. That will let you set up auto updates.

## Option 3: Use Windows Update: "check for updates"

## Option 4: Use Windows Device Manager

<a target="_blank" href="https://support.microsoft.com/en-us/windows/update-drivers-manually-in-windows-ec62f46c-ff14-c91d-eead-d7126dc1f7b6#:~:text=In%20the%20search%20box%20on,Select%20Update%20Driver.">Update Drivers manually using Windows Device Manager</a>. Right click on your NVIDIA card, select update driver

# CUDA on WSL

Since roughly September 2020, NVIDIA GPU drivers for Windows support WSL, include <a target="_blank" href="https://developer.nvidia.com/about-cuda">CUDA</a>, traditional <a target="_blank" href="https://en.wikipedia.org/wiki/DirectX">DirectX</a>, **_and_** the newer <a target="_blank" href="https://learn.microsoft.com/en-us/windows/ai/directml/dml-intro">Direct ML</a> support.

Once a Windows NVIDIA GPU driver is installed on the system, if you are running version `5.10.43.3`, CUDA automatically becomes available within WSL VMs. The CUDA driver installed on Windows host will be stubbed, or sym linked/mapped, inside the VM as `libcuda.so`, therefore users _**MUST NOT**_ install any NVIDIA GPU Linux driver **_within_** a WSL VM if you want GPU passthrough. Any Linux GPU driver will override the symlink and passthrough with CUDA will not work.

If you need more help, read Microsoft's <a target="_blank" href="https://learn.microsoft.com/en-us/windows/ai/directml/gpu-cuda-in-wsl">Enable NVIDIA CUDA on WSL</a>. Go to NVIDIAs <a target="_blank" href="https://docs.nvidia.com/cuda/wsl-user-guide/index.html">WSL User Guide</a> for more information, though it is incomplete and a little confusing.

## Test That Passthrough Works

We are running 2 tests.

### Test 1: nvidia-smi

NVIDIA has an app called `nvidia-smi`. SMI is short for <a target="_blank" href="https://developer.nvidia.com/nvidia-system-management-interface">System Management Interface</a>. You can use it get info on what your NVIDIA GPU is up too in any OS.

If you run `nvidia-smi.exe` from within a windows directory, even from your Ubuntu VM command prompt, it will show the **_Windows OS_** processes running on your GPU. In your Ubuntu tab, copy, paste `/mnt/c/Windows/system32/nvidia-smi.exe`, then press enter:

```bash
yourlinuxname@yourcomputer:~$ /mnt/c/Windows/system32/nvidia-smi.exe
Mon Jan 15 18:37:48 2023
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 546.33                 Driver Version: 546.33       CUDA Version: 12.3     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                     TCC/WDDM  | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA GeForce GTX 1660 Ti   WDDM  | 00000000:01:00.0  On |                  N/A |
|  0%   54C    P0              24W / 130W |   1513MiB /  6144MiB |      0%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
|    0   N/A  N/A      5248    C+G   C:\Windows\explorer.exe                   N/A      |
|    0   N/A  N/A      6580    C+G   ...nt.CBS_cw5n1h2txyewy\SearchHost.exe    N/A      |
|    0   N/A  N/A      6676    C+G   ...2txyewy\StartMenuExperienceHost.exe    N/A      |
|    0   N/A  N/A      7508    C+G   ...__8wekyb3d8bbwe\WindowsTerminal.exe    N/A      |
|    0   N/A  N/A      8980    C+G   ...5n1h2txyewy\ShellExperienceHost.exe    N/A      |
|    0   N/A  N/A      9580    C+G   ...siveControlPanel\SystemSettings.exe    N/A      |
|    0   N/A  N/A     11592    C+G   ...pdnekdrzrea0\XboxGameBarSpotify.exe    N/A      |
|    0   N/A  N/A     11740    C+G   ...t.LockApp_cw5n1h2txyewy\LockApp.exe    N/A      |
|    0   N/A  N/A     13872    C+G   ...oogle\Chrome\Application\chrome.exe    N/A      |
|    0   N/A  N/A     14400    C+G   ...CBS_cw5n1h2txyewy\TextInputHost.exe    N/A      |
|    0   N/A  N/A     14836    C+G   ...wekyb3d8bbwe\XboxGameBarWidgets.exe    N/A      |
|    0   N/A  N/A     15064    C+G   ...ekyb3d8bbwe\PhoneExperienceHost.exe    N/A      |
|    0   N/A  N/A     17708    C+G   ...GeForce Experience\NVIDIA Share.exe    N/A      |
|    0   N/A  N/A     18180    C+G   ...GeForce Experience\NVIDIA Share.exe    N/A      |
|    0   N/A  N/A     18868    C+G   ...ir\CORSAIR iCUE 4 Software\iCUE.exe    N/A      |
|    0   N/A  N/A     18960    C+G   ...cal\Microsoft\OneDrive\OneDrive.exe    N/A      |
|    0   N/A  N/A     19920    C+G   ...n\120.0.2210.133\msedgewebview2.exe    N/A      |
|    0   N/A  N/A     20540    C+G   ...Master\MasterPlus\MasterPlusApp.exe    N/A      |
|    0   N/A  N/A     21076    C+G   ...al\Discord\app-1.0.9030\Discord.exe    N/A      |
|    0   N/A  N/A     21764    C+G   ...\cef\cef.win7x64\steamwebhelper.exe    N/A      |
|    0   N/A  N/A     23028    C+G   ....0_x64__kzh8wxbdkxb8p\DCv2\DCv2.exe    N/A      |
|    0   N/A  N/A     24624    C+G   ... Stream\85.0.26.0\GoogleDriveFS.exe    N/A      |
|    0   N/A  N/A     26484    C+G   ...\Local\slack\app-4.36.136\slack.exe    N/A      |
|    0   N/A  N/A     28052    C+G   ...Programs\Microsoft VS Code\Code.exe    N/A      |
+---------------------------------------------------------------------------------------+
```

If passthrough to WSL is working, you should be able to run it from an Ubuntu command prompt as simply `nvidia-smi` and get similar results showing what apps are using the GPU inside the current **_Ubuntu VM OS_**. However the list will probably be shorter. Mine only has one app on Ubuntu vs almost 30 on Windows:

```bash
yourlinuxname@yourcomputer:~$ nvidia-smi
Mon Jan 15 18:36:26 2024
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 545.36                 Driver Version: 546.33       CUDA Version: 12.3     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA GeForce GTX 1660 Ti     On  | 00000000:01:00.0  On |                  N/A |
|  0%   53C    P0              24W / 130W |   1510MiB /  6144MiB |      0%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
|    0   N/A  N/A        33      G   /Xwayland                                 N/A      |
+---------------------------------------------------------------------------------------+
```

### Test 2: TensorFlow and Python

Microsoft has a tutorial that ends with a quick TensorFlow (TF) test of your setup.

Note that I'm using the Anaconda normal installation, not miniconda, but it is totally compatible with the TF test. The test is <a target="_blank" href="https://learn.microsoft.com/en-us/windows/ai/directml/gpu-tensorflow-wsl#set-up-a-python-environment">halfway down the page on MS's tutorial</a>. I've reproduced it here in a slimmed down form:

**_Step 1: Install Anaconda in Ubuntu_**

- Open an Ubuntu terminal in Windows Terminal.
- Before you follow the <a target="_blank" href="https://docs.anaconda.com/free/anaconda/install/linux/">instructions to install Anaconda on Linux</a>, check out these helpful tips:
  - Ubuntu is in the "Debian" family
  - If you are running Windows and a GPU, you are running the "Linux x86" architecture.
  - I recommend setting `auto_activate_base` to False unless you only plan to use this VM for Anaconda stuff. If you do make Anaconda activate by default, everything should still work but it will be slower and possibly confusing when you launch the VM to do other things because the Linux prompts will be preceded by the Anaconda environment name, as in `(base)yourlinuxname@yourlinuxcomputer:~$`.

**_Step 2: Install Tensorflow_**

Tensorflow is picky about its environment, i.e. the version of Python, etc. We will isolate those dependencies in their own <a target="\_blank" href="https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html">Anaconda environment</a>.

WARNING: <a target="_blank" href="https://www.anaconda.com/blog/using-pip-in-a-conda-environment">Using pip inside a conda environment</a> is problematic. `pip install` can cause tricky problems by:

- installing software at the global level of your VM instead of in the current environment directory.
- overwriting and changing the version of packages or sub-packages (dependencies) installed with `conda install`

Conda won't know anything about packages installed with pip, so conda can't manage future upgrades safely.

`conda install` only installs software libraries, or modules, in the current Anaconda environment, which will have its own directory that holds the environments installed libraries. Always use conda install if you can. Also, it is able to install supporting libraries in other languages, not just python.

If you have to use pip, use it last, and add this arg to `pip install`: "--upgrade-strategy only-if-needed"

From the <a target="_blank" href="https://www.anaconda.com/blog/using-pip-in-a-conda-environment">Anaconda docs</a>:

"Once pip is used to install software into a conda environment, conda will be unaware of these changes and may make modifications that would break the environment."

Create an Anconda environment (aka "env"), and activate it:

```bash
conda create --name directml python=3.6

conda activate directml
```

https://www.youtube.com/watch?v=0S81koZpwPA

https://www.youtube.com/watch?v=KinTNHO-6IY

**_Step 3: Install Tensorflow_**

Unfortunately, as of Jan 2024, tensorflow-directml is only available via pip. I could not find it on <a href="anaconda.org">anaconda.org</a>

```bash
pip install tensorflow-directml
```

**_Step 4: Run the Test_**

Verify that tensorflow-directml runs correctly by adding two tensors. You will need iPython. It is already installed in the default "base" env, but not in any additional environments, like our new `directml` env. The `directml` env does not have it so we have to install it before we can use it:

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

Output should look like the following, with minor variations. You may have an additonal tf compatible adapter, e.g. an Intel video device that is on your motherboard, which is used when you are not running your GPU. This is typical on a laptop to save battery power. Apparently, it can also be leveraged to help do tensor calculations (linear algebra).

```python

// some driver loading messages here...

2020-06-15 11:27:18.235973: I tensorflow/core/common_runtime/dml/dml_device_factory.cc:45] DirectML device enumeration: found 1 compatible adapters.

2020-06-15 11:27:18.240065: I tensorflow/core/common_runtime/dml/dml_device_factory.cc:32] DirectML: creating device on adapter 0 (NVIDIA xyz)

2020-06-15 11:27:18.323949: I tensorflow/stream_executor/platform/default/dso_loader.cc:60] Successfully opened dynamic library libdirectml.so.ba106a7c621ea741d21598708ee581c11918380

2020-06-15 11:27:18.337830: I tensorflow/core/common_runtime/eager/execute.cc:571] Executing op Add in device /job:localhost/replica:0/task:0/device:DML:0

tf.Tensor([4. 6.], shape=(2,), dtype=float32)
```

The `tf.Tensor([4. 6.], shape=(2,), dtype=float32)` shows that its working.

# Conclusion

Whelp, that's all for now. You should have WSL2 set up to do some cool stuff like:

- Get <a target="_blank" href="https://docs.anaconda.com/free/navigator/index.html">Anaconda Navigator</a> GUI working. It should already be installed.
  - Launch it:
    - Open a terminal window
    - Open navigator by typing `anaconda-navigator`
- Use <a target="_blank" href="https://docs.anaconda.com/ae-notebooks/user-guide/basic-tasks/apps/jupyter/index.html">Jupyter Notebook</a>.
- Use <a target="_blank" href="https://sleap.ai/">Sleap</a> or <a target="_blank" href="https://github.com/DeepLabCut/DeepLabCut?tab=readme-ov-file#why-use-deeplabcut">DeepLabCut</a> in Anaconda on your Ubuntu VM.
- Set up Docker in your WSL Linux VM and enable GPU passthrough for containers. Then you can use ML Docker Containers like:
  - <a target="_blank" href="https://github.com/DeepLabCut/DeepLabCut/tree/main/docker">DeepLabCut Containers</a>
  - <a target="_blank" href="https://cloud.google.com/deep-learning-containers">Google's Deep Learning Containers</a>
  - <a target="_blank" href="https://docs.nvidia.com/deeplearning/frameworks/user-guide/index.html">NVIDIA Deep Learning Containers</a>
  - <a target="_blank" href="https://www.docker.com/products/ai-ml-development/">Docker Hub trusted AI/ML Images</a>
