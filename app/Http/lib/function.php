<?php
//获取精确时间
function mtime() {
	$t = explode(' ', microtime());
	$time = $t[0] + $t[1];
	return $time;
}