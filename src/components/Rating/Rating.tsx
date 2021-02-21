import React from 'react'
import { Star } from '../Star/Star'

export type RatingPropsType = {
    countStars: 0| 1 | 2 | 3 | 4 | 5
}

export function Rating(props: RatingPropsType) {
    if (props.countStars === 1) {
        return (
            <>
                <Star active={true}/>
                <Star active={false}/>
                <Star active={false}/>
                <Star active={false}/>
                <Star active={false}/>
            </>
        )
    }
    if (props.countStars === 2) {
        return (
            <>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={false}/>
                <Star active={false}/>
                <Star active={false}/>
            </>
        )
    }
    if (props.countStars === 3) {
        return (
            <>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={false}/>
                <Star active={false}/>
            </>
        )
    }
    if (props.countStars === 4) {
        return (
            <>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={false}/>
            </>
        )
    }
    if (props.countStars === 5) {
        return (
            <>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
                <Star active={true}/>
            </>
        )
    }
    return (
        <>
            <Star active={false}/>
            <Star active={false}/>
            <Star active={false}/>
            <Star active={false}/>
            <Star active={false}/>
        </>
    )
}