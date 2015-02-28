var nuevoDibujo = new Dibujemos();

var ejecutarHerramienta = function (nuevoDibujo){
  switch(nuevoDibujo.herramientaActual){
    case 1:
      $('#tmp_canvas').remove();
      $('#text_tool').remove();
      dibujar(nuevoDibujo);
      return false;
    case 2:
      $('#tmp_canvas').remove();
      $('#text_tool').remove();
      dibujar(nuevoDibujo);
      return false;
    case 3:
      $('#tmp_canvas').remove();
      $('#text_tool').remove();
      nuevoDibujo.ancho=5;
      dibujarLinea(nuevoDibujo);
      return false;
    case 4:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      dibujarAerosol(nuevoDibujo);
      return false;
    case 5:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      console.log("dib cuadradoRelleno");
      nuevoDibujo.ancho = 80;
      dibujarRectanguloDin(nuevoDibujo);
      return false;
    case 6:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      nuevoDibujo.ancho=5;
      dibujarLinea(nuevoDibujo);
      return false;
    case 7:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      nuevoDibujo.ancho = 50;
      dibujarHexa(nuevoDibujo);
      return false;
    case 8:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      nuevoDibujo.ancho = 10;
      dibujarHexa(nuevoDibujo);
      return false;
    case 9:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      nuevoDibujo.ancho = 5;
      dibujarRectanguloDin(nuevoDibujo);
      return false;
    case 10:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      nuevoDibujo.ancho=70;
      dibujarCirculoDin(nuevoDibujo);
      return false;
    case 11:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      nuevoDibujo.ancho=3;
      dibujarCirculoDin(nuevoDibujo);
      return false;
    case 13:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      nuevoDibujo.ancho=70;
      dibujarElipseDin(nuevoDibujo);
      return false;
    case 17:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      nuevoDibujo.ancho=5;
      dibujarElipseDin(nuevoDibujo);
      return false;
    case 18:
      $('#text_tool').remove();
      $('#tmp_canvas').remove();
      dibujarTextArea(nuevoDibujo);
      return false;
  }
};

//objeto que contiene todas las variables
function Dibujemos(){
  this.mouse = {x: 0, y: 0};
  this.color = 'black';
  this.ancho = '1';
  this.canvas = document.querySelector('#hoja');
  this.ctx = this.canvas.getContext('2d');
  this.sketch = document.querySelector('#sketch');
  this.sketch_style = getComputedStyle(this.sketch);
  this.canvas.width = 900;
  this.canvas.height = 700;
  this.herramientaActual = 1;
}
//metodos
Dibujemos.prototype.setHerramientaActual = function(indice){
  nuevoDibujo.herramientaActual = indice;
  return false;
}
Dibujemos.prototype.setColor = function (color){
  nuevoDibujo.color = color;
  ejecutarHerramienta (nuevoDibujo);
  return false;
}
Dibujemos.prototype.setAncho = function (ancho){
  this.ancho=ancho;
  ejecutarHerramienta (nuevoDibujo);
  return false;
}
Dibujemos.prototype.setCoordenadas=function(mouse){
  var e = mouse;
  nuevoDibujo.mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
  nuevoDibujo.mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
}
Dibujemos.prototype.setPosicion = function (posX, posY){
  this.mouse.x = posX;
  this.mouse.y = posY;
}
Dibujemos.prototype.getColor = function (color){
  return this.color;
}
Dibujemos.prototype.getAncho = function (ancho){
  return this.ancho;
}
Dibujemos.prototype.getPosicion = function (posX, posY){
  return this.mouse.x;
}


/*****Figuras******/

function dibujarRectangulo(nuevoDibujo){
  $('#hoja').drawRect({
  fillStyle: nuevoDibujo.color,
  x: nuevoDibujo.mouse.x, y: nuevoDibujo.mouse.y,
  width: 123,
  height: 340
  });
  return false;
}

