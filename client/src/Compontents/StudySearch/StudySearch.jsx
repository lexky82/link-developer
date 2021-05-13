import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Select } from "antd";
import axios from 'axios';

import StudyCard from './StudyCard';
import Filter from '../Util/Filter';


function StudySearch() {

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
               <Filter />
            </div>

            <p className="title">전체 결과</p>

            <StudyCard StudyPosts={StudyPosts} />
        </div>
    )

}

export default StudySearch;