import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarZero } from '@fortawesome/free-regular-svg-icons'

const renderStar = (score) => {
    const intScore = parseInt(score)
    const zeroStar = 4 - intScore
    const listStar = []
    for (let i = 0; i < intScore; i++) {
        listStar.push(
            <FontAwesomeIcon className="star-icon" icon={faStar} />
        )
    }
    if (score - intScore === 0.5)
        listStar.push(
            <FontAwesomeIcon className="star-icon" icon={faStarHalfAlt}  />
        )
    for (let i = 0; i < zeroStar; i++) {
        listStar.push(
            <FontAwesomeIcon className="star-icon" icon={faStarZero} />
        )
    }
    if (score === 0)
        listStar.push(
            <FontAwesomeIcon className="star-icon" icon={faStarZero} />
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