function dibujarTriangulo (nuevoDibujo){
  $('#hoja').drawPolygon({
  layer: true,
  fillStyle: nuevoDibujo.color,
  x: nuevoDibujo.mouse.x, y: nuevoDibujo.mouse.y,
  radius: nuevoDibujo.ancho + 1,
  sides: 3,
  concavity: 0,
  click: function(layer) {
    // Spin star
    $(this).animateLayer(layer, {
      rotate: '+=90'
    });
  }
  });
  return false;
}

function dibujarCuadrado (posX, posY, color, radio){
  $('#hoja').drawPolygon({
  layer: true,
  fillStyle: color,
  x: posX, y: posY,
  radius: radio,
  sides: 4,
  concavity: 0,
  click: function(layer) {
    // Spin star
    $(this).animateLayer(layer, {
      rotate: '+=90'
    });
  }
  });
  return false;
}

function dibujarRectanguloDin(nuevoDibujo){
  
  // Creating a tmp canvas
  var tmp_canvas = document.createElement('canvas');
  var tmp_ctx = tmp_canvas.getContext('2d');
  tmp_canvas.id = 'tmp_canvas';
  tmp_canvas.width = nuevoDibujo.canvas.width;
  tmp_canvas.height = nuevoDibujo.canvas.height;
  
  nuevoDibujo.sketch.appendChild(tmp_canvas);

  var mouse = {x: 0, y: 0};
  var start_mouse = {x: 0, y: 0};
  
  
  /* Mouse Capturing Work */
  tmp_canvas.addEventListener('mousemove', function(e) {
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  }, false);
  
  
  /* Drawing on Paint App */
  tmp_ctx.lineWidth = nuevoDibujo.ancho;
  tmp_ctx.lineJoin = 'rect';
  tmp_ctx.lineCap = 'round';
  tmp_ctx.strokeStyle = nuevoDibujo.color;
  tmp_ctx.fillStyle = nuevoDibujo.color;
  
  tmp_canvas.addEventListener('mousedown', function(e) {
    tmp_canvas.addEventListener('mousemove', onPaint, false);
    
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    
    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;
    
    onPaint();
  }, false);
  
  tmp_canvas.addEventListener('mouseup', function() {
    tmp_canvas.removeEventListener('mousemove', onPaint, false);
    
    // Writing down to real canvas now
    nuevoDibujo.ctx.drawImage(tmp_canvas, 0, 0);
    // Clearing tmp canvas
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);    
  }, false);
  
  var onPaint = function() {
    
    // Tmp canvas is always cleared up before drawing.
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
    var x = Math.min(mouse.x, start_mouse.x);
    var y = Math.min(mouse.y, start_mouse.y);
    var width = Math.abs(mouse.x - start_mouse.x);
    var height = Math.abs(mouse.y - start_mouse.y);
    tmp_ctx.strokeRect(x, y, width, height);
    
  };
  return false;
}

function dibujar (nuevoDibujo){
  /* Captura del movimiento del mouse */
  nuevoDibujo.canvas.addEventListener('mousemove', function(e) {
    nuevoDibujo.mouse.x = e.pageX - this.offsetLeft;
    nuevoDibujo.mouse.y = e.pageY - this.offsetTop;
  }, false);
  
  /* Drawing on Paint App */
  nuevoDibujo.ctx.lineWidth = nuevoDibujo.ancho;
  nuevoDibujo.ctx.lineJoin = 'round';
  nuevoDibujo.ctx.lineCap = 'round';
  nuevoDibujo.ctx.strokeStyle = nuevoDibujo.color;
   
  nuevoDibujo.canvas.addEventListener('mousedown', function(e) {
      nuevoDibujo.ctx.beginPath();
      nuevoDibujo.ctx.moveTo(nuevoDibujo.mouse.x, nuevoDibujo.mouse.y);
      nuevoDibujo.canvas.addEventListener('mousemove', onPaint, false);
  }, false);
   
  nuevoDibujo.canvas.addEventListener('mouseup', function() {
      nuevoDibujo.canvas.removeEventListener('mousemove', onPaint, false);

  }, false);
   
  var onPaint = function() {
      nuevoDibujo.ctx.lineTo(nuevoDibujo.mouse.x, nuevoDibujo.mouse.y);
      nuevoDibujo.ctx.stroke();
  };
  return false;
}

