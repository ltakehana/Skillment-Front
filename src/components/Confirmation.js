import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import getCompany from '../services/requests/getCompany';
import '../styles/components/modal.css';
import Modal from './Modal';

const Confirmation = ({ id = 'modal', onClose = () => { }, onConfirm=()=>{}, children }) => {

    const history = useHistory();
    
    const [highlightColor,setHighlightColor] = useState("#C7C7C7");

    useEffect(async ()=>{
        const userToken=sessionStorage.getItem("userToken");
        if(!userToken){
            await history.push("/login")
        }
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if(!companyInfo){
            companyInfo = await getCompany(userToken);
        }
        setHighlightColor(companyInfo.first_color);

    },[]);


  return (
    <Modal>
        <div className="confirmationContent">
            {children}
        </div>
        <div className="createQuestModalButtons">
            <button onClick={onClose} style={{backgroundColor:highlightColor,marginLeft:"auto"}} className="createQuestModalButton">
                Não
                <span className="material-icons">
                    close
                </span>
            </button>
            <button onClick={onConfirm} style={{backgroundColor:highlightColor}} className="createQuestModalButton">
                Sim
                <span className="material-icons">
                    done
                </span>
            </button>
        </div>
    </Modal>
  );
};

export default Confirmation;
