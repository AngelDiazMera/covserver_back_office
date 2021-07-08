import { FiChevronRight, FiCheck } from 'react-icons/fi';

import Centered from "../../../components/centered/centered"
import palette from "../../../colors/colorPalette"

interface Props {
    step: number,
    header: String,
    content: String,
    selected?: boolean,
    isLast?: boolean,
    checked?: boolean
}

function Step(props: Props) {
    return (
        <div className="d-flex flex-row">
            <div className="d-flex flex-column justify-content-center px-3">
                <div className={`${props.selected || props.checked ? '' : 'bg-light'} rounded`} style={{ backgroundColor: props.selected || props.checked ? '#C5CAE9' : '', width: 35, height: 35 }}>
                    <Centered>
                        <span className="align-middle">
                            <small>
                                { props.checked ? <FiCheck/> : props.step }
                            </small>
                        </span>
                    </Centered>
                </div>
            </div>
            <div className="d-flex flex-column align-items-start my-1">
                <h6 className="m-0" style={{ color:props.checked ? palette['secondary-text'] : ''}}>{ props.header }</h6>
                <span className="text-start" style={{ color:props.checked ? palette['divider-color'] : palette['secondary-text'] }}>
                    <small>
                        { props.content }
                    </small>
                </span>
            </div>
            {!props.isLast ? (
            <div className="d-flex flex-column justify-content-center mx-1">
                <span className="fs-5" style={{ color:palette['divider-color'] }}><FiChevronRight/></span>
            </div>
            ) : null}
        </div>
    )
}

export default Step
