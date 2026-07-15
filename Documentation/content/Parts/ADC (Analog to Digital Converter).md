# ADC (Analog to Digital Converter)

The ADC (Analog to Digital Converter) is used to convert analog values, usually voltage, to a digital representation, like a number we can record and compute with.

The main parameters for it are [SNR](<../Theory/SNR-(Signal-to-Noise-Ratio)>) and bandwidth.

I choose using the [TLV320ADC5140](https://www.ti.com/lit/ds/symlink/tlv320adc5140.pdf). It's an audio ADC. Usually audio ADCs have hardware level high pass filters, which makes them unusable to measure voltages. But this specific one just happens to implement the filters in sofware with programmable coefficients, so that we can just set them to do nothing.

The TLV320ADC5140 has four analog input channels. There's a simpler version with just 2 ([TLV320ADC5120](https://www.ti.com/lit/ds/symlink/tlv320adc5120.pdf)), but for some reason it costs more at the time I'm writting both at LCSC and DigiKey. It may be due to high unsupplied demand and dynamic pricing, but I don't know 🤷.
