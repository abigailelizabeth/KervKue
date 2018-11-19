import * as actionTypes from '../actions';

const initialState = {
    count: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RECEIVE_ORDER_ITEM:
            let newState = {...state}
            newState[newState.count] = action.data;
            newState.count = newState.count + 1;
            return newState;
        default:
            console.log('default from load: ')
            return {...state}
    }
}
export default reducer