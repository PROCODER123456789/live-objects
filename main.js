status=""
objects= [];


function setup(){
    canvas=createCanvas(340,340);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(340,340);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocssd", modelLoaded)
    document.getElementById("status").innerHTML = "status : Detecting Objects"
}




function draw(){
    image(video, 0,0, 340,340);
    if (status !=""){
        r=random(255);
        g=random(255);
        b=random(255);
        
        objectDetector.detect(video, gotresult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status: object detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are:"+objects.length;
            fill(r, g, b)
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+""+percent+ "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
 

}

function modelLoaded(){
    console.log("model loaded !");
    status=true;
    

}

function gotresult(error, results){
    if(error){
    console.log(error);
    }
    console.log(results);
    objects=results;
}
