import React from 'react'
import { Star } from '../Star/Star'

type RatingPropsType = {
    countStars: 1 | 2 | 3 | 4 | 5
}

export function Rating(props: RatingPropsType) {
    if (props.countStars === 1) {
        return (
            <div>
                <Star active={true}/>
                <Star active={false}/>
                <Star active={false}/>
                <Star active={false}/>
                <Star active={false}/>
            </div>
        )
    }
    if (props.countStars === 2) {
        return (
            <div>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={false}/>
                <Star active={false}/>
                <Star active={false}/>
            </div>
        )
    }
    if (props.countStars === 3) {
        return (
            <div>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={false}/>
                <Star active={false}/>
            </div>
        )
    }
    if (props.countStars === 4) {
        return (
            <div>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={false}/>
            </div>
        )
    }
    if (props.countStars === 5) {
        return (
            <div>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
            </div>
        )
    }
    return (
        <div>
            <Star active={false}/>
            <Star active={false}/>
            <Star active={false}/>
            <Star active={false}/>
            <Star active={false}/>
        </div>
    )
}