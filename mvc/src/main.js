import CalculatorController from "./controllers/CalculatorController";

export default class App{
    constructor(){
        let mainController = new CalculatorController()
        mainController.init()
    }
}


let app = new App()