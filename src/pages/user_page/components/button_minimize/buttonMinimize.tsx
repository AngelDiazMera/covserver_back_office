import React from 'react'

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function ButtonMinimize(props: Props) {
    return (
        <button
        className="btn  border-0"
        id="sidebarToggle"
        type="button"
        onClick={props.onClick}
      />
    )
}

export default ButtonMinimize
