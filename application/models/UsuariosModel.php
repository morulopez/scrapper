<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UsuariosModel extends CI_Model{

	public function login($user,$pass){
		$User_data = $this->db->select('*')->where('name',$user)->get('usuarios');
			if($User_data->num_rows()>0){
				$User_data = $User_data->row_array();
				$this->load->library('Encrypt_object');
				$acceso = $this->encrypt_object->validate_password($pass,$User_data['password']);
				if($acceso){
					return $User_data;
				}
				return false;
			}
		return false;
	}

}

?>