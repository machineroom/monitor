monitor
=======

Monitor DS1820 1-wire devices and send results to dynamoDB

Setup:
- Kill owserver (update-rc.d owserver disable)
- install appropriate 1-sire drivers (modprobe wire w1-therm ds2490)
- check contents of /sys/bus/w1/devices
