import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getHistory, getInit } from "./getData";
import { COUNTER_INCREMENT, COUNTER_DECREMENT, COUNTER_SETDATA } from "../../reducers/counterReducer"
import { getCount, postCount } from "../../api/counter";



const Left = ({handleDispatch}) => {
    const { count } = useSelector((state) => state.count);

    return (
        <>
            {count}
            <button onClick={() => handleDispatch(COUNTER_INCREMENT, count + 1)}>+</button>
            <button onClick={() => handleDispatch(COUNTER_DECREMENT, count - 1)}>-</button>
        </>
    )
}

const Right = () => {
    const { history } = useSelector((state) => state.count);
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
    const { history } = useSelector((state) => state.count);
    const dispatch = useDispatch();

    // 초기값
    useEffect(()=> {
        const fetchData = async() => {
            try {
                const data = await getInit();
                dispatch({ type: COUNTER_SETDATA, payload: data });
            } catch (error) {
                console.error("초기 데이터 로딩 실패", error);
            }
        }
        fetchData()
    }, [])

    // type : "INCREMENT" | "DECREMENT" | "RESET"
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
    
    if(history.length <= 0) return <>값이 존재하지 않습니다.</>
    
    return (
        <>
            <Left handleDispatch={handleDispatch}/>
            <Right/>
        </>
    )
}