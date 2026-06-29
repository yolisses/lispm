---
title: Power Supply
parent: Parts
---

# Power Supply

The two most important parameters for the power supply are cost and noise.  
Some other projects use batteries or linear power supplies. These are great options — they provide a dual-rail output and low noise — but they are bulkier, more expensive, and require designing safety features from scratch. Batteries also discharge.  
I decided to use a standard laptop charger, since most people already have one. The downside is that it requires a switching converter to generate the negative rail, plus large capacitors to filter out switching noise. These components are cheap, though.  
The required voltage rails are:

- \+15 V
- −15 V
- 5 V
- 3.3 V
- GND

Some ICs have separate analog and digital power pins. The analog supply comes from the power supply described above; the digital supply comes from the controller they connect to.  
One concern is heat dissipation, which can cause thermal drift in the scan head. For this initial version I'll assume it's acceptable, but a future redesign may need to route heat to the aluminium enclosure or move the hot components outside it entirely.
