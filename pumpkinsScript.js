function draw() {
    var c_pumpkin = document.getElementById("pumpkin");
    var c_unlit  = document.getElementById("pumpkin_unlit");
    var c_lit = document.getElementById("pumpkin_lit");
    var c_drawing = document.getElementById("canvas");
    var c_grid = document.getElementById("grid");
    var ctx_pumpkin = c_pumpkin.getContext('2d');
    var ctx_pumpkin_unlit = c_unlit.getContext('2d');
    var ctx_pumpkin_lit = c_lit.getContext('2d');
    var ctx_drawing = c_drawing.getContext('2d');
    var ctx_grid = c_grid.getContext('2d');
    var pumpkin = new Image();
    var pumpkin_lit = new Image();
    var pumpkin_unlit = new Image();

//---------------- LIT PUMPKIN

    pumpkin_lit.onload = function(){
        ctx_pumpkin_lit.mozImageSmoothingEnabled = false; //make it not blurry as shit
        ctx_pumpkin_lit.webkitImageSmoothingEnabled = false;
        ctx_pumpkin_lit.msImageSmoothingEnabled = false;
        ctx_pumpkin_lit.imageSmoothingEnabled = false;

        init();
    }
    pumpkin_lit.src = 'lit_pumpkin.png';

    const scale = 10;
    const width = 48;
    const height = 48;
    const scaledWidth = width*scale;
    const scaledHeight = height*scale;
    function drawFrame(frameX, frameY, canvasX, canvasY){
        ctx_pumpkin_lit.drawImage(pumpkin_lit, frameX*width, frameY*height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
    }

    function init(){
        //animation code!
        window.requestAnimationFrame(step);
    }
    
    const cycleLoop = [0,1,2,3,4,5,6,7,8,9,10,11];
    let currentFrameIndex=0;
    let frameCount = 0;

    function step(){
        frameCount++;
        if (frameCount <8){
            window.requestAnimationFrame(step);
            return;
        }
        frameCount = 0;
        ctx_pumpkin_lit.clearRect(0,0,480,480);
        drawFrame(cycleLoop[currentFrameIndex], 0, 0, 0);
        currentFrameIndex++;
        if (currentFrameIndex >= cycleLoop.length){
            currentFrameIndex = 0;
        }
        window.requestAnimationFrame(step);
    }

    
//---------------- UNLIT PUMPKIN
    pumpkin_unlit.onload = function(){
        ctx_pumpkin_unlit.mozImageSmoothingEnabled = false; //make it not blurry as shit
        ctx_pumpkin_unlit.webkitImageSmoothingEnabled = false;
        ctx_pumpkin_unlit.msImageSmoothingEnabled = false;
        ctx_pumpkin_unlit.imageSmoothingEnabled = false;
        
        ctx_pumpkin_unlit.drawImage(pumpkin_unlit, 0, 0, 480,480);

    }
    pumpkin_unlit.src = 'unlit_pumpkin.png';
    
//---------------- PUMPKIN
    pumpkin.onload = function() { //load the image first
    
        ctx_pumpkin.mozImageSmoothingEnabled = false; //make it not blurry as shit
        ctx_pumpkin.webkitImageSmoothingEnabled = false;
        ctx_pumpkin.msImageSmoothingEnabled = false;
        ctx_pumpkin.imageSmoothingEnabled = false;
        
        ctx_pumpkin.drawImage(pumpkin, 0, 0, 480,480);//draw the image with scaling to the canvas size

        //---------------- GRID
        var grid = 0;
        var gridbtn = document.getElementById("toggle_grid");
        if (grid == 0){
            gridbtn.style.background="#000000";
            gridbtn.style.color="chocolate";
        }
        gridbtn.addEventListener("click", function toggleGrid(){
            if (grid==1)
            {
                grid=0;
                gridbtn.style.background="#000000";
                gridbtn.style.color="chocolate";
                ctx_grid.clearRect(0,0,c_grid.width,c_grid.height);
            }
            else{
                grid=1;
                gridbtn.style.background="#70de3a";
                gridbtn.style.color="#000000";
                
                for (var a=2;a<c_grid.width;a=a+10)
                {
                    ctx_grid.strokeStyle="#8c8c8c";
                    ctx_grid.beginPath();       // Start a new path
                    ctx_grid.moveTo(a, 2);   
                    ctx_grid.lineTo(a, c_grid.height);  
                    ctx_grid.stroke();   // stroke path
                }
                for (var b=2;b<c_grid.height;b=b+10)
                {
                    ctx_grid.strokeStyle="#8c8c8c";
                    ctx_grid.beginPath();      
                    ctx_grid.moveTo(2, b);   
                    ctx_grid.lineTo(c_grid.width, b);  
                    ctx_grid.stroke(); 
                }
                ctx_grid.strokeStyle="#ff0000";
                ctx_grid.beginPath();       
                ctx_grid.moveTo(242, 0);    
                ctx_grid.lineTo(242, c_grid.height);  
                ctx_grid.stroke();
                    
                ctx_grid.beginPath();     
                ctx_grid.moveTo(0, 242);    
                ctx_grid.lineTo(c_grid.width, 242);  
                ctx_grid.stroke();
            }
        });
    }
    pumpkin.src = 'pumpkinPNG.png'; //image to load

   
      
//---------------- DRAWING ON PUMPKIN
    let drawingLayer = true;
    var isDrawing = false;
    var isErasing = false;
    var Draw = 1;
    var btnDraw = document.getElementById("draw");
    var btnErase = document.getElementById("erase");
    var btnClear = document.getElementById("clear_all");

    //button behavior/color
    if (Draw == 1){
        btnDraw.style.background="#70de3a";
        btnDraw.style.color="#000000";
    }
    btnClear.addEventListener("click", function clearAll(){//clear all button
        if(confirm("Are you sure you wish to clear your drawing? This cannot be undone!")){
            ctx_drawing.clearRect(0,0,480,480);
            addCoord=[];
            ctx_pumpkin.drawImage(pumpkin, 0,0,480,480);
        }
        else{
            return 0;
        }
        
    });

    //more button colors - Draw
    btnDraw.addEventListener("click", function doodle(){
        Draw = 1;
        drawingLayer=true;
        //console.log(drawingLayer);
        btnDraw.style.background="#70de3a";
        btnDraw.style.color="#000000";
        btnErase.style.background="#000000";
        btnErase.style.color="chocolate";
        btnShowUnlit.style.background="#000000";
        btnShowUnlit.style.color="chocolate";
        btnShowLit.style.background="#000000";
        btnShowLit.style.color="chocolate";
        ctx_pumpkin.clearRect(0,0,480,480);
        ctx_pumpkin.drawImage(pumpkin, 0, 0, 480,480);
            var tempArray = new Array();
            for (var i=0;i<addCoord.length;i++)
            {
                tempArray = addCoord[i].split(",");
                if (drawingLayer==true)
                {
                    ctx_drawing.fillRect(tempArray[0], tempArray[1], 10, 10);
                    tempArray=[];
                }
            }
    });
    //button color Erase
    btnErase.addEventListener("click", function erase(){
        Draw = 0;
        drawingLayer=true;
        btnErase.style.background="#70de3a";
        btnErase.style.color="#000000";
        btnDraw.style.background="#000000";
        btnDraw.style.color="chocolate";
        btnShowUnlit.style.background="#000000";
        btnShowUnlit.style.color="chocolate";
        btnShowLit.style.background="#000000";
        btnShowLit.style.color="chocolate";
        ctx_pumpkin.clearRect(0,0,480,480);
        ctx_pumpkin.drawImage(pumpkin, 0, 0, 480,480);
            var tempArray = new Array();
            for (var i=0;i<addCoord.length;i++)
            {
                tempArray = addCoord[i].split(",");
                if (drawingLayer==true)
                {
                    ctx_drawing.fillRect(tempArray[0], tempArray[1], 10, 10);
                    tempArray=[];
                }
            }
    });

    
        //actual drawing code
        //if mouse is up, don't do anything
        c_drawing.addEventListener("mouseup", function drawFalse(){
            isDrawing = false;
            isErasing = false;
        });
        
        //if mouse is down, do something
        c_drawing.addEventListener("mousedown", function drawTrue(){
            if (Draw==1)
            {
                isDrawing = true;
                isErasing = false;
            }
            else if (Draw==0)
            {
                isErasing = true;
                isDrawing =false;
            }
        });

        //If mouse is moving, do something based on whether or not is drawing
        c_drawing.addEventListener("mousemove", overwrite);

        var addCoord = new Array(); //necessary for the next several functions

        function overwrite(e){
        var cRect = c_drawing.getBoundingClientRect();   
        var canvasX = Math.floor((e.clientX - cRect.left)/10)*10;  
        var canvasY = Math.floor((e.clientY - cRect.top)/10)*10;  
            if (drawingLayer==true){
                if(Draw == 1){
                    if (isDrawing==true)
                    {
                        ctx_drawing.fillStyle="rbga(0,0,0,1)";
                        var findme = addCoord.includes(canvasX+","+canvasY); //find if the array includes the coords
                        if (findme == false) //if the coordinates aren't found, add them
                        {
                            addCoord.push(canvasX+","+canvasY);
                        }
                    }
                }
                else if(Draw==0){
                    if(isErasing==true)
                    {
                        var idx = addCoord.indexOf(canvasX+","+canvasY);
                        if (idx > -1)
                        {
                            addCoord.splice(idx, 1);
                            ctx_drawing.clearRect(canvasX, canvasY, 10, 10);
                        }

                    }
                }
            }
            var tempArray = new Array();
            for (var i=0;i<addCoord.length;i++)
            {
                tempArray = addCoord[i].split(",");
            }
            if (drawingLayer==true)
            {
                ctx_drawing.fillRect(tempArray[0], tempArray[1], 10, 10);
                tempArray=[];
            }
        }

        c_drawing.addEventListener("click", function clickDraw(e){
            var cRect = c_drawing.getBoundingClientRect();        // Gets CSS pos, and width/height
            var canvasX = Math.floor((e.clientX - cRect.left)/10)*10;  // Subtract the 'left' of the canvas 
            var canvasY = Math.floor((e.clientY - cRect.top)/10)*10;   // from the X/Y positions to make  
            if (Draw == 1)
            {
                if (drawingLayer==true){
                ctx_drawing.fillStyle="rbga(0,0,0,1)";
                //ctx_drawing.fillRect(canvasX, canvasY, 10, 10);
                var findme = addCoord.includes(canvasX+","+canvasY); //find if the array includes the coords
                if (findme == false) //if the coordinates aren't found, add them
                {
                    addCoord.push(canvasX+","+canvasY);
                }
                }
            }
            else{//to erase, you need to delete from the array!
                if (drawingLayer==true){
                var idx = addCoord.indexOf(canvasX+","+canvasY);
                if (idx > -1)
                {
                    addCoord.splice(idx, 1);
                    ctx_drawing.clearRect(canvasX, canvasY, 10, 10);
                }
                //console.log(addCoord);
                }
            }
            //clear rect, go through addCoord, separate by comma into new small array
            var tempArray = new Array();
            for (var i=0;i<addCoord.length;i++)
            {
                tempArray = addCoord[i].split(",");
            }
            if (drawingLayer==true){
            ctx_drawing.fillRect(tempArray[0], tempArray[1], 10, 10);
            tempArray=[];
            }
        });
    
//---------------- SHOW UNLIT

/*Take the coordinates from addCoord and clearRect for each entry on the pumpkin layer. */
var btnShowUnlit = document.getElementById("show_unlit");
var lit = false;

btnShowUnlit.addEventListener("click", function showUnlit(){
    //button highlight here
    btnShowUnlit.style.background="#70de3a";
    btnShowUnlit.style.color="#000000";
    btnShowLit.style.background="#000000";
    btnShowLit.style.color="chocolate";
    btnDraw.style.background="#000000";
    btnDraw.style.color="chocolate";
    btnErase.style.background="#000000";
    btnErase.style.color="chocolate";
    //turn off drawing layer here
    drawingLayer=false;
    ctx_drawing.clearRect(0,0,480,480);
    //redraw pumpkin unlit layer
    ctx_pumpkin_unlit.drawImage(pumpkin_unlit, 0,0,480,480);
    //erase in pumpkin layer here
    var temps = new Array();
    for (var i=0;i<addCoord.length;i++){
        temps = addCoord[i].split(",");
        ctx_pumpkin.clearRect(temps[0], temps[1], 10,10);
        temps=[];
    }
});

var btnShowLit = document.getElementById("show_lit")


btnShowLit.addEventListener("click", function showLit(){
    //button highlight here
    btnShowLit.style.background="#70de3a";
    btnShowLit.style.color="#000000";
    btnShowUnlit.style.background="#000000";
    btnShowUnlit.style.color="chocolate";
    btnDraw.style.background="#000000";
    btnDraw.style.color="chocolate";
    btnErase.style.background="#000000";
    btnErase.style.color="chocolate";
    //turn off drawing layer here
    drawingLayer=false;
    ctx_drawing.clearRect(0,0,480,480);
    //clear pumpkin unlit layer
    ctx_pumpkin_unlit.clearRect(0,0,480,480);
    //erase in pumpkin layer here
    var temps = new Array();
    for (var i=0;i<addCoord.length;i++){
        temps = addCoord[i].split(",");
        ctx_pumpkin.clearRect(temps[0], temps[1], 10,10);
        temps=[];
    }
});






}

