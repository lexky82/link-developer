import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import SkillFilter from '../Util/Filter/SkillFilter';
import InfoList from './InfoList';

function FriendsSearch() {

    const [UserList, setUserList] = useState([]);

    useEffect(() => {

        getUserList();

    }, [])

    const getUserList = (body) => {

        axios.post('/api/users/userlist', body)
            .then(response => {
                if (response.data.success) {
                    setUserList(response.data.userList)
                }
                else {
                    alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                }
            })
    }

    const handleFilters = (filters) => {
        getUserList(filters)
    }

    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">검색으로 함께할 동료를 찾아봐요!</h2>
            </Jumbotron>

            <div className="friendSearch__main">
                <div>
                    <p>찾을 기술명을 입력 해주세요.</p>
                    <SkillFilter handleFilters={handleFilters} />
                </div>
            </div>

            <p className="title">전체 결과</p>

            <InfoList UserList={UserList}/>
        </div>
    )
}

export default FriendsSearch;