function dibujarCirculo(radio, posX, posY, color){
  $('canvas').drawPolygon({
  strokeStyle: color,
  strokeWidth: 4,
  x: posX, y: posY,
  radius: radio,
  sides: 100
  });
  return false;
}

function dibujarAerosol(nuevoDibujo){
  // Creacion de canvas temporal encima del original
  var tmp_canvas = document.createElement('canvas');
  var tmp_ctx = tmp_canvas.getContext('2d');
  tmp_canvas.id = 'tmp_canvas';
  tmp_canvas.width = 902;
  tmp_canvas.height = 702;
  
  nuevoDibujo.sketch.appendChild(tmp_canvas);

  var mouse = {x: 0, y: 0};
  var start_mouse = {x: 0, y: 0};
  var last_mouse = {x: 0, y: 0};
  
  var sprayIntervalID;
  
  
  /* Mouse Capturing Work */
  tmp_canvas.addEventListener('mousemove', function(e) {
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  }, false);
  
  
  /* Drawing on Paint App */
  tmp_ctx.lineWidth = nuevoDibujo.ancho;
  tmp_ctx.lineJoin = 'round';
  tmp_ctx.lineCap = 'round';
  tmp_ctx.strokeStyle = nuevoDibujo.color;
  tmp_ctx.fillStyle = nuevoDibujo.color;
  
  tmp_canvas.addEventListener('mousedown', function(e) {
    tmp_canvas.addEventListener('mousemove', onPaint, false);
    
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    
    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;
    
    onPaint();
    sprayIntervalID = setInterval(onPaint, 50);
  }, false);
  
  tmp_canvas.addEventListener('mouseup', function() {
    tmp_canvas.removeEventListener('mousemove', onPaint, false);
    
    // Writing down to real canvas now
    nuevoDibujo.ctx.drawImage(tmp_canvas, 0, 0);
    // Clearing tmp canvas
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
    clearInterval(sprayIntervalID);
  }, false);
  
  var onPaint = function() {
    
    // Tmp canvas is always cleared up before drawing.
    // tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
    var x = mouse.x;
    var y = mouse.y;
    
    generateSprayParticles();
    return false;
  };
  
  var getRandomOffset = function(radius) {
    var random_angle = Math.random() * (2*Math.PI);
    var random_radius = Math.random() * radius;
    
    // console.log(random_angle, random_radius, Math.cos(random_angle), Math.sin(random_angle));
    
    return {
      x: Math.cos(random_angle) * random_radius,
      y: Math.sin(random_angle) * random_radius
    };
  };
  
  var generateSprayParticles = function() {
    // Particle count, or, density
    var density = nuevoDibujo.ancho;
    
    for (var i = 0; i < density; i++) {
      var offset = getRandomOffset(nuevoDibujo.ancho);
      
      var x = mouse.x + offset.x;
      var y = mouse.y + offset.y;
      
      tmp_ctx.fillRect(x, y, 1, 1);
    }
  };
  return false;
}

