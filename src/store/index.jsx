import { createStore } from "redux";
import { counterReducer } from "./counterReducer";

const store = createStore(counterReducer);

export { store };

/*
    전역 환경 만드는거 어렵지 않음
    리액트의 기능들을 끌고와서 사용 환경을 구성 하는거임
    황경안에 뭐가있지? 상태 패치함수 등등...
    
    createContext = 환경을 구성 한다, useContext 

    단점

    1.코드가 너무 김
    2. 관리해야 할 것들이 다 한곳에 뭉쳐있음
    
    리덕스 스토어 적용
*/
