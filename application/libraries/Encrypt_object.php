<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Encrypt_object{

	private $key         = "saffgdsffassao3r2fdgdgewerwetrwerwerwerwrtergsdasasc.==sdfsdrwers0dc32232323ssxcvs433234122sdcvvsbf323325312..a==";
	private $keyFacebook = "sadasdasder34t5trbgiodsv'03r'0t34t0dcpskwtñerpñtr40q32420¡30f¡w430t321¡====::dwfweqwdswerwedssqdqdfdvsxcasqwqeewq=";
	function encryptpass($pass, $passvalid){
		if(empty($pass) || empty($passvalid) || $pass!=$passvalid){
			return false;
		}
		$pass_cifrado = password_hash($pass, PASSWORD_DEFAULT, array('cost' =>10));
		return $pass_cifrado;
	}

	function validate_password($password,$passwordencryp){
		if(password_verify($password, $passwordencryp)){
			return true;
		}
		return false;
	}
	function encryptdata($string) {
	   $result = '';
	   for($i=0; $i<strlen($string); $i++) {
	      $char = substr($string, $i, 1);
	      $keychar = substr($this->keyFacebook, ($i % strlen($this->keyFacebook))-1, 1);
	      $char = chr(ord($char)+ord($keychar));
	      $result.=$char;
	   }
	   return base64_encode($result);
	}

	function decryptdata($string) {
	   $result = '';
	   $string = base64_decode($string);
	   for($i=0; $i<strlen($string); $i++) {
	      $char = substr($string, $i, 1);
	      $keychar = substr($this->keyFacebook, ($i % strlen($this->keyFacebook))-1, 1);
	      $char = chr(ord($char)-ord($keychar));
	      $result.=$char;
	   }
	   return $result;
	}
}