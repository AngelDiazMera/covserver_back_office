import { useEffect } from "react";
import { useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label
  } from "reactstrap";  
  import {
    saveGroupCode
  } from "../../../../providers/groupsRequest";
import TextInput from "../../../../components/text_input/textInput";
import Centered from "../../../../components/centered/centered";
interface Props {
    isDelete: boolean;
    isNewCode: boolean;
    deleteGroupCode:(_id: string) => void;
}
/**
 * This is a test of modal
 * ***/
const Mmodal: React.FC<Props> = ({isDelete,isNewCode,deleteGroupCode}) =>{
  
    const [nameCode,setNameCode] = useState("");
    const [save, setSave] = useState(false);
 
    // When the user save a new group code
    const handleOnSave = () => {
        setSave(true);
    };
    
    const handleExit = () => {
       isNewCode=false;
       isDelete=false;
    };

    const changeEnterprise = (event: any) => {
        setNameCode(event.target.value);
    };

    // Hook: When the user save a new code
  useEffect(() => {
    if (!save) return;
    const updateEnterpriseData = async () => {
      const data = { name: nameCode };
      if (save === true) {
        await saveGroupCode(data);
        setSave(false);
        setNameCode("");
      }
    };
    updateEnterpriseData();
  }, [nameCode, save]);

 return(
    <Modal isOpen={isNewCode || isDelete}>
      {isNewCode ? 
      <ModalHeader>
        Nuevo Código
      </ModalHeader> : 
      <ModalHeader 
        style={{alignSelf:"center"}}
      >
          ¿Estas seguro de eliminar este código?
      </ModalHeader>}
        <ModalBody>
          {isNewCode ?
          <FormGroup>
            <TextInput
              label="Nombre del área"
              name="nameCode"
              placeHolder="ej. Recursos Humanos"
              onChange={changeEnterprise}
              type="text"
              value={nameCode}
              maxlength={35}
              wrong={nameCode.trim() === '' }
              wrongText="El campo no puede estar vacío"
              required={true}/>
          </FormGroup>:
          <Centered> 
            <Label>Esta acción eliminara el código junto con los usuarios que lo hayan escaneado.</Label>
          </Centered>}
        </ModalBody>

        <ModalFooter>
          {isNewCode ? 
          <Button
            className="btn btn-light"
            type="button"
            style={{
              backgroundColor: "#3f51b5",
              borderBlockColor: "#f8f9fa",
              color: "white"
            }}
            disabled={!nameCode}
            onClick={() => {handleOnSave()}}
          >
            Generar código
          </Button> : 

           <Button
           className="btn btn-light"
           type="button"
           style={{
             backgroundColor: "red",
             borderBlockColor: "#f8f9fa",
             color: "white"
           }} 
           onClick={() => {}}
         >
           Eliminar
         </Button>}

          <Button 
            color="secondary" 
            onClick={() => {handleExit();}}>
            Salir
          </Button>
        </ModalFooter>
      </Modal>
 );   
}
export default Mmodal;