function dibujarTextArea(nuevoDibujo){
  var canvas = document.querySelector('#hoja');
  var ctx = canvas.getContext('2d');
  
  var sketch = document.querySelector('#sketch');
  var sketch_style = getComputedStyle(sketch);
  canvas.width = 900;
  canvas.height = 700;
  
  
  // Creating a tmp canvas
  var tmp_canvas1 = document.createElement('canvas');
  var tmp_ctx = tmp_canvas1.getContext('2d');
  tmp_canvas1.id = 'tmp_canvas1';
  tmp_canvas1.width = canvas.width;
  tmp_canvas1.height = canvas.height;
  
  sketch.appendChild(tmp_canvas1);

  var mouse = {x: 0, y: 0};
  var start_mouse = {x: 0, y: 0};
  var last_mouse = {x: 0, y: 0};
  
  var sprayIntervalID;
  
  var textarea = document.createElement('textarea');
  textarea.id = 'text_tool';
  sketch.appendChild(textarea);
  
  // Text tool's text container for calculating
  // lines/chars
  var tmp_txt_ctn = document.createElement('div');
  tmp_txt_ctn.style.display = 'none';
  sketch.appendChild(tmp_txt_ctn);
  
  
  textarea.addEventListener('mouseup', function(e) {
    tmp_canvas1.removeEventListener('mousemove', onPaint, false);
  }, false);
  
  
  /* Mouse Capturing Work */
  tmp_canvas1.addEventListener('mousemove', function(e) {
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  }, false);
  
  
  /* Drawing on Paint App */
  tmp_ctx.lineWidth = 5;
  tmp_ctx.lineJoin = 'round';
  tmp_ctx.lineCap = 'round';
  tmp_ctx.strokeStyle = nuevoDibujo.color;
  tmp_ctx.fillStyle = nuevoDibujo.color;
  
  tmp_canvas1.addEventListener('mousedown', function(e) {
    tmp_canvas1.addEventListener('mousemove', onPaint, false);
    
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    
    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;
    
    // onPaint();
    // sprayIntervalID = setInterval(onPaint, 50);
  }, false);
  
  tmp_canvas1.addEventListener('mouseup', function() {
    tmp_canvas1.removeEventListener('mousemove', onPaint, false);
    
    var lines = textarea.value.split('\n');
    var processed_lines = [];
    
    for (var i = 0; i < lines.length; i++) {
      var chars = lines[i].length;
      
      for (var j = 0; j < chars; j++) {
        var text_node = document.createTextNode(lines[i][j]);
        tmp_txt_ctn.appendChild(text_node);
        
        // Since tmp_txt_ctn is not taking any space
        // in layout due to display: none, we gotta
        // make it take some space, while keeping it
        // hidden/invisible and then get dimensions
        tmp_txt_ctn.style.position   = 'absolute';
        tmp_txt_ctn.style.visibility = 'hidden';
        tmp_txt_ctn.style.display    = 'block';
        
        var width = tmp_txt_ctn.offsetWidth;
        var height = tmp_txt_ctn.offsetHeight;
        
        tmp_txt_ctn.style.position   = '';
        tmp_txt_ctn.style.visibility = '';
        tmp_txt_ctn.style.display    = 'none';
        
        // Logix
        // console.log(width, parseInt(textarea.style.width));
        if (width > parseInt(textarea.style.width)) {
          break;
        }
      }
      
      processed_lines.push(tmp_txt_ctn.textContent);
      tmp_txt_ctn.innerHTML = '';
    }
    
    var ta_comp_style = getComputedStyle(textarea);
    var fs = ta_comp_style.getPropertyValue('font-size');
    var ff = ta_comp_style.getPropertyValue('font-family');
    
    tmp_ctx.font = fs + ' ' + ff;
    tmp_ctx.textBaseline = 'top';
    
    for (var n = 0; n < processed_lines.length; n++) {
      var processed_line = processed_lines[n];
      
      tmp_ctx.fillText(
        processed_line,
        parseInt(textarea.style.left),
        parseInt(textarea.style.top) + n*parseInt(fs)
      );
    }
    
    // Writing down to real canvas now
    nuevoDibujo.ctx.drawImage(tmp_canvas1, 0, 0);
    // Clearing tmp canvas
    //tmp_ctx.clearRect(0, 0, tmp_canvas1.width, tmp_canvas1.height);
    
    // clearInterval(sprayIntervalID);
    textarea.style.display = 'none';
    textarea.value = '';
  }, false);
  
  var onPaint = function() {
    
    // Tmp canvas is always cleared up before drawing.
    tmp_ctx.clearRect(0, 0, tmp_canvas1.width, tmp_canvas1.height);
    
    var x = Math.min(mouse.x, start_mouse.x);
    var y = Math.min(mouse.y, start_mouse.y);
    var width = Math.abs(mouse.x - start_mouse.x);
    var height = Math.abs(mouse.y - start_mouse.y);
    
    textarea.style.left = x + 'px';
    textarea.style.top = y + 'px';
    textarea.style.width = width + 'px';
    textarea.style.height = height + 'px';
    
    textarea.style.display = 'block';
  };
}

