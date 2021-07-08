
import styled from "styled-components";

interface Props {
    onChange: React.ChangeEventHandler,
    value: string,
    type: string,
    name: string,
    required?: boolean,
    placeHolder?: string,
    label?: string,
    helper?: string,
    wrong?: boolean,
    wrongText?: string,
};

const Input = styled.input`
    width: 100%;
    font-size: 16px;
    padding: 10px;
    padding-left: 16px;
    background: #f8f9fa;
    border: none;
    border-radius: 16px;
    &:focus {
        outline: none;
        background: #f0f1f2;
    }
`;

function TextInput(props: Props) {
    return (
        <div className="mb-3">
            <label className="w-100 form-label">{props.label}
            <Input 
                style={props.wrong? {background:'#f0e0df'} : undefined}
                name={props.name}
                type={props.type}  
                value={props.value}
                onChange={ (evt) => props.onChange(evt) }
                required={props.required ? false : props.required}
                placeholder={props.placeHolder}
                aria-describedby="emailHelp"/></label>
            <div id="emailHelp" className="form-text">{props.helper}</div>
            {props.wrong?<div id="emailHelp" className="form-text" style={{color:'#f2564e'}}>{props.wrongText}</div>: null}
        </div>
    )
}

export default TextInput
