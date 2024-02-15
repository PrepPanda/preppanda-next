import sounddevice as sd
import numpy as np
import sys

def print_sound(indata, outdata, frames, time, status):
    volume_norm = np.linalg.norm(indata) * 10
    sys.stdout.write("\r" + "|" * int(volume_norm) + " " * (50 - int(volume_norm)) + "|")
    sys.stdout.flush()

while True:
    with sd.Stream(callback=print_sound):
        sd.sleep(10000)