function dibujarLinea(nuevoDibujo){
  
  // Creating a tmp canvas
  var tmp_canvas = document.createElement('canvas');
  var tmp_ctx = tmp_canvas.getContext('2d');
  tmp_canvas.id = 'tmp_canvas';
  tmp_canvas.width = nuevoDibujo.canvas.width;
  tmp_canvas.height = nuevoDibujo.canvas.height;
  
  nuevoDibujo.sketch.appendChild(tmp_canvas);

  var mouse = {x: 0, y: 0};
  var start_mouse = {x: 0, y: 0};
  
  
  /* Mouse Capturing Work */
  tmp_canvas.addEventListener('mousemove', function(e) {
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  }, false);
  
  
  /* Drawing on Paint App */
  tmp_ctx.lineWidth = nuevoDibujo.ancho;
  tmp_ctx.lineJoin = 'round';
  tmp_ctx.lineCap = 'round';
  tmp_ctx.strokeStyle = nuevoDibujo.color;
  tmp_ctx.fillStyle = nuevoDibujo.color;
  
  tmp_canvas.addEventListener('mousedown', function(e) {
    tmp_canvas.addEventListener('mousemove', onPaint, false);
    
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    
    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;
    
    onPaint();
  }, false);
  
  tmp_canvas.addEventListener('mouseup', function() {
    tmp_canvas.removeEventListener('mousemove', onPaint, false);
    
    // Writing down to real canvas now
    nuevoDibujo.ctx.drawImage(tmp_canvas, 0, 0);
    // Clearing tmp canvas
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
  }, false);
  
  var onPaint = function() {
    
    // Tmp canvas is always cleared up before drawing.
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
    tmp_ctx.beginPath();
    tmp_ctx.moveTo(start_mouse.x, start_mouse.y);
    tmp_ctx.lineTo(mouse.x, mouse.y);
    tmp_ctx.stroke();
    tmp_ctx.closePath();
    
  };
  return false;
}

function dibujarCirculoDin(nuevoDibujo){
  // Creating a tmp canvas
  var tmp_canvas = document.createElement('canvas');
  var tmp_ctx = tmp_canvas.getContext('2d');
  tmp_canvas.id = 'tmp_canvas';
  tmp_canvas.width = nuevoDibujo.canvas.width;
  tmp_canvas.height = nuevoDibujo.canvas.height;
  
  nuevoDibujo.sketch.appendChild(tmp_canvas);

  var mouse = {x: 0, y: 0};
  var start_mouse = {x: 0, y: 0};
  var last_mouse = {x: 0, y: 0};
  
  
  /* Mouse Capturing Work */
  tmp_canvas.addEventListener('mousemove', function(e) {
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  }, false);
  
  
  /* Drawing on Paint App */
  tmp_ctx.lineWidth = nuevoDibujo.ancho;
  tmp_ctx.lineJoin = 'round';
  tmp_ctx.lineCap = 'round';
  tmp_ctx.strokeStyle = nuevoDibujo.color;
  tmp_ctx.fillStyle = nuevoDibujo.color;
  
  tmp_canvas.addEventListener('mousedown', function(e) {
    tmp_canvas.addEventListener('mousemove', onPaint, false);
    
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    
    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;
    
    onPaint();
  }, false);
  
  tmp_canvas.addEventListener('mouseup', function() {
    tmp_canvas.removeEventListener('mousemove', onPaint, false);
    
    // Writing down to real canvas now
    nuevoDibujo.ctx.drawImage(tmp_canvas, 0, 0);
    // Clearing tmp canvas
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
  }, false);
  
  var onPaint = function() {
    
    // Tmp canvas is always cleared up before drawing.
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
    var x = (mouse.x + start_mouse.x) / 2;
    var y = (mouse.y + start_mouse.y) / 2;
    
    var radius = Math.max(
      Math.abs(mouse.x - start_mouse.x),
      Math.abs(mouse.y - start_mouse.y)
    ) / 2;
    
    tmp_ctx.beginPath();
    tmp_ctx.arc(x, y, radius, 0, Math.PI*2, false);
    // tmp_ctx.arc(x, y, 5, 0, Math.PI*2, false);
    tmp_ctx.stroke();
    tmp_ctx.closePath();
    
  }; 
}

