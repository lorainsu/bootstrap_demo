function to_login_page() {
	document.getElementById('login_page').style.display = '';
	document.getElementById('edit_page').style.display = "none";
}

function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var apighost = document.getElementById("apighost").value;
	
	if (username == "") {
		alert("Input Username!");
		document.getElementById("username").focus();
		return false;
	} else if (password == "") {
		alert("Input Password!");
		document.getElementById("password").focus();
		return false;
	} else if (apighost == "") {
		alert("Input APIG Host!");
		document.getElementById("apighost").focus();
		return false;
	}
	var loginData = 'username=' + username + '&password=' + password;
	$.ajax({
		// 几个参数需要注意一下
		type : 'POST',// 方法类型
		dataType : 'json',// 预期服务器返回的数据类型
		url : "http://" + apighost + "/rselogin",// url
		data : loginData,
		success : function(result) {
			if (result.code == 0) {
				window.location.assign("playback.html?token=" + result.token + "&ip=" + result.ip + "&apighost=" + apighost)
			} else {
				alert("Sign failed, result code:" + result.code);
				document.getElementById("password").focus();
			}
		},
		error : function() {
			alert("Incorrect name or password!");
			document.getElementById("password").focus();
		}
	});
}
