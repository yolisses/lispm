---
title: Wireless
layout: home
parent: parts
layout: default
nav_order: 1
nav_enabled: true
---

# Wireless

A wireless connection eliminates vibration from cables. An ESP32-C3 module seems sufficient for this purpose. Based on [a conversation I had with Claude](https://claude.ai/share/ed4bde07-11c2-4422-857b-75567f16c8d4), the expected bandwidth is around 5 Mbps, which exceeds the microscope's bandwidth requirements.  
Adding the ESP32 also makes its built-in DAC available for the coarse actuator. This adds some complexity to the design, but it offloads work from the FPGA.
