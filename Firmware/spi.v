// SPI is a protocol of transfering data between devices. It uses a master-slave
// architecture. It requires 3 or 4 wires:
// - Clock. An alternating signal of low and high used for timing. Provided by
//   the master.
// - MOSI: Master Out Slave In. Used to send data from the master to the slave.
// - MISO: Master In Slave Out. Used to send data from the slave to the master.
// - SS: Slave select. It uses high or low to indicate to the slave it if it
//   should be active. In the context of the LiSPM, all the SPI devices (DAC's
//   and ADC) can be always on, so this can be hard wired.

// For simplicity, all the SPI devices connect to the same clock, produced
// somewhere else.

module Spi
(input clock);
endmodule
