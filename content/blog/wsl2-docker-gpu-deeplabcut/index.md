---
kicker: 'ML VIRTUALIZATION'
title: 'WSL2, Docker, and NVIDIA GPU Passthrough with DeepLabCut ML'
subtitle: 'GPU Accelerate your ML Containers'
date: '2024-01-10T22:12:03.284Z'
status: published
author: EdPike365
tags:
  - WSL2
  - Docker
  - GPU
  - DeepLabCut
  - ML
---

# Docker, DeepLabCut, and GPU Passthrough

Can run for free on [Google CoLab](https://colab.research.google.com/), but you still need to create it locally.

Install docker as a demon in Ubuntu.

If you have Docker desktop, uninstall it first.

https://docs.docker.com/engine/install/ubuntu/

If you did not enable SystemD, this tutorial is good for setting Docker up to auto start anyway:
https://blog.nillsf.com/index.php/2020/06/29/how-to-automatically-start-the-docker-daemon-on-wsl2/

https://docs.docker.com/engine/install/ubuntu/

### Test Docker with Hello World

```bash

(base) edpike365@fractal2-win:~$ docker run --rm -it hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.
```

## GPU-Accelerated Containers

https://docs.nvidia.com/datacenter/cloud-native/#overview
https://docs.nvidia.com/datacenter/cloud-native/#containers-and-nvidia-gpus
https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/index.html
https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installing-the-nvidia-container-toolkit

https://docs.nvidia.com/ai-enterprise/deployment-guide-vmware/0.1.0/docker.html

### Intall the NVIDIA Container Tookit

https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installing-the-nvidia-container-toolkit

### Configure Docker To Use the Toolkit

https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installing-the-nvidia-container-toolkit

```bash
(base) edpike365@fractal2-win:~$ cat /etc/docker/daemon.json
{
  "runtimes": {
    "nvidia": {
      "args": [],
      "path": "nvidia-container-runtime"
    }
  }
}
```

### Run a Sample Workload

This pulls down and runs a plain ubuntu container using special arguments `--runtime=nvidia --gpus all` to use the nvidia runtime we created above. Then it runs `nvidia-smi` inside the container. This proves that the GPU has been passed through, into the container.

https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/sample-workload.html

```bash
(base) edpike365@fractal2-win:~$sudo docker run --rm --runtime=nvidia --gpus all ubuntu nvidia-smii
Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
a48641193673: Pull complete
Digest: sha256:6042500cf4b44023ea1894effe7890666b0c5c7871ed83a97c36c76ae560bb9b
Status: Downloaded newer image for ubuntu:latest
Sat Dec 23 20:44:15 2023
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 545.36 Driver Version: 546.33 CUDA Version: 12.3 |
|-----------------------------------------+----------------------+----------------------+
| GPU Name Persistence-M | Bus-Id Disp.A | Volatile Uncorr. ECC |
| Fan Temp Perf Pwr:Usage/Cap | Memory-Usage | GPU-Util Compute M. |
| | | MIG M. |
|=========================================+======================+======================|
| 0 NVIDIA GeForce GTX 1660 Ti On | 00000000:01:00.0 On | N/A |
| 0% 60C P0 25W / 130W | 933MiB / 6144MiB | 4% Default |
| | | N/A |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes: |
| GPU GI CI PID Type Process name GPU Memory |
| ID ID Usage |
|=======================================================================================|
| 0 N/A N/A 35 G /Xwayland N/A |
+---------------------------------------------------------------------------------------+

```

## DeepLabCut

[DeepLabCut Youtube Channel](https://www.youtube.com/channel/UC2HEbWpC_1v6i9RnDMy-dfA)

## Major Versions

Technically, according to semvar, there are only 2 "major" versions: 1 (April-Oct, 2018) and [2](https://github.com/DeepLabCut/DeepLabCut) (Oct 2018 to present).

Within version 2, there are 3 important "minor" versions:

- 2.0-2.1: Version 1 converted to Python?
- 2.2: Multi-animal pose estimation, identification, tracking. Real-time tracking. Also, single-animal projects.
- 2.3: Model Zoo SuperAnimals, new GUI (but how to get it?)

Docker
https://pypi.org/project/deeplabcut-docker/

[DeepLabCut Docker containers](https://deeplabcut.github.io/DeepLabCut/docs/docker.html)

[DeepLabCut Docker on GitHub](https://github.com/DeepLabCut/DeepLabCut/blob/main/docker/README.md)

[DLCUtils](https://github.com/DeepLabCut/DLCutils)

[Project examples](https://github.com/DeepLabCut/DeepLabCut/blob/main/examples/README.md)

### deeplabcut-docker

```bash
$ pip install deeplabcut-docker
```

What happens if you dont pass in the magic nvidia args:

```bash
(base) edpike365@fractal2-win:~$ docker pull deeplabcut/deeplabcut:2.3.5-base-cuda11.7.1-cudnn8-runtime-ubuntu20.04-latest
2.3.5-base-cuda11.7.1-cudnn8-runtime-ubuntu20.04-latest: Pulling from deeplabcut/deeplabcut
Digest: sha256:112471fa60570e7363caf5f43ad188f2acb04f60a724f1be0cc75283aee71409
Status: Image is up to date for deeplabcut/deeplabcut:2.3.5-base-cuda11.7.1-cudnn8-runtime-ubuntu20.04-latest
docker.io/deeplabcut/deeplabcut:2.3.5-base-cuda11.7.1-cudnn8-runtime-ubuntu20.04-latest
(base) edpike365@fractal2-win:~$ docker run deeplabcut/deeplabcut:2.3.5-base-cuda11.7.1-cudnn8-runtime-ubuntu20.04-latest

==========
== CUDA ==
==========

CUDA Version 11.7.1

Container image Copyright (c) 2016-2023, NVIDIA CORPORATION & AFFILIATES. All rights reserved.

This container image and its contents are governed by the NVIDIA Deep Learning Container License.
By pulling and using the container, you accept the terms and conditions of this license:
https://developer.nvidia.com/ngc/nvidia-deep-learning-container-license

A copy of this license is made available in this container at /NGC-DL-CONTAINER-LICENSE for your convenience.

WARNING: The NVIDIA Driver was not detected.  GPU functionality will not be available.
   Use the NVIDIA Container Toolkit to start this container with GPU support; see
   https://docs.nvidia.com/datacenter/cloud-native/ .
```

[DeepLabCut on DockerHub](https://hub.docker.com/r/deeplabcut/deeplabcut)

deep labcut-docker
https://deeplabcut.github.io/DeepLabCut/docs/docker.html

`deeplabcut-docker gui`

```bash
[2023-12-23T13:39:26-0800]: Using Linux config
2023-12-23 21:39:27.230486: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Successfully opened dynamic library libcudart.so.11.0
Starting GUI...
Gdk-Message: 18:17:33.636: __main__.py: Fatal IO error 11 (Resource temporarily unavailable) on X server unix:0.

[2023-12-29T10:17:34-0800]: Failed to launch the DLC GUI. Used args: "-e DISPLAY=unix:0 -v /tmp/.X11-unix:/tmp/.X11-unix -v :/home/developer/.Xauthority -v /home/edpike365:/app -w /app "
Container stopped.
```

<hr/>

- Set up Docker in your WSL Linux VM and enable GPU passthrough for containers. Test using:
  - DeepLabCut Containers
  - <a target="_blank" href="https://cloud.google.com/deep-learning-containers">Google's Deep Learning Containers</a>
  - <a target="_blank" href="https://docs.nvidia.com/deeplearning/frameworks/user-guide/index.html">NVIDIA Deep Learning Containers</a>
  - <a target="_blank" href="https://www.docker.com/products/ai-ml-development/">Docker Hub trusted AI/ML Images</a>

<hr/>
Bash version seems to work:
(DEEPLABCUT) edpike365@fractal2-win:~$ deeplabcut-docker bash -v /home/mackenzie/DEEPLABCUT:/home/mackenzie/DEEPLABCUT

                    .--,       .--,
                    ( (  \.---./  ) )
                     '.__/o   o\__.'
                       `{=  ^  =}´
                         >  u  <

**\*\*\*\***\_\_\_\_**\*\*\*\***.""`-------`"".\***\*\*\*\*\***\_\_\***\*\*\*\*\***
\ **\_ ** ** \_\_\_** ** /
/ / _ \ _** **\_ \_** / / **\_ _ / / / _**/\__ \_\_ / /_ \
\ / // // -_)/ -_)/ _ \ / /\_\_/ _ `// _ \/ /__ / // // __/ /
//____/ \__/ \__// .__//____/\_,_//_.__/\___/ \_,_/ \__/  \
\_________________________________________________________/
                       ___)( )(___ `-.**\_.
(((**) (\_\_))) ~`

Welcome to DeepLabCut docker!

latest-core: Pulling from deeplabcut/deeplabcut
Digest: sha256:002606843336725b795d1cf48a376e4a455e0dcf6effc9003f1f5d1ebc3df19c
Status: Image is up to date for deeplabcut/deeplabcut:latest-core
docker.io/deeplabcut/deeplabcut:latest-core
[2023-12-23T13:31:14-0800]: Configuring a local container for user edpike365 (1000) in group edpike365 (1000)
sha256:d4dc6dd68db8f24ffe9c90ab16a2435c7825f7db82dc362a27c051ecc4b4f043
[2023-12-23T13:31:14-0800]: Build succeeded
edpike365@7b2bf3a10cd1:/app$ ipython
Python 3.8.10 (default, Jun 2 2021, 10:49:15)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.27.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: import deeplabcut
2023-12-23 21:32:30.408804: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Successfully opened dynamic library libcudart.so.11.0
DLC loaded in light mode; you cannot use any GUI (labeling, relabeling and standalone GUI)

[1]+ Stopped ipython

<hr/>
But then Error on my machine when trying gui version:

(DEEPLABCUT) edpike365@fractal2-win:~$ deeplabcut-docker gui

                    .--,       .--,
                    ( (  \.---./  ) )
                     '.__/o   o\__.'
                       `{=  ^  =}´
                         >  u  <

**\*\*\*\***\_\_\_\_**\*\*\*\***.""`-------`"".\***\*\*\*\*\***\_\_\***\*\*\*\*\***
\ **\_ ** ** \_\_\_** ** /
/ / _ \ _** **\_ \_** / / **\_ _ / / / _**/\__ \_\_ / /_ \
\ / // // -_)/ -_)/ _ \ / /\_\_/ _ `// _ \/ /__ / // // __/ /
//____/ \__/ \__// .__//____/\_,_//_.__/\___/ \_,_/ \__/  \
\_________________________________________________________/
                       ___)( )(___ `-.**\_.
(((**) (\_\_))) ~`

Welcome to DeepLabCut docker!

latest-gui: Pulling from deeplabcut/deeplabcut
16ec32c2132b: Already exists
f4c827e280d3: Already exists
2dc3e915427e: Already exists
dc3a695aed65: Already exists
9d37bee6ab45: Already exists
747ea9915247: Already exists
4ed98a864a53: Already exists
10f55e1e403d: Already exists
bf7d20a425a2: Already exists
2f0426d1c4e4: Already exists
c1a547ac430e: Already exists
4e0c2036e742: Pull complete
c04313217d6a: Pull complete
Digest: sha256:3f08a9e7ee3b0d9ab9905cb13114363c70a012d656b5662b1dd888d9cbce43ad
Status: Downloaded newer image for deeplabcut/deeplabcut:latest-gui
docker.io/deeplabcut/deeplabcut:latest-gui
[2023-12-23T13:39:22-0800]: Configuring a local container for user edpike365 (1000) in group edpike365 (1000)
sha256:3a6a7f08f8de542fc7193d885416d286b0f4c497865e57d1cd9206009d1573e2
[2023-12-23T13:39:26-0800]: Build succeeded
[2023-12-23T13:39:26-0800]: Using Linux config
2023-12-23 21:39:27.230486: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Successfully opened dynamic library libcudart.so.11.0
Starting GUI...
Gdk-Message: 18:17:33.636: **main**.py: Fatal IO error 11 (Resource temporarily unavailable) on X server unix:0.

[2023-12-29T10:17:34-0800]: Failed to launch the DLC GUI. Used args: "-e DISPLAY=unix:0 -v /tmp/.X11-unix:/tmp/.X11-unix -v :/home/developer/.Xauthority -v /home/edpike365:/app -w /app "
Container stopped.

<hr/>
Working on my machine:
(DEEPLABCUT) edpike365@fractal2-win:~$ deeplabcut-docker gui

                    .--,       .--,
                    ( (  \.---./  ) )
                     '.__/o   o\__.'
                       `{=  ^  =}´
                         >  u  <

**\*\*\*\***\_\_\_\_**\*\*\*\***.""`-------`"".\***\*\*\*\*\***\_\_\***\*\*\*\*\***
\ **\_ ** ** \_\_\_** ** /
/ / _ \ _** **\_ \_** / / **\_ _ / / / _**/\__ \_\_ / /_ \
\ / // // -_)/ -_)/ _ \ / /\_\_/ _ `// _ \/ /__ / // // __/ /
//____/ \__/ \__// .__//____/\_,_//_.__/\___/ \_,_/ \__/  \
\_________________________________________________________/
                       ___)( )(___ `-.**\_.
(((**) (\_\_))) ~`

Welcome to DeepLabCut docker!

latest-gui: Pulling from deeplabcut/deeplabcut
Digest: sha256:3f08a9e7ee3b0d9ab9905cb13114363c70a012d656b5662b1dd888d9cbce43ad
Status: Image is up to date for deeplabcut/deeplabcut:latest-gui
docker.io/deeplabcut/deeplabcut:latest-gui
[2023-12-31T17:31:52-0800]: Configuring a local container for user edpike365 (1000) in group edpike365 (1000)
sha256:e867fd4c7a2003d908b4c2a36424e3d15ccede5f36856ec688335fa578c6efe1
[2023-12-31T17:31:52-0800]: Build succeeded
[2023-12-31T17:31:52-0800]: Using Linux config
2024-01-01 01:31:53.740016: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Successfully opened dynamic library libcudart.so.11.0
Starting GUI...
(gui launches in a new floating window, close/terminate the window to release the terminal)

<hr/>
https://github.com/DeepLabCut/DeepLabCut/issues/1538
After installing DLC with docker, when I run

deeplabcut-docker gui

It is able to complete all the pulls, and then at this point

Status: Downloaded newer image for deeplabcut/deeplabcut:latest-gui docker.io/deeplabcut/deeplabcut:latest-gui [2021-10-13T15:14:20-0400]: Configuring a local container for user USER(1000) in group GROUP (1000) sha256:9c1223084ebac1ca13599ea183cbdac776d7aee4c12b53df3228a0b226dc75a1 [2021-10-13T15:15:02-0400]: Build succeeded [2021-10-13T15:15:02-0400]: Using Linux config 2021-10-13 19:15:04.360495: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Successfully opened dynamic library libcudart.so.11.0

I get the error (see LOG (on vm?) for trace)

ImportError: Cannot load backend 'WXAgg' which requires the 'wx' interactive framework, as 'headless' is currently running
[2021-10-13T15:15:07-0400]: Failed to launch the DLC GUI. Used args: "-e DISPLAY=unix -v /tmp/.X11-unix:/tmp/.X11-unix -v :/home/developer/.Xauthority -v /home/USER:/app -w /app "
Container stopped.

<hr/>

beatrix error for: deeplabcut-docker gui -v /home/mackenzie/DEEPLABCUT:/home/mackenzie/DEEPLABCUT
Using Linux config
docker: invalid spec: :/home/developer/.Xauthority: empty section between colons.
See 'docker run --help'.
[2024-01-04T12:43:15-0800]: Failed to launch the DLC GUI. Used args: "-e DISPLAY=unix:0 -v /tmp/.X11-unix:/tmp/.X11-unix -v :/home/developer/.Xauthority -v /home/beatrix:/app -w /app -v /home/mackenzie/DEEPLABCUT:/home/mackenzie/DEEPLABCUT"
Container stopped.
