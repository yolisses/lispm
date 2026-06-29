---
title: Biggest risks
parent: Methodology
layout: default
---

# Biggest risks

The objective of this section is to list the known biggest risks. Risk is an unknown, and in this case the missing experiments to the hypothesis. Listing them can help to find already published data.  
SpaceX does something similar, going up to the eleven biggest risks due to historical reasons.

## Not finding the noise sources

I don’t have an oscilloscope right now. They are usually pretty expensive. More expensive that this microscope, indeed. Buying one just to find noise sources I’m not sure will be there seems unjustified. And I can use the own microscope ADC in some places I’m sure are voltage limited.  
The noise can come from electronics close to the microscope, the switching power supply, or even thermal noise in the high gain amplifier.  
I can mitigate this risk buying the cheapest oscilloscope I can find in AliExpress. Maybe a bare PCB one. Ideally it would cut costs having no display, but I guess a USB or wireless connection adds self noise requirements. I also can use cheap microcontroller ADC’s but just to get the overall waveshape. It would be great to have ADC’s as widespread and precise as the audio ones, but they usually use a high pass filter that cuts the DC offset. It can still work in switching signals though.

## Switching power supply too noisy

Switching power supplies turn the power on and off super fast, in order to have just the correct amount of electricity coming from it. This configuration is cheap, compact, efficient and widespread. The alternative would be using batteries or linear power supplies. But I think they cost too much.  
Batteries sound a great solution, but it’s pricey to get 30V range and they discharge, what would decelerate my efforts. And linear power supplies are a niche thing. They are bulk, heavy, expensive, and only used in contexts where low noise is critical, like for high end audio applications (like, beyond $100) and for lab setups, which are paid by universities for hundreds of people over years.  
Filtering the noise of switching power supplies is relatively easy, just add a large inductor and capacitor and they will average out the noise. In my simple simulations

## Sample bias too noisy

The sample bias is provided by a DAC. It allows you to set it to a specific voltage, adjust it when trying to get an image at all, reducing the voltage to prevent frying the TIA and changing it to study the electrical properties of the sample. It is cool, but its noise is directly added to the signal by the same exponential model as the tunneling current.

## Missing sample for calibration

HOPG is expensive. Maybe burnt sugar works, maybe not.

## Not enough precision

## Not enough bandwidth

Especially in the TIA, where the bandwidth depends so much on quite random things like the capacitance of the feedback resistor, copper traces and wire to the tip.

## Bad capacitive sensor layout

May take away the calibration for non linearities

## Digital lines not work at high frequencies

## DDS too noisy to control the QTF

## Just frying the components
