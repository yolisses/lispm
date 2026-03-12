// The firmware work is to control the low level components, like ADC and DAC's,
// and run the scan loop (due the required high speed). It works somewhat
// similar to an external API, exposing a few functions like start scan and set
// parameter. 
//
// It is stateful. More specifically, it is a state machine. It means that at a
// given point, not all functions can be called. For instance, to change the
// target distance it is required to stop the scanning.
//
// For simplicity, the clock signal is the same on the FPGA and the SPI devices.
// For now, there's no need to deal with synchronization problems.
//
// I would like to use words different than master and slave, but they seem
// accurate and ubiquitous.

module top(
    input  clk,       // 27 MHz system clock
);

// To keep things consistent, I'm rejecting abbreviations. But I guess is a good
// thing to not change generated files manually, so I'm keeping the external
// input clk with the same name, and just naming a wire according to my
// conventions.
wire clock = clk;

localparam IDLE = 1'b0;
localparam SCANNING = 1'b1;

reg state = IDLE;

// There should be a better way to define an array of modules, but let's keep it
// simple for now.
Dac dac1(clock, dac1_mosi);
// Dac dac2(clock);
// Dac dac3(clock);
// Dac dac4(clock);
// Dac dac5(clock);

endmodule
