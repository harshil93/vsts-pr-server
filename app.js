const express = require('express')
var bodyParser = require('body-parser')
const vsts = require("vso-node-api");

const collectionURL = "http://localhost:8080/tfs/DefaultCollection";    
const token = "fgmmv76t3dsx4cgndniqai4cdxiwewsfuirvqy2oqfuxrsbleogq";

const app = express()

var authHandler = vsts.getPersonalAccessTokenHandler(token);
var connection = new vsts.WebApi(collectionURL, authHandler);

var vstsGit = connection.getGitApi();

app.use(bodyParser.json());

app.post('/', function (req, res) {
    // Get the details about the PR from the service hook payload
    var repoId = req.body.resource.repository.id;
    var pullRequestId = req.body.resource.pullRequestId;
    var title = req.body.resource.title;

    // Build the status object that we want to post.
    // Assume that the PR is ready for review...
    var prStatus = {
        "state": "succeeded",
        "description": "Ready for review",
        "targetUrl": "http://www.visualstudio.com",
        "context": {
            "name": "wip-checker",
            "genre": "continuous-integration"
        }
    }

    // Check the title to see if there is "WIP" in the title.
    if (title.includes("WIP")) {

        // If so, change the status to pending and change the description.
        prStatus.state = "pending";
        prStatus.description = "Work in progress"
    }

    // Post the status to the PR
    vstsGit.createPullRequestStatus(prStatus, repoId, pullRequestId).then( result => {
        console.log(result);
    });

    res.send("Received the POST");
})

app.get('/', function (req, res) {
    res.send('Received the GET')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})