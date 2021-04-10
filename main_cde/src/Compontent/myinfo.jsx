import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import React from 'react';
import Modal from "./portfoliomodal";

function myInfo(props) {
    const tech = props.tech;
    const setTech = props.setTech;
    const setModalOpen = props.setModalOpen;
    const modalOpen = props.modalOpen;

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const techstackList = [
        // 나중에 json으로 불려오면 딱이겠고만..
        { name: 'Java', value: 'Java' },
        { name: 'Python', value: 'Python' },
        { name: 'C#', value: 'C#' },
    ];

    function fuzzySearch(options) { // dropdownbox item search
        const fuse = new Fuse(options, {
            keys: ['name', 'value'],
            threshold: 0.3,
        }); // fuse input 선언

        return (value) => {
            if (!value.length) {
                return options;
            }

            return fuse.search(value);
        };
    }

    function addTech(e) {
        if (tech.indexOf(e) >= 0) { // 스택 중복검사
            return;
        }

        let newArray = [...tech];
        newArray.push(e);
        setTech(newArray);
    }

    return (
        <div>
            <section>
                <div className="myinfo">
                    <img src="https://avatars.githubusercontent.com/u/80798626?v=4" />
                    <div className="myinfo__keyinfo">
                        <h1>
                            <p>권혁진</p>
                            <p>(lexky82@gmail.com)</p>
                        </h1>
                        <p className="myinfo--affiliation">대한민국 근무중</p>
                        <p className="myinfo--department">상용화</p>

                        <div className="myinfo__keyinfo--techstack">
                            <span>기술</span>
                            <hr />
                            <SelectSearch onChange={(e) => { addTech(e) }} options={techstackList} search filterOptions={fuzzySearch} value="sv" name="techstack" placeholder="기술 검색" />
                            {
                                props.tech.map((a, i) => {
                                    return <TechStackLabel skill={props.tech[i]} />
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="experience">
                    <div>
                        <span>경력 및 경험</span>
                            <button>+</button>
                        <hr />
                    </div>

                    <div>
                        <span>포트폴리오</span>
                        <React.Fragment>
                            <button onClick={ openModal }>+</button>
                            <Modal open={ modalOpen } close={ closeModal } header="포트폴리오">
                                <p>프로젝트 명</p>
                                <input type="text"/>
                                <p>포지션</p>
                                <input type="text"/>
                                <p>기술</p>
                                <input type="text"/>
                                <p>프로젝트 설명</p>
                                <input type="text"/>
                            </Modal>
                        </React.Fragment>
                        
                        <hr />
                    </div>
                </div>

            </section>

        </div>
    )
    
    function TechStackLabel(props) {
        return (
            <li className="techStackLabel">
                <span>{props.skill}</span>
                <button onClick={() => {  }}>x</button>
            </li>
        )
    }
}

export default myInfo;
