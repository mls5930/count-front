// 상태를 반환
const init = {
    count: 0,
    history: []
}

// const {count, history} = useSelector((state) => state.count)

export const COUNTER_SETDATA = "COUNTER_SETDATA";
export const COUNTER_INCREMENT = "COUNTER_INCREMENT";
export const COUNTER_DECREMENT = "COUNTER_DECREMENT";
export const RESET = "RESET"

// countReducer( "SETDATA", {count:3, history:[{id:1,createdAt: "24"}]});
export const counterReducer = (state = init, action) => {
    switch (action.type) {
        case COUNTER_SETDATA:
            return {...state, ...action.payload}
        case COUNTER_INCREMENT:
            return {...state, ...action.payload}
        case COUNTER_DECREMENT:
            return {...state, ...action.payload}
        case RESET:
            return { count:0, history:[] }
        default:
            return state; 
    }
};