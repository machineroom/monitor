var driver = require('ds18x20'),
    aws = require ('aws-sdk');

aws.config.region = 'us-west-2';
var dynamo = new aws.DynamoDB();
    
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

function store (sensors, temps) {
    var date = Date.now();
    var params = {};
    params.TableName = 'readings';
    params.Item = {};
    params.Item.date = {
        'N' : date.toString()
    };
    temps.forEach (function (temp, index) {
        params.Item[sensors[index]] = {
            'N' : temps[index].toString()
        };
    });
    dynamo.putItem (params, function (err, data) {
        if (err) console.log (err);
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
                store (sensors, temps);                
            }
        });
    } 
});
