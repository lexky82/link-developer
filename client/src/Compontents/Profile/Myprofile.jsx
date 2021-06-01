import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

/* Components */
import { Jumbotron } from "react-bootstrap";
import Portfolio from "./Portfolio";
import KeyInfo from "./KeyInfo";

/* Lib */
import { userInfo } from "../../_actions/userInfo_actions";

function MyProfile(props) {
    const dispatch = useDispatch()
    const [Profile, setProfile] = useState([])
    const [portfolioList, setPortfolioList] = useState([]);
    const [skill, setSkill] = useState([]);
    const [image, setImage] = useState('');

    const userInfoList = useSelector(state => state.userInfo.userListData);
    const MyId = window.localStorage.getItem('userId')

    useEffect(() => {

        getProfilePost()
    }, [])

    const getProfilePost = () => {

        if (!userInfoList) {
            dispatch(userInfo())
                .then(response => {
                    if (response.payload.success) {
                        infoFilter(response.payload.userList)
                    }
                    else {
                        alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                    }
                })
        }
        else {
            infoFilter(userInfoList)
        }

    }

    const infoFilter = (userList) =>{
        const result = userList.filter(element => {
            return element._id === MyId
        })
        
        setProfile({...result[0]})
    }

    return (
        <div>
            <Jumbotron className="search__header">
                <h1 className="search__header-title">입력한 정보를 다른 유저들이 볼 수 있어요!</h1>
            </Jumbotron>

            <div className="container">
                <section>
                    <KeyInfo
                        Skill={Profile.skill}
                        image={image}
                        setImage={setImage}
                        setSkill={setSkill}
                        profile={Profile}
                        setProfile={setProfile}
                        user={props.user}
                    />
                </section>

                <section className="expreience__portfolio">
                    <Portfolio
                        portfolioList={portfolioList}
                        setPortfolioList={setPortfolioList}
                        user={props.user}
                    />
                </section>
            </div>
        </div>
    )
}

export default MyProfile;
