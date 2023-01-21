import React, { useEffect } from 'react';

const Lists = ({type,msg,removeAlert,list}) => {
    useEffect( () =>{
        const timeOut =setTimeout(()=>{
            removeAlert();
        }, 3000)
        return () => clearTimeout(timeOut);
    },[list])
    return (
        <div>
        <p className={`alert alert-${type}`}>{msg}</p>
     </div>
    );
};

export default Lists;