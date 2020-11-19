
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Misfanpages extends CI_Controller {

    function postFanPage(){
        $content = $this->load->view('fan-pages',[],true);
        $this->load->view('panel',["content"=>$content]);
    }

    function prueba(){
        echo phpinfo();
    }
}
