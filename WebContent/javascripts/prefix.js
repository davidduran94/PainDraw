var $login = $('#loginFormulario');
	$createAccount = $('#CreateAccountForm');
	$formOlvidoPass = $('#formOlvidoPass');
	


function mostrarOcultarFormularioLogin (arg){
	arg.preventDefault();
	arg.stopPropagation();
	$createAccount.css("display", "none");
	$formOlvidoPass.css("display", "none");
	$login.slideToggle();
	return false;
}


function mostrarOcultarFormularioCreateAccount (arg){
	arg.preventDefault();
	arg.stopPropagation();
	$login.css("display", "none");
	$formOlvidoPass.css("display", "none");
	$createAccount.slideToggle();
	return false;
}

function mostrarOcultarFormularioOlvidoPass(arg){
	arg.preventDefault();
	arg.stopPropagation();
	$login.css("display", "none");
	$createAccount.css("display", "none");
	$formOlvidoPass.slideToggle();
	return false;
}

// Eventos
$('.alogin').click(mostrarOcultarFormularioLogin);
$('.createAccount').click(mostrarOcultarFormularioCreateAccount);
$('.forgotPass').click(mostrarOcultarFormularioOlvidoPass);

$('.boton-recuperacion').click(function(){
	alert("Se ha enviado su contraseña a su corrreo");
});


