import React, { useState, useEffect } from 'react';

/* Lib */
import { userInfo } from "../../_actions/userInfo_actions";
import { useSelector, useDispatch } from "react-redux";

/* Components */
import { Jumbotron } from "react-bootstrap";
import Portfolio from "./Portfolio";
import KeyInfo from "./KeyInfo";

function MyProfile(props) {

    const [Profile, setProfile] = useState([])
    const [portfolioList, setPortfolioList] = useState([]);
    const [skill, setSkill] = useState([]);
    const [image, setImage] = useState('');

    const dispatch = useDispatch()
    const profileId = props.match.params
    

    useEffect(() => {

        getProfilePost()

    }, [])

    const userInfoList = useSelector(state => state.userInfo.userListData);
    const getProfilePost = () => {
        if(!userInfoList){
            dispatch(userInfo())
            .then(response => {
                if (response.payload.success) {
                    infoFilter(response.payload.userList)
                }
                else {
                    alert("스터디 리스트들을 가져오는데 실패 했습니다.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else{
            infoFilter(userInfoList.userList)
        }
    }

    const infoFilter = (userList) =>{
        const result = userList.filter(element => {
            return element._id === profileId.profileId
        })
        
        setProfile({...result[0]})
        result[0].image[0] && setImage(result[0].image[0].path)
    }

    return (
        <div>
            <Jumbotron className="search__header">
                <h1 className="search__header-title">이 유저는 어떤가요?</h1>
            </Jumbotron>
            {
                console.log(Profile.portfolio)
            }
            <div className="container">
                <section>
                    <KeyInfo
                        Skill={Profile.skill}
                        image={image}
                        setSkill={setSkill}
                        profile={Profile}
                        setProfile={setProfile}
                        user={profileId.profileId === window.localStorage.getItem('userId')}
                    />
                </section>

                <section className="expreience__portfolio">
                    <Portfolio
                        portfolio={Profile.portfolio}
                        user={profileId.profileId === window.localStorage.getItem('userId')}
                    />
                </section>
            </div>
        </div>
    )
}

export default MyProfile;
