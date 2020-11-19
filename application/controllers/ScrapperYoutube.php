<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ScrapperYoutube extends CI_Controller {
    public $content;
    function __construct(){
		$this->cdn = CDN;
        $this->pathvideo = PATHVIDEO;
        parent::__construct();
	}
    function scrappearYoutube(){
        $this->load->library('simple_html_dom.php');
        if(!empty($this->input->post('youtube'))){
            $datavalue = explode(" ", $this->input->post('youtube'));
            $data="";
            for($i=0;$i<count($datavalue);$i++){
                if($i==count($datavalue)-1){
                    $data.=$datavalue[$i];
                }else{
                    $data.=$datavalue[$i]."+";
                }
            }
            $urlblog = "https://www.youtube.com/results?search_query={$data}";
            $html    =  file_get_html($urlblog);
            $this->content.="<div class='row'>";
            $idsrc =0;
            foreach($html->find(".yt-lockup") as $div){
                foreach($div->find("img") as $key=>$img){
                    if(substr_compare($img->src, "https://", 0, 8) ==0 || substr_compare($img->src, "http://", 0, 7) ==0){
                        $this->content.= "<div class='col-md-4 text-center'>";
                        $this->content.=  $div->find(".video-thumb",0)."<br>";
                        $this->content.= "<span id='{$idsrc}' style='display:none'>".$div->find(".yt-ui-ellipsis",0)->href="https://www.youtube.com".$div->find(".yt-ui-ellipsis",0)->href."</span>";
                        $this->content.= "<div class='row'><div class='col-md-12 text-center'>";
                        $this->content.= "<u><h3 style='font-size:12px;cursor:pointer' onclick='getSrcyoutube({$idsrc},`{$this->pathvideo}`)'>".$div->find(".yt-ui-ellipsis",0)->plaintext."<h3></u><br>";
                        $this->content.= "</div>";
                        $this->content.= "</div>";
                        $this->content.= "</div>";
                        $idsrc++;
                    }
                }
            }
            $this->content.="</div>";
            echo json_encode(["contenido"=>$this->content]);
            return;
        }
    }

}
