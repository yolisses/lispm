// Should expose:
// - set value
// - set range
//
// Probably also requires
// - turn on. It is here because the DAC's starting with some arbitrary value
//   can cause a lot of problems, so it makes sense to suppose they need to
//   receive a turn on signal.

module Dac (
input clock,
output mosi
);
endmodule