//Problem: We need a simple way to look at a user's badge count and Javascript points
//Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
var http = require("http");


//print out message
function printMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " total badge(s) and  " + points + " points in Javascript";
	console.log(message);
}

//print out error messages
function printError(error){
	console.error(error.message);
}

function get(username){

	//Connect to the API URL (http://teamtreehouse.com/username.json)
	var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response){
		var body = "";
		//read the data
		response.on('data', function (chunk) {
			body += chunk;
		});
		response.on('end', function(){
			if(response.statusCode === 200) {
				try{
					//parse the data
					var profile = JSON.parse(body);
					//print the data
					printMessage(username, profile.badges.length, profile.points.JavaScript);
				} 
				catch(error){
					//parse error
					printError(error);
				}
			}
			else{
				//status code error
				printError({message: "There was an error getting the profile for " + username + ".  (" +
					http.STATUS_CODES[response.statusCode] + ")"});
			}
		});
	});

	//connection error
	request.on("error", printError);
}



module.exports.get = get;

