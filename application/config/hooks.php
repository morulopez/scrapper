<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/
$hook['post_controller'][]= function(){
	$this->CI=&get_instance();
	$this->CI->load->library('Sesion_token');
	if(!empty($this->CI->session->userdata['token'])){
		$valido = $this->CI->sesion_token->get_token($this->CI->session->userdata['token']);
		if($valido && uri_string()== 'login'){
			redirect('/');
		}
	}elseif(uri_string()!= 'login' && uri_string()!= 'Usuarios/Login_token'){
		redirect('/login');
	}
};
