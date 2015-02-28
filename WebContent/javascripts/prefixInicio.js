var $misDibujos = $('.misDibujos');
var $editarInfo = $('#userinfoedit');

function mostarOcultarMisDibujos (arg) {
	arg.preventDefault();
	arg.stopPropagation();
	$editarInfo.css("display", "none");
	$misDibujos.css("display", "block");
	return false;
}

function mostarOcultarEditInfo (arg) {
	arg.preventDefault();
	arg.stopPropagation();
	$editarInfo.css("display", "block");
	$misDibujos.css("display", "none");
	return false;
}

$('#myDraws').click(mostarOcultarMisDibujos);
$('#cambiarDatos').click(mostarOcultarEditInfo);

