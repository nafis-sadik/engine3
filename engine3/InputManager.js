export class InputManager{
    // A collection of all virtual inputs to call update method on each frame
    static InputCollection = [];
    keyUpFlag;

    constructor(name, positiveKey, negativeKey, gravity=1, max=1, min=-1) {
        this.gravity = gravity;
        this.min = min;
        this.max = max;
        this.name = name;
        this.positiveKey = positiveKey;
        this.negativeKey = negativeKey;
        this.value = 0;
        InputManager.InputCollection.push(this);

        // Key Binding
        document.addEventListener('keypress', (event) => {
            if (event.key === this.positiveKey) {
                let temp = this.value;
                temp += this.gravity;
                if (temp >= this.max)
                    this.value = this.max;
                else
                    this.value = temp;
            }
            if (event.key === this.negativeKey) {
                let temp = this.value;
                temp -= this.gravity;
                if (temp <= this.min)
                    this.value = this.min;
                else
                    this.value = temp;
            }
        })

        document.addEventListener('keyup', (event) => {
            if (event.key === this.positiveKey || event.key === this.negativeKey) {
                this.keyUpFlag = true;
            }
        })
    }

    update = () => {
        if(this.keyUpFlag){
            let temp = this.value;
            if (temp > 0) {
                temp -= this.gravity;
                if (temp <= 0)
                    this.value = 0;
                else
                    this.value = temp;
            } else if(temp < 0) {
                temp += this.gravity;
                if (temp >= 0)
                    this.value = 0;
                else
                    this.value = temp;
            } else {
                this.keyUpFlag = false;
            }
        }
    }
}