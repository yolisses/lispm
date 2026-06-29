---
title: Capacitance displacement sensor (CDS)
parent: Parts
layout: default
---

# Capacitance displacement sensor (CDS)

**Warning: AI was used to fix my shitty wandering writting. I will fix its mistakes later.**

Capacitive displacement sensor (CDS) is a device used to measure the actual distance change in the probe. It’s used to calibrate the non ideal piezo and allow precise feature measuring.

## Motivation

The LiSPM scanning probe microscope drives its probe using a \*\*bimorph piezoelectric disk\*\* made of lead zirconate titanate (PZT). In an ideal world, a known voltage applied to the piezo would produce a perfectly proportional, perfectly repeatable displacement — and the microscope's images could be reconstructed directly from the drive signals.  
In practice, the components are far from ideal. The PZT disk itself has two well-known and significant non-idealities: hysteresis and creep.  
Without accounting for these effects, images appear smeared along the axis of tip travel. The Capacitive Displacement Sensor (CDS) is the solution: it measures the \*actual\* mechanical displacement of the probe, independently of what the drive electronics think they commanded.

## PZT Non-Idealities

### Hysteresis

Piezoelectric actuators do not follow a single displacement-versus-voltage curve. Instead, the displacement at a given voltage depends on the \*history\* of the applied field — specifically, whether the voltage is currently increasing or decreasing. This produces a characteristic loop when displacement is plotted against voltage: the curve traced while increasing voltage lies above (or below) the curve traced while decreasing it.

For a scanning probe microscope, this means that scanning a line in the forward direction and then retracing it in reverse will not produce the same physical path, even if the voltage waveforms are exact mirror images. The resulting positional error is on the order of 10–15% of the full stroke for typical soft PZT materials, and is nonlinear — largest near the midpoint of travel, smallest at the extremes.

Hysteresis is a quasi-static effect: it depends on the voltage trajectory, not on how quickly the voltage changes.

### Creep

When the voltage applied to a PZT actuator is stepped to a new value and held constant, the displacement does not immediately settle at its final position. Instead, it continues to drift slowly — often logarithmically in time — for seconds to minutes after the step. This is called \*\*creep\*\* (also known as \*relaxation\* or \*drift\*).

Creep arises from slow domain reorientation within the PZT crystal structure. It is most pronounced immediately after a large, fast voltage change, and its magnitude can be several percent of the commanded step.

For scanning probe microscopy, creep manifests as image distortion at the beginning of scan lines (when the fast-scan axis reverses direction) and as z-axis drift that degrades force measurements over time.

Both hysteresis and creep make it impractical to rely on the drive voltage alone as a proxy for position. Real-time displacement measurement is essential for accurate imaging.

## The Capacitive Displacement Sensor

### Operating Principle

A capacitive displacement sensor exploits the fact that the capacitance between two parallel conducting plates is inversely proportional to the gap between them:

C \= ε₀ · εᵣ · A / d

