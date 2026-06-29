# Piezo Support

The piezo support keeps the piezo disk close and aligned to the coarse approach linear slider.  
It’s specific to this project and is not mass manufactured.

## Material

As described by Dan Berard in the page about the [scan head](https://dberard.com/home-built-stm/scan-head/), the selected material should be:

- Rigid, to prevent low resonant frequencies. You can imagine how bad a microscope made out of jelly would be. When the piezo shrinks or expand, we want the support to stay firmly in place and oscillate with the smallest displacement possible.
- Thermically stable. Since the distance of the tip and the sample is comparable to an atom, we want to avoid changes in the distance due to thermal expansion.

Additionally:

- Cheap. That’s one of the goals of the LiSPM.

The main candidates are:

- Aluminium. It’s rigid, mildly cheap, has an ok thermal coefficient. The machining can become expensive.
- Glass. It’s rigid, thermal coefficient close to aluminium. It is cheap if you pick a broken glass somewhere and cut it.
- Marcour. Too expensive, but excellent thermal coefficient.
- 3D printed plastic. [As demonstrated by MechanicalRedPanda](https://www.youtube.com/watch?v=7N3OqTEq08g). Cheap, ok thermal coefficient, doesn’t require expensive machining. Not rigid.

I decided to use 3D printed PLA to make it ridiculously cheap.  
I can also machine an aluminum bar at home.
