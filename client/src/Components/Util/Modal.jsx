import React from 'react';
import "../../css/modal.css"

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, registration } = props;

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
            { open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="registration" onClick={registration}> 등록 </button>
                        <button className="" onClick={close}> 닫기 </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}
export default Modal;