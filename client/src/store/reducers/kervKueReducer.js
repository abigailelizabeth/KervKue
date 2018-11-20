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
            console.log('newState: ', newState)
            return newState;
        case actionTypes.REMOVE_ORDER_ITEM:
            let reducedState = {...state}
            delete reducedState[action.data]
            reducedState.count = reducedState.count -1;
            let shiftedState = {}
            Object.keys(reducedState).filter(element => !isNaN(element)? element: null).map((key, index) => {
                shiftedState[index] = reducedState[key]
            })
            shiftedState['count'] = reducedState.count;
            console.log('reducedState: ',reducedState)
            console.log('shiftedState: ', shiftedState)
            return shiftedState;
        default:
            console.log('default from load: ')
            return {...state}
    }
}
export default reducer