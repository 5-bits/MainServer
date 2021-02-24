const express = require("express");
const router = express.Router();
const read = require("../models/Reading.js")
const dialogflow = require("@google-cloud/dialogflow")

//var value = new read({value : 10})

// URL      - /add
//          - Add a reading to the database
router.post('/add', (req, res) => {
    
    var value = new read({ value : req.body });
    value.save().then( result => {
        //console.log("value added !");
        return res.json({
            message : "insertion success !",
            value : value
        })
        
    })
    .catch( err => {
        //console.log(err)
        return res.json({
            message : 'insertion failed',
            error : err
        })
    })
}) 

router.get('/fetch',(req, res, n)=>{
    const values = read.find().sort({_id : 1}).limit(n).then( result => {
        return res.json(result);
    });
})

router.post('/dialog', (req, res) => {
    
    const languageCode = 'en';
    const projectId = 'keen-dolphin-305306';
    const sessionId = '123456';
    const queries = [req.body];
    // Instantiates a session client
    const sessionClient = new dialogflow.SessionsClient();
  
    async function detectIntent(
      projectId,
      sessionId,
      query,
      contexts,
      languageCode
    ) {
      // The path to identify the agent that owns the created intent.
      const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
      );
  
      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: query,
            languageCode: languageCode,
          },
        },
      };
  
      if (contexts && contexts.length > 0) {
        request.queryParams = {
          contexts: contexts,
        };
      }
  
      const responses = await sessionClient.detectIntent(request);
      return responses[0];
    }
  
    async function executeQueries(projectId, sessionId, queries, languageCode) {
      // Keeping the context across queries let's us simulate an ongoing conversation with the bot
      let context;
      let intentResponse;
      for (const query of queries) {
        
          //res.json(`Sending Query: ${query}`);
          intentResponse =  await detectIntent(
            projectId,
            sessionId,
            query,
            context,
            languageCode
          );
          //res.json('Detected intent');
          return res.json({
            message : "success!",
            fulfillmentText :  intentResponse.queryResult.fulfillmentText,
  
          });
          // Use the context from this response for next queries
          context = intentResponse.queryResult.outputContexts;
        
        
      }
    }
    executeQueries(projectId, sessionId, queries, languageCode).catch( err => {
        return res.json({
          message : 'failure...',
          error : err
      });
    });
    })

module.exports = router;