import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import axios from 'axios';

function FriendsSearch() {

    const [UserList, setUserList] = useState([]);

    useEffect(() => {

        getUserList();

    }, [])

    const getUserList = () => {
        axios.post('/api/users/users')
            .then(response => {
                if (response.data.success) {
                    setUserList(response.data.userList)
                    console.log(response.data.userList)
                }
                else {
                    alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                }
            })
        
    }

    const techstackList = [
        // 나중에 json으로 불려오면 딱이겠고만..
        { name: 'Java', value: 'Java' },
        { name: 'Python', value: 'Python' },
        { name: 'C#', value: 'C#' },
        { name: 'React', value: 'React' },
    ];

    const fuzzySearch = (options) => { // dropdownbox item search
        const fuse = new Fuse(options, {
            keys: ['name', 'value'],
            threshold: 0.3,
        }); // fuse input 선언

        return (value) => {
            if (!value.length) {
                return options;
            }

            return fuse.search(value);
        };
    }

    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">검색으로 함께할 동료를 찾아봐요!</h2>
            </Jumbotron>

            <div className="friendSearch__main">
                <div>
                    <p>찾을 기술명을 입력 해주세요.</p>
                    <SelectSearch  options={techstackList} search filterOptions={fuzzySearch} value="sv" name="techstack" placeholder="기술 검색" />
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
                    <p className="title"><a href="#">{props.personData.name}</a></p>
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

