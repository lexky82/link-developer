import { Jumbotron } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';

function friendsSearch(props) {

    const {person, setperson, randerPerson, setRanderPerson} = props;

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

    const filterSkill = (event) => {
        const newArray = [...person];

        const result =  newArray.filter( x => {
            return x.skill == event
        });
        
        setRanderPerson( result );
    }


    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">검색으로 함께할 동료를 찾아봐요!</h2>
            </Jumbotron>

            <div className="friendSearch__main">
                <div>
                    <p>찾을 기술명을 입력 해주세요.</p>
                    <SelectSearch onChange={(event) => {filterSkill(event)}} options={techstackList} search filterOptions={fuzzySearch} value="sv" name="techstack" placeholder="기술 검색" />
                </div>
            </div>

            <p className="title">전체 결과</p>

            <div className="container-md">
                <div className="peopleList">
                    {
                        randerPerson.map((a, i) => {
                            return <Notice personData={props.randerPerson[i]} />
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
                    <p className="title"><a href="#">{props.personData.Name}</a></p>
                    <div>{props.personData.position}</div>
                    <div className="skillStackLabel">{props.personData.skill}</div>
                </div>
            </div>
        )
    }
}

export default friendsSearch;

