# LiSTM

LiSTM is a low cost Scanning Tunneling Microscope (STM).  
This document is a working in progress description of all aspects. Once it is
closer to production there will be separate documents for documentation,
marketing and lessons learned.

## Previous works

It is based on some previous DIY STM’s:  
[Dan Berard’s STM](https://dberard.com/home-built-stm/)  
[Open STM by Weilin
Ma](<https://www.hardware-x.com/article/S2468-0672(23)00111-6/fulltext>)  
[Red Panda STM by Mech Red Panda](https://github.com/MechRedPanda/red-panda-stm)  
All of them achieved atomic imaging of HOPG samples. Dan Berard also reported
images of atomic layers of metals, but with no separation of atoms (due to the
low forces holding electrons).

| Part       | Dan Berard’s STM | OpenSTM | Red Panda STM | LiSTM        | David D.   |
| :--------- | :--------------- | :------ | :------------ | :----------- | :--------- |
| ADC        | LTC2326-16       |         | LTC2326-16    | ADS8685IPWR  | LTC2326-16 |
| DAC(s)     | DAC8814IBDBT     |         | AD5761R       | AD5761R      | LTC2664-16 |
| Controller | Teensy 3.1       |         | Teensy 4.1    | Tang Nano 9K |            |

## Design goals

### Be simple

The more parts you add, more things catn go wrong. It is important to address
risk of overengineering and assume risks in order to keep things to the
efficient minimum. That’s a similar approach to the one from SpaceX. Every part
should carry a description of why not simply let it be missing.  
Simple things avoid failure and cost less.

### Avoid failure

A STM is a real time system where wrong values can cause the tip of the scanner
to crash into the sample. It is important to properly test assumptions and
individual components in a repeatable and rigorous way.

### Be cheap

LiSTM is designed to be cheap. It focuses on allowing more people to endeavour
into nanoscopic imaging. It does not have specific experiments or conditions in
mind other than seeing atoms.  
One way to make the overall cost lower is by carefully choosing the parts in
order to minimize the

## Long term goals

Allow kickstarting a STM (or other suitable device) capable of atomic
manipulation, and eventually upbring nanobots. I see being able to create
computing and actuation from raw materials as a bottleneck to creating self
replicating machines. For instance, some self assembling robots from published
studies use Arduinos or ESP32’s. They work, but a semiconductor factory has an
assembly like that takes months and thousands of people and a whole global
supply chain. I wouldn’t call it self replicant.  
The final goal is to have, like, gazillions of nanobots doing all the work for
humanity.

# Key differences

### FPGA

LiSTM uses a Field Programmable Gate Array (FPGA) instead of a microcontroller
(MC).  
A FPGA works in a fundamentally different way compared to a MC.  
In a MC the engineer creates the high level code, that is compiled to machine
code, stored in the memory and executed somewhat linearly, one instruction at a
time.  
While in a FPGA, the engineer codes in a hardware definition language (that
deals with wires, clock and latches), that is converted to the schema, that is
written directly to the circuit (you can think it as being switching switches in
the internal circuit), making the internal circuit be in a specific way during
operation.  
That way, an FPGA usually runs faster (due to parallelisation, with many parts
of the circuit doing computation at the same time), takes more work to code, has
more complicated errors and is less deterministic.  
It takes a lot more, but can run much faster, which is important to keep the tip
at the right position any time.

## DAC (AD5761R)

[https://www.analog.com/media/en/technical-documentation/data-sheets/ad5761r_5721r.pdf](https://www.analog.com/media/en/technical-documentation/data-sheets/ad5761r_5721r.pdf)

The DAC needs power supply, connection to the controller and be initialized.

SPI goes to the controller  
ALERT pin goes to a display LED  
It uses 3 power supply voltages. And has different grounds for analog and
digital.

Since the piezo unimorph disk has to bend in both directions, we always use the
bipolar mode. By doing that, there’s a stable voltage for 0 displacement and a
good balance between positive and negative values. If we use unipolar mode, the
resting position would be a non zero voltage, which would fluctuate more.

To keep things simple, I will ignore the bipolar range -2.5V to +7.5V, since it's not symetrical. It leave us with ±3V, ±5V and ±10V.

I should do the calculation of precision.

## ADC (ADS8685IPWR)

[https://www.ti.com/lit/ds/symlink/ads8685.pdf](https://www.ti.com/lit/ds/symlink/ads8685.pdf)

## MGN7H (Linear rail)

## Standoff

[https://jlcpcb.com/api/file/downloadByFileSystemAccessId/8588887202109796352](https://jlcpcb.com/api/file/downloadByFileSystemAccessId/8588887202109796352)  
This 11mm, 4mm diameter glass tube fuse adapted like in

Dan Berard used one 1/2″ long (12.7mm)

## Referências

Costa, Vitor & Ribeiro Soares, Jenaina. (2021). Um Microscópio de Varredura por
Sonda para Aplicações Sensíveis ao Custo. 10.13140/RG.2.2.11595.31524.

# Reasons for the name LiSTM

- My name is Ulisses. My mom calls me Li.
- The single syllable sounds great like the “i” in “iPhone”, or the
  “[mi.com](http://mi.com)”, or Pi, or Phi, or G.
- Li is the chemical symbol of lithium, which is used in remarkably widespread
  electronics.
- “Li” like a little version of “lil”, which means “little”. It’s a little
  microscope.
- “Li” like a lightweight version of “lightweight”. It’s a lightweight
  microscope.
- LiSTM can be pronounced “listem” which is close to “listen”. I want people to
  listen to me talking about it.
- It’s a short name, which saves time. And time is money.

Searching “li meaning chinese” the results include:

- As a Surname (李 \- Lǐ): The most common Chinese surname, meaning "plum".
  Sounds cool to me like “Apple”.
- As a Female Given Name (丽 or 麗 \- Lì): Means "beautiful," "pretty," or
  "charming". I want the microscope to be pretty too.
- As a Philosophical Concept (理 \- Lǐ): Refers to "reason," "logic," or the
  "organizing principles" of the universe (Neo-Confucianism).
- Measurement (厘 \- lí): Refers to small traditional units: 1/1000 of a chi
  (length) or 50 mg in mainland China (weight).
- As a Unit of Distance (里 \- Lǐ): A traditional Chinese unit of length,
  currently standardized as 500 meters.
- As "Strength" (力 \- Lì): Means power, force, or strength.

Other common characters:

- 立 (Lì): To establish or stand.
- 利 (Lì): Benefit or profit.
