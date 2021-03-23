import React from 'react'
import { RatingType } from '../../App'
import { Star } from '../Star/Star'

type RatingProps = {
    countOfStars: RatingType
}

export function Rating(props: RatingProps) {

    return (
        <span>
            <Star done={props.countOfStars > 0}/>
            <Star done={props.countOfStars > 1}/>
            <Star done={props.countOfStars > 2}/>
            <Star done={props.countOfStars > 3}/>
            <Star done={props.countOfStars > 4}/>
        </span>
    )

}