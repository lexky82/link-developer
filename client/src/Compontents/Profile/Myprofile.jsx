import React, { useState, useEffect } from 'react';

/* Components */
import Modal from "./Myinfomodal";

/* Lib */
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import { Jumbotron } from "react-bootstrap";

/* Ant Design */
import {Input, DatePicker} from 'antd'
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
import {CloseOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux';
const { RangePicker } = DatePicker;


function MyProfile(props) {

    const [Profile, setProfile] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [portfolioList, setPortfolioList] = useState([]);

    const [skill, setSkill] = useState([]);
    const [StartDate, setStartDate] = useState('')
    const [EndDate, setEndDate] = useState('')

    useEffect(() => {

        getProfilePost();
    }, [])

    const getProfilePost = () => {
        axios.post('/api/users/profile')
        .then(response => {
            if (response.data.success) {
                setProfile(response.data.profile)
                setSkill(response.data.profile.skill)
                setPortfolioList(response.data.profile.portfolio)
            }
            else {
                alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
            }
        })
    }

    /* Modal Open/Close handler function */
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }


    const progressDateChangeHandler = (event, datestring) => {
        setStartDate(datestring[0])
        setEndDate(datestring[1])
    }

    /* portfolio modal 등록 */
    const onRegistration = () => {
        const projectName = document.getElementById('projectName').value;
        const position = document.getElementById('position').value;
        const skill = document.getElementById('skill').value;
        const discription = document.getElementById('discription').value;

        const newObject = {
            projectName: projectName,
            startDate: StartDate,
            endDate: EndDate,
            position: position,
            skill: skill,
            discription: discription
        };

        const copyArray = [...portfolioList];
        copyArray.push(newObject);
        setPortfolioList(copyArray);

        let body = {
            _id : props.user.userData._id,
            portfolioList : copyArray
        }

        axios.put('/api/users/portfolio', body)
        .then(response => {
            if (response.data.success) {
                
            }
            else {
                alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
            }
        })

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
    const onAddSkillHandler = (event) => {
        if (skill.indexOf(event) >= 0) { // 스택 중복검사
            return;
        }

        let newArray = [...skill];
        newArray.push(event);

        let body = {
            _id: props.user.userData._id,
            skill: newArray
        }

        axios.put('api/users/addskill', body)
            .then(response => {
                if (response.data.success) {

                }
                else {
                    alert('스킬 등록에 실패 했습니다.');
                }
            })

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

        let body = {
            _id: props.user.userData._id,
            skill : selectedSkill
        }

        axios.put('api/users/removeskill', body)
            .then(response => {
                if (response.data.success) {

                }
                else {
                    alert('스킬 등록에 실패 했습니다.');
                }
            })
        
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
                            <p>{Profile.name}</p>
                            <p>{Profile.email}</p>
                        </h1>

                        <p>{Profile.position} 개발자</p>

                        <div>
                            <span>기술</span>
                            <hr />
                            <SelectSearch onChange={(event) => { onAddSkillHandler(event) }} options={skillstackList} search="true" filterOptions={fuzzySearch} value="sv" name="skillstack" placeholder="기술 검색" />
                            {
                                skill.map((a, i) => {
                                    return <SkillStackLabel key={i} skill={skill[i]} />
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
                                <Input id="projectName" type="text" />
                                <p>기간</p>
                                <RangePicker onChange={progressDateChangeHandler} />
                                <p>포지션</p>
                                <Input placeholder="ex) 기획, 프론트엔드" id="position" type="text" />
                                <p>사용 기술</p>
                                <Input id="skill" />
                                <p>프로젝트 설명</p>
                                <TextArea id="discription" type="text" />
                            </Modal>
                        </React.Fragment>
                        {
                            portfolioList.map((a, i) => {
                                
                                return <Portfolio key={i} portfolio={portfolioList[i]} />
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
                <button onClick={(event) => { onRemoveSkillTag(event) }}><CloseOutlined style={{ fontSize: '8px' }} /></button>
            </li>
        )
    }

    function Portfolio(props) {
        return (
            <blockquote className="Portfolio">
                <h5 htmlFor="project_name">{props.portfolio.projectName}</h5>
                <p htmlFor="date">{props.portfolio.startDate} ~ {props.portfolio.endDate}</p>
                <p htmlFor="positions">{props.portfolio.position}</p>
                <p htmlFor="skill">{props.portfolio.skill}</p>
                <p htmlFor="description">{props.portfolio.discription}</p>
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

export default MyProfile;
