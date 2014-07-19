var _log = console.log,
    _warn = console.warn,
    _error = console.error;

function devConsole(max_messages, message_filter, type_to_color){
	
	if(typeof max_messages == "undefined"){
		this.max_messages = 100;
	}
	if(typeof message_filter == "undefined"){
		this.message_filter = new RegExp(".*");
	}
	if(typeof type_to_color == "undefined"){
		this.type_to_color = {
			GET_SEND: "#00FF00",
			GET_RETURN: "#00FF77",
			GET_ERROR: "#FF0000",
			POST_SEND: "#00FF00",
			POST_RETURN: "#00FF77",
			POST_ERROR: "#FF0000",
			ERROR: "#FF0000",
			CONSOLE_LOG: "#FF00FF",
			CONSOLE_WARN: "#FF0077",
			CONSOLE_ERROR: "#FF0000"
		};
	}
}
devConsole.prototype.log = function(type, message){
	if( window.self !== window.top && "theD" in parent){
		return parent.theD.log(type, "Child: "+message);
	}
	if(!type.match(this.message_filter))
		return;
	var output = "";
	var captured = 0;
	if (message instanceof Array) {
		while(captured < this.max_messages && message.length > 0){
			output += "<li><strong style='color:";
			output += (type in this.type_to_color)?this.type_to_color[type]:"#FFFFFF";
			output += "'>"+type+"</strong> : "+message.pop()+"</li>";
			
			captured++;
		}
	} else {
		output += "<li><strong style='color:";
		output += (type in this.type_to_color)?this.type_to_color[type]:"#FFFFFF";
		output += "'>"+type+"</strong> : "+message+"</li>";
		captured = 1;
	}
	
	var lis = jQuery(".dev_messages li");
	jQuery(".dev_messages").prepend(output);
	lis.slice(this.max_messages - 1).remove();

};

var theD = new devConsole();

// Errors and Console logs
// Dont use this unless you want to override default javascript with a developer console
	
console.log = function() {
    theD.log("CONSOLE_LOG", arguments[0]);
    return _log.apply(console, arguments);
};

console.warn = function() {
    theD.log("CONSOLE_WARN", arguments[0]);
    return _warn.apply(console, arguments);
};

console.error = function() {
    theD.log("CONSOLE_ERROR", arguments[0]);
    return _error.apply(console, arguments);
};

window.addEventListener('error', onError);
function onError(message){
    theD.log("ERROR", message.message);
}




jQuery(function($){

	$(document).bind("ajaxSend", function(ob, request, settings){
		theD.log("GET_SEND",["url: "+settings.url,"Method Type: "+settings.type, "Body Length: "+settings.data]);
	}).bind("ajaxSuccess", function(ob,  request, settings){
		theD.log("GET_RETURN",["url: "+settings.url, "Content Length: "+request.responseText.length]);
	}).bind("ajaxError", function(ob,  request, settings){
		theD.log("GET_ERROR",["url: "+settings.url,"Code: "+request.status]);
	});
});
