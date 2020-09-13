const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

const pins = [8, 10, 12, 16, 18, 22, 24, 26]


async function main() {
    for (const pin of pins) {
        const relay = new Gpio(pin, 'out');
        relay.writeSync(1) // turn the relay on
        await sleep(5000)
        relay.writeSync(0) // turn the relay off
        relay.unexport()
    }
}


main()


function sleep(ms) {
    console.log("sleeping for " + ms + " ms")
    return new Promise(resolve => setTimeout(resolve, ms));
 }


// var LED = new Gpio(8, 'out'); //use GPIO pin 4, and specify that it is output
// var blinkInterval = setInterval(blinkLED, 2000); //run the blinkLED function every 250ms


// function blinkLED() { //function to start blinking
//   if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
//     LED.writeSync(1); //set pin state to 1 (turn LED on)
//   } else {
//     LED.writeSync(0); //set pin state to 0 (turn LED off)
//   }
// }

// function endBlink() { //function to stop blinking
//   clearInterval(blinkInterval); // Stop blink intervals
//   LED.writeSync(0); // Turn LED off
//   LED.unexport(); // Unexport GPIO to free resources
// }

// setTimeout(endBlink, 10000); //stop blinking after 10 seconds 