function dibujarElipseDin(nuevoDibujo){
  // Creating a tmp canvas
  var tmp_canvas = document.createElement('canvas');
  var tmp_ctx = tmp_canvas.getContext('2d');
  tmp_canvas.id = 'tmp_canvas';
  tmp_canvas.width = nuevoDibujo.canvas.width;
  tmp_canvas.height = nuevoDibujo.canvas.height;
  
  nuevoDibujo.sketch.appendChild(tmp_canvas);

  var mouse = {x: 0, y: 0};
  var start_mouse = {x: 0, y: 0};
  var last_mouse = {x: 0, y: 0};
  
  
  /* Mouse Capturing Work */
  tmp_canvas.addEventListener('mousemove', function(e) {
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  }, false);
  
  
  /* Drawing on Paint App */
  tmp_ctx.lineWidth = nuevoDibujo.ancho;
  tmp_ctx.lineJoin = 'round';
  tmp_ctx.lineCap = 'round';
  tmp_ctx.strokeStyle = nuevoDibujo.color;
  tmp_ctx.fillStyle = nuevoDibujo.color;
  
  tmp_canvas.addEventListener('mousedown', function(e) {
    tmp_canvas.addEventListener('mousemove', onPaint, false);
    
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    
    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;
    
    onPaint();
  }, false);
  
  tmp_canvas.addEventListener('mouseup', function() {
    tmp_canvas.removeEventListener('mousemove', onPaint, false);
    
    // Writing down to real canvas now
    nuevoDibujo.ctx.drawImage(tmp_canvas, 0, 0);
    // Clearing tmp canvas
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
  }, false);
  
  var onPaint = function() {
    
    // Tmp canvas is always cleared up before drawing.
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
    var x = Math.min(mouse.x, start_mouse.x);
    var y = Math.min(mouse.y, start_mouse.y);
    
    var w = Math.abs(mouse.x - start_mouse.x);
    var h = Math.abs(mouse.y - start_mouse.y);
    
    drawEllipse(tmp_ctx, x, y, w, h);
  };
  
  function drawEllipse(ctx, x, y, w, h) {
    var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle
    
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    ctx.closePath();
    ctx.stroke();
  }
}

