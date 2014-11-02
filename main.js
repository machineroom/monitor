var driver = require('ds18x20');
function load (cb) {
    driver.isDriverLoaded(function (err, isLoaded) {
        if (isLoaded) {
            cb(null);
        } else {
            driver.loadDriver(function (err) {
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
        driver.list(function (err, listOfDeviceIds) {
            if (err) {
                console.log ("failed to get list of devices");
            } else {
                sensors = listOfDeviceIds.filter (
                    function(el) {
                        return el.slice(0,3) === "10-";
                    }
                );
                console.log("Using sensors " + sensors);
                temps = driver.get(sensors);
                console.log ("temps = " + temps);
            }
        });
    } 
});
