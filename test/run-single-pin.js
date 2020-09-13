// const gpio = require('rpi-gpio');
// const gpiop = require('rpi-gpio').promise;


// const outputPin = Number(process.env.OUTPUT_PIN_NUMBER) || 10
// const sleepTime = Number(process.env.SLEEP_TIME) || 10

// function sleep(ms) {
//     console.log("sleeping for " + ms + " ms")
//     return new Promise(resolve => setTimeout(resolve, ms));
//  }

// function enablePin(pinNumber) {
//     return gpio.setup(pinNumber, gpio.DIR_OUT)
// }

// function enableRelay(pinNumber) {
//     return gpiop.write(pinNumber, true).catch(x => "enable threw: " + x )
// }

// function disableRelay(pinNumber) {
//     return gpiop.write(pinNumber, false)
// }

// function test(pinNumber) {
//     console.log("Setting up pin")
//     enablePin(pinNumber)
//     console.log("Pin set up; running relay")

//     return enableRelay(pinNumber)
//         .then(() => 
//             sleep(sleepTime * 1000)
//         ).then(() => {
//             console.log("Disabling relay")
//             return disableRelay(pinNumber)
//         }).catch((err) => {
//             console.error("Failed to run relay: ", err)
//             gpio.destroy()
//             throw err;
//         });
// }

// test(outputPin)