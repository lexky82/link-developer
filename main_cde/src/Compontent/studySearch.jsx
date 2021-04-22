import { Jumbotron, Form, Button } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import React, { useState } from 'react';
import Modal from "./myinfomodal";

function techSerach(props) {

    const { studyModalOpen, setStudyModalOpen, notice, randerNotice ,setRanderNotice } = props;

    const openPortfolioModal = () => {
        setStudyModalOpen(true);
    }
    const closePortfolioModal = () => {
        setStudyModalOpen(false);
    }
    const registration = () => {
        const projectName = document.getElementById('projectName').value;
        const date = document.getElementById('date').value;
        const position = document.getElementById('position').value;
        const skill = document.getElementById('skill').value;
        const discription = document.getElementById('discription').value;

        const newObject = {
            projectName: projectName,
            date: date,
            position: position,
            skill: skill,
            discription: discription
        };
    }

    const techstackList = [
        // 나중에 json으로 불려오면 딱이겠고만..
        { name: '', value: '' },
        { name: 'Java', value: 'Java' },
        { name: 'Python', value: 'Python' },
        { name: 'C#', value: 'C#' },
        { name: 'React', value: 'React' },
        { name: 'Node', value: 'Node' },

    ];

    const fuzzySearch = (options) => { // dropdownbox item search
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

    const handelFilterSKill = (skill) => {
        const newArray = [...notice];

        let selectedSkill = document.querySelector("#skill > div > input").value;
        const selectedArea = document.getElementById('selectArea').value;
        const selectedOnOff = document.getElementById('selectOnOff').value;

        if(selectedSkill == ""){
            selectedSkill = skill;
        }

        console.log(selectedSkill);
        console.log(selectedArea);
        console.log(selectedOnOff);

        const result = newArray.filter(x => {
            return x.skill == selectedSkill && x.area == selectedArea && x.onoff == selectedOnOff
        });
    

        setRanderNotice( result );
    }
    
    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">검색으로 함께할 스터디를 찾아봐요!</h2>
            </Jumbotron>

            <Form className="search__main">
                <Form.Group>
                    <SelectSearch id='skill' onChange={ (event) => handelFilterSKill(event) } options={techstackList} search="true" filterOptions={fuzzySearch}  name="techstack" placeholder="기술 검색" />
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={ handelFilterSKill } id="selectOnOff" as="select" custom>
                        <option value="" disabled selected>온라인/오프라인</option>
                        <option value="on">온라인</option>
                        <option value="off">오프라인</option>
                        <option value="other">기타</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control onChange={ handelFilterSKill } id="selectArea" as="select" custom>
                        <option value="" disabled selected>지역</option>
                        <option>서울</option>
                        <option>인천</option>
                        <option>충남</option>
                        <option>대전</option>
                        <option>강원</option>
                        <option>부산</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <div>
                        <React.Fragment>
                            <Modal open={studyModalOpen} close={closePortfolioModal} registration={registration} header="스터디 모집">
                                <p>공고 제목</p>
                                <input id="projectName" type="text" />
                                <p>진행할 프로젝트 명</p>
                                <input id="date" type="text" />
                                <p>구하는 포지션</p>
                                <input id="position" type="text" />
                                <p>현재 스터디 규모</p>
                                <input id="skill" type="text" />
                                <p>모집 기간</p>
                                <input id="discription" type="text" />
                                <p>온라인/오프라인 유무</p>
                                <input id="discription" type="text" />
                                <p>위치</p>
                                <input id="discription" type="text" />
                                <p>기술스택</p>
                                <input id="discription" type="text" />
                                <p>스터디 소개</p>
                                <input id="discription" type="text" />
                                <p>연락처</p>
                                <input id="discription" type="text" />
                                <p>구성원</p>
                                <input id="discription" type="text" />
                            </Modal>
                        </React.Fragment>
                    </div>
                    <Button onClick={openPortfolioModal}>모집공고 등록</Button>
                </Form.Group>
            </Form>

            <p className="title">전체 결과</p>

            <div className="container">
                <ul className="notice">
                    {
                        randerNotice.map((a, i) => {
                            return <Notice particle={randerNotice[i]} />
                        })
                    }
                </ul>
            </div>
        </div>
    )

    function Notice(props) {
        return (
            <li className="notice__card">
                <img src="https://img.icons8.com/ios/452/client-company.png" />
                <h5><a href={"detail/" + props.particle.id}>{props.particle.title}</a></h5>
                <p>{props.particle.area}</p>
                <span className="skillStackLabel">{props.particle.skill}</span>
            </li>
        )
    }
}

export default techSerach;