import React, { useEffect, useState } from 'react';

/* Lib */
import axios from 'axios';

/* Components */
import { Jumbotron, Button } from 'react-bootstrap';
import StudyCard from './StudyCard';
import Filter from '../Util/Filter/Filter';
import { Modal } from 'antd'

function StudySearch() {

    const [StudyPosts, setStudyPosts] = useState([])
    const [Filters, setFilters] = useState({
        skill: [],
        onOff: undefined,
        area: []
    })
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };


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

    const showFilteredReulst = (filters, category) => {
        const newFilters = { ...Filters }
        newFilters[category] = filters

        setFilters(newFilters)
        getStudyPost(newFilters)
    }


    return (
        <div>
            <header>
                <Jumbotron className="search__header">
                    <h1 className="search__header-title">검색으로 함께할 스터디를 찾아봐요!</h1>
                </Jumbotron>
            </header>

            <section>
                <div className="search__main">
                    <Filter showFilteredReulst={showFilteredReulst} />
                    <Modal
                        title="검색 필터"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                확인
                            </Button>
                        ]}
                    >
                        <Filter showFilteredReulst={showFilteredReulst} />
                    </Modal>
                </div>
            </section>

            <section className="container">
                <p className="title">전체 결과</p>
                <Button className="mobileFilter" onClick={showModal}>검색 필터</Button>
                <StudyCard StudyPosts={StudyPosts} />
            </section>


        </div>
    )

}

export default StudySearch;