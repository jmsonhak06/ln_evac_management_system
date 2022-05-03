function login_user(){
	var data = $('#form_login').serializeObject();
	sendDataWithCallback('/credentials',data,function(res){
		if (res) {
			console.log(res)
			if (res.status == 200) {
				window.location.href="/admin_management";
			}else if (res.status == 400) {
				alert("Incorrent Username or password")
			}
		}
	});
}