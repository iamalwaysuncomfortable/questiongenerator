import {InputText} from "primereact/inputtext";
import React from "react";


function InputFields(props) {
    return(
        <div>
            <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-pencil"/>
                    </span>
                    <InputText id="category" placeholder="Anterior Clause" onChange={(e) => props.handleFormChange(e,props.index)} value={props.anterior} />
                </div>
            </div>
        </div>
    )
}

export default InputFields;
