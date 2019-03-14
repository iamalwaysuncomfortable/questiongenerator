import React from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import InputFields from './Inputfields';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Toolbar from "./Toolbar";



class DocForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {docTitle:'', author:'', content:''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.forceUpdate();
    }

    handleSubmit(e){
        e.preventDefault();
    }

    render(){
        let buttonSet = (
            <div>
                <Button type="submit" label="Submit Phrases" className="p-button-raised" onClick={this.props.verifyDoc}  id="verify"/>
            </div>
        );
        return(
            <div className = "Form-wrapper">
                <div className="Form-container">
                    <div className="text-box">
                        <InputTextarea id ="content" rows={5} cols={30} onChange={this.props.handleFormChange} autoResize={true} />
                    </div>
                    <form className="Doc-container" onSubmit={this.handleSubmit}>
                        <InputFields handleFormChange={this.props.handleFormChange} />
                        <InputFields handleFormChange={this.props.handleFormChange} />
                        <InputFields handleFormChange={this.props.handleFormChange} />
                        <InputFields handleFormChange={this.props.handleFormChange} />
                        <InputFields handleFormChange={this.props.handleFormChange} />
                    </form>
                </div>
                {buttonSet}
            </div>

        );
    }

}

export default DocForm;
