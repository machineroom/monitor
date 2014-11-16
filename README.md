monitor
=======

Monitor DS1820 1-wire devices and send results to dynamoDB

Setup:
- Kill owserver (update-rc.d owserver disable)
- install appropriate 1-wire drivers (modprobe wire w1-therm ds2490)
- check contents of /sys/bus/w1/devices

Upload changes:
aws --region=eu-west-1 s3 cp index.html s3://macihenroom-monitor/  --acl public-read
