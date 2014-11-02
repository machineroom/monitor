monitor
=======

Monitor DS1820 1-wire devices and send results to dynamoDB

Setup:
1. Kill owserver (update-rc.d owserver disable)
2. install appropriate 1-sire drivers (modprobe wire w1-therm ds2490)
3. check contents of /sys/bus/w1/devices
