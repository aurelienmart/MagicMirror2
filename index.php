<?php
	if (substr_count($_SERVER[‘HTTP_ACCEPT_ENCODING’], ‘gzip’)) ob_start(“ob_gzhandler”); else ob_start();
	header("Cache-Control: no-cache, no-store, must-revalidate, no-transform, private, max-age=0");
	header("Pragma: no-cache");	header("Expires: 0"); include('ipad.html');
?>