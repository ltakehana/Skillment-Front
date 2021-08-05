import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import getCompany from '../services/requests/getCompany';
import "../styles/components/plusButton.css"

function PlusButton({onClickFunction}) {

    const history = useHistory();


    const [backgroundColor,setBackgroundColor] = useState("#4A4A4A");
    const [highlightColor,setHighlightColor] = useState("#4A4A4A");



    useEffect(async ()=>{
        const userToken=sessionStorage.getItem("userToken");
        if(!userToken){
            await history.push("/login")
        }

        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if(!companyInfo){
            companyInfo = await getCompany(userToken);
        }
        setBackgroundColor(companyInfo.first_color);
        setHighlightColor(companyInfo.third_color);
    },[]);

    return(
        <button className="plusButton" style={{backgroundColor:backgroundColor}} onClick={onClickFunction}>
            <span className="material-icons" style={{color:highlightColor}}>
                add
            </span>
        </button>
    );

}

export default PlusButton;