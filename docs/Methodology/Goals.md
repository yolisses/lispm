---
title: Goals
parent: Methodology
---

# Goals

## Basic Goals

The microscope should be remarkably cheap, fast and simple. It may seem impossible to get the 3 at the same time, but it just means it will take more time to design, similar to the Apple I compared to the Altair 8080 in the early days of the personal computer.  
Let’s add some figures to these goals. It would be bad to have razor sharp limits like “less than”, because in real life things can get 1 cent more expensive or 1 extra component more complex without a big impact. So take them as a ballpark:

- Cost of 80 dollars. This is kind of an ad hoc metric. The main parts cost is now at $48. I’m just adding room for things like the multiple PCBs or 3D print pieces that are difficult to estimate.
- Speed in the order of magnitude of 1 MSps scanning. 1 MHz gives 86% of an Instagram square photo per second. Some more recent parts selection reduced my hopes to 0.5 MHz or higher price range. It should still be okay, I guess. [Appendix I]() shows some image examples
- 2 suppliers (JLCPCB and Aliexpress). Not counting things bought locally, cause it’s just another stop when buying groceries.
- 4 hours assembling. People tend to underestimate it because tasks like cutting wires or finding the screwdriver are too short to account for. For me it will take more time, because I still need to figure out a lot of things.
- Allow AFM and STM at the same time.
- Documented enough to allow improvement. Since just throwing the schematics and code doesn’t help that much during troubleshooting, and because it would be pretty sad if the project just dies and people have to rediscover details in future microscopes.

## Hopes and Dreams

Following are things that would be super cool to have, but I don’t have enough first hand experience to even design for right now:

- Atomic manipulation. This is the ultimate goal of a DIY STM. If anyone could move atoms at home, we would have self replicating nano machines in no time. Maybe it will be possible with the current microscope with some super fine tuned AI model, but I will not wait for it in the hardware design phase.
- Protein characterization using the AFM. Hey, maybe I will make the Theranos that went right. Cause, you know, their task was basically just to see how the blood looks like with precision enough to diagnose and predict a ton of diseases. It certainly showed some market demand with $700 million investment and a $9 billion valuation at its peak.
- Be mass-producible. If I get a lot of attention from universities and labs, I can make this the Arduino of precise measurement. Kickstarter it, and sell more than Strømlingo did with their $4000 AFM.

## Atomic manipulation

I’m not sure how to present this idea, so I’ll just throw it in here.  
I hypothesize that atomic manipulation can be achieved without ultra high vacuum or cryogenic cooling.  
The possibilities of DIY SPMs haven’t been explored deeply. There’s like 10 at most published STMs. Some of them are super similar, for what I see, to reduce changes of things not working, at the expense of reduced progress. There’s no papers on simple experiments like using reinforcement learning or hydrogen atmosphere to move atoms with DIY setups. So I assume it’s not impossible.  
That said, I hypothesize that speed is a deciding factor on moving atoms. If the microscope is fast enough to adapt, it probably can handle the adsorption of water molecules in the atmosphere, the thermal drift, random variances due to air colliding, and the atoms jumping positions.  
Precision is very important, sure. But it’s not so easy to improve, and to some extent can be compensated with faster acquisition and clever algorithms, I guess.  
And the current scan speed is incompatible with the average attention span. We want to iterate fast. We don’t have time for waiting 3 minutes per scan just to find out the tip crashed because its position wasn’t updated fast enough. It seems too frustrating to get any real progress. I’m already stressed out just by the pages I access to make it happen taking 3 seconds to load.
