import axios from 'axios';
import { Input, DatePicker } from "antd";
import React, { useState } from 'react'
import Modal from "../Util/Modal";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function Portfolio(props) {

    const {portfolioList, setPortfolioList, user} = props

    const [ProjectName, setProjectName] = useState('')
    const [Position, setPosition] = useState('')
    const [ProjectSkill, setProjectSkill] = useState('')
    const [Description, setDescription] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [StartDate, setStartDate] = useState('')
    const [EndDate, setEndDate] = useState('')

    /* Modal Open/Close handler function */
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const projectNameChangeHandler = (event) => {
        setProjectName(event.target.value)
    }
    const positionChangeHandler = (event) => {
        setPosition(event.target.value)
    }
    const projectSkillChangeHandler = (event) => {
        setProjectSkill(event.target.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }
    const progressDateChangeHandler = (event, datestring) => {
        setStartDate(datestring[0])
        setEndDate(datestring[1])
    }

    const onRegistration = () => {
        const newObject = {
            id: portfolioList.length,
            projectName: ProjectName,
            startDate: StartDate,
            endDate: EndDate,
            position: Position,
            skill: ProjectSkill,
            description: Description
        };

        const copyArray = [...portfolioList];
        copyArray.push(newObject);
        setPortfolioList(copyArray);

        let body = {
            _id: user.userData._id,
            portfolioList: copyArray
        }
        console.log(body._id)

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

    const removePortfolioHandler = (event) => {
        let selectedPortfolio = event.target.parentNode.parentNode.id;
        let newArray = [...portfolioList];

        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].id === parseInt(selectedPortfolio)) {
                newArray.splice(i, 1);
                i--;
            }
        }

        let body = {
            _id: user.userData._id,
            portfolio: selectedPortfolio
        }

        axios.put('api/users/removeportfolio', body)
            .then(response => {
                if (response.data.success) {

                }
                else {
                    alert('포트폴리오 제거에 실패 했습니다.');
                }
            })

        setPortfolioList(newArray);
    }

    return (
        <div>
            <span>포트폴리오</span>
            {
               user && <button className="experience--button" onClick={openModal}>+</button>
            }
            <hr />
            <React.Fragment>
                    <Modal open={modalOpen} close={closeModal} registration={onRegistration} header="포트폴리오">
                    <p>프로젝트 명</p>
                    <Input onChange={projectNameChangeHandler} type="text" />
                    <p>기간</p>
                    <RangePicker onChange={progressDateChangeHandler} />
                    <p>포지션</p>
                    <Input placeholder="ex) 기획, 프론트엔드" onChange={positionChangeHandler} type="text" />
                    <p>사용 기술</p>
                    <Input onChange={projectSkillChangeHandler} type="text" />
                    <p>프로젝트 설명</p>
                    <TextArea onChange={descriptionChangeHandler} type="text" />
                </Modal>
            </React.Fragment>
            {
                portfolioList.map((a, i) => {
    
                    return <PortfolioTap key={i} portfolio={portfolioList[i]} />
                })
            }
        </div>
    )

    function PortfolioTap(props) {
        return (
            <blockquote id={props.portfolio.id} className="Portfolio">
                <h5>{props.portfolio.projectName}{ user && <button onClick={removePortfolioHandler} style={{ border: '0', outline: '0' }} >X</button>}</h5>
                <p>{props.portfolio.startDate} ~ {props.portfolio.endDate}</p>
                <p>{props.portfolio.position}</p>
                <p>{props.portfolio.skill}</p>
                <p>{props.portfolio.description}</p>
            </blockquote>
        )
    }
}

export default Portfolio