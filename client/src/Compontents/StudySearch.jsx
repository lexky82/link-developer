import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Select } from "antd";
import axios from 'axios';


function TechSerach() {

    const [StudyPosts, setStudyPosts] = useState([])
    const Option = Select;

    useEffect(() => {

        getStudyPost();

    }, [])

    const techstackList = [
        // 나중에 json으로 불려오면 딱이겠고만..
        { name: '', value: '' },
        { name: 'Java', value: 'Java' },
        { name: 'Python', value: 'Python' },
        { name: 'C#', value: 'C#' },
        { name: 'React', value: 'React' },
        { name: 'Node', value: 'Node' },
    ];


    const getStudyPost = () => {
        axios.post('/api/studyPost/studyPosts')
            .then(response => {
                if (response.data.success) {
                    setStudyPosts(response.data.studyInfo)
                    console.log(response.data.studyInfo)
                }
                else {
                    alert(" 스터디 리스트들을 가져오는데 실패 했습니다.")
                }
            })

    }

    /* const handelFilterSKill = (skill) => {
        const newArray = [...Notice];

        let selectedSkill = document.querySelector("#skill > div > input").value;
        const selectedArea = document.getElementById('selectArea').value;
        const selectedOnOff = document.getElementById('selectOnOff').value;
            
        selectedSkill = skill;
        
        console.log(selectedSkill);
        console.log(selectedArea);
        console.log(selectedOnOff);

        const result = newArray.filter(x => {
            return x.skill == selectedSkill && x.area == selectedArea && x.onoff == selectedOnOff
        });
    
        setRanderNotice( result );
    } */

    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">검색으로 함께할 스터디를 찾아봐요!</h2>
            </Jumbotron>

            <div className="search__main">
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a Skill"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>

                <Select placeholder="온라인/오프라인" style={{ width: 120 }}>
                    <Option value={true}>온라인</Option>
                    <Option value={false}>오프라인</Option>
                </Select>

                <Select placeholder="지역" style={{ width: 120 }}>
                    <Option value="seoul">서울</Option>
                    <Option value="incheon">인천</Option>
                    <Option value="busan">부산</Option>
                </Select>
            </div>

            <p className="title">전체 결과</p>

            <div className="container">
                <ul className="notice">
                    {
                        StudyPosts.map((a, i) => {
                            return <CardNotice key={i} particle={StudyPosts[i]} />
                        })
                    }
                </ul>
            </div>
        </div>
    )

    function CardNotice(props) {
        return (
            <li className="notice__card">
                <img src="https://img.icons8.com/ios/452/client-company.png" />
                <h5><a href={`/detail/${props.particle._id}`}>{props.particle.title}</a></h5>
                <p>{props.particle.area == 3 && "서울"}</p>
                <span className="skillStackLabel">모집 인원 : {props.particle.headcount}</span>
                <p>모집 기한 : {props.particle.date}</p>
            </li>
        )
    }
}

export default TechSerach;
