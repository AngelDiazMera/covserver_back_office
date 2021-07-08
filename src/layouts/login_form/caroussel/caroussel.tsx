import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import palette from "../../../colors/colorPalette"

interface Props {
    slides: React.ElementType[]
    setActualIndex: Function,
    setFormData: Function
}

function Caroussel(props: Props) {

    const [actualIndex, setActualIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const [formCompleted, setFormCompleted] = useState(false);
    const [formData, setFormData] = useState({});
    const [accepted, setAccepted] = useState(false);

    const nextSlide = () => {
        setAnimating(true);
        setTimeout(() => {
            setActualIndex(actualIndex + 1);
            setAnimating(false);
            props.setActualIndex(actualIndex + 1);
        }, 500);
    };

    const prevSlide = () => {
        setAnimating(true);
        setTimeout(() => {
            setActualIndex(actualIndex - 1);
            setAnimating(false);
            props.setActualIndex(actualIndex - 1);
        }, 500);
    };

    const setCompleted = (val: boolean): void => {
        setFormCompleted(val);
    };

    const updateFormData = (obj: {}): void => {
        const newData = formData;
        Object.assign(newData, obj);
        console.log(newData);
        setFormData(newData);
        props.setFormData(newData);
    }

    const termsAccepted = (val:boolean) => setAccepted(val);
    

    return (
        <div>
            {/* if you want to use fade animation, use "carousel-fade" on the className prop */}
            <div id="carouselExampleFade" className="carousel slide px-0 px-sm-5" data-bs-interval="false">
                <div className="carousel-inner" style={{height:280}}>
                    {props.slides?.map((Slide: React.ElementType, index: number) => (
                        <div className={`carousel-item${actualIndex === index ? ' active' : ''}`} key={index}>
                            <div className="d-block w-100">
                                <Slide className="d-block w-100" setFormCompleted={setCompleted} updateFormData={updateFormData} userData={formData} termsAccepted={termsAccepted}/>
                            </div>
                        </div> 
                    ))}
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <button  
                    type="button" 
                    className="btn btn-light" 
                    data-bs-target="#carouselExampleFade" 
                    data-bs-slide="prev" 
                    disabled={actualIndex === 0 || animating} 
                    onClick={prevSlide}>
                    <FiChevronLeft/>
                    <span>Anterior</span>
                </button>
                {actualIndex < props.slides.length - 1 ? 
                <button  
                    type="button" 
                    className="btn btn-dark" 
                    data-bs-target="#carouselExampleFade" 
                    data-bs-slide="next" 
                    style={{backgroundColor:palette['primary-color'], borderColor:palette['primary-color']}} 
                    disabled={actualIndex === (props.slides?.length - 1) || animating || !formCompleted} 
                    onClick={nextSlide}>
                    <span>Siguiente</span>
                    <FiChevronRight/>
                </button>
                :
                <input 
                    disabled = {!accepted}
                    type="submit" 
                    value="Registrar"
                    className="btn btn-dark" 
                    style={{backgroundColor:palette['primary-color'], borderColor:palette['primary-color']}} />
                }
            </div>
        </div>
    )
}

export default Caroussel
