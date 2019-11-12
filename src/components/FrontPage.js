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
const axios = require('axios');
const {singleNounPhraseGenerator, doubleNounPhraseGenerator, categorizer, prepareDataForDBWrite} = require('../utils/lib');
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

class FrontPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {singleNouns:'', singleSentenceClauses:[], doubleNouns:["",""],
            doubleSentenceClauses: [], questions:"", singleSelectedCategories:[],
            doubleSelectedCategories:[],singleUserCategories:"", doubleUserCategories:""};
        this.tick = this.tick.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.addPair = this.addPair.bind(this);
        this.deletePair = this.deletePair.bind(this);
        this.submitPhraseCombos = this.submitPhraseCombos.bind(this);
        this.submitQuestions = this.submitQuestions.bind(this);
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
                if (index === "single") {
                    this.setState({singleSelectedCategories: e.value});
                }
                else if (index === "double"){
                    this.setState({doubleSelectedCategories: e.value});
                }
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
            case "usercategories":
                if (index === "single") {
                    this.setState({singleUserCategories: e.target.value});
                }
                else if (index === "double") {
                    this.setState({doubleUserCategories: e.target.value});
                }
                break;

        }
    }

    submitPhraseCombos(e, type, nouns){
        let questions = this.state.questions;
        if (nouns === 2 && ((this.state.doubleNouns[0] === "" || this.state.doubleNouns[1] === "") || this.state.doubleSentenceClauses.length === 0)){
            return
        } else if (nouns === 1 && (this.state.singleNouns === "" || this.state.singleSentenceClauses.length === 0)){
            return
        }
        let phrases = (nouns === 2) ?
            doubleNounPhraseGenerator(this.state.doubleNouns, this.state.doubleSentenceClauses, type) :
            singleNounPhraseGenerator(this.state.singleNouns, this.state.singleSentenceClauses, type);

        questions = questions.split('\n');
        let questionsMinusCategories = [];
        for (let i = 0; i < questions.length; i++){
            let q = questions[0].split(" [Categories]:");
            questionsMinusCategories.push(q[0]);
        }

        for (let i = 0; i < phrases.length; i++){
            if (questionsMinusCategories.includes(phrases[i])) {
                //Do nothing
            } else {
                phrases[i] = (nouns === 1) ?
                    categorizer(phrases[i], this.state.singleSelectedCategories, this.state.singleUserCategories) :
                    categorizer(phrases[i], this.state.doubleSelectedCategories, this.state.doubleUserCategories);

                questions.push(phrases[i]);
            }
        }

        if (questions[0] === ""){
            questions.shift();
        }

        questions = questions.join("\n");


        this.setState({questions:questions});
        if (nouns === 1){
            this.setState({singleSentenceClauses:[]});
            this.setState({singleSelectedCategories:[]});
            this.setState({singleUserCategories:""});
        } else if (nouns === 2){
            this.setState({doubleSentenceClauses:[]});
            this.setState({doubleSelectedCategories:[]});
            this.setState({doubleUserCategories:""});
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

    deletePair(e, type){
        console.log(type);
        if (type === "oneClause") {
            let clauses = this.state.singleSentenceClauses;
            clauses.pop();
            this.setState({singleSentenceClauses: clauses});
        }
        if (type === "twoClause") {
            let clauses = this.state.doubleSentenceClauses;
            clauses.pop();
            this.setState({doubleSentenceClauses: clauses});
        }

    }

    async submitQuestions(e){
        if (this.state.questions === ""){return}
        let questions = this.state.questions;
        let payload = await prepareDataForDBWrite(questions);
        console.log(payload);
        let result = await axios.post('http://0.0.0.0:3002/api/updateRecords',payload);
        console.log(result.data);
        if (result.data === "success"){
            this.setState({questions:""});
        }
    }

    ///Tick function checks up on changes in environment and updates state to reflect that.\
    async tick(){
    }

    render(){
        let buttonSet = (
            <div>
                <Button type="submit" label="Submit Phrase Combo" className="p-button-raised" onClick={this.submitQuestions}  id="verify"/>
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
                                      selectedCategories = {this.state.singleSelectedCategories}
                                      userCategories={this.state.singleUserCategories} deletePair = {this.deletePair}/>
                    <TwoClauseDocForm doubleNouns={this.state.doubleNouns} doubleSentenceClauses={this.state.doubleSentenceClauses}
                                      handleFormChange = {this.handleFormChange} addPair = {this.addPair}
                                      submitPhraseCombos = {this.submitPhraseCombos} categories = {initialCategories}
                                      selectedCategories = {this.state.doubleSelectedCategories}
                                      userCategories={this.state.doubleUserCategories} deletePair = {this.deletePair}/>
                    <Messages ref={(el) => this.messages = el} />
                    <h2>Phrase List</h2>
                    <div className="Bodytext-center">
                       {buttonSet}
                    </div>
                    <InputTextarea id ="questionsbox" rows={5} cols={80} value={this.state.questions}
                                   onChange={this.handleFormChange} autoResize={true} />
                </div>
            );
        }
}

export default FrontPage;
