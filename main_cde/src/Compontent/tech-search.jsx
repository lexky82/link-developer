import { useState } from 'react';
import { Jumbotron, Button, Form } from 'react-bootstrap';

function techSerach() {


    return (
        <div>
            <Jumbotron className="search__header">
                <div>
                    <h2 className="search__header-title">검색으로 함께할 스터디를 찾아봐요!</h2>
                </div>
            </Jumbotron>

            <Form className="search__main">
                <Form.Group controlId="techstack">
                    <Form.Control type="text" placeholder="기술 스택" />
                </Form.Group>

                <Form.Group controlId="exampleForm.sSelectCustom">
                    <Form.Control as="select" custom>
                        <option>프론트엔드</option>
                        <option>백엔드</option>
                        <option>웹 풀스택</option>
                        <option>안드로이드</option>
                        <option>머신러닝</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="Number">
                    <Form.Control min="0" type="Number" placeholder="멤버수" />
                </Form.Group>

                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control as="select" custom>
                        <option>온라인</option>
                        <option>오프라인</option>
                        <option>기타</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <Form.Control as="select" custom>
                        <option>서울</option>
                        <option>인천</option>
                        <option>충남</option>
                        <option>대전</option>
                        <option>강원</option>
                        <option>부산</option>
                    </Form.Control>
                </Form.Group>
            </Form>

           {/*  <div>
             <div className="row"></div>
                {
                    MainData.map((a, i) => {
                        return <Article article={MainData[i]} i ={i} />
                    })
                }
            </div> */}



        </div>
    )

   /*  function Article(props) {
        return(
    <div className="col-md-2">
        <img src="https://" width="100%" />
        <h4>{props.article[i].title}</h4>
        <p>{props.article[i].area} & {props.article[i].date} & {props.article[i].people}</p>
    </div>
        )
    } */
}

export default techSerach;