where \`A\` is the overlapping plate area, \`d\` is the separation, and \`ε₀\` and \`εᵣ\` are the permittivities of free space and the medium between the plates. As the gap \`d\` changes, the capacitance changes in a predictable, geometry-dependent way.

A purely gap-modulated sensor has an inherently nonlinear response (C ∝ 1/d). This can be managed through calibration or through the use of a differential (axial) arrangement, as described below.

### Axial (Differential) Configuration

The LiSPM uses what is called an \*\*axial\*\* or \*\*push-pull differential\*\* configuration. In this arrangement, a single \*\*movable plate\*\* is suspended symmetrically between two \*\*fixed plates\*\*, forming two capacitors in opposition:

\`\`\`  
Fixed plate A |← d_A →| Movable plate |← d_B →| Fixed plate B  
C_A C_B  
\`\`\`

When the movable plate is centered, \`d_A \= d_B\` and \`C_A \= C_B\`. When the movable plate shifts by a displacement \`x\`:

\`\`\`  
d_A → d₀ − x C_A \= ε₀ A / (d₀ − x) \[increases\]  
d_B → d₀ \+ x C_B \= ε₀ A / (d₀ \+ x) \[decreases\]  
\`\`\`

The \*\*differential signal\*\* \`C_A − C_B\` is then:

\`\`\`  
C_A − C_B \= ε₀ A · \[1/(d₀ − x) − 1/(d₀ \+ x)\]  
\= ε₀ A · \[2x / (d₀² − x²)\]  
\`\`\`

For small displacements relative to the nominal gap (\`x ≪ d₀\`), this simplifies to a nearly linear response:

\`\`\`  
C_A − C_B ≈ 2ε₀ A x / d₀²  
\`\`\`

Key advantages of the axial configuration:

\- \*\*Improved linearity.\*\* The differential arrangement largely cancels the first-order nonlinearity of a single-capacitor sensor, extending the linear operating range.  
\- \*\*Common-mode rejection.\*\* Mechanical vibration, thermal expansion, or electrical noise that affects both capacitors equally is rejected in the differential signal, improving sensitivity and stability.  
\- \*\*Higher sensitivity.\*\* The differential signal is twice the single-sided signal for the same displacement.  
\- \*\*Symmetric restoring force.\*\* In configurations where the electric field provides a restoring force, the axial arrangement keeps the net force near zero at the center position.

\#\#\# 3.3 Resonant Measurement Architecture

Rather than measuring capacitance directly through a DC or low-frequency AC bridge, the FDC2214 uses a \*\*resonant sensing\*\* architecture. Each sensor capacitor is connected in parallel with an external inductor \`L\` to form an LC resonant circuit. The chip drives each circuit at its natural resonant frequency:

\`\`\`  
f_resonance \= 1 / (2π · √(L · C))  
\`\`\`

As the capacitance \`C\` changes with displacement, the resonant frequency shifts. The FDC2214 measures this frequency shift using a high-resolution frequency counter referenced to an external clock, and converts it to a digital word.

This architecture has several important consequences:

\- \*\*High noise immunity.\*\* Because the measurement is encoded as a frequency rather than an amplitude, it is inherently immune to amplitude noise, power supply fluctuations, and most forms of electromagnetic interference. The chip's narrowband architecture further rejects out-of-band noise.  
\- \*\*No DC path required.\*\* The movable plate does not need to be electrically connected to the measurement circuit, which simplifies mechanical design.  
\- \*\*Wide dynamic range.\*\* Frequency can be measured to high precision over a very wide range of capacitance values.

\---

\#\# 4\. The FDC2214 Capacitance-to-Digital Converter

The CDS is built around the \*\*\[FDC2214\](https://www.ti.com/lit/gpn/fdc2214)\*\* from Texas Instruments, a 4-channel, 28-bit capacitance-to-digital converter.

\#\#\# 4.1 Key Specifications

| Parameter                        | Value                             |
| -------------------------------- | --------------------------------- |
| Resolution                       | Up to \*\*28 bits\*\*             |
| Number of channels               | \*\*4\*\*                         |
| System noise floor               | \*\*0.3 fF\*\* at 100 SPS         |
| Maximum sample rate (4 channels) | 4.08 kSPS                         |
| Sensor excitation frequency      | 10 kHz – 10 MHz                   |
| Maximum input capacitance        | 250 nF (at 10 kHz, 1 mH inductor) |
| Supply voltage                   | 2.7 V – 3.6 V                     |
| Active current                   | 2.1 mA                            |
| Interface                        | I²C                               |

\#\#\# 4.2 What 28-Bit Resolution Means

At 28-bit resolution, the FDC2214 can resolve capacitance changes as small as approximately \*\*0.000000004%\*\* of the full-scale reading — roughly 0.3 femtofarads (fF) at the chip's noise floor. To put this in perspective, a single fF is 10⁻¹⁵ farads, smaller than the self-capacitance of a short wire trace.

In practice, the achievable displacement resolution is limited not by the converter's digital resolution, but by:

\- \*\*External electrical noise\*\* (radiated EMI, power supply noise coupling into sensor wiring)  
\- \*\*Mechanical vibration\*\* of the sensor plates themselves  
\- \*\*Thermal drift\*\* of the plate geometry and inductor value  
\- \*\*Air currents\*\* causing dielectric constant variations between plates

Even so, the FDC2214's resolution provides substantial headroom above these noise sources, meaning the measurement is rarely limited by the digitizer itself.

\#\#\# 4.3 EMI Resistance

The resonant sensing architecture of the FDC2214 provides inherent rejection of broadband noise. Its narrowband measurement approach means only signals near the LC resonant frequency are captured; interference at other frequencies is suppressed. This is particularly relevant in a laboratory environment where fluorescent lighting, motor drives, and other instrumentation can create electromagnetic interference.

\---

\#\# 5\. Four-Channel Design and Piezo Sector Matching

\#\#\# 5.1 The Bimorph Disk Geometry

The LiSPM drives its probe using a \*\*bimorph piezo disk\*\* divided into four independent quadrant sectors. Each sector can be driven by its own dedicated digital-to-analog converter (DAC), allowing the electrical excitation of each quadrant to be set and varied independently.

This quadrant structure enables not just X–Y–Z motion, but a richer space of probe movements: differential drive between opposing quadrants produces lateral (X or Y) displacement, while common-mode drive of all quadrants produces axial (Z) displacement. Asymmetric combinations can produce small controlled tilts of the probe.

\#\#\# 5.2 One CDS Channel Per Piezo Sector

The FDC2214's four channels are matched to the four piezo disk sectors in a one-to-one correspondence. Each channel measures the displacement contribution of its associated quadrant independently.

This design has several important benefits:

\*\*Per-sector calibration.\*\* Each piezo quadrant has its own hysteresis curve, its own creep time constant, and its own coupling coefficient between voltage and displacement. By measuring each sector's output independently, the firmware can calibrate each DAC–sector pair separately, reducing cross-talk and improving the accuracy of the composite probe position.

\*\*Reduced inter-axis coupling.\*\* In a simple X–Y–Z parameterization, motion commanded along one axis inevitably produces some parasitic motion along the others due to piezo non-idealities and mechanical asymmetries. By working with per-sector displacement data rather than composite axis data, the control system has more information available to identify and suppress this coupling.

\*\*Extended degrees of freedom.\*\* Beyond X, Y, and Z, the per-sector readout makes it possible to characterize and command small tilts of the probe tip. One potential application is \*\*tip characterization\*\*: by deliberately introducing a controlled tilt and observing how the resulting image changes, it becomes possible to distinguish artifacts caused by the tip shape from genuine surface features. Another potential application is \*\*tilt correction\*\*: if the probe tip is known to be non-ideal, a compensating tilt can be applied to reduce the resulting image distortion.

These additional degrees of freedom are currently exploratory. The full extent of what can be achieved with per-sector control remains an open question, but the hardware infrastructure is in place to investigate it.

\---

\#\# 6\. Calibration Procedure Overview

The CDS is used to perform a \*\*displacement calibration\*\* of the piezo drive system. The general procedure is:

1\. \*\*Null the sensor.\*\* With no drive voltage applied, record the resting capacitance of each channel. This establishes the zero-displacement baseline.  
2\. \*\*Apply a known voltage sequence.\*\* Drive each piezo sector through a sweep of commanded displacements while recording the CDS output for that channel.  
3\. \*\*Build a correction map.\*\* Fit a model (linear, polynomial, or lookup table) that maps commanded voltage to actual displacement, as measured by the CDS. This model captures the combined effects of gain error, hysteresis, and creep at the operating conditions of the calibration.  
4\. \*\*Apply the correction in software.\*\* During normal imaging, the firmware uses the correction map to convert desired probe positions into compensated DAC values, and optionally uses live CDS feedback to close a displacement control loop.

Calibration should be repeated when operating conditions change significantly (ambient temperature shifts, after a long idle period during which PZT domain state may drift, or after any mechanical reassembly).

\---

\#\# 7\. Summary

The CDS addresses the fundamental limitation of open-loop piezo-based scanning: the actuator does not go where it is told. By measuring actual displacement with femtofarad-level precision using the FDC2214's resonant architecture, and by matching sensor channels to piezo sectors in a one-to-one configuration, the LiSPM gains the ability to:

\- Correct for PZT hysteresis and creep on a per-sector basis  
\- Reduce inter-axis coupling through independent calibration  
\- Explore higher-order probe control including tip tilt

Without CDS calibration, images are smeared and spatially distorted. With it, the microscope can approach the true resolution limits set by the probe tip and the sample — not by the imperfections of its actuator.
