---
title: Bandwidth
parent: Theory
---

# Bandwidth

Bandwidth in this application represents the speed limit of changes in a signal. For a more precise definition, see the [Wikipedia page](<https://wikipedia.org/wiki/Bandwidth_(signal_processing)>). Here are just some practical considerations for SPM design.

A signal's bandwidth is usually limited by how fast a converter can work, which depends on its internal design, and by capacitance in the signal path, whether from discrete capacitors or from parasitic capacitance in traces and components.

Bandwidth is measured in hertz (Hz). Since a real frequency response usually rolls off gradually rather than stopping abruptly, a somewhat arbitrary threshold is used as the standard boundary: the [cutoff frequency](https://en.wikipedia.org/wiki/Cutoff_frequency), defined as the point where the signal has dropped 3 dB relative to its flat, low-frequency response.

![Graph of a low pass filter with the -3dB point highlighted](/assets/desmos-graph-bandwidth.svg)

Bandwidth is critical in the microscope's control loop, since it determines how fast the probe's position can be corrected, and therefore how likely the probe is to crash into the sample.

Bandwidth and sampling rate are two different things. Sampling rate is simply how often a value is read or written, regardless of whether the underlying device can actually respond that fast.

For example, the TLV320ADC5140 ADC can output digital samples at up to 768 kHz, but its analog input stage has a bandwidth of only 80 kHz. This means fast changes in the input signal above 80 kHz are attenuated before they're even sampled, so sampling at 768 kHz doesn't let you capture signal content faster than that.

The extra samples are useful, though, because they can be averaged together, which reduces random noise, at the cost of some added latency.
