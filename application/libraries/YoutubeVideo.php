<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require 'simple_html_dom.php';
ini_set('user_agent', 'google.com');
class YoutubeVideo{
	function __construct(){
	}
	function downloadvideo($urlyoutube,$type){
		$nameFile = explode('=',$urlyoutube);
		$content  = shell_exec("/usr/local/bin/youtube-dl -J ".$urlyoutube);
		if(empty($content)) return false;
		$content  = json_decode($content);
		if($type=="mp3"){
			return ["url"=>$content->formats[0]->url,"urlsave"=>'audio'.$nameFile[1].".mp3"];
			
		}else{
			$file='';
			foreach ($content->formats as $cont) {
				if($cont->format=='18 - 640x360 (360p)') $file=$cont->url;
			}
			return ["url"=>$file,"urlsave"=>'video'.$nameFile[1].".mp4"];
		}
	}
}