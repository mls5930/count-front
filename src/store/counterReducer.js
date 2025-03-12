//  상태를 반환
const init = {
    count: 0,
    history: []
}

export const SETDATA = "SETDATA"
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export const countReducer = (state = init, action) => {
    console.log(state);
    console.log(action.payload);
    
    switch (action.type) {
        case SETDATA:
            return {...state, ...action.payload}
        case INCREMENT:
            return {...state, ...action.payload} 
        case DECREMENT:
            return {...state, ...action.payload} 
        case RESET: 
            // return {...state ,...init}
            return {count:0,  history: []}
        default:
            return state 
    }
};
// const obj1 = { a: 1, b: 2 };
// const obj2 = { b: 3, c: 4 };

// const result = { ...obj1, ...obj2 };

// console.log(result); // { a: 1, b: 3, c: 4 }