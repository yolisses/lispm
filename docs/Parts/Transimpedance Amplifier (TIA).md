# Transimpedance Amplifier (TIA)

## Context

The TIA design is somewhat more complicated than, let’s say, just plugging a DAC to the analog and digital circuits. It takes some calculations to balance bandwidth, noise and stability.  
The Dan Berard’s TIA is the simplest built version I could find. It is just the operational amplifier, the feedback resistor and some capacitors for power supply decoupling. It’s beautiful. It got me thinking it would be that easy. But to achieve the faster speeds I want for this project, some nonidealities of the components have to be taken into account:

- Limited bandwidth of the op amp. It depends on the gain used too, so the metric on the datasheets is the gain-bandwidth ratio (GBW). E.g.: a op amp with a GBW of 100MHz has a bandwidth of 10MHz for a gain of 10, and 1MHz for a gain of 100\.
- Capacitance in the signal path. The wire to the tip, copper traces and even the feedback resistor act as small capacitors. In combination with the feedback resistance, it creates a first order low pass filter, which blocks the high frequencies, limiting the bandwidth. A higher resistance makes it take longer to charge the parasitic capacitance, so less bandwidth.
- Noise in the resistor. All the conductors are susceptible to Johnson noise, which is the random movement of charges due to thermal energy. A resistor with higher value has less thermal noise since it resists these random movements, so less noise.

Because of these factors, some more advanced TIAs use a second stage to distribute some of the required gain. The first stage can, this way, have a lesser gain, higher bandwidth and higher signal to noise ratio in the feedback resistor. But the feedback of the second amplifier can cause poles in the response by frequency curve (like in some low pass filters), destabilizing the system. And it’s important to make sure the operational amplifier on the second stage doesn’t add more noise than it saves.  
Here’re some useful articles:  
[Transimpedance Amplifiers: What Op Amp Bandwidth do I Need?](https://e2e.ti.com/cfs-file/__key/telligent-evolution-components-attachments/01-930-00-00-00-66-60-61/Op-Amp-Bandwidth-for-Transimpedance-Amplifiers.pdf) Covers the basics on GBW.  
[Fast low-noise transimpedance amplifier for scanning tunneling microscopy and beyond](https://pubs.aip.org/aip/rsi/article-abstract/91/7/074701/967357/Fast-low-noise-transimpedance-amplifier-for?redirectedFrom=fulltext) Covers how to create a fast… It’s in the title.  
And [this repository by Philip Turner](https://github.com/philipturner/transimpedance-amplifier) shows some first hand experience.

## Bandwidth goal

For the first version I want around 1MHz bandwidth. It will make scanning somewhat enjoyable, and I hypothesize that increasing speed is the most important thing to optimize in order to achieve atomic manipulation or protein characterization (followed by reducing noise).

## Gain calculation

I guess a good current sensing range is the one used by Dan Berard. The setpoint is 1 nA, but can measure up to 100 nA for dealing with the exponential nature of the tunneling. Considering the input range of 0 V to 1.65 V of the ADC (considering biasing), we can calculate the gain:  
Output \= Current \* Gain  
1.65 \= 100e-9 \* Gain  
1.65 \= 1e-7 \* Gain  
Gain \= 1.65 / 1e-7  
Gain \= 1.65e7  
Gain \= 16.5 M

## Bottleneck

The max frequency fP is given by  
fP=12CFRF  
For a realistic CF \= 1pF and fP\> 1MHz:  
1106 \< 12110-12RF  
110-6 \< 12RF  
210-6 \< 1RF  
RF\<159154.94 **Ω**  
RF\<15.9 k**Ω**  
At first I though 15.9K would be far too low, but there’s this excellent paper called [100 MHz large bandwidth preamplifier and record-breaking 50 kHz scanning rate quantum point contact mode probe microscopy imaging with atomic resolution](https://doi.org/10.1063/5.0024802), where they use a single stage, 10k gain, decompensated amplifier. It uses a peculiar resistor from the sample surface to the TIA for providing noise (\!) to prevent ringing on lower frequencies. They achieve a SNR of 90db, which means a signal to noise ratio of one billion to one.  
Output \= Current \* Gain  
Output \= 100e-9 \* 10e3  
Output \= 1000e-6  
Output \= 1e-3  
Output \= 1mV  
Too low for tunneling. The circuit proposed in the article can only works it quantum point contact mode (QPCM). This doesn’t seem good for moving atoms. I can generate cool images for sure, but not move atoms.
