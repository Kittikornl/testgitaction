import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarZero} from '@fortawesome/free-regular-svg-icons'

const Showcase = () => (
    <div style={{display:"flex", flexDirection:"row"}}>
        <div className="star-group" style={{ color: "#FFC107", fontSize: "30px", paddingRight:"5px"}}>
            <FontAwesomeIcon icon={faStar} />
        </div>
        <div className="star-group" style={{ color: "#FFC107", fontSize: "30px", paddingRight:"5px"}}>
            <FontAwesomeIcon icon={faStar} />
            <i class="fas fa-star-half"></i>
        </div>
        
    </div>
)

const renderStar = (score) => {
    const intScore = parseInt(score)
    const zeroStar = 4-intScore
    const listStar = []
    for(let i=0;i<intScore;i++) {
        listStar.push(
            <div className="star-item" style={{ color: "#FFC107", fontSize: "30px", paddingRight:"5px"}}>
                <FontAwesomeIcon icon={faStar} />
            </div>
        )
    }
    if (score-intScore===0.5)
        listStar.push(
            <div className="star-item" style={{ color: "#FFC107", fontSize: "30px", paddingRight:"5px"}}>
                <FontAwesomeIcon icon={faStarHalfAlt} />
            </div>
        )
    for (let i = 0; i < zeroStar; i++) {
        listStar.push(
            <div className="star-item" style={{ color: "#FFC107", fontSize: "30px", paddingRight: "5px" }}>
                <FontAwesomeIcon icon={faStarZero} />
            </div>
        )
    }
    if (score===0)
        listStar.push(
            <div className="star-item" style={{ color: "#FFC107", fontSize: "30px", paddingRight: "5px" }}>
                <FontAwesomeIcon icon={faStarZero} />
            </div>
        )
    return listStar
}

const scores = (props) => {
    return (
        <div className="star-group" style={{display:"flex", flexDirection:"row"}}>      
            {renderStar(props.score)}
        </div>
    );
}

export default scores

