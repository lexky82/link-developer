import { Jumbotron } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';

function friendsSearch(props) {
    
    const person = props;
    
    const techstackList = [
        // 나중에 json으로 불려오면 딱이겠고만..
        { name: 'Java', value: 'Java' },
        { name: 'Python', value: 'Python' },
        { name: 'C#', value: 'C#' },
    ];

    function fuzzySearch(options) { // dropdownbox item search
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
                <h2 className="search__header-title">검색으로 함께할 스터디를 찾아봐요!</h2>
            </Jumbotron>

            <div className="friendSearch__main">
                <div>
                    <p>찾을 기술명을 입력 해주세요.</p>
                    <SelectSearch options={techstackList} search filterOptions={fuzzySearch} value="sv" name="techstack" placeholder="기술 검색" />
                    <p>이름을 입력 해주세요.</p>
                    <input type="text"/>
                    <input type="button" value="검색"/>
                </div>
            </div>

            <p className="title">전체 결과</p>

            <div className="container">
                <div className="row">
                    {
                        props.person.map((a, i) => {
                            return <Notice personData={props.person[i]} />
                        })
                    }
                </div>


            </div>
        </div>
    )

    function Notice(props) {
        return (
            <div className="person">
                <img src="https://avatars.githubusercontent.com/u/80798626?v=4" />
                <h5>{props.personData.Name}</h5>
                <p>{props.personData.skill}</p>
                <p>{props.personData.affiliation}</p>

            </div>
        )
    }
}

export default friendsSearch;

