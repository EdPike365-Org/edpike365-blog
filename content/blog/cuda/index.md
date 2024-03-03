cuda capability and compute capability are the same

https://www.nvidia.com/en-us/geforce/graphics-cards/compare/

list of desktop gpus starting with 16 series
https://en.wikipedia.org/wiki/List_of_Nvidia_graphics_processing_units#GeForce_16_series

To find the number of CUDA cores of your GPUs, you can run the following commands in the command line:
nvidia-settings -q CUDACores -t
nvidia-settings -q :0/CUDACores

If you have the nvidia-settings utilities installed, you can query the number of CUDA cores of your gpus by running nvidia-settings -q CUDACores -t. If that's not working, try nvidia-settings -q :0/CUDACores.

:0 is the gpu slot/ID: In this case 0 is refering to the first GPU.
CUDACores is the property
If have the cuda & nvidia-cuda-toolkit installed, try running deviceQuery. It's located somewhere in /usr/local/cuda-11/extras/demo_suite/deviceQuery Try running locate deviceQuery.
