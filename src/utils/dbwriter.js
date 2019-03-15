const {checksum} = require('../utils/lib');
const pg = require('pg');
const format = require('pg-format');
const insertQuery = "INSERT INTO questionsasked (qhash, question, asked, categories) VALUES %L ON CONFLICT DO NOTHING";
const pool = new pg.Pool();


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

async function executeQuery(query){
    let status = "failure";
    let client = await pool.connect();
    try {
        let res = await client.query(query);
        status = "success";
        console.log("data write successful")
    } catch (e) {
        console.log("query execution failed");
        console.log("error was:");
        console.log(e);
        status = "failure";
    } finally {
        await client.release();
        return status;
    }
}

async function stageNewQuestions(questions) {
    let values = [];
    for (let i = 0; i < questions.length; i++){
        values.push(checksum(questions[i][0]), questions[i][0], 'f', '{' + String(questions[1]) + '}');
    }
    let query = format(insertQuery, values);
    let queryResult = await executeQuery(query);
    return queryResult;
}

module.exports.stageNewQuestions = stageNewQuestions;
