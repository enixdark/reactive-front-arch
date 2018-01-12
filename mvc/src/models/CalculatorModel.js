import math from "mathjs"
import { NUMERIC, SYMBOL } from "../utils/ValueTypes"
import { IN_PROGRESS_OPERATION, FIRST_OPERATION } from "../utils/CalculatorStates"


export default class CalculatorModel {
    constructor(emitter) {
        this.emitter = emitter
        this.state = FIRST_OPERATION
        this.totalOperation = 0
    }

    caculate() {
        this.totalOperation = math.eval(this.totalOperation)
        this.state = FIRST_OPERATION
        this.emitter.emit("TotalChanged")
    }

    addValue(value, type) {
        if(type === NUMERIC) {
            this.totalOperation = this.getValue(value)
        }
        else if (type == SYMBOL) {
            this.totalOperation = this.checkSymbol(value)
        }
        this.state = IN_PROGRESS_OPERATION
        this.emitter.emit("TotalChanged")
    }

    getValue(value){
        return (this.totalOperation == 0 || this.state === FIRST_OPERATION) ? value : this.totalOperation + value
    }

    checkSymbol(value) {
        let str = this.totalOperation

        if(this.state === FIRST_OPERATION) {
            return str + value
        }

        return !isNaN(str.charAt(str.length - 1)) ? str + value : str.substr(0, str.length - 1) + value
    }

    reset(){
        this.totalOperation = 0
        this.state = FIRST_OPERATION
        this.emitter.emit("TotalChanged")
    }

    get total() {
        return this.totalOperation
    }
}