import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getHistory, getInit } from "./getData";
import { INCREMENT, DECREMENT, SETDATA,RESET } from "../../store/counterReducer"
import { getCount, postCount } from "../../api/counter";

const Left = ({handleDispatch}) => {
    const {count} = useSelector((state) => state);

    return (
        <>
            {count}
            <button onClick={() => handleDispatch(INCREMENT ,count + 1)}>+</button>
            <button onClick={() => handleDispatch(DECREMENT ,count - 1)}>-</button>
            <button onClick={() => handleDispatch(RESET, 0)}>리셋버튼</button>
        </>
    )
}

const Right = () => {
    const {history} = useSelector((state) => state);
    return (
        <ul>
            {history.map((value) => (
                <React.Fragment key={value.id}>
                    <li>{value.createdAt}</li>   
                </React.Fragment>        
            ))}
        </ul>
    )
}

export const Counter = () => {
    // 전역 상태 가져오기 => useSelector
    // 전역 상태 바꾸기 => useDispatch
    // const {state} = useCounter
    const { history } = useSelector((state) => state);
    
    const dispatch = useDispatch();

    // 초기값
    useEffect(()=> {
        const fetchData = async() => {
            try {
                const data = await getInit();
                dispatch({ type: SETDATA, payload: data });
            } catch (error) {
                console.error("초기 데이터 로딩 실패", error);
            }
        }
        fetchData()
    }, [dispatch])

    //type : "INCREMENT" | "DECREMENT" | "RESET"
    const handleDispatch = async (type, newValue) => {
        try {
            await postCount(newValue); // 새로운 값 저장
            const result = await getCount(); // 최신 데이터 불러오기
            const updatedHistory = getHistory(result);
            dispatch({ type, payload: { count: result[0].value, history: updatedHistory } });
        } catch (error) {
            console.error("Counter 기능 실패...", error);
        }
    };
    
 
    
    return (
        <>
            <Left handleDispatch={handleDispatch}/>
            <Right/>
        </>
    )
}