import { Jumbotron } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';

function friendsSearch() {
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

        </div>
    )

}

export default friendsSearch;

