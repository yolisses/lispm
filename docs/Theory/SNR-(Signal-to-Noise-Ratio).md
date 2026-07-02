---
title: SNR (Signal to Noise Ratio)
parent: Theory
---

# SNR

Signal-to-noise ratio is a number that represents how clean (absent of noise) is signal. For a more precise definition, see the [Wikipedia page](https://wikipedia.org/wiki/Signal-to-noise_ratio). Here are just some practical considerations for the SPM design.

It’s troublesome to present a conversion based solely on resolution. If a DAC has 16 bit resolution, but has so much noise you can only say if it’s 0 or 1, the effective resolution is more like 1 bit. Some manufacturers present the effective number of bits (ENOB), but it's terrible to search, since the results of normal resolution will show up. And it’s bad to present a number for noise and other for resolution, so the magic number is signal to noise ratio (SNR).

SNR is given in decibels (dB). Every 10 dB, the quality is multiplied by ten (a bel means ten times, and a decibel is a tenth of it, logarithmically).

Measuring noise is troublesome too, because it depends on the frequency, and different applications focus on different frequency ranges. But I think we can use the first occurrence to “SNR” in the datasheets.

The noise doesn't include distortion and nonlinearities. A signal can be clean but with the values shifted, for instance. One may think calling it noise on 0 Hz, but if it's predictable instead of random we don't call it noise.
