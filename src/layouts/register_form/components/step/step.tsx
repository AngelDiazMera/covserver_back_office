import { FiChevronRight, FiCheck } from 'react-icons/fi';
// Components
import Centered from "../../../../components/centered/centered"
import palette from "../../../../colors/colorPalette"
// Props definition
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
            {/* Number of the step. If is checked, it will show a check inside */}
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
            {/* Step content: title and description */}
            <div className="d-flex flex-column align-items-start my-1 d-none d-sm-block lh-1">
                {/* Title */}
                <h6 className="m-0 mb-1" style={{ color:props.checked ? palette['secondary-text'] : ''}}>{ props.header }</h6>
                {/* Description */}
                <span className="text-start" style={{ color:props.checked ? palette['divider-color'] : palette['secondary-text']}}>
                    <small>
                        { props.content }
                    </small>
                </span>
            </div>
            {/* Chevron icon to right if it is not the last */}
            {!props.isLast ? (
            <div className="d-none d-sm-block d-flex flex-column  justify-content-center mx-1 ">
                <div style={{height:'calc(50% - 20px)'}}/>
                <span className="fs-5" style={{ color:palette['divider-color'] }}><FiChevronRight/></span>
            </div>
            ) : null}
        </div>
    )
}

export default Step
