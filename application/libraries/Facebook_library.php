 <?php

defined('BASEPATH') OR exit('No direct script access allowed');

require 'Facebook/autoload.php'; 

 class Facebook_library{

   function __construct($data){
    $this->fb = new Facebook\Facebook([
        'app_id' => $data['idfanpageapi'],
        'app_secret' => $data['keyfanpage'],
        'default_graph_version' => 'v4.0',
        ]);
      
  }

  function upload_video($token,$idpage){

     $data = [
        'title' => 'My Foo Video',
        'description' => 'This video is full of foo and bar action.'
      ];

      $paht = FCPATH.'application/controllers/videos/finalvideo.mp4';
      
      try {
        $response = $this->fb->uploadVideo('/'.$idpage.'/videos',$paht, $data, $token);
       // $graphNode = $response->getGraphNode();
      
        return ["newvideo"=>$response];
       // unlink("videos/".$response->body->title.".".$response->body->streams[0]->extension);
      } catch(Facebook\Exceptions\FacebookResponseException $e) {
        // When Graph returns an error
       return ["newvideo"=>'Graph returned an error: ' . $e->getMessage()];
       
      } catch(Facebook\Exceptions\FacebookSDKException $e) {
        // When validation fails or other local issues
        return ["newvideo"=>'Facebook SDK returned an error: ' . $e->getMessage()];
      }
  }
}