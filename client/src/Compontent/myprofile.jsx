/* Lib */
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import React, { useState } from 'react';
import { Jumbotron } from "react-bootstrap";

/* Components */
import Modal from "./myinfomodal";

function myInfo(props) {

    const { skill, setSkill, modalOpen, setModalOpen, portfolioList, setPortfolioList } = props;

    /* Modal Open/Close handler function */
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }


    /* portfolio modal 등록 */
    const onRegistration = () => {
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

        const copyArray = [...portfolioList];
        copyArray.push(newObject);
        setPortfolioList(copyArray);

        /* (DB Insert code) */

        setModalOpen(false);
    }

    const skillstackList = [
        // 나중에 json으로 불려오면 딱이겠고만..
        { name: 'Java', value: 'Java' },
        { name: 'Python', value: 'Python' },
        { name: 'C#', value: 'C#' },
    ];

    /* dropdownbox item search */
    const fuzzySearch = (options) => {
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

    /* dropdownbox item select */
    const onAddSkill = (event) => {
        if (skill.indexOf(event) >= 0) { // 스택 중복검사
            return;
        }

        let newArray = [...skill];
        newArray.push(event);

        /* (DB Insert code) */

        setSkill(newArray);
    }
    const onRemoveSkillTag = (event) => {
        let selectedSkill = event.target.parentNode.id;
        let newArray = [...skill];

        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === selectedSkill) {
                newArray.splice(i, 1);
                i--;
            }
        }

        setSkill(newArray);
    }


    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">정보를 입력하면 다른 사람들이 볼 수 있어요!</h2>
            </Jumbotron>

            <div className="container">

                <section className="keyinfo">
                    <img src="https://avatars.githubusercontent.com/u/80798626?v=4" />
                    <div className="keyinfo__persionalinfo">
                        <h1>
                            <p>{'props.profile.name'}</p>
                            <p>{'props.profile.email'}</p>
                        </h1>

                        <p>대한민국 근무중</p>
                        <p className="keyinfo__persionalinfo--department">상용화</p>

                        <div>
                            <span>기술</span>
                            <hr />
                            <SelectSearch onChange={(event) => { onAddSkill(event) }} options={skillstackList} search="true" filterOptions={fuzzySearch} value="sv" name="skillstack" placeholder="기술 검색" />
                            {
                                skill.map((a, i) => {
                                    return <SkillStackLabel skill={props.skill[i]} />
                                })
                            }
                        </div>
                    </div>
                </section>

                <section className="expreience__portfolio">
                    <div className>
                        <span>경력 및 경험</span>
                        <button className="experience--button" onClick={openModal}>+</button>
                        <hr />
                        <React.Fragment>
                            <Modal open={modalOpen} close={closeModal} registration={onRegistration} header="경력 및 경험">

                            </Modal>
                        </React.Fragment>
                    </div>

                    <div>
                        <span>포트폴리오</span>
                        <button className="experience--button" onClick={openModal}>+</button>
                        <hr />
                        <React.Fragment>
                            <Modal open={modalOpen} close={closeModal} registration={onRegistration} header="포트폴리오">
                                    <p>프로젝트 명</p>
                                    <input id="projectName" type="text" />
                                    <p>기간</p>
                                    <input id="date" type="text" />
                                    <p>포지션</p>
                                    <input id="position" type="text" />
                                    <p>기술</p>
                                    <input id="skill" type="text" />
                                    <p>프로젝트 설명</p>
                                    <input id="discription" type="text" />
                            </Modal>
                        </React.Fragment>
                        {
                            portfolioList.map((a, i) => {
                                return <Portfolio portfolioList={portfolioList[i]} />
                            })
                        }
                    </div>
                </section>
            </div>
        </div>
    )

    function SkillStackLabel(props) {
        return (
            <li id={props.skill} className="skillStackLabel">
                <span>{props.skill}</span>
                <button onClick={(event) => { onRemoveSkillTag(event) }}>x</button>
            </li>
        )
    }

    function Portfolio(props) {
        return (
            <blockquote className="Portfolio">
                <h5 htmlFor="project_name">{props.portfolioList.projectName}</h5>
                <p htmlFor="date">{props.portfolioList.date}</p>
                <p htmlFor="positions">{props.portfolioList.position}</p>
                <p htmlFor="skill">{props.portfolioList.skill}</p>
                <p htmlFor="description">{props.portfolioList.discription}</p>
            </blockquote>
        )
    }

    /* function Career(props) {
        return (
            <div className="Portfolio">
                <label htmlFor="project_name">재직 회사 및 학교명</label>
                <p htmlFor="project_name">{props.portfolioList.projectName}</p>
                <label htmlFor="date">재직 기간</label>
                <p htmlFor="project_name">{props.portfolioList.projectName}</p>
                <label htmlFor="date">설명</label>

            </div>
        )
    } */
}

export default myInfo;
