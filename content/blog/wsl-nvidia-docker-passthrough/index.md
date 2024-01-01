# WSL, NVIDIA GPU Passthrough, Docker, and ML

Use GPU Acclerated Docker Containers on Windows Subsystem For Linux 2 (WSL) to run Machine Learning jobs With TensorFlow, Machine Learning, and DeepLabCut.

WSL (Windows Subsystem for Linux) lets you install Linux VMs that run on top of Windows. The integration is tight but largely invisible.

WSL 2 was released in May 2019. Its was much better than WSL 1, and continues to get better. Recently, WSL 2 started supporting GPU passthrough.

The specific version of `wsl.exe` that supports GPU passthrough is `5.10.43.3` or higher. Use my short instructions below, or, if you are running Windows 10, use [Microsoft's verbose version](https://learn.microsoft.com/en-us/windows/wsl/install).

This tutorial is written for beginners. Microsoft has a tutorial much like this one to [Get started with GPU acceleration for ML in WSL](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gpu-compute)

## Windows OS

- Use the Windows search bar with "about your PC".
- Any version of Windows 11 should work for GPU passhthrough. If you are runing Windows 10, you need `OS build` greater than `20145`. If not, you need to figure out why its not updating, but thats beyond the scope of this tutorial.
- Update windows if necessary.

## WSL 2

Microsoft's WSL installation instructions can be found [here](https://learn.microsoft.com/en-us/windows/wsl/install).

| Further reading on wsl: [complete docs](https://learn.microsoft.com/en-us/windows/wsl/), and [WSL commands](https://learn.microsoft.com/en-us/windows/wsl/basic-commands).

### Check For Existing Installation

Open Windows Power Shell (e.g. PS).

    NOTE: When you see `PS C:\Users\yourusername>`, that is a Powershell prompt for your user. Any text after that is what you should enter. If the user prompt is missing, you are using the last one that was explicitly shown.

Check if WSL is installed. Enter:
`PS C:\Users\yourusername>wsl`

If working you will be logged into a linux prompt like:

`yourusername@fractal2-win:/mnt/c/Users/edpik$`

Unlike the last char in Powershell `>`, the last char in a linux shell is a dollar sign `$`.

To exit wsl from within PS, type `exit`.

### Install or Update WSL

If WSL is already installed:

- List wsl details so we can compare after update: `wsl --version`
- Upgrade wsl to the latest: `wsl --update`

If WSL is NOT installed:

- Install it: `wsl --install`

  This will install the default MS Ubuntu distribution. This tutorial uses a different distribution: Ubuntu 22.04, and we'll install it a little later.

Once WSL is installed or updated, see what version it is. Enter:
`PS C:\Users\yourusername>wsl --version`

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

    NOTE: Windows 10 and 11 have a version number of 10, but windows 11 is subversion 22000 or higher.

To see more details on the Linux Kernel version, enter: `PS C:\Users\yourusername>wsl cat /proc/version`

You will see something like:

`Linux version 5.15.133.1-microsoft-standard-WSL2 (root@1c602f52c2e4) (gcc (GCC) 11.2.0, GNU ld (GNU Binutils) 2.37) #1 SMP Thu Oct 5 21:02:42 UTC 2023`

Notice that the "Linux version" mostly matches the "Kernel version" from above. Linux and Kernel are used **_almost_** interchangeably. This can be confusing.

Verify installation and the installed versions: `wsl -v`

It is strongly recommended that you reboot Windows at this point.

From here on, `WSL` means `WSL 2`.

### Step: Install an Ubuntu VM

You can install various versions of Linux in WSL, but we are using Ubuntu 22 here. You can install them from the microsoft store, or use the directions below.

- Open Powershell
- List the available VMs: `wsl --list -online` (or wsl -l -o)
- Install Ubuntu 22: `wsl --install -d Ubuntu-22.04`
- Confirm that its installed: `wsl -l -v` TODO what is -l
- Optional: Set it to the default VM `wsl --set-default Ubuntu-22.04`
- Verify WSL status: `wsl --status`

### Step: Install Windows Terminal

From here out, we will be opening various terminals for Linux and Powershell. **_Windows Terminal_** makes that easier but we need to install it.

Windows Terminal is much better than Powershell. Windows Terminal is more modern, fast, efficient, powerful, and productive terminal application for users of command-line tools and shells like Command Prompt, PowerShell, and WSL. Its main features include multiple tabs, panes, Unicode and UTF-8 character support, a GPU accelerated text rendering engine, and custom themes, styles, and configurations.

You don't have to install Windows Terminal, but from here on, I assume you have it.

- [Install Windows Terminal](https://apps.microsoft.com/detail/9N0DX20HK701?rtc=1&hl=en-us&gl=US).
  https://learn.microsoft.com/en-us/windows/terminal/install
- Recommended: [set Windows Terminal as your default terminal app](https://learn.microsoft.com/en-us/windows/terminal/install#set-your-default-terminal-application).
- Recommended: [set Ubuntu 22 as your Default Profile](https://learn.microsoft.com/en-us/windows/terminal/install#set-your-default-terminal-profile).

### Configure Ubuntu

Windows does not automatically update or upgrade your Linux distribution(s). Open an Ubuntu tab in MS Terminal and run:

`sudo apt update`

`sudo apt upgrade`

Make sure your Linux kernel version is `4.19.121` or higher: `wsl cat /proc/version`.

#### Enable SystemD on Ubuntu

SystemD has been the default service manager since Debian 8/Ubuntu 15 in 2015 ish. WSL disables it by default, but you can turn it back on. Code examples for Ubuntu almost always assume you have are running systemd and can use `systemctl`. SystemD is going to make your life much easier but it will slow down your WSL bootup, and take a bit more RAM.

Each VM has a special file in its file system, `/ect/wsl.conf`, that WSL uses when launching that VM. That file is where we set our `systeemd=true` flag.

- Launch Windows Powershell (PS)

- Then launch WSL in command line mode: `PS C:\Users\yourusername> wsl`

  This will change the PS prompt to a special bash prompt, mounted to our Windows user folder: `edpike365@fractal2-win:/mnt/c/Users/edpik$`
  We did not specify the VM, so it launches the default that we set above: Ubuntu 22.

- Check if the conf file exists. If it doesn't, create the file and add our systemd flag with a script:

  ```bash
  edpike365@fractal2-win:/mnt/c/Users/edpik$ cat /etc/wsl.conf
  cat: /etc/wsl.conf: No such file or directory
  ```

  If not, paste and run this:

  ```bash
  {
  cat <<EOT
  [boot]
  systemd=true
  EOT
  } | sudo tee /etc/wsl.conf
  ```

  Sudo will cause a password prompt, then results are "teed" out to the CLI:

  ```bash
  [sudo] password for edpike365:
  [boot]
  systemd=true
  ```

  If `/etc/wsl.conf` already exists, add the `systemd=true` flag manually and save. The text editor [nano](https://linuxize.com/post/how-to-use-nano-text-editor/) is included in Ubuntu by default and is easier to use than `vim`.

  ```bash
  edpike365@fractal2-win:/mnt/c/Users/edpik$ nano /etc/wsl.conf
  ```

  Edit, save, and exit: `ctrl+w` (write to file) then `ctrl+x` (exit)

  Confirm file content:

  ```bash
  edpike365@fractal2-win:/mnt/c/Users/edpik$ cat /etc/wsl.conf
  [boot]
  systemd=true
  ```

- Exit WSL, restart WSL:

```bash
(base) edpike365@fractal2-win:/mnt/c/Users/edpik$ exit
logout
PS C:\Users\edpik> wsl --shutdown
PS C:\Users\edpik> wsl
```

- Use this script to check if SystemD is running:

```bash
systemctl --no-pager status user.slice > /dev/null 2>&1 && echo 'OK: Systemd is running' || echo 'FAIL: Systemd not running'
```

You should get `OK: Systemd is running`

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

### Compiling New CUDA Apps

This article is NOT about creating new CUDA apps, but it **is** worth noting two big gotchas if you try to set up a CUDA **_development_** env or if you are reading other tutorials about using GPU passthrough in general.

1. Do NOT confuse the **_CUDA Toolkit_** for the **_Host OS GPU Driver_** OR the **_NVIDIA Container Toolkit_** (explained below). Some of the docs out there are **_mushy_** and you can easily get mislead into similar use cases, like using CUDA on standalone Linux servers, or CUDA containers on Kubernetes nodes. If you are not careful you will nuke your Windows/WSL ecosystem.

2. One has to be very careful here as the default CUDA Toolkit comes packaged with a driver, and it is easy to overwrite the WSL 2 NVIDIA driver, inside the Ubuntu VM, with the default installation. IF you actually are interested in developing CUDA apps on WSL, use the special separate CUDA Toolkit for WSL 2 (Ubuntu) available from the [CUDA Toolkit Downloads](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0) page to avoid this overwriting.
