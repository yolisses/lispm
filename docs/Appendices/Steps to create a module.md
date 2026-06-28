# Steps to create a module

I get lost too much changing from part to part. I guess it helps in the beginning, where the goal is to know what is the design space, the limiting factor, the tradeoffs and so on. But right now I need to deliver and test the basic hypothesis. It means finishing orderable modules. But sometimes I think a module is done but it isn’t, or require an entire redesign, so here’s my checklist from start to finish for every module:

1. Search what are the alternatives. Sometimes you want a different piece altogether.
2. Fill the [Price Comparison sheet](https://docs.google.com/spreadsheets/d/1kJ4AdCbZYQlSQ2yOezcn3ApZPejCnOpOeinDMrVkBYM/edit?usp=sharing) with what other people are using, to get an overview.
3. Ask AI and check Google Scholar for the most important metrics and requirements.
4. Check price, bandwidth, noise and voltages. Roughly in this order. You can still read some details since they help to find the category you’re looking for, but keep in mind the dealbreakers.
5. Add to the EasyEDA project, just to note it. It prevents forgetting what part it was when you have a break.
6. Read the datasheet. Do not skip to schematics or PCB.
7. Document your conclusions. Writing is the best way to make sure you got it, plus it documents for other people.
8. Start the schematics. Do not skip to PCB. Make sure to have all that is required. It is easy to forget to add stuff.
9. Check the capacitors capacitance and voltage.
10. Check the module pins.
11. Check the DRC.
12. Check the extra parts required.
13. Start the PCB.
14. Displace the components. Keep the future traces in mind by looking to the blue lines.
15. Create the copper traces.
16. Create the ground plane.
17. Add the board outline.
18. Add the pin names.
19. Add the “LiSPM”, the part name and version texts.
20. Check in 3D for extra insights and dopamine.
