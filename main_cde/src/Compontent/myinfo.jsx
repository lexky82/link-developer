import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import React, { useState } from 'react';
import PortfolioModal from "./portfoliomodal";
import CareerModal from "./portfoliomodal";

function myInfo(props) {

    const { skill, setSkill, setPortfolioModal, portfolioModalOpen, portfolioList, setPortfolioList, careerModalOpen, setCareerModalOpen  } = props;

    const openPortfolioModal = () => {
        setPortfolioModal(true);
    }
    const closePortfolioModal = () => {
        setPortfolioModal(false);
    }
    const openCareerModal = () => {
        setCareerModalOpen(true);
    }
    const closeCareerModal = () => {
        setCareerModalOpen(false);
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

        const copyArray = [...portfolioList];
        copyArray.push(newObject);
        setPortfolioList( copyArray );

        /* (DB Insert code) */

        setPortfolioModal(false);
    }

    const skillstackList = [
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

    function addSkill(e) {
        if (skill.indexOf(e) >= 0) { // 스택 중복검사
            return;
        }

        let newArray = [...skill];
        newArray.push(e);
        setSkill(newArray);
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

                        <div className="myinfo__keyinfo--skillstack">
                            <span>기술</span>
                            <hr />
                            <SelectSearch onChange={(e) => { addSkill(e) }} options={skillstackList} search filterOptions={fuzzySearch} value="sv" name="skillstack" placeholder="기술 검색" />
                            {
                                props.skill.map((a, i) => {
                                    return <SkillStackLabel skill={props.skill[i]} />
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="experience">
                    <div>
                        <span>경력 및 경험</span>
                            <button onClick={ openCareerModal }>+</button>
                        <hr />
                        <React.Fragment>
                            <CareerModal open={ careerModalOpen } close={ closeCareerModal } registration={ registration } header="경력 및 경험">
                                <p>회사 명 및 단체 명</p>
                                <input id="projectName" type="text"/>
                                <p>기간</p>
                                <input id="date" type="text"/>
                                <p>포지션</p>
                                <input id="position" type="text"/>
                            </CareerModal>
                        </React.Fragment>
                    </div>

                    <div>
                        <span>포트폴리오</span>
                        <button onClick={ openPortfolioModal }>+</button>
                        <hr />
                        <React.Fragment>
                            <PortfolioModal open={ portfolioModalOpen } close={ closePortfolioModal } registration={ registration } header="포트폴리오">
                                <p>프로젝트 명</p>
                                <input id="projectName" type="text"/>
                                <p>기간</p>
                                <input id="date" type="text"/>
                                <p>포지션</p>
                                <input id="position" type="text"/>
                                <p>기술</p>
                                <input id="skill" type="text"/>
                                <p>프로젝트 설명</p>
                                <input id="discription" type="text"/>
                            </PortfolioModal>
                        </React.Fragment>
                        {
                            portfolioList.map((a, i) => {
                                return <Portfolio portfolioList={portfolioList[i]} />
                            })
                        }
                    </div>
                </div>

            </section>

        </div>
    )
    
    function SkillStackLabel(props) {
        return (
            <li className="skillStackLabel">
                <span>{props.skill}</span>
                <button onClick={() => {  }}>x</button>
            </li>
        )
    }

    function Portfolio(props) {
        return(
            <div className="Portfolio">
                <label htmlFor="project_name">프로젝트 명</label>
                <p htmlFor="project_name">{props.portfolioList.projectName}</p>
                <label htmlFor="date">기간</label>
                <p htmlFor="date">{props.portfolioList.date}</p>
                <label htmlFor="positions">포지션</label>
                <p htmlFor="positions">{props.portfolioList.position}</p>
                <label htmlFor="skill">기술</label>
                <p htmlFor="skill">{props.portfolioList.skill}</p>
                <label htmlFor="description">설명</label>
                <p htmlFor="description">{props.portfolioList.discription}</p>
            </div>
        )
    }
    function Career(props) {
        return(
            <div className="Portfolio">
                <label htmlFor="project_name">재직 회사 및 학교명</label>
                <p htmlFor="project_name">{props.portfolioList.projectName}</p>
                <label htmlFor="date">재직 기간</label>
                <p htmlFor="project_name">{props.portfolioList.projectName}</p>
                <label htmlFor="date">설명</label>
                
            </div>
        )
    }
}

export default myInfo;
