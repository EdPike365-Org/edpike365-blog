# Docker, DeepLabCut, and GPU Passthrough

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

Docker
https://pypi.org/project/deeplabcut-docker/

[DeepLabCut Docker containers](https://deeplabcut.github.io/DeepLabCut/docs/docker.html)

[DeepLabCut Docker on GitHub](https://github.com/DeepLabCut/DeepLabCut/blob/main/docker/README.md)

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
