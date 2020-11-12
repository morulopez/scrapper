<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Facebook extends CI_Controller {

	function __construct(){
        parent::__construct();
        $this->load->model("FacebookModel");
	}
    
    function NewFanPage(){
    	if(!empty($this->input->post('name'))){
    		foreach($this->input->post() as $post){
    			if(empty($post)){
    				return;
    			}
    		}
    	$newFanPageSuccsses = $this->FacebookModel->newFanpage($this->input->post('name'),$this->input->post('id_fanpage'),$this->input->post('key'),$this->input->post('blog'));
        echo json_encode($newFanPageSuccsses);
        return;
    	}
    }

    function NewGroup(){
        if(!empty($this->input->post('name'))){
            foreach($this->input->post() as $post){
                if(empty($post)){
                    return;
                }
            }
        $newGroupSuccsses = $this->FacebookModel->newGroup($this->input->post('name'),$this->input->post('id_group'),$this->input->post('blog'));
        echo json_encode($newGroupSuccsses);
        return;
        }
    }

    function getAll(){
        $fanPages = $this->FacebookModel->getAllFanPages();
        echo json_encode($fanPages);
        return;
    }
    function updateFanpage(){
        if(!empty($this->input->post('new_name'))){
            $update = $this->FacebookModel->update_fan_page($this->input->post('idfanpage'),$this->input->post('new_name'),$this->input->post('newid'),$this->input->post('newkey'));
            if($update){
                echo json_encode(true);
            }
        }
    }
    function deleteFanpage(){
        if(!empty($this->input->post('id'))){
            $update = $this->FacebookModel->deleteFanpage($this->input->post('id'));
            if($update){
                echo json_encode(true);
            }
        }
    }

    function publishFanPage(){
        if(!empty($this->input->post('image'))){
            $path = explode("/", $this->input->post('image'));
            $path = array_slice($path,-2,2);
            $this->load->library('Cloud_image');
            $img = $this->cloud_image->subir_imagen('application/controllers/'.$path[0]."/".$path[1],$this->input->post("namefanpage"));
            echo json_encode($img);
        }
    }

    function delete_img_cloudinary(){
        if(!empty($this->input->post('id'))){
            $this->load->library('Cloud_image');
            $deleteimage=$this->cloud_image->borrar_img($this->input->post('id'));
            echo json_encode($deleteimage);
        }
    }

    function downloadyoutube(){
        if($this->input->post('urlyoutube')){
            $this->load->library('YoutubeVideo');
            $archivo = $this->youtubevideo->downloadvideo($this->input->post('urlyoutube'),$this->input->post('type'));
            $contentfile = file_get_contents($archivo['url']);
            $archivomade = fopen(FCPATH.'application/controllers/videos/'.$archivo['urlsave'], 'w');
            fwrite($archivomade, $contentfile);
            fclose($archivomade);
            echo json_encode($archivo['urlsave']);
        }
    }

    function publishVideoFanPage(){
       if($this->input->post('image')){
            $audio = explode("/",$this->input->post('video'));
            
            shell_exec('/usr/local/bin/ffmpeg -loop 1 -y -i '.FCPATH.'application/controllers/imgmade/image2.jpg -i '.FCPATH.'application/controllers/videos/newaudio.mp3 -shortest -acodec copy '.FCPATH.'application/controllers/videos/finalvideo.mp4 2>&1');
            return true;
            $this->load->library('Facebook_library',["idfanpageapi"=>$this->input->post('idFanpage'),"keyfanpage"=>$this->input->post('keyfanpage')]);
            $data = $this->facebook_library->upload_video($this->input->post('token'),$this->input->post('idpage'));
            if($data["newvideo"]=="Graph returned an error: Error validating access token: Session has expired on Monday, 09-Mar-20 15:00:00 PDT. The current time is Monday, 09-Mar-20 15:06:20 PDT."){
                $data['newvideo'] = false;
            }
            echo json_encode($data['newvideo']);
        }
    }

    function updateSessionFacebook(){
        if($this->input->post('datr')){
            $this->load->model("BlogWordpressModel");
            $cookies = $this->BlogWordpressModel->update_facebook_session($this->input->post());
            echo json_encode(true);
        }
    }

    function prueba(){
        $content  = shell_exec("/usr/local/bin/youtube-dl -J https://www.youtube.com/watch?v=aMZ4QL0orw0");
        print_r($content);
    }


    function removeDownLoadYoutube(){
        if($this->input->post('src')){
            $getPath = explode("/",$this->input->post('src'));
            $path    = end($getPath);
            unlink(FCPATH.'application/controllers/videos/'.$path);
            echo json_encode('success');
        }
    }
}
