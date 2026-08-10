# TIA (Transimpedance Amplifier)

## Context

The TIA design is somewhat more complicated than, let’s say, just plugging a DAC
to the analog and digital circuits. It takes some calculations to balance
bandwidth, noise and stability.

Because of this, I'm designing multiple variations, to have higher chances of
getting some of them right.

The Dan Berard’s TIA is the simplest built version I could find. It is just the
operational amplifier, the feedback resistor and some capacitors for power
supply decoupling. It’s beautiful. It got me thinking it would be that easy. But
to achieve the faster speeds I want for this project, some nonidealities of the
components have to be taken into account:

- Limited bandwidth of the op amp. It depends on the gain used too, so the
  metric on the datasheets is the gain-bandwidth ratio (GBW). E.g.: an op amp
  with a GBW of 100 MHz has a bandwidth of 10 MHz for a gain of 10, and 1 MHz
  for a gain of 100.
- Capacitance in the signal path. The wire to the tip, copper traces and even
  the feedback resistor act as small capacitors. In combination with the
  feedback resistance, it creates a first order low pass filter, which blocks
  the high frequencies, limiting the bandwidth. A higher resistance makes it
  take longer to charge the parasitic capacitance, so less bandwidth.
- Noise in the resistor. All the conductors are susceptible to Johnson noise,
  which is the random movement of charges due to thermal energy. A resistor with
  higher value has less thermal noise since it resists these random movements,
  so less noise.

Because of these factors, some more advanced TIAs use a second stage to
distribute some of the required gain. The first stage can, this way, have a
lesser gain, higher bandwidth. But the feedback of the second amplifier can
cause poles in the response by frequency curve (like in some low pass filters),
destabilizing the system. And it’s important to make sure the operational
amplifier on the second stage doesn’t add more noise than it saves.

Here’re some useful articles:

- [Transimpedance Amplifiers: What Op Amp Bandwidth do I Need?](https://e2e.ti.com/cfs-file/__key/telligent-evolution-components-attachments/01-930-00-00-00-66-60-61/Op-Amp-Bandwidth-for-Transimpedance-Amplifiers.pdf)
  Covers the basics on GBW.

- [Fast low-noise transimpedance amplifier for scanning tunneling microscopy and beyond](https://pubs.aip.org/aip/rsi/article-abstract/91/7/074701/967357/Fast-low-noise-transimpedance-amplifier-for?redirectedFrom=fulltext)
  Covers how to create a fast… It’s in the title.

- And
  [this repository by Philip Turner](https://github.com/philipturner/transimpedance-amplifier)
  shows some first hand experience.

## Bandwidth goal

For the first version I wanted around 1MHz bandwidth. It would make scanning
somewhat enjoyable, and I hypothesize that increasing speed is the most
important thing to optimize in order to achieve atomic manipulation or protein
characterization (followed by reducing noise).

But turns out ADCs with that bandwidth are expensive. The datasheet claims at
the title are sometimes misleading too. 1MHz ADC usually only means it outputs 1
Mega sample per second. But the input has a lower bandwidth limitation. For
instance, the
[TLV320ADC5140](https://www.ti.com/lit/ds/symlink/tlv320adc5140.pdf) claims to
be a 768kHz ADC, but also states a mere 80kHZ bandwidth.

The extra samples help to reduce noise, but still... not the full input
bandwidth.

That's probably why oscilloscopes are expensive. They have to record not only a
single value, but a frame of multiple values to get to the high bandwidth they
have.

One important aspect of the op amp is the GBW. It dictates the cutoff frequency
caused by the filter made of the input capacitance and feedback resistor.

$$
f_{\text{bandwidth}} \approx \sqrt{\dfrac{\text{GBW}}{R_f C_{\text{in}}}}
$$

For a typical 10pF input capacitance and 100M gain:

$$
f_{\text{bandwidth}} \approx \sqrt{\dfrac{\text{GBW}}{100 \times 10^{6} \times 10 \times 10^{-12}}}
$$

TODO continue the calculation to find a good enough GBW value to get 100 kHz
bandwidth.

Keep in mind there's also the filter caused by the parasitic capacitance of the
feedback resistor itself.

## Gain calculation

Gain refers to how many times the output signal is amplified in relation to the
conversion 1 volt to 1 ampere. It's important to have an adequate gain. If the
gain is too small, the ADC can't see the difference between voltages. Too high
and it will just swing from 0 to 1 with very little values in between.

I guess a good current sensing range is the one used by Dan Berard. The setpoint
is 1 nA, but can measure up to 100 nA for dealing with the exponential nature of
the tunneling.

The gain is set by the feedback resistor. A resistor of 1 MHz produces 1V output
for a 1nA input.

Since the LiSPM uses an ADC range of 0 to 3.3V instead of -15 to 15V of the Dan
Berard's one, the gain can be smaller. But smaller the gain, smaller the
feedback resistor value and thus higher the Johnson noise. By now I don't now
what the noise floor will be. Maybe the Johnson noise is irrelevant for now, and
maybe isn't.

If the Johnson noise is noticeable, one option is to use a higher gain and scale
down the output later to 0 to 3.3V. It also makes the noise picked up in the
cable from the TIA to the ADC less pronounced (because the noise gets scaled
down before conversion).

## Variations

Since there are a lot of things going on in the design, I decided to order
variations to increase the chance of at least one of them working out.

They can be classified by:

- The selected op amp IC.
- The number of op amps.
- The presence of a buffer.
- The presence of a level shifter.
- The size (which has its own tradeoffs).

From these parameters, the following boards were designed:

<div style="overflow-x: auto;">

| name  | IC           | stages | size | extra features                             | hypothesis                                                         |
| ----- | ------------ | ------ | ---- | ------------------------------------------ | ------------------------------------------------------------------ |
| T961N | TLV9061IDBVR | 1      | S-1  | none                                       | The simplest thing that can possibly work.                         |
| T961P | TLV9061IDBVR | 1      | S-2  | none                                       | The super tiny size may be useful for integration with AFM.        |
| T962L | TLV9061IDBVR | 2      | S-1  | level shifter                              | The simplest thing with integrated level shifter.                  |
| LC62B | LMC6032IMX   | 2      | S-1  | buffer                                     | Too expensive to try a bunch of things. But should work.           |
| R874B | RS8751XF     | 4      | S0   | buffer, compensation capacitor, screw hole | Complicated thing, but should provide 1GΩ gain and 1MHz bandwidth. |

</div>

The size here means:

- S0: just small.
- S-1: so small it can be mounted on the STM tip standoff.
- S-2: so small it can be mount on the STM tip standoff and has some
  inconveniences in the assembly / mounting.

Basic details about the ICs:

<div style="overflow-x: auto;">

| IC           | GBW     | input bias              | price    | comparison with the one from Dan Berard   |
| ------------ | ------- | ----------------------- | -------- | ----------------------------------------- |
| RS8751XF     | 250 MHz | 1pA typical, 10pA max   | $ 0.2590 | 10X less input bias, roughly the same GBW |
| TLV9061IDBVR | 10 MHz  | 1pA typical, 10pA max   | $ 0.1028 | 10X more input bias, 10X more GBW         |
| LMC6032IMX   | 1.4 MHz | 40fA typical, 100pA max | $ 1.2112 | 10X less input bias, roughly the same GBW |

</div>
