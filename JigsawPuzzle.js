var numColsToCut;
var numRowsToCut;
Target_width=300;
Target_height=300;
var widthOfOnePiece;
var heightOfOnePiece;
var k=0;
var imagePieces = [];
var canX;
var canY;
var mouseIsDown ;
var GlobalId = 0;
var cellindex;
var cell;
var downcell;
var GlobalImageId = '';
var randomNumArray = new Array();
var array = new Array();

var id = 0;
var timeOutId = null;
var timeOutBorder = null;
//global
var IsMute=false;
var showPopup = true;
var muteOtherAudio;
var MyAudio = null;
var destLeft=20;
var destTop=90;
var srcLeft=387;
var srcTop=90;
var scroller = null;
var moveflag = false;
var GlobalPuzzlePart = '';
var FFLag = 'false';
var reloaded = false;
var loc=""+document.location;
loc = loc.indexOf("?reloaded=")!=-1?loc.substring(loc.indexOf("?reloaded=")+10,loc.length):"";
loc = loc.indexOf("&")!=-1?loc.substring(0,loc.indexOf("&")):loc;
reloaded = loc!=""?(loc=="true"):reloaded;

$(function()
{
try
{
structureAllText();
var image = new Image();
var dotindex = PuzzleImage.indexOf(".");
var Imagename = PuzzleImage.substr(0, dotindex);
var ext = PuzzleImage.substr(dotindex, PuzzleImage.length);
PuzzleImage = Imagename + '1' + ext;

image.src = PuzzleImage;
image.width="300";
image.height="300";
 if($("#IMG1")!=null)
{ShowHideImage();}

if(muteOtherAudio == true)
{toggleSoundButton();}

AdjustBackgroundSettings();

if(PlayIntroductionSound == 'True')
{playIntroductionSound();} 

DisableImageDrag();
}
catch(ex){}
GenerateRandomNumbers();
var stage = new Kinetic.Stage("mainPanel", 715, 500);
            var layer = new Kinetic.Layer(); 
image.onload = cutImageUp(image);
try
{
LMSmaxScore = PuzzleMaxScore;
}
catch(ex)
{}
});


function reloadOnceOnly() {
    if (!reloaded) 
        window.location.replace(window.location+"?reloaded=true");
}


function CheckRandomNumbers()
{
try
{
var tempArray = new Array();
var CheckFlag = false;
var PartsLength = parseInt(TotalParts);
var OriginalString = "";
var Str = "";
 for (var r=0;r < PartsLength ;r++)
  {
  tempArray[r] = r;	
  OriginalString = OriginalString + "true";
  }   
 
  for (var j=0;j < PartsLength ;j++)
 {
	if(randomNumArray[j] == tempArray[j])
	{
	Str = Str + 'true';
	}	
	else
	{
	Str = Str + 'false';		
	}
 } 
 if(Str == OriginalString)
 {  
 randomNumArray = new Array();
 GenerateRandomNumbers();
 }

}
catch(ex)
{
	
}
} 

function DisableImageDrag()
{
try{
function noDrag(e) {  
    e.preventDefault();  
}
 var images = document.getElementsByTagName('img');   
       for (var i = 0; i < images.length; i++) {    
            images[i].onmousedown = noDrag;  
        }  
}catch(ex){}
}


function AdjustBackgroundSettings()
{
   var backgroundPanelDiv;  
   backgroundPanelDiv = document.getElementById("mainPanel");  
        /* mainpanel is a your main panel or div where we actually apply background image. 
                 This may change as per names of ur main div/panel.
        */
   if(BackGroundType=='Background Color') // if Background Type is 'Background Color'.
   {
     backgroundPanelDiv.style.background = BackgroundColor;
   }
   else if(BackGroundType=='None') // if Background Type is None.
   {
     backgroundPanelDiv.style.background = 'none';
   }
}

function init() {
  document.addEventListener("mousedown", mouseDown, false);
    document.addEventListener("mousemove", mouseXY, false);
   document.addEventListener("touchstart", touchDown, false);
    document.addEventListener("touchmove", touchXY, true);
    document.addEventListener("touchend", touchUp, false);
    document.addEventListener("mouseup", mouseUp, false);
    document.addEventListener("touchcancel", touchUp, false);  	
}

 


