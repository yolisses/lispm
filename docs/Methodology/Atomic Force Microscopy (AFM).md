# Atomic Force Microscopy (AFM)

## Introduction

Atomic force microscope (AFM) It’s a type of scanning probe microscope (SPM) which uses the forces between atoms to measure the sample.

### Atomic forces

The atomic forces are:

- Van der Waals force: attractive force between close atoms due to momentum polarization. At close distances the electrons from different atoms repel each other. It causes one of them to expose a little more of the positive charges of the nucleus. That way one becomes slightly more positive and the other slightly more negative (because the electrons get attracted) at the side they meet. It’s this force that some geckos use to stick to walls\! They have special feet with a lot of surface area, so atoms come close enough together.
- Electrostatic force: Also known as Coulomb force, is the repulsive force between atoms close enough. That’s just the nuclei repealing each other. It increases very quickly. It becomes so high at close distances, it takes something like the Sun to smash atoms closer, causing a nuclear reaction. When we say something is touching something else, basically we’re saying it reached the Coulomb force domain, and as such it can’t advance further without moving or deforming the other thing.

Here’s graph showing the characteristics of the attractive force (in green), repulsive force (in red) and combination of both (in blue):

[![Graph of the atomic forces](atomic%20forces%20graph.svg)](https://www.desmos.com/calculator/1yqzwat0iy)

The numerical values in this example are not meaningful, though, since they depend on specific coefficients for each material. Here they are just 1, to simplify.

### Modes

An atomic force microscope can operate in different modes

- Contact mode (C-AFM), in which the probe scans the sample while touching it.
- Intermittent contact mode (IC-AFM), in which the probe periodically touches the sample.
- Non contact mode (NC-AFM), in which the probe is affected by being the sample, but without touching it.

The more contact the probe gets, the more it is damaged and slower have to be the scans to prevent it from breaking. Because of that, the LiSPM is designed to operate in non contact mode.

### NC-AFM measuring

The non contact mode AFM can be implemented with an oscillating quartz crystal, like the ones in watches, with a tungsten tip glued on it. The quartz is brought into vibration by applying a voltage in phase with the natural resonant frequency of it. The resulting current can be measured and depends on the shift of its frequency. The forces can be determined using one of these modes:

- Amplitude modulation (AMAFM) measures the amplitude and tries to keep the frequency constant.
- Frequency modulation (FMAFM) measures the frequency and tries to keep the amplitude constant.

The first NC-AFMs were AMAFM, because it’s easier to measure the amplitude. The problem is that in order to measure the amplitude, it’s necessary to wait for the cycle to complete, so this type of scan is slow.  
The FMAFM was created to overcome this by using a clever circuit called phase locked loop (PLL) to measure the frequency without having to wait for the cycle to complete. The way the PLL works is basically keeping a second oscillator at the same frequency and monitoring the phase difference between the two oscillators. It requires some complicated analog circuitry, though.  
But for the LiSPM I propose a novel approach for measuring the frequency: using a time to digital converter implemented in a FPGA to measure the period directly.  
The crystal oscillates driven by an amplifier, as intended by the manufacturer.  
The crystal amplifier output goes to a second amplifier that converts the sine like wave to a clear square wave.  
As the tip gets closer to the sample, the atomic forces start changing the resonant frequency, and as such the duration of the low and high level of the square wave changes slightly.  
This duration change is at most 1%.  
For a crystal with a frequency of 32768 Hz it gives a maximum change of 1 / (32768 \* 100\) \= 30.51e-6 s \= 30.51 µs.  
A Teensy 4.0 has a clock frequency of 600 MHz. It gives a clock period of 1 / 600e6 \= 1.66e-9 \= 1.66ns. It gives 30.51e-6 / 1.66e-9 \= 18379.51 counts per maximum change. It’s  
which makes it impractical to measure it with a conventional microcontroller CPU.
