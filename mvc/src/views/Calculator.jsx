import React from 'react'
import ReactDOM from 'react-dom'
import { ulStyle, acStyle, btnStyle, displayStyle } from "./Calculator.css"
import { NUMERIC, SYMBOL } from "../utils/ValueTypes"

export default class Calculator extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.model = this.props.model
        this.emitter = this.props.emitter
        this.emitter.on("TotalChanged", _ => this.setState({
            displayValue: this.model.total
        }))
        this.setState({
            displayValue: this.model.total
        })
    }

    onButtonClicked(event) {
        event.preventDefault()
        this.manageDisplayState(event.target.innerHTML)
    }

    manageDisplayState(value) {
        switch(value) {
            case "AC":
                this.emitter.emit("ResetEvent")
                break
            case "=":
                this.emitter.emit("CalculateEvent")
                break
                case "+":
                case "-":
                case "/":
                case "*":
                case ".":
                    this.emitter.emit("AddValueEvent", {value: value, type: SYMBOL})
                    break
                default:
                    this.emitter.emit("AddValueEvent", {value: value, type: NUMERIC})
                    break
        }
    }

    createRow(id, ...labels){
        let items = labels.map((value, index) => {
            return <li key={`${id}_${index}`}
                       style={value === "AC"? acStyle : btnStyle}
                       onClick={::this.onButtonClicked}>
                       {value}
                   </li>
        })

        return(
            <ul key={id} style={ulStyle}>
                {items}
            </ul>
        )
        
    }

    render(){
        return(
            <div>
                <div style={displayStyle}>{this.state.displayValue}</div>
                {this.createRow("row1", "AC")}
                {this.createRow("row2", "7", "8", "9", "/")}
                {this.createRow("row3", "4", "5", "6", "*")}
                {this.createRow("row4", "1", "2", "3", "-")}
                {this.createRow("row5", "0", ".", "=", "+")}
            </div>
        )
    }

}