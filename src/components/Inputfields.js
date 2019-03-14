import {InputText} from "primereact/inputtext";
import React from "react";


function InputFields(props) {
    let thirdField = (props.nouns === 2) ?
        <div className="p-col-12 p-md-4">
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-pencil"/>
                </span>
                <InputText id="tertiary" placeholder="Tertiary Clause" onChange={(e) => props.handleFormChange(e,props.index, props.nouns)} value={props.tertiary} />
            </div>
        </div> : undefined;
    return(
        <div>
            <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-pencil"/>
                    </span>
                    <InputText id="anterior" placeholder="Anterior Clause" onChange={(e) => props.handleFormChange(e,props.index, props.nouns)} value={props.anterior} />
                </div>
            </div>
            <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-pencil"/>
                    </span>
                    <InputText id="posterior" placeholder="Posterior Clause" onChange={(e) => props.handleFormChange(e,props.index, props.nouns)} value={props.posterior}/>
                </div>
            </div>
            {thirdField}
        </div>
    )
}

export default InputFields;
