// 상태를 반환
const init = {
    count: 0,
    history: []
}

export const SETDATA = "SETDATA";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET"

// countReducer( "INCREMENT", {count:3, history:[{id:1,createdAt: "24"}]});
export const counterReducer = (state = init, action) => {
    switch (action.type) {
        case SETDATA:
            return {...state, ...action.payload}
        case INCREMENT:
            return {...state, ...action.payload}
        case DECREMENT:
            return {...state, ...action.payload}
        case RESET:
            return { count:0, history:[] }
        default:
            return state; 
    }
};