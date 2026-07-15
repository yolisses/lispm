# Sample Bias DAC

To establish a tunneling current, it’s necessary to apply a voltage on the sample. It can be done with a constant source or with a DAC. A constant source tends to have lower noise, but the DAC is necessary for some more advanced experiments.  
It’s to soon to speculate atomic manipulation feasibility, but if possible it will probably will be vertical manipulation, in which the atom is attracted to the tip by applying a controlled pulse.  
A DAC also allow changing the characteristics of the tip. In vertical manipulation, it’s possible to use the attracted atom to change the electrical characteristics of the tunneling junction.  
Controlling the sample bias also allows doing spectroscopy, which is basically measuring the current with different voltages. It allows getting data about the sample material more directly, in a manner closer to knowing the electronic distribution of the sample.

## Implementation

The sample bias board is basically equal to the Piezo DAC board. In fact, in the current version the only difference are the values of some resistors that set the gain of the operational amplifier.  
Possibly the op amp will be used only as a buffer, mitigating voltage changes by providing enough power.
