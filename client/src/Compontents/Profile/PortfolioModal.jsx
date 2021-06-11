import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { Modal, Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { skill } from "../../Data"
import { Input, DatePicker, Select } from "antd";
import axios from 'axios';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Option = Select;

function PortfolioModal(props) {
    const { portfolioList } = props

    const [ProjectName, setProjectName] = useState('')
    const [Position, setPosition] = useState('')
    const [ProjectSkill, setProjectSkill] = useState([])
    const [Description, setDescription] = useState('')
    const [StartDate, setStartDate] = useState('')
    const [EndDate, setEndDate] = useState('')
    const [github, setGithub] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);

    const user = useSelector(state => state.user)

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const projectNameChangeHandler = useCallback(event => {
        setProjectName(event.target.value)
    }, [ProjectName])

    const positionChangeHandler = useCallback(event => {
        setPosition(event.target.value)
    }, [Position])

    const projectSkillChangeHandler = useCallback(event => {
        setProjectSkill(event)
    }, [ProjectSkill])

    const descriptionChangeHandler = useCallback(event => {
        setDescription(event.target.value)
    }, [Description])

    const progressDateChangeHandler = useCallback((event, datestring) => {
        setStartDate(datestring[0])
        setEndDate(datestring[1])
    }, [StartDate, EndDate])

    const githubChangeHadler = useCallback(event => {
        setGithub(event.target.value)
    }, [github])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const checkUrl = (strUrl) => {
        var expUrl = /^http[s]?\:\/\//i;
        return expUrl.test(strUrl);
    }

    const onRegistrationHandler = () => {
        if (!checkUrl(github)) {
            alert('Github URl 주소가 아닙니다.')
            return
        }

        const newObject = {
            id: portfolioList.length,
            projectName: ProjectName,
            startDate: StartDate,
            endDate: EndDate,
            position: Position,
            skill: ProjectSkill,
            description: Description,
            github: github,
        };

        const copyArray = [...portfolioList];
        copyArray.push(newObject);

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

        props.changeRegistration(copyArray);
        setIsModalVisible(false);
    }

    return (
        <div>
            <span>포트폴리오</span>
            { user && <button className="experience--button" onClick={showModal}>+</button>}
            <hr />

            <Modal title="검색 필터"
                visible={isModalVisible}
                onOk={onRegistrationHandler}
                onCancel={handleCancel}
                footer={[
                    <Button key="OK" onClick={onRegistrationHandler}>
                        확인
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        취소
                    </Button>
                ]}>

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
                <TextArea onChange={descriptionChangeHandler} type="text" autoSize="false" />
                <p>배포</p>
                <Input placeholder="Github" onChange={githubChangeHadler} type="text" prefix={<GithubOutlined />} />
            </Modal>
        </div>
    )
}

export default PortfolioModal
