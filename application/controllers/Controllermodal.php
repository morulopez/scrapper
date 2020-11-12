<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controllermodal extends CI_Controller {
	 function __construct(){
        parent::__construct();
        $this->load->model("BlogWordpressModel");
	}
	
    function newblogmodal(){
      echo json_encode($this->load->view('modals/modalnewblog',[],true));
    }

    function modalNewFanPage(){
      $blogs = $this->BlogWordpressModel->get_blogs();
      echo json_encode($this->load->view('modals/modalnewfanpage',["blogs" => $blogs],true));
    }

    function modalupdateSessionFacebbok(){
      $cookies = $this->BlogWordpressModel->get_session();
      echo json_encode($this->load->view('modals/modalupdatesession',["cookies" => $cookies],true));
    }

    function insertgroupFacebook(){
      $blogs = $this->BlogWordpressModel->get_blogs();
      echo json_encode($this->load->view('modals/modalgroupfacebook',["blogs" => $blogs],true));
    }

    function test(){
      echo base_url();
    }
}
