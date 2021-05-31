import React from 'react'
import { Link } from 'react-router-dom'
/* image */
import imgPerson from '../../image/person.png'

function UserInfo(props) {
    const { UserList } = props

    return (
        <div >
            <div className="peopleList">
                {
                    UserList.map((User, i) => {
                        return <InfoList personData={UserList[i]} />
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
                personData.skill.map((personInfo, i) => (
                    <div className="skillStackLabel">{personData.skill[i]}</div>
                ))
            }
        </div>
    </div>
    )
}

export default UserInfo
