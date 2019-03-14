import BodyText from "./Bodytext";
import OneClauseDocForm from "./OneClauseDocForm";
import Toolbar from "./Toolbar";
import ExistingDocTable from "./ExistingDocTable";
import {ProgressBar} from 'primereact/progressbar';
import {Messages} from 'primereact/messages';
import React from "react";
import {Button} from "primereact/button";
import TwoClauseDocForm from "./TwoClauseDocForm";
import {InputTextarea} from "primereact/inputtextarea";
let {singleNounPhraseGenerator, doubleNounPhraseGenerator} = require('../utils/lib');
const sha256 = require('sha256');
const initialCategories = [
    {name: "Gossip", value: "Gossip"},
    {name: "Everyday/Interesting Phenomenon", value: "Everyday/Interesting Phenomenon"},
    {name: "Consumer Web Services", value: "Consumer Web Services"},
    {name: "Hypothetical", value: "Hypothetical"},
    {name: "Politics", value: "Politics"},
    {name: "Personal Advice", value: "Personal Advice"},
    {name: "Comparisons", value: "Comparisons"},
    {name: "Professional", value: "Professional"},
    {name: "Psychology", value: "Psychology"},
    {name: "Popular Media", value: "Popular Media"},
    {name: "General Info/Advice", value: "General Info/Advice"},
    {name: "History", value: "History"},
    {name: "Horoscopes", value: "Horoscopes"},
    {name: "Money", value: "Money"},
    {name: "IT", value: "IT"},
    {name: "Cryptocurrency", value: "Cryptocurrency"},
    {name: "Consumer Products", value: "Consumer Products"},
    {name: "Language", value: "Language"}];

class Web3Gateway extends React.Component{

    constructor(props) {
        super(props);
        this.state = {singleNouns:'', singleSentenceClauses:[], doubleNouns:["",""], doubleSentenceClauses: [], questions:"",
            selectedCategories:[],otherCategories:""};
        this.tick = this.tick.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.addPair = this.addPair.bind(this);
        this.submitPhraseCombos = this.submitPhraseCombos.bind(this);

    }

    showSuccess(message) {
        this.messages.show({severity: 'success', summary: 'Success Message', detail: message});
    }

    showError(message) {
        this.messages.show({severity: 'error', summary: 'Error Message', detail: message});
    }

    handleFormChange(e, index, nouns){
        console.log(index);
        switch (e.target.id){
            case "questionsbox":
                this.setState({questions: e.target.value});
                break;
            case "nounbox":
                if (typeof(index) === "undefined") {
                    this.setState({singleNouns: e.target.value});
                }
                else if (index < 2){
                    var nounBox = this.state.doubleNouns;
                    nounBox[index] = e.target.value;
                    this.setState({doubleNouns: nounBox})
                }
                break;
            case "categories":
                this.setState({selectedCategories: e.value});
                break;
            case "anterior":
                if (nouns===1) {
                    var clauses = this.state.singleSentenceClauses;
                    clauses[index][0] = e.target.value;
                    this.setState({singleSentenceClauses: clauses});
                }
                else if (nouns === 2){
                    var clauses = this.state.doubleSentenceClauses;
                    clauses[index][0] = e.target.value;
                    this.setState({doubleSentenceClauses: clauses});
                }
                break;
            case "posterior":
                if (nouns===1) {
                    var clauses = this.state.singleSentenceClauses;
                    clauses[index][1] = e.target.value;
                    this.setState({singleSentenceClauses: clauses});
                }
                else if (nouns === 2){
                    var clauses = this.state.doubleSentenceClauses;
                    clauses[index][1] = e.target.value;
                    this.setState({doubleSentenceClauses: clauses});
                }
                break;
            case "tertiary":
                if (nouns === 2){
                    var clauses = this.state.doubleSentenceClauses;
                    clauses[index][2] = e.target.value;
                    this.setState({doubleSentenceClauses: clauses});
                }
                break;


        }
    }


    submitPhraseCombos(e, type, nouns){
        let questions = this.state.questions;

        let phrases = (nouns === 2)?
            doubleNounPhraseGenerator(this.state.doubleNouns, this.state.doubleSentenceClauses, type) :
            singleNounPhraseGenerator(this.state.singleNouns, this.state.singleSentenceClauses, type);

        questions = questions.split('\n');

        for (let i = 0; i < phrases.length; i++){
            if (questions.includes(phrases[i])) {
                //Do nothing
            } else {
                questions.push(phrases[i]);
            }
        }

        questions = questions.join("\n");
        if (questions.substr(2) == "\n"){
            questions = questions.substr(1,questions.length-1);
        }

        this.setState({questions:questions});
        if (nouns === 1){
            this.setState({singleSentenceClauses:[]})
        } else if (nouns === 2){
            this.setState({doubleSentenceClauses:[]})
        }
    }

    addPair(e, type){
        console.log(type);
        if (type === "oneClause") {
            let clauses = this.state.singleSentenceClauses;
            clauses.push(["", ""]);
            this.setState({singleSentenceClauses: clauses});
        }
        if (type === "twoClause") {
            let clauses = this.state.doubleSentenceClauses;
            clauses.push(["","",""]);
            this.setState({doubleSentenceClauses: clauses});
        }

    }

    async componentDidMount() {

    }

    componentWillUnmount() {
    }

    ///Tick function checks up on changes in environment and updates state to reflect that.\
    async tick(){
    }

    render(){
        let buttonSet = (
            <div>
                <Button type="submit" label="Submit Phrase Combo" className="p-button-raised" onClick={this.props.verifyDoc}  id="verify"/>
            </div>
        );
        let value = JSON.stringify(this.state);

            return(
                <div className="main-div">
                    <h4>{value}</h4>
                    <BodyText/>
                    <OneClauseDocForm singleNouns={this.state.singleNouns} singleSentenceClauses={this.state.singleSentenceClauses}
                                      handleFormChange = {this.handleFormChange} addPair = {this.addPair}
                                      submitPhraseCombos = {this.submitPhraseCombos} categories = {initialCategories}
                                      selectedCategories = {this.state.selectedCategories}/>
                    <TwoClauseDocForm doubleNouns={this.state.doubleNouns} doubleSentenceClauses={this.state.doubleSentenceClauses}
                                      handleFormChange = {this.handleFormChange} addPair = {this.addPair}
                                      submitPhraseCombos = {this.submitPhraseCombos} categories = {initialCategories}
                                      selectedCategories = {this.state.selectedCategories}/>
                    <Messages ref={(el) => this.messages = el} />
                    <h2>Phrase List</h2>
                    <div className="Bodytext-center">
                       {buttonSet}
                    </div>
                    <InputTextarea id ="questionsbox" rows={5} cols={30} value={this.state.questions} onChange={this.handleFormChange} autoResize={true} />
                </div>
            );
        }
}

export default Web3Gateway;
