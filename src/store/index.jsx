
import {createStore} from "redux"
import { countReducer } from "./counterReducer";

export const store = createStore(countReducer)


/*
    전역 환경 만드는거 어렵지 않음
    리액트의 기능들을 끌고와서 사용해서 환경을 구성하는거.
    환경안에 뭐가있어? 상태, 패치함수 등등...

    createContext, useContext 

    단점 

    1. 코드가 많아짐. 
    2. 관리해야할 것들이 다 한곳에 뭉쳐있음

    리덕스 스토어 적용

*/