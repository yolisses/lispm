The controller coordinates all subsystems, maintains the feedback control loop, and outputs the scan data.  
Most other projects use a Teensy microcontroller, which is fast and compatible with the Arduino ecosystem. The OpenSTM uses an ESP32, which is roughly three times slower. A Teensy is a reasonable choice, but there is a faster, cheaper, and more flexible alternative that also opens up new possibilities on the AFM side: a Field-Programmable Gate Array (FPGA).  
An FPGA is essentially a large collection of programmable logic tables — similar to the truth tables used to describe AND, OR, and NOT gates — that can be wired together in any configuration. Unlike a microcontroller, which executes instructions one at a time in a CPU, an FPGA works like a custom-built circuit: multiple calculations happen simultaneously, in hardware.  
This flexibility makes FPGAs remarkably powerful. Among other things, they can be programmed to act as:

- A custom CPU with a custom instruction set.
- An emulator for existing processors. One popular FPGA niche is replicating old game consoles down to the hardware level — for people who want their nostalgia with bit-perfect accuracy.
- An ADC or DAC, similar in concept to PWM on a digital pin, but without the speed bottleneck of sequential instruction execution, and sometimes with hardware-level features like internal op-amp comparators.
- A Time-to-Digital Converter (TDC). By carefully arranging the logic tables and exploiting tiny, predictable propagation delays in the signal paths, it is possible to build a TDC fast enough to measure the travel time of light with centimeter-scale resolution.
