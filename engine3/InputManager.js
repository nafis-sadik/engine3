export class InputManager{
    constructor(name, positiveKey, negativeKey, gravity=1, max=1, min=-1) {
        this.gravity = gravity;
        this.min = min;
        this.max = max;
        this.name = name;
        this.positiveKey = positiveKey;
        this.negativeKey = negativeKey;
        this.value = 0;

        // Key Binding
        document.addEventListener('keypress', (event) => {
            if (event.key == this.positiveKey) {
                let temp = this.value;
                temp += this.gravity;
                if (temp >= this.max)
                    this.value = this.max;
                else
                    this.value = temp;
            }
            if (event.key == this.negativeKey) {
                let temp = this.value;
                temp -= this.gravity;
                if (temp <= this.min)
                    this.value = this.min;
                else
                    this.value = temp;
            }
        })

        document.addEventListener('keyup', (event) => {
            if (this.value != 0) {
                let temp = this.value;
                if (temp > 0) {
                    temp -= this.gravity;
                    if (temp <= 0)
                        this.value = 0;
                    else
                        this.value = temp;
                } else {
                    temp += this.gravity;
                    if (temp >= 0)
                        this.value = 0;
                    else
                        this.value = temp;
                }
            }
        })
    }
}