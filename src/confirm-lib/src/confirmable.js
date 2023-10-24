//HOC 고차컴포넌트... (컴포넌트를 가져와 새 컴포넌트를 반환)

import { useState } from "react"



//주어진 컴포넌트에 props를 연결시켜주는 역할.. 
//그 props를 받는 컴포넌트이자 연결한 최종 컴포넌트를 반환하는 컴포넌트 (고차컴포넌트)
const confirmable = (Component) => ({dispose, reject, resolve, ...other}) => {

    //함수를 반환하는 패턴튼 그 함수 내부에서 사용해야할 무언가가 있을때 그 무언가를 함수의 인자로 받아서 함수를 반환.. 클로져,, 
    const [show, setShow] = useState(true);

    const dismiss = () => {
        setShow(false);
        dispose();
    }

    const cancel = (value) => {
        setShow(false);
        reject(value);
    }

    const proceed = (value)=>{
        setShow(false);
        resolve(value);
    }

    return (
        <Component
            cancel={cancel}
            dismiss={dismiss}
            proceed={proceed}
            show={show}
            {...other}
        />
    )
}

export default confirmable;