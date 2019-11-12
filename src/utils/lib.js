const crypto = require('crypto');
const axios = require('axios');

function checksum(str, algorithm, encoding) {
    if (typeof(algorithm) === "undefined") throw "Hashsing Algorithm Must Be Defined";
    return crypto
        .createHash(algorithm)
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateInput(input){
    let validated = false;
    while (validated === false){
        validated = /^([A-z0-9,+"):#])$/.test(input.substr(-1));
        if (validated === true){
            return input;
        } else if (input === "") {
            return input
        }
        else{
            input = input.substr(0,input.length-1);
        }
    }
}

function singleNounPhraseGenerator(nounText, phraseList, behavior) {
    console.log(behavior);
    const consonants = ['a', 'A','e','E','i','I','o','O','u','U'];
    let phrases = [];
    let nouns = nounText.split('\n');
    for (let i = 0; i < nouns.length; i++){
        if (!/\S/.test(nouns[i])){
            continue
        }
        if (behavior === "random") {
            let index = getRandomInt(0,phraseList.length - 1);
            let phraseSelection = phraseList[index];
            if (!/\S/.test(phraseSelection[0])){
                continue
            }
            let lastTwoCharsOfAnteriorClause = phraseSelection[0].substr(-2);
            let phrase = ((consonants.includes(nouns[i][0])) && (lastTwoCharsOfAnteriorClause === " a") && phraseSelection[1].length > 0) ?
                 phraseSelection[0] + "n " + nouns[i] + " " + phraseSelection[1] : phraseSelection[0] + " " + nouns[i] + " " + phraseSelection[1];
            console.log(phrase);
            phrase = validateInput(phrase);
            phrases.push(phrase);
        }
        else{
            for (let j = 0; j < phraseList.length; j++) {
                let phraseSelection = phraseList[j];
                if (!/\S/.test(phraseSelection[0])){
                    continue
                }
                let lastTwoCharsOfAnteriorClause = phraseSelection[0].substr(-2);
                let phrase = ((consonants.includes(nouns[i][0])) && (lastTwoCharsOfAnteriorClause === " a") && phraseSelection[1].length > 0) ?
                    phraseSelection[0] + "n " + nouns[i] + " " + phraseSelection[1] : phraseSelection[0] + " " + nouns[i] + " " + phraseSelection[1];
                console.log(phrase);
                phrase = validateInput(phrase);
                phrases.push(phrase);
            }
        }
    }

    return phrases
}

function doubleNounPhraseGenerator(nounText, phraseList, behavior) {
    console.log(behavior);
    const consonants = ['a', 'A','e','E','i','I','o','O','u','U'];
    let phrases = [];
    let firstNouns = nounText[0].split('\n');
    let secondNouns = nounText[1].split('\n');
    for (let i = 0; i < firstNouns.length; i++) {
        if (!/\S/.test(firstNouns[i])){
            continue
        }
        for (let j = 0; j < secondNouns.length; j++) {
            if (!/\S/.test(secondNouns[j])){
                continue
            }
            if (behavior === "random") {
                let index = getRandomInt(0,phraseList.length - 1);
                let phraseSelection = phraseList[index];
                if (!/\S/.test(phraseSelection[0]) || !/\S/.test(phraseSelection[1])){
                    continue
                }
                let lastTwoCharsOfAnteriorClause = phraseSelection[0].substr(-2);
                let lastTwoCharsOfPosteriorClause = phraseSelection[1].substr(-2);
                console.log(phraseSelection[1]);
                console.log(lastTwoCharsOfPosteriorClause);
                let phrase = ((consonants.includes(firstNouns[i][0])) && (lastTwoCharsOfAnteriorClause === " a") && phraseSelection[1].length > 0) ?
                    phraseSelection[0] + "n " + firstNouns[i] + " " + phraseSelection[1] : phraseSelection[0] + " " + firstNouns[i] + " " + phraseSelection[1];
                phrase = ((consonants.includes(secondNouns[j][0])) && (lastTwoCharsOfPosteriorClause === " a") && phraseSelection[2].length > 0) ?
                    phrase + "n " + secondNouns[j] + " " + phraseSelection[2] : phrase + " " + secondNouns[j] + " " + phraseSelection[2];
                phrase = validateInput(phrase);
                phrases.push(phrase);
            }
            else{
                for (let k = 0; k < phraseList.length; k++) {
                        let phraseSelection = phraseList[k];
                        if (!/\S/.test(phraseSelection[0]) || !/\S/.test(phraseSelection[1])){
                            continue
                        }
                        let lastTwoCharsOfAnteriorClause = phraseSelection[0].substr(-2);
                        let lastTwoCharsOfPosteriorClause = phraseSelection[1].substr(-2);
                        console.log(phraseSelection[1]);
                        console.log(lastTwoCharsOfPosteriorClause);
                        let phrase = ((consonants.includes(firstNouns[i][0])) && (lastTwoCharsOfAnteriorClause === " a")) ?
                            phraseSelection[0] + "n " + firstNouns[i] + " " + phraseSelection[1] : phraseSelection[0] + " " + firstNouns[i] + " " + phraseSelection[1];
                        phrase = ((consonants.includes(secondNouns[j][0])) && (lastTwoCharsOfPosteriorClause === " a")) ?
                            phrase + "n " + secondNouns[j] + " " + phraseSelection[2] : phrase + " " + secondNouns[j] + " " + phraseSelection[2];

                        phrase = validateInput(phrase);
                        phrases.push(phrase);
                }
            }
        }

    }

    return phrases
}

function categorizer(question, setCategories, userCategories) {
    question = validateInput(question);
    let categoryString = "";
    if (typeof setCategories === "object"){
        if (categoryString === ""){ categoryString = categoryString + " [Categories]:";}
        for (let i = 0;i < setCategories.length ; i++){
            categoryString = categoryString + setCategories[i]["value"] + "|"
        }
    }
    if (typeof userCategories === "string"){
        console.log(question);
        if (categoryString === ""){ categoryString = categoryString + " [Categories]:";}
        categoryString = categoryString + userCategories.replace(/\n/g, '|') + "|";
        console.log(categoryString);
    }
    categoryString = categoryString.substr(0, categoryString.length - 1);
    let result = question + categoryString;
    console.log(result);
    return result;
}

function prepareDataForDBWrite(questions){
    let payload = [];
    questions = questions.split('\n');
    for (let i = 0; i < questions.length; i++){
        let questionParts = questions[i].split('[Categories]:');
        let question = validateInput(questionParts[0]);
        if (questionParts.length === 1){
            let entry = [checksum(question, 'md5'), question, false, '{}'];
            payload.push(entry)
        }
        else{
            let categories = validateInput(questionParts[1]);
            categories = categories.split('|');
            for (let j = 0; j < categories.length ; j++){
                categories[j] = categories[j].toLowerCase();
            }
            let entry = [ checksum(question, 'md5'), question, false,'{' + categories.join(',') + '}' ];
            payload.push(entry);
        }

    }
    return {"data":payload};
}

module.exports.prepareDataForDBWrite = prepareDataForDBWrite;
module.exports.singleNounPhraseGenerator = singleNounPhraseGenerator;
module.exports.doubleNounPhraseGenerator = doubleNounPhraseGenerator;
module.exports.categorizer = categorizer;
module.exports.getRandomInt = getRandomInt;
