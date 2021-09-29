function draw() {
    var c_pumpkin = document.getElementById("pumpkin");
    var c_drawing = document.getElementById("canvas");
    var c_grid = document.getElementById("grid");
    var ctx_pumpkin = c_pumpkin.getContext('2d');
    var ctx_drawing = c_drawing.getContext('2d');
    var ctx_grid = c_grid.getContext('2d');
    var pumpkin = new Image();
    
    pumpkin.onload = function() { //load the image first
    
        ctx_pumpkin.mozImageSmoothingEnabled = false; //make it not blurry as shit
        ctx_pumpkin.webkitImageSmoothingEnabled = false;
        ctx_pumpkin.msImageSmoothingEnabled = false;
        ctx_pumpkin.imageSmoothingEnabled = false;
        
        ctx_pumpkin.drawImage(pumpkin, 0, 0, 480,480);//draw the image with scaling to the canvas size


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

      

    var isDrawing = false;
    var isErasing = false;
    var Draw = 1;
    var btnDraw = document.getElementById("draw");
    var btnErase = document.getElementById("erase");
    var btnClear = document.getElementById("clear_all");
    if (Draw == 1){
        btnDraw.style.background="#70de3a";
        btnDraw.style.color="#000000";
    }
    btnClear.addEventListener("click", function clearAll(){
        ctx_drawing.clearRect(0,0,480,480);
    });

    btnDraw.addEventListener("click", function doodle(){
        Draw = 1;
        btnDraw.style.background="#70de3a";
        btnDraw.style.color="#000000";
        btnErase.style.background="#000000";
        btnErase.style.color="chocolate";
    });

    btnErase.addEventListener("click", function erase(){
        Draw = 0;
        btnErase.style.background="#70de3a";
        btnErase.style.color="#000000";
        btnDraw.style.background="#000000";
        btnDraw.style.color="chocolate";
    });

    
        c_drawing.addEventListener("mouseup", function drawFalse(){
            isDrawing = false;
            isErasing = false;
        });
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

        c_drawing.addEventListener("mousemove", overwrite);

        function overwrite(e){
        var cRect = c_drawing.getBoundingClientRect();   
        var canvasX = Math.floor((e.clientX - cRect.left)/10)*10;  
        var canvasY = Math.floor((e.clientY - cRect.top)/10)*10;  
            if(Draw == 1){
                if (isDrawing==true)
                {
                ctx_drawing.fillStyle="rbga(0,0,0,1)";
                ctx_drawing.fillRect(canvasX, canvasY, 10, 10);
                }
            }
            else if(Draw==0){
                if(isErasing==true)
                {
                    ctx_drawing.clearRect(canvasX, canvasY, 10, 10);
                }
            }
        }
    
        c_drawing.addEventListener("click", function clickDraw(e){
            var cRect = c_drawing.getBoundingClientRect();        // Gets CSS pos, and width/height
            var canvasX = Math.floor((e.clientX - cRect.left)/10)*10;  // Subtract the 'left' of the canvas 
            var canvasY = Math.floor((e.clientY - cRect.top)/10)*10;   // from the X/Y positions to make  
            if (Draw == 1)
            {
                ctx_drawing.fillStyle="rbga(0,0,0,1)";
                ctx_drawing.fillRect(canvasX, canvasY, 10, 10);
            }
            else{
                ctx_drawing.clearRect(canvasX, canvasY, 10, 10);
            }
        });


}


