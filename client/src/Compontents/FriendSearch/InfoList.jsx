import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

/* image */
import imgPerson from '../../image/person.png'


function UserInfo() {
    const userList = useSelector(state => state.userInfo.userListData);

    return (
        <div >
            <div className="peopleList">
                {
                    userList && userList.userList.map((User, i) => {
                        return <InfoList key={i} personData={User} />
                    })
                }
            </div>
        </div>
    )
}

function InfoList(props) {
    const { personData } = props

    return(
    <div className="peopleList__person">
        { personData.image[0] 
        ? <img src={`http://3.16.138.36:5000/${personData.image[0].path}`} />
        : <img src={imgPerson} />
        }

        <div className="person__info">
            <p className="title"><Link to={`/profile/${personData._id}`}>{personData.name}</Link></p>
            <div>{personData.position}</div>
            {
                personData.skill.map((personSkill, i) => (
                    <div className="skillStackLabel" key={i}>{personSkill}</div>
                ))
            }
        </div>
    </div>
    )
}

export default UserInfo
