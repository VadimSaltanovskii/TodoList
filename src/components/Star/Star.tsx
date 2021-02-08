import React from 'react'

type StarPropsType = {
    active: boolean
}

export function Star(props: StarPropsType) {
    return props.active ? <span>★</span> : <span>☆</span>
}