function dibujarHexa(nuevoDibujo){
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  
  var W = canvas.width = 900;
  var H = canvas.height = 700;
  
  var mouse = {x: 0, y: 0};
  var start_mouse = {x: 0, y: 0};
  
  function drawEllipse(ctx, x, y, w, h) {
    var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle
    
    ctx.lineWidth = nuevoDibujo.ancho;
    ctx.strokeStyle = 'white';
    
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    ctx.closePath();
    ctx.stroke();
    
    ctx.lineWidth = nuevoDibujo.ancho;
    
    // First Bezier Curve's Control Point
    ctx.strokeStyle = nuevoDibujo.color;
    
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.lineTo(x, ym - oy);
    ctx.lineTo(xm - ox, y);
    ctx.lineTo(xm, y);
    ctx.stroke();
    ctx.closePath();
    
    // Second Bezier Curve's Control Point
    ctx.strokeStyle = nuevoDibujo.color;
    
    ctx.beginPath();
    ctx.moveTo(xm, y);
    ctx.lineTo(xm + ox, y);
    ctx.lineTo(xe, ym - oy);
    ctx.lineTo(xe, ym);
    ctx.stroke();
    ctx.closePath();
    
    // Third Bezier Curve's Control Point
    ctx.strokeStyle = nuevoDibujo.color;
    
    ctx.beginPath();
    ctx.moveTo(xe, ym);
    ctx.lineTo(xe, ym + oy);
    ctx.lineTo(xm + ox, ye);
    ctx.lineTo(xm, ye);
    ctx.stroke();
    ctx.closePath();
    
    // Fourth Bezier Curve's Control Point
    ctx.strokeStyle = nuevoDibujo.color;
    
    ctx.beginPath();
    ctx.moveTo(xm, ye);
    ctx.lineTo(xm - ox, ye);
    ctx.lineTo(x, ym + oy);
    ctx.lineTo(x, ym);
    ctx.stroke();
    ctx.closePath();
  }
  drawEllipse(ctx, W/2-100, H/2-75, 200, 150);
  
  
  // Mouse Events
  canvas.addEventListener('mousemove', function(e) {
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  }, false);
  
  canvas.addEventListener('mousedown', function(e) {
    canvas.addEventListener('mousemove', onPaint, false);
    
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    
    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;
    
    onPaint();
  }, false);
  
  canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
  }, false);
  
  var onPaint = function() {
    
    // canvas is always cleared up before drawing.
    ctx.clearRect(0, 0, W, H);
    
    var x = Math.min(mouse.x, start_mouse.x);
    var y = Math.min(mouse.y, start_mouse.y);
    
    var w = Math.abs(mouse.x - start_mouse.x);
    var h = Math.abs(mouse.y - start_mouse.y);
    
    drawEllipse(ctx, x, y, w, h);
  };
}


/*********EVENTOS-Figuras********/

$('#lapiz').click( function(){
  nuevoDibujo.setAncho(2);
  nuevoDibujo.setHerramientaActual(1);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#plumon').click(function(){
  nuevoDibujo.setAncho(30);
  nuevoDibujo.setHerramientaActual(2);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#aerosol').click(function(){
  nuevoDibujo.setHerramientaActual(4);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#goma').click(function(){
  nuevoDibujo.setHerramientaActual(1);
  nuevoDibujo.setAncho('40');
  nuevoDibujo.setColor('white');
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#linea').click(function(){
  nuevoDibujo.setHerramientaActual(6);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#linea1').click(function(){
  nuevoDibujo.setHerramientaActual(6);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#cuadradoDinamico').click(function(){
  nuevoDibujo.setHerramientaActual(9);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#circuloDinamico').click(function(){
  nuevoDibujo.setHerramientaActual(11);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#elipseDinamica').click(function(){
  nuevoDibujo.setHerramientaActual(17);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#triangulo').click(function(){
  nuevoDibujo.setHerramientaActual(10);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#elipse').click(function(){
  nuevoDibujo.setHerramientaActual(13);
  ejecutarHerramienta();
  return false;
});

