var sensor = require('ds18x20');
function load (cb) {
    sensor.isDriverLoaded(function (err, isLoaded) {
        if (isLoaded) {
            cb(null);
        } else {
            sensor.loadDriver(function (err) {
                if (err) {
                    cb (err);
                } else {
                    cb (null);
                }
            });
        }
    });
}

var sensors;

load(function(err) {
    if (err) {
        console.log ("Boot failed " + err);
    } else {
        sensor.list(function (err, listOfDeviceIds) {
            if (err) {
                console.log ("failed to get list of devices");
            } else {
                sensors = listOfDeviceIds.filter (
                    function(el) {
                        return el.slice(0,3) === "10-";
                    }
                );
                console.log("Using sensors " + sensors);
            }
        });
    } 
});
