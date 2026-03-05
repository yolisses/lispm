// The firmware work is to control the low level components, like ADC and DAC's,
// and run the scan loop (due the required high speed). It works somewhat
// similar to an external API, exposing a few functions like start scan and set
// parameter. 
//
// It is stateful. More specifically, it is a state machine. It means that at a
// given point, not all functions can be called. For instance, to change the
// target distance it is required to stop the scanning.

module top

    
endmodule