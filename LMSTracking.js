//********************************************************
//Copyright © 2005-2010 Harbinger Knowledge Products
//all rights reserved
//********************************************************
   
// These variables store the values for output parameters of the interactivity 
var raptivity_score=0;               //Stores the interactivity score
var raptivity_completionStatus=""; //Stores the completion status of the interactivity
var raptivity_result="";           //Stores the result of the interactivity
var raptivity_maxscore=0;            //Stores the max score of the interactivity
var IMProgressStatus="";
var LMSResult = "";
var LMStotalScore = 0;
var LMSmaxScore = 0;
var LMSsuspensionData = "";

function SendValuesToLMS(command, args) 
{
if(command=="scormData")
{
str = String(args).split("$")
Score=str[0];
MinScore=str[1];
MaxScore=str[2];
Status=str[3];
TimeValue=str[4];
IMResult=str[5];
PassVarToLMS(Score, MinScore, MaxScore, Status, TimeValue, IMResult);
}
else
{
switch(command)
{
case "CompletionStatus":
raptivity_completionStatus = args;
break;
case "Score":
raptivity_score = args;
break;
case "Result":
raptivity_result = args;
break;
case "MaxScore":
raptivity_maxscore = args;
break;
}
Score=raptivity_score;
MinScore=0;
Status=raptivity_completionStatus;
MaxScore=raptivity_maxscore;
TimeValue=0;
IMResult=raptivity_result;
if (Status != "") 
{PassVarToLMS(Score, MinScore, MaxScore, Status, TimeValue, IMResult);
}}
}

function CalculateLMSData()
{
	try{
	if(IMProgressStatus != "not attempted" && IMProgressStatus != "passed" && IMProgressStatus != "failed")
	{IMProgressStatus = "incomplete";} //if completion status is not completed or not attempted then it should be in progress
	
	SendValuesToLMS("CompletionStatus",IMProgressStatus);	
	SendValuesToLMS("Score",LMStotalScore);	
	SendValuesToLMS("MaxScore",LMSmaxScore);	
	}catch(ex){}
}

