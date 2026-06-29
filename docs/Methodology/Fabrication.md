---
title: Fabrication
parent: Methodology
layout: default
---

# Fabrication

The microscope should be easy to fabricate, considering the heavy lifting is done by the IC and PCB companies. Basically the only physical custom part is the piezo standoff, and maybe the linear rail if it is not cut to the right size already.

### Soldering

You can save some money on the soldering by doing it by yourself. As much as I would love to use the JLCPCB assembly service, it relies on highly demanded big machines for putting the components in place. As such, there’s a fee for each non standard part that requires changing the reel of components that feed the pick and place machine.  
Unfortunately, the SMD components are pretty hard to hand solder with a normal soldering iron, because they are super tiny. There are some techniques for that, but they take a lot of practice and increase the risk of frying the components. The same for using a heat gun, since it blows air to a big area at once and can blow parts away.  
The easy solution is to use reflow soldering. It consists of using solder paste, which is made of tiny lead (or other metal) spheres immersed in flux, and heating it with a hot plate. It is clean, fast and safe.  
The hot plates are usually expensive, but it is easy to improvise with a PCB capable of heating itself with long copper traces. In fact, this solution is so elegant it surprises me not being a widespread commercial success.  
The soldering iron is still required to solder the module wires though.
