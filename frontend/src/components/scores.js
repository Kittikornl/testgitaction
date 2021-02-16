import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarZero } from '@fortawesome/free-regular-svg-icons'

const renderStar = (score) => {
    const intScore = parseInt(score)
    const zeroStar = 4 - intScore
    const listStar = []
    for (let i = 0; i < intScore; i++) {
        listStar.push(
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFC107", fontSize: "30px" }} />
        )
    }
    if (score - intScore === 0.5)
        listStar.push(
            <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "#FFC107", fontSize: "30px" }} />
        )
    for (let i = 0; i < zeroStar; i++) {
        listStar.push(
            <FontAwesomeIcon icon={faStarZero} style={{ color: "#FFC107", fontSize: "30px" }} />
        )
    }
    if (score === 0)
        listStar.push(
            <FontAwesomeIcon icon={faStarZero} style={{ color: "#FFC107", fontSize: "30px" }} />
        )
    return listStar
}

const scores = (props) => {
    return (
        <div className="star-group flex-row" >
            {renderStar(props.score)}
        </div>
    );
}

export default scores

