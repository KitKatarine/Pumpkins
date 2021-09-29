<!DOCTYPE html>
<html>
 <head>
    <link rel="stylesheet" href="testCSS.css">
  <meta charset="utf-8"/>
  <script src="pumpkinsScript.js"></script>
 </head>
 <body onload="draw();">
  <canvas id="pumpkin"width="480" height="480">pumpkins</canvas>
  <canvas id="grid"width="480" height="480">grid</canvas>
   <canvas id="canvas" width="480" height="480">
     Your browser doesn't support Canvas! :(
   </canvas> <!-- I forgot comments in HTML were shit. Load canvas here. -->
   
   <p id="instructions">Instructions: Click. Click like mad. I was on StackOverflow for like, twelve hours. Nothing makes sense anymore.</p>
   <div id="toolbar">
      <button id="draw">Draw</button>
      <button id="erase">Erase</button>
      <button id="clear_all">Clear all</button>
      <button id="toggle_grid">Toggle Grid</button>
   </div>
 </body>
</html>
