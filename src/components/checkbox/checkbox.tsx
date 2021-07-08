import React from 'react'

interface Props {
    label?: string,
    checked?: boolean,
    onChange: React.ChangeEventHandler,
}

function Checkbox(props: Props) {
    return (
        <div className="form-check">
            <label className="form-check-label">
                {props.label}
                <input className="form-check-input" type="checkbox" checked={props.checked} onChange={props.onChange}/>
            </label>
        </div>
    )
}

export default Checkbox
