import { makeObservable, observable, action } from 'mobx';

class KeyboardStore {
    keyboardActive = false;
    subscriber = null;

    constructor() {
        makeObservable(this, {
            keyboardActive: observable,
            subscriber: observable,
        });
    }

    broadcastKeyPress = (keyPress) => {
        if (this.subscriber == null) {
            console.log("Recieved a key press with no subscriber, no-op");
            return;
        }

        this.subscriber.onKeyPress(keyPress);
    }

    broadcastClose = () => {
        if (this.subscriber == null) {
            return;
        }

        this.subscriber.onClose();
    }

    showKeyboard = action(() => this.keyboardActive = true);

    hideKeyboard = action(() => {
        this.keyboardActive = false
        this.broadcastClose();
    });

    register = action((fn) => this.subscriber = fn);

    deregister = action((fn) => this.subscriber = null);
}

const store = new KeyboardStore();

export default store;