
import { store } from './store';
import { insertCharacter, removeCharacter } from './actions';
import { render } from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class View extends Component {
    constructor(props, context){
        super(props, context);
        const { store } = props;
        this.state = {
            text: store.getState()
        }

        this.cancelSupscription = store.subscribe( () => {
            this.setState(
                { text: store.getState() }
            );
        });

        this.onCharacter = this.onCharacter.bind(this);

        document.addEventListener('keyup', this.onCharacter);
    }

    componentWillUnMount() {
        document.removeEventListener('keyup', this.onCharacter);
        this.cancelSupscription();
    }

    onCharacter(event) {
        const { dispatch } = this.props.store;

        if(event.key === 'Backspace'){
            removeCharacter() |> dispatch;
        } else if(event.key.length === 1) {
            event.key |> insertCharacter
                      |> dispatch;
        }
    }

    render() {
        const { text } = this.state;
        return (
            <div>
                {text}
            </div>
        );
    }

}

View.propTypes = {
    store: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
        subscribe: PropTypes.func.isRequired
    }).isRequired
}

// let View = text => console.log(`${text}`);

// function render() {
//     const text = store.getState();
//     text |> View;
// }

// render |> store.subscribe;


// const userInput = `This is some amazing text!`;

// let index = 0;

// const interval = setInterval( () => {
//     if (index < userInput.length) {
//         userInput[index++] |> insertCharacter
//                            |> store.dispatch;
//     } else {
//         interval |> clearInterval;
//     }
// }, 250);


console.log(store);
render(
    <View store={store}/>,
    document.getElementById('root')
)