import React, { useEffect, useState } from 'react'

/* Lib */
import axios from 'axios';
import { skill } from "../../Data"
import { GithubOutlined, HomeOutlined } from '@ant-design/icons'

/* Components */
import PortfolioTap from "./PortfolioTap";
import { Input, DatePicker, Select } from "antd";
import Modal from "../Util/Modal";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Option = Select;

function Portfolio(props) {

    const { portfolio, user } = props

    useEffect(() => {

        setPortfolioList(portfolio)

    }, [portfolio])
    
    const [portfolioList, setPortfolioList] = useState([]);
    const [ProjectName, setProjectName] = useState('')
    const [Position, setPosition] = useState('')
    const [ProjectSkill, setProjectSkill] = useState([])
    const [Description, setDescription] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [StartDate, setStartDate] = useState('')
    const [EndDate, setEndDate] = useState('')
    const [distribute, setDistribute] = useState('')
    const [github, setGithub] = useState('')

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
        setProjectSkill(event)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }
    const progressDateChangeHandler = (event, datestring) => {
        setStartDate(datestring[0])
        setEndDate(datestring[1])
    }
    const githubChangeHadler = (event) => {
        setGithub(event.target.value)
    }
    const distributeChangeHadler = (event) => {
        setDistribute(event.target.value)
    }

    const onRegistrationHandler = () => {
        const newObject = {
            id: portfolioList.length,
            projectName: ProjectName,
            startDate: StartDate,
            endDate: EndDate,
            position: Position,
            skill: ProjectSkill,
            description: Description,
            github : github,
            distribute : distribute
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
            .catch((err) => {
                alert(err)
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
                <Modal open={modalOpen} close={closeModal} registration={onRegistrationHandler} header="포트폴리오">
                    <p>프로젝트 명</p>
                    <Input onChange={projectNameChangeHandler} type="text" />
                    <p>기간</p>
                    <RangePicker onChange={progressDateChangeHandler} />
                    <p>포지션</p>
                    <Input placeholder="ex) 기획, 프론트엔드" onChange={positionChangeHandler} type="text" />
                    <p>사용 기술</p>
                    <Select placeholder="Select Skill" allowClear mode="multiple" style={{ width: '100%' }} onChange={projectSkillChangeHandler} tokenSeparators={[',']}>
                        {
                            skill.map(item => (
                                <Option key={item.key} value={item.key}>{item.key}</Option>
                            ))
                        }
                    </Select>
                    <p>프로젝트 설명</p>
                    <TextArea onChange={descriptionChangeHandler} type="text" />
                    <p>배포</p>
                    <Input placeholder="Github" onChange={githubChangeHadler} type="text" prefix={<GithubOutlined />} />
                    <Input placeholder="distribute" onChange={distributeChangeHadler} type="text" prefix={<HomeOutlined />} />
                </Modal>
            </React.Fragment>
            {
               portfolioList && portfolioList.map((portfolio, i) => {

                    return <PortfolioTap key={i} portfolio={portfolioList[i]} user={user} removePortfolioHandler={removePortfolioHandler} />
                })
            }
        </div>
    )
}

export default Portfolio