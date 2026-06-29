---
title: "ADR 1: Three or four DAC channels"
parent: ADRs
layout: default
---

# ADR 1: Three or four DAC channels

## Context

The fine actuator of the microscope is a unimorph disk. It consists of a cheap buzzer piezo disk with the top electrode split in four quadrants, named \+X, \-X, \+Y and \-Y. Considering the x and y axis in the plane of the piezo disk, to move the probe left, the voltage is increased in \+X and decreased in \-X. For moving right, the voltage decreases in \+X and increases in \-X. For moving it up and down the \+Y and \-Y electrodes are used in the same fashion. To move the probe forward or backward (towards or away from the sample) the voltage is increased or decreased, respectively, equally across all the electrodes.  
That means that while operating in 3 dimensions, 4 outputs are required to control the piezo disk. This fact leads to two solutions:

- Solution A: Using 3 DAC channels and doing the required conversion using analog circuits.
- Solution B: Using 4 DAC channels and doing the required conversion using software.

### Solution A

The solution A analog processing with discrete components introduces noise and non linearities. For instance, the resistors are usually rated at only 1% precision and at least 16 of them are required. But in return it allows using a single 4 channel DAC for the piezo control and sample bias.  
This was the solution implemented by Dan Berard, which commented “[I did the mixing in hardware to save the cost of an extra DAC for the bias](https://dberard.com/home-built-stm/#:~:text=I%20did%20the%20mixing%20in%20hardware%20to%20save%20the%20cost%20of%20an%20extra%20DAC%20for%20the%20bias.)”.  
It’s interesting to note that such cost saving may not happen when using a DAC with fewer channels. For instance, the STM from MechRedPanda uses [AD5761RBRUZ](https://www.lcsc.com/product-detail/C404015.html) as DAC, which cost $12.38 each, while the two [OPA2227P](https://www.lcsc.com/product-detail/C1346534.html) amplifiers used in the summing circuit cost $18.33 together. Strangely enough, such a thing doesn’t happen in the Open STM, which uses the same DAC but a SMD version much cheaper for the amplifier: [OPA2227UA/2K5](https://www.lcsc.com/product-detail/C19308.html?s_z=n_OPA2227UA%252F2K5&spm=wm.ssy.bg.0.xh&lcsc_vid=R1IIVV1eTwIKXgECFVQNBgdURQNZBlFeQFJXV1VeRlMxVlNRQ1JeXlBSRFRZVjsOAxUeFF5JWBYZEEoKFBINSQcJGk4%3D) for $3.23 total.  
This solution also saves some processing and I/O wires and peripherals, but I’m not sure if that would be a problem even for the Teensy used in these project, and the Tang Nano 9K used in the LiSPM.

### Solution B

Solution B allows for some more advanced calibration techniques, where the individual DAC channels can be tested and compensated for nonidealities with the piezo disk (like the sector sizes, stiffness and hysteresis) and the scaling amplifiers (used in the LiSPM due to the audio DAC selection).  
Adding a new DAC seems to have little cost for the announced cost of the TAC5112IRGER I plan to use if using a global supplier, if the showed value of $4.33 is correct. I suppose there are some hidden costs, [but I can’t find anything about it](https://www.youtube.com/watch?v=kIte0CuJZ5E).  
Adding a TAC5112 also increases the resolution of the STM current ADC and grants a ADC for the AFM initialization.  
The FPGA controller should be fine to handle it.  
This option removes the need of a super specific board for driving the piezo. It is good for the modularity of the project. But this cost would probably disappear anyway once the errors has been fixed and it’s ready to have a single big board for cutting costs.  
The sample bias voltage probably does not have the same requirements as the piezo control. It is basically a stable voltage, that does not have to be changed. But

I need to mention that I am emotionally attached to solution B, since I usually don’t order microchips, so not buying one extra shiny Codec with a bunch of channels makes me sad.

## Decision

I decided on solution B, but I will buy the summing circuit if that’s cheap. It’s an R/D cost that may not reflect on production cost.

## Status

## Consequences
