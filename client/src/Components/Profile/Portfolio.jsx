import React, { useEffect, useState } from 'react'

/* Lib */
import axios from 'axios';

/* Components */
import PortfolioTap from "./PortfolioTap";
import PortfolioModal from './PortfolioModal';

function Portfolio(props) {
    const { portfolio, user } = props

    useEffect(() => {
        setPortfolioList(portfolio)
    }, [portfolio])

    const [portfolioList, setPortfolioList] = useState([]);

    const changeRegistration = (portfolioArray) => {
        setPortfolioList(portfolioArray)
    }

    const removePortfolioHandler = (event) => {
        const selectedPortfolio = event.target.parentNode.parentNode.id;
        const newArray = [...portfolioList];

        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].id === parseInt(selectedPortfolio)) {
                newArray.splice(i, 1);
                i--;
            }
        }

        const body = {
            _id: user.userData._id,
            portfolio: selectedPortfolio
        }

        axios.put('api/users/removeportfolio', body)
            .then(response => {
                if (response.data.success) {

                }
                else {
                    alert('포트폴리오 제거에 실패 했습니다.');
                }
            })
            .catch((err) => {
                alert(err)
            })

        setPortfolioList(newArray);
    }

    return (
        <div>
            <PortfolioModal portfolioList={portfolioList} changeRegistration={changeRegistration} user={user} />
            {
                portfolioList && portfolioList.map((portfolio, i) => {
                    return <PortfolioTap key={i} portfolio={portfolio} user={user} removePortfolioHandler={removePortfolioHandler} />
                })
            }
        </div>
    )
}

export default Portfolio