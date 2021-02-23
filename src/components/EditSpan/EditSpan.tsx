import React, { useState } from 'react'

type EditSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export function EditSpan(props: EditSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [spanTitle, setSpanTitle] = useState('')

    let activatedEditMode = () => {
        setEditMode(true)
        setSpanTitle(props.title)
    }

    let activatedViewMode = () => {
        setEditMode(false)
        props.onChange(spanTitle);
    }

    let onChangeSpanTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpanTitle(event.currentTarget.value)
    }

    return (
        editMode
            ?
            <input 
            onBlur={activatedViewMode} 
            value={spanTitle}
            autoFocus={true}
            onChange={onChangeSpanTitle} />
            :
            <span onDoubleClick={activatedEditMode}>{props.title} </span>
    )
}