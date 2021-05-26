import React, { useEffect, useState } from 'react';

/* Lib */
import axios from 'axios';

/* Components */
import { Jumbotron } from 'react-bootstrap';
import StudyCard from './StudyCard';
import Filter from '../Util/Filter/Filter';


function StudySearch() {

    const [StudyPosts, setStudyPosts] = useState([])
    const [Filters, setFilters] = useState({
        skill : [],
        onOff: undefined,
        area: []
    })

    useEffect(() => {

        getStudyPost();

    }, [])

    const getStudyPost = (body) => {
        console.log(body)

        axios.post('/api/studyPost/studyPosts', body)
            .then(response => {
                if (response.data.success) {
                    setStudyPosts(response.data.studyInfo)
                }
                else {
                    alert(" 스터디 리스트들을 가져오는데 실패 했습니다.")
                }
            })
    }

    const showFilteredReulst = (filters, category) =>{
        const newFilters = {...Filters}
        newFilters[category] = filters
        
        setFilters(newFilters)
        getStudyPost(newFilters)
    }

    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">검색으로 함께할 스터디를 찾아봐요!</h2>
            </Jumbotron>

            <div className="search__main">
               <Filter 
                showFilteredReulst={showFilteredReulst}
               />
            </div>

            <p className="title">전체 결과</p>

            <StudyCard StudyPosts={StudyPosts} />
        </div>
    )

}

export default StudySearch;