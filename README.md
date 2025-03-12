## 디렉토리 구조

```sh
counter-front
├─ README.md
├─ build
│  ├─ index.html
├─ package-lock.json
├─ package.json
├─ public
└─ src
   ├─ App.css
   ├─ App.jsx
   ├─ api
   │  ├─ axios.js
   │  ├─ counter.js
   │  └─ index.js
   ├─ index.css
   ├─ index.jsx
   ├─ pages
   │  ├─ Counter.jsx
   │  └─ index.jsx
   └─ reducer
      └─ counterReducer.js
```

## useState만으로 구현의 뜻

- 하나의 컴포넌트안에 카운터 기능 구현
- useState, useEffect

## 리듀서

리듀서는 현재 상태(count)와 액션(`dispatch({type: INCREMENT})`)을 받아서 상태를 반환하는 `함수`다.  
=> 이전 상태 + 액션 => 새로운 상태

### 리듀서 핵심

- 직접 상태를 변경하지 않고, 새로운 상태를 반환.
- 현재 상태와 액션을 받아 새로운 상태를 만든다.

## 리덕스

- 카운트에 대한 전역환경 + 리듀서
- 로그인에 대한 전역환경 + 리듀서

=> 리덕스는 상태(state)를 중앙에서 한 곳에서 관리하는 `라이브러리`이다.
=> 우리가 구성해놓은 전역환경과 리듀서를 하나로 관리해주는 편리한 도구이다.

## 리덕스 설치

```sh
npm install redux react-redux
```

## 디렉토리 구조

```sh
front
├─ src
│  ├─ store
│  │  ├─ counterReducer.js    # 리덕스 리듀서
│  │  ├─ index.js             # Redux Store 설정
│  ├─ pages
│  │  ├─ counter          # 카운터 관련 디렉토리
│  │  │  ├─ Counter.jsx          
│  │  │  ├─ getDate.jsx          
│  │  ├─ index.jsx          
│  ├─ App.jsx                 # Redux Provider 적용
```

### store란?

`Redux에서 모든 상태(state)를 저장하는 중앙 저장소.`

### 왜 스토어지?

Store는 원래 데이터 저장소를 의미.  
예전부터 프로그래밍에서 데이터를 보관하는 개념 => Store  

## 해당 프로젝트(카운터)리덕스 흐름

1. `store(중앙 저장소)` 생성
2. Provider를 통해 Store 연결
3. Reducer(리듀서)로 상태 변경 관리
4. 컴포넌트에서 Redux 상태 사용
5. Redux 비동기 처리

### 1. `store`를 생성하여 중앙에서 상태 관리

`src/store/index.js`  

```jsx
import { createStore } from "redux";
import { counterReducer } from "./counterReducer";

const store = createStore(counterReducer);

export { store };
```

- `createStore(counterReducer)`를 호출하여 **Redux Store를 생성**

### 2. `src/index.jsx`

- Provider로 Store를 App에 연결

```jsx
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
```

- `Provider store={store}`를 사용하여 **Redux Store를 React 앱 전체에 연결**
- 이제 **어떤 컴포넌트에서도 Redux 관리하는 상태를 접근할 수 있음**

### 3. Reducer에서 상태 변경 규칙 정의

```js
// 상태를 반환
const init = {
    count: 0,
    history: []
}

export const SETDATA = "SETDATA";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET"

// countReducer({count:3, history:[{id:1,createdAt: "24"}]}, "INCREMENT");
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
```

- `state`(현재 상태)와 action(변경 요청)을 받아 **새로운 상태를 반환**
- 불변성 유지 (`...state`를 사용하여 기존 상태 복사)
- `INCREMENT` → count 값을 1 증가
- `DECREMENT` → count 값을 1 감소
- `SETDATA` → 초기 데이터를 받아 상태 업데이트

### 4. Counter 컴포넌트에서 Redux 상태 가져오기

`src/pages/Counter.jsx`  

```jsx

export const Counter = () => {

    const { history } = useSelector((state) => state);
    const dispatch = useDispatch();

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
    }, [])

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
```

- `useSelector(state => state)` → Redux 상태를 가져옴
- `useDispatch()` → 상태를 변경하는 `dispatch()` 함수 가져오기
- `useEffect()` → 초기 데이터를 API에서 가져와 Redux Store에 저장
- `handleDispatch()` → 버튼 클릭 시 API 요청 후 상태 업데이트

### 5. Left, Right 컴포넌트에서 Redux 상태 사용

`src/pages/Left.jsx`  

```jsx
const Left = ({ handleDispatch }) => {
    const { count } = useSelector((state) => state);

    return (
        <>
            {count}
            <button onClick={() => handleDispatch(INCREMENT, count + 1)}>+</button>
            <button onClick={() => handleDispatch(DECREMENT, count - 1)}>-</button>
        </>
    );
};
```

- useSelector(state => state.count) → 현재 count 값 가져오기
- 버튼 클릭 시 handleDispatch(INCREMENT, count + 1) 실행 → Redux 상태 업데이트

`src/pages/Right.jsx`  

```jsx
const Right = () => {
    const { history } = useSelector((state) => state);
    return (
        <ul>
            {history.map((value) => (
                <React.Fragment key={value.id}>
                    <li>{value.createdAt}</li>
                </React.Fragment>
            ))}
        </ul>
    );
};
```

- `useSelector(state => state.history)` → Redux에서 `history` 가져오기
- `history` 데이터를 리스트 형태로 출력