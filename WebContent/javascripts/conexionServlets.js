$('#botonRegistro').click(function(){
	sendDataRegistro();
	return false;
});

$('#botonLogin').click(function(){
	sendDataLogin();
	return false;
});

$('#botonRecuperacion').click(function(){
	sendDataRecuperacion();
	return false;
});


$('#botonGuardarCanvas').click(function(){
	sendDataImage(document.getElementById("hoja").toDataURL("image/png"));
    return false;
});

$('#botonCambiarDatos').click(function(){
    sendDataCambioDeDatos();
    return false;
});

$('#botonDescargarCanvas').click(function(){
	var canvasActual = document.getElementById("hoja");
	Canvas2Image.saveAsPNG(canvasActual);
    return false;
});

$('#botonSalir').click(function(){
	cerrarSesion();
	return false;
});

function cerrarSesion (){
	$.ajax({
		type: 'POST',
	    url: "/ProyectoFinalPaint/ControladorLogin",
	    data: {
	    	form : "SALIR"
	    },
	    success : function (data){
	    	alert ("Sesion cerrada");
	    	window.location.href="/ProyectoFinalPaint/login.html";	
	    }
	});	
}


function sendDataCambioDeDatos(){
    $.ajax({
        type : "POST",
        url  : "/ProyectoFinalPaint/ControladorDibujos",
        data : { 
                form : "CONFIGURAR",
                txtNombreNuevoConfigurar : $("#txtNombreUsuario").val(),
                txtCorreoNuevoConfigurar : $("#txtEmail").val(),
                txtPassAntiguoConfigurar : $("#oldPass").val(),
                txtPassNuevoConfigurar : $("#nuevoPass").val(),
                txtConfirmarPassNuevoConfigurar : $("#txtConfirmarPass").val()
            },
        success : function(data){
            alert(data);
            window.location.href="/ProyectoFinalPaint/inicio.html";
        }
  });
}

function sendDataImage(imgCanvas){
    $.ajax({
    type: "POST",
    url: "/ProyectoFinalPaint/ControladorDibujos",
    data: { 
            form : "GUARDAR",
            txtBase64 : imgCanvas,
            txtNombreDibujo : $("#txtNombreDibujo").val()
        },
    success : function(data){
    	if(data == "Login realizado"){
			window.location.href="/ProyectoFinalPaint/index.html";
		}
        else{
            alert(data);
        }
    }
  });
}

function sendDataRegistro(){
$.ajax({
    type: "POST",
    url: "/ProyectoFinalPaint/ControladorLogin",
    data: { 
    		form : "REGISTRO",
    		txtNombreRegistro : $("#txtNombreUsuario").val(),
    		txtCorreoRegistro : $("#txtEmail").val(),
    		txtPassRegistro : $("#txtPass").val(),
    		txtConfirmarPassRegistro : $("#txtConfirmarPass").val()
    	},
	success : function(data){
		console.log(data);
		alert(data);
	}
  });
}

function sendDataLogin(){
$.ajax({
    type: "POST",
    url: "/ProyectoFinalPaint/ControladorLogin",
    data: { form : "LOGIN",
    	txtNombreLogin : $("#txtNombreUsuarioLog").val(),
    	txtPassLogin : $("#txtPassLog").val()
    	},
	success : function(data){
		if(data == "Login realizado"){
			window.location.href="/ProyectoFinalPaint/index.html";
		}
        else{
            alert(data);
        }
	}
  });
}


function sendDataRecuperacion(){
$.ajax({
    type: "POST",
    url: "/ProyectoFinalPaint/ControladorLogin",
    data: { form : "RECUPERACION",
    		txtEmail : $("#txtMailRecup").val()
    	},
	success : function(data){
		alert(data);
	}
  });
}
/*
$(document).ready(function(){
	$.ajax({
	    type: "POST",
	    url: "/ProyectoFinalPaint/ControladorDibujos",
	    data: { 
	    	form : "NOMBREUSUARIO"
	    	},
		success : function(data){
			var out ="<a  id="NombreDelUsuario" href="#">Guardar</a>";
		}
	  });
});*/
	//String nombreUsuario = sesion.getAttribute("NombreUsuario").toString();
