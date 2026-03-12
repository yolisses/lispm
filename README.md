# Firmware

This code sets the internal circuit of the FPGA, to control the devices
connected to it (such DAC's and ADC).

It was made specifically for the Tang Nano 9K, altought porting to other FPGA
shouldn't be so difficult.

The physical pins are set in the `.cst` files. E.g.: the `tang_nano_9k.cst`
defines what pins of the Tang Nano 9K should be used. The entry point is the
`top` module. Its outputs and inputs should have corresponding physical pins.
Otherwise the code building will just throw error.