function mouseUp() {
    mouseIsDown = 0;  
    cell=getimg(destLeft,destTop);
      dispimg(cell);
      mouseXY();	 
}

 

function touchUp() {
	mouseIsDown = 0;   
    cell=getimg(destLeft,destTop);
    dispimg(cell);
    mouseXY();

}

 

function mouseDown() {

    mouseIsDown = 1;  
try
{	
	dispimg();	
	}
	catch(ex){}
	 mouseXY();       	
}
 

 function touchDown() {

    mouseIsDown = 1;	
	dispimg();
	touchXY();
}

function mouseXY(e) {

    if (!e) var e = event;
    canX = e.pageX -  document.body.offsetLeft;
    canY = e.pageY -  document.body.offsetTop;	
    showPos();

}

 

function touchXY(e) {

    if (!e) var e = event;

    e.preventDefault();

    canX = e.targetTouches[0].pageX -  document.body.offsetLeft;

    canY = e.targetTouches[0].pageY -  document.body.offsetTop;

    //showPos();

}

 

function showPos() {

    if (mouseIsDown) 
	{
	 str ="down";
	 //mouseIsDown =1;
	}
    str="up";
    if (!mouseIsDown) 
	{
	 str ="up";
	 //mouseIsDown=0;
	}
//	alert(canX);
  /*  if((canX>700||canY>490) && (moveflag == false))
   {
   moveflag = true;
     //alert("notallowed");
	  var img=document.getElementById(downcell);	 
	     img.style.left = 0;
		  img.style.top = 0; 
   } */
    
}
 function dispimg()
 {
 var PuzzleImageElement;
 var DestTable;
 var SourceTable;
 var FeedbackPanel;
 var FeedbackMessage;
 var AutoSolveImage;

 
   var TotalPuzzleParts = parseInt(TotalParts);
   
     if((canX>20&&canX<320) && (canY>90&&canY<390))
	 {
	 GlobalPuzzlePart = downcell;
	 var CellId = getimg(destLeft,destTop);
	 array[CellId] = downcell;	 
	
	   var CorrectFlag = true;
	   for(var id=0;id<TotalPuzzleParts;id++)
	   {	   
	   if(array[id] != "img" + id)
	   {
	   CorrectFlag = false;
	   }	   
	   }
	   
	   if(CorrectFlag == true)
	   {	   
		try
		{
			PuzzleImageElement = document.getElementById('PuzzleImage');
			PuzzleImageElement.style.display = 'block';
			PuzzleImageElement.style.border = "solid 3px #D6A34E";
			DestTable = document.getElementById('destDiv');
			DestTable.style.display = 'none';
			SourceTable = document.getElementById('srcDiv');
			SourceTable.style.display = 'none';
			FeedbackPanel = document.getElementById('feedBackPanel');
			FeedbackPanel.style.display = 'block';
			FeedbackMessage =  document.getElementById('FeedbackMessage');
			FeedbackMessage.style.display = 'block';
			AutoSolveImage = document.getElementById('AutoSolve');
			if(AutoSolveImage != null)
			{
			AutoSolveImage.style.display = 'none';
			}	
			FeedbackScroller();
			timeOutBorder = setTimeout("RemovePuzzleImage()",1000);
			 //For LMS Tracking
			try
			{
				IMProgressStatus = "passed";
				LMStotalScore = PuzzleMaxScore;
				LMSmaxScore = PuzzleMaxScore;
			}
			catch(ex)
			{ 
			}
		}
	   catch(ex)
	   {}
	  
	   }
		if (!(navigator.userAgent.match(/iPhone/i) ||  navigator.userAgent.match(/iPad/i)))
		{ 
           downcell = '';
		}
	 }
	 else	 
	 {	
		if(downcell != '')
		{
		var ImgId = downcell.substring(3,downcell.length);
		var intId = parseInt(ImgId);
		array[intId] = intId;
		}
		try
		{
		var img=document.getElementById(downcell);	 
	    img.style.left = 0;
		img.style.top = 0;     
		}
		catch(ex){}
	 
	 }		
 }
 
 
 function RemovePuzzleImage()
 {
 try
 {
	var PuzzleImage = document.getElementById('PuzzleImage');	
	PuzzleImage.style.border = '';
	clearTimeout(timeOutBorder);	
	}
	catch(ex){}
 }
 
 function FeedbackScroller()
 {
  var container = null;  
 try{
    var element = document.getElementById('FeedbackMessage');
    var scrollElement = document.getElementById("scrollPanel");  
    
	if(MyAudio != null)
	{MyAudio.pause();}
	   if($("#FeedbackMessage").attr("sound")!=wavePath)
	{
	var soundfile = $("#FeedbackMessage").attr("sound");
	MyAudio = new Audio(soundfile);
	MyAudio.load();
	MyAudio.play(); 
	if(IsMute == true)
	{MyAudio.pause();}
	}   
	
    if(parseInt(element.clientHeight) > 130)
    {
        ShowHideControl("scrollUp",true);
        ShowHideControl("scrollDown",true); 
        element.style.left = "5px";       
        scrollElement.style.height = element.clientHeight + 50 + "px";
    }
    else
    {
        ShowHideControl("scrollUp",false);
        ShowHideControl("scrollDown",false);
    //    element.style.top = "50px"; 
        element.style.left = "10px"; 
    }
    
    container = document.getElementById("feedBackContainer");	
	scroller = new jsScroller(container,300,180);
	var FeedbackPanel = document.getElementById("feedBackPanel");	
	FeedbackPanel.style.cursor = 'pointer'; 	 
   
      }catch(ex){}
 }
 
 function getimg(srcLeft,srcTop)
 {
    originY=srcTop;
	//alert("up");
    cellindex=0;
   for(var c=0;c<parseInt(NumberofRows);c++) //no of columns
   {
     originX=srcLeft;
     for(var r=0;r<parseInt(NumberofColumns);r++)  //no of rows
    {
        
      if((canX>originX&&canY>originY) && (canX<(originX+widthOfOnePiece)&&canY<(originY+heightOfOnePiece)))
	  {
	     return cellindex;
	  }
	  originX=originX+widthOfOnePiece;
	  cellindex++;
    }
	
	originY=originY+heightOfOnePiece;
   }	
 } 
 






