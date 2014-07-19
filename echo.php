<?php
header("Content-Type: text/html");
$head = "";
$body = "";
if(strpos($_POST["the_html"],"<head>") === false){
	$head = "<html><head>";
	foreach($_POST["js_add"] as $key => $value){
		$head .= "<script type=\"text/javascript\" src=\"".$value."\" ></script>";
	}
	$head .= "</head>";
	
	$body ="<body>".$_POST["the_html"];
	$body .= "<script type=\"text/javascript\" >".$_POST["the_js"]."</script>";
	$body .= "</body></html>";
}else{
	$headpos = strpos($_POST["the_html"],"<head>")+6;
	$head = substr($_POST["the_html"], 0, $headpos);
	$headleftover = substr($_POST["the_html"], $headpos, strpos($_POST["the_html"],"</head>")+7 - $headpos);
	foreach($_POST["js_add"] as $key => $value){
		$head .= "<script type=\"text/javascript\" src=\"".$value."\" ></script>";
	}
	$head .= $headleftover;
	$bodypos = strpos($_POST["the_html"],"<body>");
	$body = substr($_POST["the_html"], $bodypos, strpos($_POST["the_html"],"</body>") - $bodypos);
	$body .= "<script type=\"text/javascript\" >".$_POST["the_js"]."</script>";
	$body .= "</body></html>";
}
echo $head . $body;
exit();