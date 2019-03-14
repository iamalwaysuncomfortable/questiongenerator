function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function singleNounPhraseGenerator(nounText, phraseList, behavior) {
    console.log(behavior);
    const consonants = ['a', 'A','e','E','i','I','o','O','u','U'];
    let phrases = [];
    let nouns = nounText.split('\n');
    for (let i = 0; i < nouns.length; i++){
        if (behavior === "random") {
            let index = getRandomInt(0,phraseList.length - 1);
            let phraseSelection = phraseList[index];
            let lastTwoCharsOfAnteriorClause = phraseSelection[0].substr(-2);
            let phrase = ((consonants.includes(nouns[i][0])) && (lastTwoCharsOfAnteriorClause === " a") && phraseSelection[1].length > 0) ?
                 phraseSelection[0] + "n " + nouns[i] + " " + phraseSelection[1] : phraseSelection[0] + " " + nouns[i] + " " + phraseSelection[1];
            console.log(phrase);
            phrases.push(phrase);
        }
        else{
            for (let j = 0; j < phraseList.length; j++) {
                let phraseSelection = phraseList[j];
                let lastTwoCharsOfAnteriorClause = phraseSelection[0].substr(-2);
                let phrase = ((consonants.includes(nouns[i][0])) && (lastTwoCharsOfAnteriorClause === " a") && phraseSelection[1].length > 0) ?
                    phraseSelection[0] + "n " + nouns[i] + " " + phraseSelection[1] : phraseSelection[0] + " " + nouns[i] + " " + phraseSelection[1];
                console.log(phrase);
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
        for (let j = 0; j < secondNouns.length; j++) {
            if (behavior === "random") {
                let index = getRandomInt(0,phraseList.length - 1);
                let phraseSelection = phraseList[index];
                let lastTwoCharsOfAnteriorClause = phraseSelection[0].substr(-2);
                let lastTwoCharsOfPosteriorClause = phraseSelection[1].substr(-2);
                let phrase = ((consonants.includes(firstNouns[i][0])) && (lastTwoCharsOfAnteriorClause === " a") && phraseSelection[1].length > 0) ?
                    phraseSelection[0] + "n " + firstNouns[i] + " " + phraseSelection[1] : phraseSelection[0] + " " + firstNouns[i] + " " + phraseSelection[1];
                phrase = ((consonants.includes(secondNouns[j][0])) && (lastTwoCharsOfPosteriorClause === " a") && phraseSelection[2].length > 0) ?
                    phrase + "n " + secondNouns[j] + " " + phraseSelection[2] : phrase + " " + secondNouns[j] + " " + phraseSelection[2];

                phrases.push(phrase);
            }
            else{
                for (let k = 0; k < phraseList.length; k++) {
                        let phraseSelection = phraseList[k];
                        let lastTwoCharsOfAnteriorClause = phraseSelection[0].substr(-2);
                        let lastTwoCharsOfPosteriorClause = phraseSelection[1].substr(-2);
                        let phrase = ((consonants.includes(firstNouns[i][0])) && (lastTwoCharsOfAnteriorClause === " a") && phraseSelection[1].length > 0) ?
                            phraseSelection[0] + "n " + firstNouns[i] + " " + phraseSelection[1] : phraseSelection[0] + " " + firstNouns[i] + " " + phraseSelection[1];
                        phrase = ((consonants.includes(secondNouns[j][0])) && (lastTwoCharsOfPosteriorClause === " a") && phraseSelection[2].length > 0) ?
                            phrase + "n " + secondNouns[j] + " " + phraseSelection[2] : phrase + " " + secondNouns[j] + " " + phraseSelection[2];

                        phrases.push(phrase);
                }
            }
        }

    }

    return phrases
}


module.exports.singleNounPhraseGenerator = singleNounPhraseGenerator;
module.exports.doubleNounPhraseGenerator = doubleNounPhraseGenerator;
module.exports.getRandomInt = getRandomInt;
