import React from 'react'

/* image */
import imgPerson from '../../image/person.png'

function UserInfo(props) {
    const { UserList } = props

    return (
        <div >
            <div className="peopleList">
                {
                    UserList.map((a, i) => {
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
        ? <img src={`http://localhost:5000/${personData.image[0].path}`} />
        : <img src={imgPerson} />
        }
        <div className="person__info">
            <p className="title"><a href={`/profile/${personData._id}`}>{personData.name}</a></p>
            <div>{personData.position}</div>
            {
                personData.skill.map((a, i) => (
                    <div className="skillStackLabel">{personData.skill[i]}</div>
                ))
            }
        </div>
    </div>
    )
}

export default UserInfo
