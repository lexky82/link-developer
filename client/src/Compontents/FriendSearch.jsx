import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Select } from "antd";
import axios from 'axios';
import SkillFilter from './Util/Filter/SkillFilter';

function FriendsSearch() {

    const [UserList, setUserList] = useState([]);
    const Option = Select;

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

            <div className="container-md">
                <div className="peopleList">
                    {
                        UserList.map((a, i) => {
                            return <Notice personData={UserList[i]} />
                        })
                    }
                </div>
            </div>
        </div>
    )

    function Notice(props) {
        return (
            <div className="peopleList__person">
                <img src="https://avatars.githubusercontent.com/u/80798626?v=4" />
                <div className="person__info">
                    <p className="title"><a href={`/profile/${props.personData._id}`}>{props.personData.name}</a></p>
                    <div>{props.personData.position}</div>
                    {  
                        props.personData.skill.map((a, i) => (
                            <div className="skillStackLabel">{props.personData.skill[i]}</div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default FriendsSearch;

