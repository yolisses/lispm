---
title: Coarse approach
parent: Parts
---

# Coarse approach

Before fine scanning can begin, the tip must be brought close enough to be within the range of the fine piezo actuator. The most common approach is a tripod with precision screws — elegant, but the screws are expensive since they are not mass-produced. Mounting them is also quite cumbersome and typically requires custom support parts.  
Commercial solutions, like the NanoSurf NaioSTM, appear to use a simpler stick-slip actuator instead. The OpenSTM follows the same approach, based on the paper [Low-cost, open-source XYZ nanopositioner for high-precision analytical applications](https://www.sciencedirect.com/science/article/pii/S2468067222000621). However, it still relies on precision linear guides and piezo stacks that are not mass-produced and not cheap. On the other hand, several videos show the same principle implemented with inexpensive parts:

- [Short demo 1](https://www.youtube.com/shorts/ODvmrazZgRE)
- [Short demo 2](https://www.youtube.com/watch?v=HmDS_ZZnBWE)
- There's another one I can't find that used a cylindrical rail and a DIY R-2R DAC built from discrete resistors\!

As for the piezo stack, [this article](http://phys.org/news/2014-03-nano-scale-mega-scope.html) shows that a ceramic capacitor can be used as an actuator. Dan Berard [tested this idea](https://dberard.com/2015/08/16/mlcc-piezo-actuators/) and published some measurements.  
For this first version, I decided to cross my fingers and use the smallest and cheapest linear rail I could find on AliExpress, paired with a sub-dollar ceramic capacitor.  
A quick calculation for the voltage required:  
The MLCC article reports 400 mV/μm. Converting to nm/V:  
1/400 μm/mV × (1000 nm/μm) × (1000 mV/V) \= 1,000,000/400 \= 2500 nm/V  
For 3V, that’s 7.5µm, which seems enough.  
But since it’s a big capacitor, the sawtooth wave may not have sharper enough transitions. The details on how to solve aren’t clear for me by now, but probably can be solved with driving it with a higher current limit, by using a MOSFET.

### Coarse DAC

The microscope controller is an inexpensive FPGA, which does not include built-in DACs. To drive the actuator, there are two options:

- Implement one using switched signals. The switching can cause interference with measurements, but this can be mitigated with shielding or by ignoring ADC readings while the DAC is active. The DAC can also be shut down once the desired position is reached.
- Use an external DAC. The one built into the ESP32 (used for optional wireless connection) should be precise enough.
