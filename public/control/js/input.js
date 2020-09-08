// Set the event listener to run
// when the device is ready
document.addEventListener("deviceready", onDeviceReady, false);

// The device is ready so let's
// obtain the current accelerometer data
function onDeviceReady() {
  navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
}

// Run after successful transaction
// Let's display the accelerometer data
function onSuccess(acceleration) {
  var accElement = document.getElementById("accelerometerData");

  accElement.innerHTML =
    "Acceleration X: " +
    acceleration.x +
    "<br />" +
    "Acceleration Y: " +
    acceleration.y +
    "<br />" +
    "Acceleration Z: " +
    acceleration.z +
    "<br />" +
    "Timestamp: " +
    acceleration.timestamp;
}

// Run if we face an error
// obtaining the accelerometer data
function onError(error) {
  // Handle any errors we may face
  alert("error");
}
