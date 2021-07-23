import React, { useState } from 'react'
import "../styles/components/progress.css"

function Progress({progress}) {
    const [frontColor,setFrontColor] = useState("#E2D222");

    return(
        <div className="progressBarBackground">
            <span className="progressBarFront" style={{backgroundColor:frontColor,width:(progress+"%")}}><h2>{progress+"%"}</h2></span>
        </div>
    );

}

export default Progress;