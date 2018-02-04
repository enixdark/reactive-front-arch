export const reducers = (state = '', action) => {
    switch(action.type){
        case 'CHARACTER_TYPED':
            return state + action.char;
        case 'BACKSPACE':
            return state.substr(0, state.length - 1);
        case 'REMOVE': 
            return state.replace(action.char, '');
        default:
            return state;
    }
}