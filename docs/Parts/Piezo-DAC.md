---
title: Piezo DAC
parent: Parts
layout: default
---

# Piezo DAC

DAC stands for digital to analog converter.  
It outputs a voltage that can be controlled by code.

## Figures of merit

### Bandwidth

Bandwidth should be high so that the control loop can keep the tip from crashing, and high enough to produce nice images to look at without stressing this generation's shitty attention span.

### SNR

It’s troublesome to present a conversion based solely on resolution. If a DAC has 16 bit resolution, but has so much noise you can only say if it’s 0 or 1, the effective resolution is more like 1 bit. Some manufacturers present the effective number of bits (ENOB), but it looks terrible for searching, since the results of normal resolution will show up. And it’s bad to present a number for noise and other for resolution, so the magic number is signal to noise ratio (SNR).  
SNR is given in decibels (dB). Every 10 dB, the quality is multiplied by ten (a bel means ten times, and a decibel is a tenth of it, logarithmically).  
Measuring noise is troublesome too, because it depends on the frequency, and different applications focus on different frequency ranges. But I think we can use the first occurrence to “SNR” in the datasheets.

### Price

The price is mostly determined by how complicated it is to produce and how big is the market for it.  
If no one is buying it’s get expensive.

## The chosen one

I chose the [PCM5102A](https://www.ti.com/lit/ds/symlink/pcm5102a.pdf).  
It’s an audio DAC. This seems to be a good niche for a fast, low noise, high resolution DAC. It’s super cheap, since there’s a huge demand. People love music.

## Comparison with AD5761

The DAC used in the STM from Mechanical Red Panda and in the Open STM is a [AD5761](https://www.analog.com/media/en/technical-documentation/data-sheets/ad5761_5721.pdf).  
The AD5761 bandwidth has a 92 dB SNR. The PCM5102A has 112 dB, so basically 100 times better. But that doesn’t matter that much if the main source of noise is the analog parts. I will find out later.  
The sample rate is not clearly defined for the AD5761. It provides the settling time of 7.5 us, which means 133 kHz. But settling time is also a problematic measure, because it depends on the threshold and output values. Since the AD5761 clock rate can go up to 50 MHz, let’s just say the output should be around the same order of magnitude of the PCM5102A, which have the sampling rate clearly stated as 384 kHz.  
The AD5761 costs around 12 dollars, and a PCM5102A around 1 dollar.

## Implementation

Ideally we would just connect to the piezo, but the output range is quite small.  
The PCM5102A is designed to operate at voltages of a headphone: 2.1 V RMS.  
It contains a charge pump, to allow negative outputs, even using only positive power supply.  
RMS is a way of measuring voltage. It’s relative to a sine wave centered around 0V.  
Converting to voltage peak to peak (VPP) it’s 5.94 V.  
The output should be from \-15V to 15V to drive the piezo. It means a 30V range, so around a gain of 5 times.  
I already tested a cheap module from AliExpress which is supposed to use a PCM5102A and I can confirm DC outputs from \-3.24V to 3.24, although they may already be in a non linear range.

### Ground

The datasheet for the PCM5102A states two different grounds. One analog and the other digital. Digital circuits create a lot of noise due to its switching wave square nature.  
While it may seem a good idea to have separate grounds, that’s not how it works. It’s too complicated for me too explain, but the consensus now is that star ground (connecting grounds in a single point, instead of merging them) makes all the return current go to the same point, while having a big, uninterrupted ground plane allow the flow to go beneath the same path it came from.  
You can check more about it in [https://www.ti.com/lit/an/slyt511/slyt511.pdf](https://www.ti.com/lit/an/slyt511/slyt511.pdf)

### Analog and digital positive voltage

The IC has separate pins for the analog and digital positive voltage. It probably has something to do with allowing the digital input to be 1.8V while the analog be 3.3V. But it gets me wondering if I should use separate power supplies nevertheless.  
From what I could find, there’s no need for this. Apparently the important part is to have good decoupling capacitors. The TI's own evaluation board for the IC doesn’t use separate power supplies.  
Still, the PCM5102A audio module ubiquitous in the AliExpress has them: [https://s.click.aliexpress.com/e/\_c3m4OUuh](https://s.click.aliexpress.com/e/_c3m4OUuh)  
The DAC quality probably is not the limiting factor. If it does not work out, I will fix in the next iteration. It’s easier to not add things than to remove them later.  
I will take the risk and design the PCB without it. Plus it’s probably the same thing just to use one 3.3V coming from the analog power supply board and the other one from the FPGA board.