//get the dimensions of image . no. of rowstoCut and no of columns to cut.

function find_dimensions()
{
  numColsToCut= parseInt(NumberofColumns);
  numRowsToCut= parseInt(NumberofRows);
  
  widthOfOnePiece=Target_width/numColsToCut;
  heightOfOnePiece=Target_height/numRowsToCut;  
}
  
 

//cut original image into pieces.
 
function cutImageUp(image) 
{   
	find_dimensions();
	
    for(var x = 0; x < numRowsToCut; x++) {
        for(var y = 0; y < numColsToCut; y++) {
            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
			
            context.drawImage(image, y * widthOfOnePiece,x * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
			
		
            imagePieces.push(canvas.toDataURL());
		   
        }
    }
  
    drawCells();
	drawTable();
	
}

 //draw destination table to put the images into.
function drawCells()
{
 
 var nrCols=parseInt(NumberofColumns);
var nrRows=parseInt(NumberofRows);
var maxRows=4;
k=0;

var root=document.getElementById('destDiv');
var tab=document.createElement('table');
tab.className="dest";
var tbo=document.createElement('tbody');
var row, cell;
tab.style.width = 300 + 'px';
tab.style.height = 300 + 'px';
for(var i=0;i<nrRows;i++){
	row=document.createElement('tr');
	for(var j=0;j<nrCols;j++){
		cell=document.createElement('td');
	    cell.setAttribute("id","cell"+k);
		cell.setAttribute("height",heightOfOnePiece);		
		cell.setAttribute("width",widthOfOnePiece);
		cell.style.height = heightOfOnePiece;
		cell.style.width = widthOfOnePiece; 
		
		cell.appendChild(document.createTextNode(''))
		row.appendChild(cell);
		k++;
	}
	tbo.appendChild(row);
}
tab.appendChild(tbo);
root.appendChild(tab);

}
  //generate random numbers to randomize the imagepieces.
function GenerateRandomNumbers()
{
var rand_no;
var TotalPuzzleParts = parseInt(TotalParts);

    try{
    var counter = 0;
	while(true)
	{
		rand_no = Math.floor((TotalPuzzleParts -0)*Math.random());
		
		if ($.inArray(rand_no, randomNumArray) == -1)		
		{
		    randomNumArray[counter] = rand_no;
		    counter = counter + 1;
		}
		
		if(randomNumArray.length == TotalPuzzleParts)
		{break;}
	}	
	CheckRandomNumbers();
	}catch(ex){} 
}

//draw image pieces in source table in random order 
function drawTable()
{
 
 var nrCols = parseInt(NumberofColumns);
var nrRows = parseInt(NumberofRows);

var root=document.getElementById('srcDiv');
var tab=document.createElement('table');
tab.className="source";
var tbo=document.createElement('tbody');
tab.style.height = 300 + 'px';
tab.style.width = 300 + 'px';
var row, cell;
var k=0;
for(var i=0;i<nrRows;i++){
	row=document.createElement('tr');
	var img; 
	for(var j=0;j<nrCols;j++){
	     
		cell=document.createElement('td');
	    cell.setAttribute("id","td"+k);
		cell.offsetHeight = heightOfOnePiece;
		cell.offsetWidth = widthOfOnePiece;
		cell.style.height = heightOfOnePiece;
		cell.style.width = widthOfOnePiece;
	    img = document.createElement("IMG");
		
		var num = randomNumArray[k];
         img.setAttribute("src",imagePieces[num]);
		 img.setAttribute("id","img"+num);
		
if ($.browser.webkit) //Chrome/Safari
    {
	 cell.style.border = "solid 1 #000000";	
	 }
else
{ cell.style.border = "solid 1px #000000";	}	 
		
	img.addEventListener("mousedown", getImgId, false);
    img.addEventListener("mouseup", getImgId, false);
	img.addEventListener("touchstart", getImgId, false);
	img.addEventListener("touchup", getImgId, false);
	//img.addEventListener("touchmove", getImgId, false);
	     
          k++;	  
		 cell.appendChild(img);		 
		row.appendChild(cell);
	}
	tbo.appendChild(row);
}

tab.appendChild(tbo);
root.appendChild(tab);

 dragImg();
}

/* getimage id on click/touch */
function getImgId()
{
  downcell = this.id;
}

//add draggable event to each image
 function dragImg()
 {
   for(var i=0;i<(numColsToCut*numRowsToCut);i++)
	   {
	
	     var getimg=document.getElementById("img"+i);
     
    	 $(getimg).draggable();
	       
		 init();
       }
 }




//autosolve function 
function Autosolve()
 { 
 var TotalPuzzleParts = parseInt(TotalParts);
 try{
      var AutoSolveImage = document.getElementById('AutoSolve');
	    AutoSolveImage.style.display = 'none';
		
	   var cellid=document.getElementById("cell"+id);
	   var img=document.getElementById('img' + id);	 
	   img.style.position = '';
	   if(cellid.childElementCount < 1)
	   {
	   $(img).draggable();
	   cellid.appendChild(img);
	   }
	   else
	   {
	   img.style.left =0;
	   img.style.top =0;	   
	   }
	
	 id = id +1;
	 if(id == TotalPuzzleParts)
	 {
		clearTimeout(timeOutId);		
	 }
	 if(id == (TotalPuzzleParts))
	 {
	   var PuzzleImageElement = document.getElementById('PuzzleImage');
	   PuzzleImageElement.style.display = 'block';
	    var DestTable = document.getElementById('destDiv');
	    DestTable.style.display = 'none';
		var srcTable = document.getElementById('srcDiv');
	    srcTable.style.display = 'none';
		
	 }
timeOutId = setTimeout("Autosolve()",1000);
 
 //For LMS Tracking
 try
 {
 IMProgressStatus = "failed";
 LMStotalScore = 0;
 LMSmaxScore = PuzzleMaxScore;
 }
 catch(ex)
 { 
 }

	 }catch(ex){}  
 }
 
 //Global Functions
 function ShowHideControl(ObjControl,bVisible)
{
try
{
	var NS4 = (document.layers) ? 1 : 0;
    var element = document.getElementById(ObjControl) ; 
    if (element != null)
    {
	if (bVisible==false)
	{element.style.display = "none";}
	else
	{element.style.display = "block";}
    }
  }
  catch(ex)
  {}
}

function OpenWebLink(webaddress)
{
	var str="http://";
	if(webaddress.indexOf(str)!=0)
	{window.open(str + webaddress);}
	else
	{window.open(webaddress);} 
}

function OpenButtonPopup(ButtonPopupId)
{
try
{
var videoElement;
var videoId;
var videoArray = null;
if(showPopup==true)
{ShowHideControl('Stage' + ButtonPopupId,true);
ShowHideControl('ButtonPopup' + ButtonPopupId,true);
videoId = 'ButtonPopupVideoTagId' + ButtonPopupId;
videoElement = document.getElementById(videoId); 
if (videoElement !=null)
{
    //condition to stop/mute all other audios and videos
	videoArray = document.getElementsByTagName("video");
	if(videoArray.length >= 1)
	{
	for(var index=0;index<videoArray.length;index++)
	{
	    try{
	    
		 videoArray[index].volume = 0;
	     if(videoArray[index].getAttribute("autoplay") == 'true')//Additional Media Video should stop.
	     {videoArray[index].pause();}
	    }catch(ex){}	    
	}
	buttonPopupMuteChk = false;
	if(IsMute == false)
	{toggleSoundButton();
	buttonPopupMuteChk = true;}
	} 
	
	
	videoElement.load(); 
	videoElement.play();  
	videoElement.volume = 1;
}
showPopup=false;} 	
}
catch(ex){}
}//OpenButtonPopup

function CloseButtonPopup(ButtonPopupId)
{
try
{
var videoElement;
var videoId;
var videoArray = null;
ShowHideControl('Stage' + ButtonPopupId,false);
ShowHideControl('ButtonPopup' + ButtonPopupId,false);
showPopup= true;
videoId = 'ButtonPopupVideoTagId' + ButtonPopupId;
videoElement = document.getElementById(videoId); 
if (videoElement !=null)
{
//condition to stop/mute all other audios and videos
	videoArray = document.getElementsByTagName("video");
	if(videoArray.length >= 1)
	{
	for(var index=0;index<videoArray.length;index++)
	{
	    try{	   
		 videoArray[index].volume = 1;	 
	    }catch(ex){}	    
	}
	} 
	if(buttonPopupMuteChk == true)
	{toggleSoundButton();}
videoElement.pause();

}

}
catch(ex){}
}//CloseButtonPopup  
 
 
 function playIntroductionSound() {
var soundfile = $("#mainPanel").attr("sound");
if($("#mainPanel").attr("sound")!=wavePath)
{
MyAudio = new Audio(soundfile);
if(MyAudio != null)
{MyAudio.pause();}
MyAudio.load();
MyAudio.play(); 
if(IsMute == true)
{MyAudio.volume=0;}
}
}

function audioError()
{
  
}//audioError

function audioEnded() {

}//audioEnded

function toggleSoundButton() 
{ 
var soundElement = null;
try{
 soundElement = document.getElementById("interactionAudio");
 if(soundElement != null)
{
    if ($("#interactionAudio").attr("src") == "./" + OnImage)
    {     
        IsMute=true;
		//AudioControl.volume=0;
		if(MyAudio != null)
		{MyAudio.volume=0;
		MyAudio.pause();
		}
        $("#interactionAudio").attr("src", "./" + OffImage);              
    }
    else 
    {
       	
			IsMute=false;
			//AudioControl.volume=1;
			if(MyAudio != null)
			{MyAudio.volume=1;}
			$("#interactionAudio").attr("src", "./" + OnImage);
		
    }
}
else if(IsMute == false)
{IsMute = true;
if(MyAudio != null)
		{MyAudio.volume=0;
		MyAudio.pause();}
}
else
{IsMute = false;
if(MyAudio != null)
{MyAudio.volume=1;}
}

}catch(ex){}
}//toggleSoundButton


 function ShowHideImage()
{
$("#IMG1").fadeOut(3000).fadeIn(3000);
setTimeout("ShowHideImage()",6000);
}

 function structureAllText()
{
var element;
    $("#mainPanel").find("div.txtControl").each(function() 
    {
        $(this).html(replaceText($(this).html()));
    });

    $("#rightTextPanel").find("div.textList").each(function()
	{
        $(this).html(replaceText($(this).html()));
    });
    
	$("#stepButtonPanel").find("button.buttonList").each(function()
	{
        $(this).html(replaceText($(this).html()));
    });
    currentdiv = null;
}

function replaceText(input)
{
    if(input==null)
    {
        return input;
    }
    input=input.replace(/<p/g,"<div");
    input=input.replace(/p>/g,"div>"); 
    var regex = new RegExp("<div></div>", "g");
     input=input.replace(regex,"<br/>");  
    if ($.browser.webkit) //Chrome/Safari
    {
        //FontDifference=4;
        FontDifference=0;
        input = input.replace(/size=\"([^<]+)\" color=\"([^<]+)\"/gi, "style='font-size:$1pt; color:$2;'");    
		input = input.replace(/color=\"([^<]+)\" size=\"([^<]+)\"/gi, "style='font-size:$2pt; color:$1;'");   
    }
    else if ($.browser.msie)//IE
    {
        FontDifference=3;
	    input = input.replace(/color=([^<]+) size=([^<]+) face=\"([^<]+)\"/gi, "style='font-size:$2pt; font-family:$3;color:$1;'"); 
        input = input.replace(/color=([^<]+) size=([^<]+) face=([^<]+)/gi, "style='font-size:$2pt; font-family:$3; color:$1;'"); 				
		input = input.replace(/color=([^<]+) face=([^<]+) size=\"([^<]+)\"/gi, "style='font-size:$3pt; font-family:$2;color:$1;'"); 
        input = input.replace(/color=([^<]+) face=([^<]+) size=([^<]+)/gi, "style='font-size:$3pt; font-family:$2; color:$1;'"); 
		
		input = input.replace(/face=([^<]+) color=([^<]+) size=\"([^<]+)\"/gi, "style='font-size:$3pt; font-family:$1;color:$2;'"); 
        input = input.replace(/face=([^<]+) color=([^<]+) size=([^<]+)/gi, "style='font-size:$3pt; font-family:$1; color:$2;'"); 
		input = input.replace(/face=([^<]+) size=([^<]+) color=\"([^<]+)\"/gi, "style='font-size:$2pt; font-family:$1;color:$3;'"); 
        input = input.replace(/face=([^<]+) size=([^<]+) color=([^<]+)/gi, "style='font-size:$2pt; font-family:$1; color:$3;'"); 
		
	    input = input.replace(/size=([^<]+) color=([^<]+) face=\"([^<]+)\"/gi, "style='font-size:$1pt; font-family:$3;color:$2;'"); 
        input = input.replace(/size=([^<]+) color=([^<]+) face=([^<]+)/gi, "style='font-size:$1pt; font-family:$3; color:$2;'"); 
	    input = input.replace(/size=([^<]+) face=([^<]+) color=\"([^<]+)\"/gi, "style='font-size:$1pt; font-family:$2;color:$3;'"); 
        input = input.replace(/size=([^<]+) face=([^<]+) color=([^<]+)/gi, "style='font-size:$1pt; font-family:$2; color:$3;'"); 
	}
    else  //Firefox
    {
        FontDifference=3;
		input = input.replace(/size=\"([^<]+)\" color=\"([^<]+)\" face=\"([^<]+)\"/gi, "style='font-size:$1pt; font-family:$3; color:$2;'"); 
		input = input.replace(/size=\"([^<]+)\" face=\"([^<]+)\" color=\"([^<]+)\"/gi, "style='font-size:$1pt; font-family:$2; color:$3;'"); 
		
        input = input.replace(/color=\"([^<]+)\" face=\"([^<]+)\" size=\"([^<]+)\"/gi, "style='font-size:$3pt; font-family:$2; color:$1;'"); 
		input = input.replace(/color=\"([^<]+)\" size=\"([^<]+)\" face=\"([^<]+)\"/gi, "style='font-size:$2pt; font-family:$3; color:$1;'");

        input = input.replace(/face=\"([^<]+)\" color=\"([^<]+)\" size=\"([^<]+)\"/gi, "style='font-size:$3pt; font-family:$1; color:$2;'");        
		input = input.replace(/face=\"([^<]+)\" size=\"([^<]+)\" color=\"([^<]+)\"/gi, "style='font-size:$2pt; font-family:$1; color:$3;'");               
    }    
    var pt = input.match(/font-size:\d+pt/g);  
    if(pt!=null)
    { 
        var i=0;  
         while(i<pt.length)        
        {
           
              fontSize=parseFloat(pt[i].split(":")[1].split("pt")[0]);            
                newSize=fontSize-FontDifference;
                original="font-size:"+fontSize+"pt";
                updated="font-size:0"+newSize+"pt";           
                if(FontDifference==0)
                {
                    updated="font-size:0"+newSize;      
                } 
              
                input=input.replace(original,updated);
               i++;
            
        }         
    }        
    return input;
}