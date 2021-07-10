import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// Components
import palette from "../../colors/colorPalette"
import { saveEnterprise } from '../../providers/enterprise/enterpriseRequests';

// Props definition
interface Props {
    slides: React.ElementType[], // Array of components
    setActualIndex: Function, // Callback
}

function CarousselForm(props: Props) {
    // State variables
    const [actualIndex, setActualIndex] = useState(0); // Actual index in caroussel
    const [animating, setAnimating] = useState(false); // To check if it is animating

    const [formCompleted, setFormCompleted] = useState(false); // When form is completed, value changes to true
    const [formData, setFormData] = useState({}); // Full data to request( type: Enterprise )
    const [accepted, setAccepted] = useState(false); // If terms are accepted
    const [makeRegister, setMakeRegister] = useState(false); // To check if it is doing the request
    
    // Hook: When the user clicks the register button
    useEffect(() => {
        // It will save the enterprise (REQUEST), then, it will activate the button again
        if (makeRegister === true) saveEnterprise(formData)
            .then(() => setMakeRegister(false)); 
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [makeRegister]);

    // To swipe the slides of the caroussel
    const nextSlide = () => {
        setAnimating(true);
        setTimeout(() => {
            setActualIndex(actualIndex + 1);
            setAnimating(false);
            setFormCompleted(formData.hasOwnProperty('name') && formData.hasOwnProperty('acronym') ? true : false);
            props.setActualIndex(actualIndex + 1);
        }, 500);
    };

    const prevSlide = () => {
        setAnimating(true);
        setTimeout(() => {
            setActualIndex(actualIndex - 1);
            setAnimating(false);
            setFormCompleted(true);
            props.setActualIndex(actualIndex - 1);
        }, 500);
    };

    // Called from children to stablish that a form is completed
    const setCompleted = (val: boolean): void => {
        setFormCompleted(val);
    };

    // Called from children to update the request data
    const updateFormData = (obj: {}): void => {
        const newData = formData;
        Object.assign(newData, obj);
        setFormData(newData);
    }

    const termsAccepted = (val:boolean) => setAccepted(val);
    

    return (
        <div>
            {/* if you want to use fade animation, use "carousel-fade" on the className prop */}
            <div 
                id="carouselExampleFade" 
                className="carousel slide px-0 px-sm-5"
                data-bs-interval="false">
                <div className="carousel-inner" style={{minHeight:280}}>
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
                {/* It will show the "Siguiente" button only if it is not the last slide */}
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
                // If terms are not accepted a "button" (div simulation) will be shown (handle the boolean logic was so problematic)
                !accepted ? 
                <div className="btn btn-dark" style={{background: '#838ecf', borderColor: '#838ecf'}}>
                    Registrar
                </div>
                :
                // Button to register the data when terms are accepted
                <input 
                    disabled = {
                        // Disabled only while doing the request
                        makeRegister
                    }
                    type="submit" 
                    value="Registrar"
                    className="btn btn-dark" 
                    onClick={() => setMakeRegister(true)}
                    style={{backgroundColor:palette['primary-color'], borderColor:palette['primary-color']}} />
                }
            </div>
        </div>
    )
}

export default CarousselForm