$('#cuadradoRelleno').click(function(){
  nuevoDibujo.setHerramientaActual(5);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#circuloRelleno').click(function(){
  nuevoDibujo.setHerramientaActual(10);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

$('#elipseRellena').click(function(){
  nuevoDibujo.setHerramientaActual(13);
  ejecutarHerramienta(nuevoDibujo);
});

$('#hexagonoDinamico').click(function(){
  nuevoDibujo.setHerramientaActual(7);
  ejecutarHerramienta(nuevoDibujo);
  return false;
});

/*********EVENTOS-Colores********/

$('#color0').click(function(){
  nuevoDibujo.setColor('#800000');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color0').css('box-shadow', '0 0 1em gold');
 });
$('#color1').click(function(){
  nuevoDibujo.setColor('#ff0000');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color1').css('box-shadow', '0 0 1.5em gold');
 });
$('#color2').click(function(){
  nuevoDibujo.setColor('#ffA500');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color2').css('box-shadow', '0 0 1.5em gold');
 });
$('#color3').click(function(){
  nuevoDibujo.setColor('#ffff00');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color3').css('box-shadow', '0 0 1.5em gold');
 });
$('#color4').click(function(){
  nuevoDibujo.setColor('#808000');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color4').css('box-shadow', '0 0 1.5em gold');
 });
$('#color5').click(function(){
  nuevoDibujo.setColor('#800080');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color5').css('box-shadow', '0 0 1.5em gold');
 });
$('#color6').click(function(){
  nuevoDibujo.setColor('#800080');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color6').css('box-shadow', '0 0 1.5em gold');
 });
$('#color7').click(function(){
  nuevoDibujo.setColor('#ff00ff');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color7').css('box-shadow', '0 0 1.5em gold');
 });
$('#color8').click(function(){
  nuevoDibujo.setColor('#00ffa2');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color8').css('box-shadow', '0 0 1.5em gold');
 });
$('#color9').click(function(){
  nuevoDibujo.setColor('#00ff00');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color9').css('box-shadow', '0 0 1.5em gold');
 });
$('#color10').click(function(){
  nuevoDibujo.setColor('#008000');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color10').css('box-shadow', '0 0 1.5em gold');
 });
$('#color11').click(function(){
  nuevoDibujo.setColor('#000080');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color11').css('box-shadow', '0 0 1.5em gold');
 });
$('#color12').click(function(){
  nuevoDibujo.setColor('#0000ff');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color12').css('box-shadow', '0 0 1.5em gold');
 });
$('#color13').click(function(){
  nuevoDibujo.setColor('#00ffff');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color13').css('box-shadow', '0 0 1.5em gold');
 });
$('#color14').click(function(){
  nuevoDibujo.setColor('#008080');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color14').css('box-shadow', '0 0 1.5em gold');
 });
$('#color15').click(function(){
  nuevoDibujo.setColor('#000000');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color15').css('box-shadow', '0 0 1.5em gold');
 });
$('#color16').click(function(){
  nuevoDibujo.setColor('#c0c0c0');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color16').css('box-shadow', '0 0 1.5em gold');
 });
$('#color17').click(function(){
  nuevoDibujo.setColor('#808080');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color17').css('box-shadow', '0 0 1.5em gold');
 });
$('#color18').click(function(){
  nuevoDibujo.setColor('#572b04');
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color18').css('box-shadow', '0 0 1.5em gold');
 });
$('#color19').click(function(){
  var color = $( this ).css( "background-color" );
  nuevoDibujo.setColor(color);
  $('.color').css('box-shadow', '0 0 0 white');
  $('#color19').css('box-shadow', '0 0 1.5em gold');
 });

//funcion que llama a "colorpicker" y agrega el color seleccionado
$('#color20').click(function(){
  $('#color20').ColorPicker({
  color: '#0000ff',
  onShow: function (colpkr) {
    $(colpkr).fadeIn(500);
    return false;
  },
  onHide: function (colpkr) {
    $(colpkr).fadeOut(500);
    return false;
  },
  onChange: function (hsb, hex, rgb) {
    $('#color19').css('backgroundColor', '#' + hex);
  }
 });
 });



/***********EVENTOS-GROSOR***********/

$('#grueso1').click(function(){
  nuevoDibujo.setAncho('1');
  ejecutarHerramienta(nuevoDibujo);
 });
$('#grueso2').click(function(){
  nuevoDibujo.setAncho('5');
  ejecutarHerramienta(nuevoDibujo);
  return false;
 });
$('#grueso3').click(function(){
  nuevoDibujo.setAncho('9');
  ejecutarHerramienta(nuevoDibujo);
 });
$('#grueso4').click(function(){
  nuevoDibujo.setAncho('13');
  ejecutarHerramienta(nuevoDibujo);
 });
$('#grueso5').click(function(){
  nuevoDibujo.setAncho('18');
  ejecutarHerramienta(nuevoDibujo);
 });


/*********EVENTO-TextArea***********/
$('#textBox').click(function(){
  nuevoDibujo.setHerramientaActual(18);
  ejecutarHerramienta(nuevoDibujo);
  return false;
 });