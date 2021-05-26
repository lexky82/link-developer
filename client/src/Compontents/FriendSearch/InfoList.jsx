import React from 'react'

function UserInfo(props) {
    const { UserList } = props

    return (
        <div className="container-md">
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
        ? <img src={personData.image[0].path} />
        : <img src="client\public\person.png" />
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
