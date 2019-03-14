import React, {Component} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import InputFields from './Inputfields';
import {MultiSelect} from 'primereact/multiselect';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Toolbar from "./Toolbar";



class DocForm extends React.Component{
    constructor(props){
        super(props);
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
                <Button id="random" type="submit" label="Submit Random Phrases" className="p-button-raised"  onClick={(e) => this.props.submitPhraseCombos(e, "random", 1)}  />
                <Button id="all" type="submit" label="Submit All Phrases" className="p-button-raised"  onClick={(e) => this.props.submitPhraseCombos(e, "all", 1)}  />

            </div>
        );

        return(
            <div className = "Form-wrapper">
                <div className="Form-container">
                    <div className="text-box">
                        <InputTextarea id ="nounbox" rows={5} cols={30} onChange={this.props.handleFormChange} value={this.props.singleNouns} autoResize={true} />
                    </div>

                    <div>
                        <Button type="submit" label="Add Phrase Pair" className="p-button-raised" onClick={(e) => this.props.addPair(e,"oneClause")}  id="addpair"/>
                        {this.props.singleSentenceClauses.map((clause,i) => <InputFields key={i.toString()} index = {i} anterior={clause[0]} posterior={clause[1]} handleFormChange={this.props.handleFormChange} nouns={1} />)}
                    </div>
                </div>
                <div>
                    <h2>Categories</h2>
                    <h4>Primary Category</h4>
                    <MultiSelect id = "categories" optionLabel="name" value={this.props.selectedCategories}
                                 options={this.props.categories} onChange={this.props.handleFormChange}
                                 style={{minWidth:'12em'}} placeholder="Choose"/>
                    <h4>Other Categories</h4>
                    <InputTextarea id ="othercategories" rows={1} cols={30} onChange={this.props.handleFormChange} value={this.props.otherCategories} autoResize={true} />
                </div>
                {buttonSet}
            </div>

        );
    }

}

export default DocForm;
