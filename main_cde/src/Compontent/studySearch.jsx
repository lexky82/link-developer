import { Jumbotron, Form, Card, ListGroup } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';


function techSerach(props) {

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

    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">검색으로 함께할 스터디를 찾아봐요!</h2>
            </Jumbotron>

            <Form className="search__main">
                <SelectSearch options={techstackList} search filterOptions={fuzzySearch} value="sv" name="techstack" placeholder="기술 검색" />
                <Form.Group>
                    <Form.Control as="select" custom>
                        <option></option>
                        <option>프론트엔드</option>
                        <option>백엔드</option>
                        <option>웹 풀스택</option>
                        <option>안드로이드</option>
                        <option>머신러닝</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Control min="0" type="Number" placeholder="멤버수" />
                </Form.Group>

                <Form.Group>
                    <Form.Control as="select" custom>
                        <option>온라인</option>
                        <option>오프라인</option>
                        <option>기타</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="select" custom>
                        <option></option>
                        <option>서울</option>
                        <option>인천</option>
                        <option>충남</option>
                        <option>대전</option>
                        <option>강원</option>
                        <option>부산</option>
                    </Form.Control>
                </Form.Group>
            </Form>

            <p className="title">전체 결과</p>

            <ul className="container">
                <div className="row">
                    {
                        props.notice.map((a, i) => {
                            return <Notice particle={props.notice[i]} />
                        })
                    }
                </div>
            </ul>
        </div>
    )

    function Notice(props) {
        return (
            <li className="card">
                <img src="https://img.icons8.com/ios/452/client-company.png" />
                <h5>{props.particle.title}</h5>
                <span>2/4 & {props.particle.area}</span>
            </li>
        )
    }
}

export default techSerach;