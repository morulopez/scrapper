<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuarios extends CI_Controller {

    
   function __construct(){
        parent::__construct();
        $this->load->model("UsuariosModel");
	}
	function Login_Usuario(){
		$this->load->view("loginscrapper",[]);
	}
	function Login_token(){
		if(!empty($this->input->post("user"))){
                        $check = $this->UsuariosModel->login($this->input->post("user"),$this->input->post("pass"));
                        if($check){
                                $this->load->library('Sesion_token');
                                $jwt = $this->sesion_token->make_sesion_token();
                                $this->session->set_userdata([
                                        "token"    => $jwt,
                                        "ID"       => $check['ID'],
                                        "exp"      => time() + 3600,
                                        "username" => $check['name']
                                ]);
                                echo json_encode($check);
                                return;
                        }else{
                                echo json_encode("error");
                                return;
                        }
                }

	}
	function renovetoken(){
		if(!empty($this->input->post("user"))){
			$check = $this->UsuariosModel->login($this->input->post("user"),$this->input->post("pass"));
			if($check){
				$this->load->library('Sesion_token');
				$newToken = $this->sesion_token->make_sesion_token();
				$this->session->set_userdata([
					"token"    => $newToken,
					"exp"      => time() + 3600
				]);
				echo json_encode('token renovado');
				return;
			}else{
				echo json_encode('invalido');
				return;
			}
		}

	}

	function check_token(){
        $this->load->model("UsuariosModel");

		if($this->input->post('check')){
			$this->load->library('Sesion_token');
			$valido = $this->sesion_token->get_token($this->session->userdata['token']);
			if($valido!="Expired token" && $valido!='Wrong number of segments'){
				echo json_encode(["message"=>'token valido']);
				return;
			}elseif($valido=="Expired token"){
				$now     = time();
				$expired = $this->session->userdata['exp'];
				echo json_encode(["message"=>'session expirada',"view"=>$this->load->view('sesion-expired',[],true)]);
				return;
			}elseif($valido=='Wrong number of segments'){
				$this->session->sess_destroy();
				echo json_encode(["message"=>"token invalido"]);
				return;
			}else{
				echo json_encode("dfsdffdfdfdffdfd");
				return;
			}
		}
	}
	function closeSesion(){
		$this->session->sess_destroy();
		redirect("/login");
	}

}
