const dialogflow = require("@google-cloud/dialogflow")
const router = require('../routes/readingRoutes')

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
