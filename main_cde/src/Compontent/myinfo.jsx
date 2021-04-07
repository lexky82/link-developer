import { Jumbotron } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';

function myInfo()
{

    const techstackList = [
        // 나중에 json으로 불려오면 딱이겠고만..
        { name: 'Java', value: 'java' },
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

    return(
        <div>
            <section>
                <div className="myinfo">
                    <img src="https://avatars.githubusercontent.com/u/80798626?v=4"/>
                    <div className="myinfo__keyinfo">
                        <h1>
                            <p>권혁진</p>
                            <p>(lexky82@gmail.com)</p>
                        </h1>
                        <p className="myinfo--affiliation">대한민국 근무중</p>
                        <p className="myinfo--department">상용화</p>

                        <div className="myinfo__keyinfo--techstack">
                            <span>기술</span>
                            <button onClick={() => {}}>+</button>
                            <SelectSearch options={techstackList} search filterOptions={fuzzySearch} value="sv" name="techstack" placeholder="기술 검색" />
                        </div>
                    </div>
                    
                </div>


                <div className="container">
                    <div className="row">
                    </div>
                </div>
            </section>

        </div>
    )
    
}

export default myInfo;
