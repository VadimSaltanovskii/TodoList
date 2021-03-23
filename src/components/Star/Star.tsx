import React from 'react';
import StarStyle from './Star.module.css'

type StarProps = {
    done: boolean
}

export function Star(props: StarProps) {
    return <span className={StarStyle.oneStar}>{props.done ? '★' : '☆'}</span>
}