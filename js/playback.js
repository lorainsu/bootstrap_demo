var token;
var ip;
var apighost

function onload() {
	token = location.search.substr(1).split("&")[0].split("=")[1];
	ip = location.search.substr(1).split("&")[1].split("=")[1];
	apighost = location.search.substr(1).split("&")[2].split("=")[1];
	
	$('#inputIndexModal').modal({
		backdrop : 'static',
		keyboard : false
	});

	$.ajax({
		type : "GET",
		url : "http://" + apighost + "/rsequery",
		dataType : "json",
		success : function(msg) {
			$('#idTable').bootstrapTable('load', msg.list);
		},
		error : function() {
			alert("Get VOD list Error:" + msg.code);
		}

	});

}

function play() {
	var selection = $('#idTable').bootstrapTable('getSelections');
	if (selection.length == 1) {
		$('#inputIndexModal').modal("hide");
		$('#playModal').modal({
			backdrop : 'static',
			keyboard : false
		});
		$('#playModal').show();
		$('#dynamicPlaybackDiv').show();
		rsePlayer("dynamicPlaybackDiv")
				.dynamicSetup(
						{
							playerPath : "rse_player/html/play/play.html",
							language : "en_US",
							playUrl : "http://" + ip + ":80/rse/rse/html/play/player.html?recordId=" + selection[0].id + "&token=" + token,
							height : "400",
							width : "700"
						});
	} else if (selection.length == 0) {
		alert("Please select an VOD name");
	} else {
		alert("Please select only one VOD name");
	}

}
