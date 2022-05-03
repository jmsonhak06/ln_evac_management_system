let login_init = {};

login_init.authentication = function(){
	byId('btn_login').addEventListener('click', function(){
		login_user();
	});
}