$(document).ready(inicio);

function inicio (){
	var json={
		'usuario' : 'username',
		'imagenes': [
		{'data':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'data':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'data':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'data':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'data':'cskydvcydbckaysbdcakusbdkcaysd'}
		]	
	};

	procesarJson(json);
}


//funcion que hace una peticion al servidor y este devuelve un json que es interpretado por otra funcion
function peticionAjax (){
	var base_url = "../nombreservlet"; //url base a donde se hace la peticion 
	$.ajax({
		url: base_url, //url final a donde se hace la peticion
		dataType: 'jsonp',
		jsonpCallback: 'procesarJson',
		data: {
			format: 'json'
		}
	});
}

function procesarJson(json){
	var usuario = json.usuario;
	var imagenes = json.imagenes;
	console.log(imagenes[2].data);

	/*Procesamiento del template y renderizado en el HTML*/
	  var out ="";

	  for(var i=0; i<imagenes.length; i++) 
	  {
	    out = out + "<div class=\"dibujo\">";
	    out = out + "<div style=\"background: white;\">";
	    out = out + "<img class=\"imagen\" src=\"data:image/png;base64,CODIGO BASE 64\" width=\"\" height=\"\" alt=\"\" />";
	    out = out + "</div><div class=\"centro\">";
	    out = out + "<a href=\"#\" id=\"nombreDibujo" + (i+1) + "\" style=\"color:rgb(0,191,219);\">NOMBRE DEL DIBUJO</a>";
	    out = out + "</div> <div class=\"derecho\">";
	    out = out + "<a href=\"#\" id=\"botonDescargarCanvas"  + (i+1) + "\" style=\"color:rgb(0,191,219);\">Descargar</a>";
	    out = out + "</div> <div class=\"izquierdo\">";
	    out = out + "<a href=\"#\" id=\"botonEditarCanvas\" style=\"color:rgb(0,191,219);\" >Editar</a>";
	    out = out + "</div> </div>";
	    //out = out + imagenes[i] + "</div></div><div class=\"derecho\"><a href=\"#\" id=\"desc\" style=\"color:rgb(0,191,219);\">Descargar</a></div><div class=\"izquierdo\"><a href=\"#\" id=\"ver\" style=\"color:rgb(0,191,219);\" >Ver</a></div></div>";
	  }

	  $('.misDibujos').append(out);
	console.log(out);

};


/*

	{
		'usuario' : 'username',
		'imagenes': [
		{'imagen':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'imagen':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'imagen':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'imagen':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'imagen':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'imagen':'cskydvcydbckaysbdcakusbdkcaysd'},
		{'imagen':'cskydvcydbckaysbdcakusbdkcaysd'}
		]	
	}

*/













