import {Toolbar} from 'primereact/toolbar';
import {Button} from 'primereact/button';
import React from "react";


class TopToolBar extends React.Component{

    constructor(props){
        super(props);
//        this.submitQuestions = this.submitQuestions.bind(this);
    }



    render(){
        return(
            <Toolbar>
                <div className="p-toolbar-group-left">
                    <Button label="New Phrase Set" icon="pi pi-plus" onClick={this.props.addNewForm} style={{marginRight:'.25em'}} />
                    <Button label="Submit" className="p-button-success"  />
                </div>
            </Toolbar>
        );
    }
}

export default TopToolBar;
