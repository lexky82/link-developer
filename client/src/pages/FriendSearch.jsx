import React, { useEffect, useState } from 'react';

/* Lib */
import { userInfo } from "../_actions/userInfo_actions";
import { useDispatch } from "react-redux";


/* Components */
import { Jumbotron } from 'react-bootstrap';
import SkillFilter from '../Compontents/Util/Filter/SkillFilter';
import InfoList from '../Compontents/FriendSearch/InfoList';

function FriendsSearch() {

    const dispatch = useDispatch()

    useEffect(() => {

        getUserList();

    }, [])

    const getUserList = (body) => {
        dispatch(userInfo(body))
            .then(response => {
                if (response.payload.success) {
                    
                }
                else {
                    alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                }
            })
            .catch((err) => {
                alert(err)
            })
    }

    const handleFilters = (filters) => {
        getUserList(filters)
    }

    return (
        <div>
            <header>
                <Jumbotron className="search__header">
                    <h1 className="search__header-title">검색으로 함께할 동료를 찾아봐요!</h1>
                </Jumbotron>
            </header>

            <section>
                <div className="friendSearch__main">
                    <div>
                        <p>찾을 기술명을 입력 해주세요.</p>
                        <SkillFilter handleFilters={handleFilters} />
                    </div>
                </div>
            </section>

            <section className="container-md friendSearchList">
                <p className="title">전체 결과</p>
                <InfoList />
            </section>

        </div>
    )
}

export default FriendsSearch;

