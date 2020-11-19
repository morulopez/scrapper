<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Scrapperamazon extends CI_Controller {
	function __construct(){
		$this->cdn = CDN;
        parent::__construct();
        $this->load->library('Build_scraper_amazon');
    }
	public function ScrapperamazonContent(){
		//$this->load->view('modals/amazon',true);
		echo json_encode($this->load->view('modals/amazon',[],true));
		return;
	}

	public function CreatePageAmazonContent(){
		$content = $this->load->view('amazoncontent',[],true);
		$this->load->view('panel',["content"=>$content]);
	}

	public function GetScrapperamazonContent(){
		if(!empty($this->input->post())){
			if(!empty($this->input->post('dialy'))){
				$content = $this->build_scraper_amazon->getproduct($this->input->post('namecontent'),$this->input->post('page'),$this->input->post('primerakey'),$this->input->post('segundakey'),$this->input->post('dialy'));
			}else{
				$content = $this->build_scraper_amazon->getproduct($this->input->post('namecontent'),$this->input->post('page'));
			}
			echo json_encode($content);
			return;
		}
	}

}
