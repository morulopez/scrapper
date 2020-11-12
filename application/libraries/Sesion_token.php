<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;

class Sesion_token{
	function __construct(){
		$this->key = "1234jesusregfpdodfpdflgl.>wwwalessadlasdfdflmdswprewprpwer..,.";
	}

	function make_sesion_token(){
	 	$tm=time();
		$token = array(
	    "iat" 	 =>  $tm,
	    "exp" 	 =>  $tm + 3600
		);
		$jwt = JWT::encode($token, $this->key);
		return $jwt;

	}
	function get_token($jwt){
		try {
			$decoded = JWT::decode($jwt, $this->key, array('HS256'));
			return $decoded;
		}
		catch (Exception $e){
		    if($e->getMessage() === 'Wrong number of segments'){
		    	return "ha cumplido el token";
		    }elseif($e->getMessage()=="Expired token"){
		    	return "Expired token";
		    }
		}
	}
}

?>