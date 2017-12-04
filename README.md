# Visual Studio Team Services (VSTS)/TFS Pull Request Status API Server.

This is very basic server which posts back status to the Pull Requests created on a VSTS/TFS. 

You will have to setup a Service Hooks subscription for the PullRequest created event and post that status to http://localhost:3000 or whatever your server url is.
For more details see the links below.

[Original Documentation for creating server](https://docs.microsoft.com/en-us/vsts/git/how-to/create-pr-status-server)

[Git pull request statuses API](https://www.visualstudio.com/en-us/docs/integrate/api/git/pull-requests/pullrequeststatuses)

[Configure a branch policy for an external service](https://docs.microsoft.com/en-us/vsts/git/how-to/pr-status-policy)




