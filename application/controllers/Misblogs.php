<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Misblogs extends CI_Controller {

    public $model;

   function __construct(){
        parent::__construct();
        $this->load->model("BlogWordpressModel");
        $this->load->model("ScrapedBlogForWordpress");
	}

    function get_blogs(){
    	$blogs = $this->BlogWordpressModel->get_blogs();
    	echo json_encode($blogs);
        return;
    }

    function get_blog($idblog){
        $blogs = $this->BlogWordpressModel->get_details_blog($idblog);
        echo json_encode($blogs);
        return;
    }
    function single_blog($id){
        $content = $this->load->view('detalles-blog',[],true);
        $this->load->view('panel',["content"=>$content]);
    }

    function newblog(){
        $postdata    = file_get_contents("php://input");
        $post        = json_decode($postdata);
        $newblog     = $this->BlogWordpressModel->new_blog_wordpress($post);
        echo json_encode($newblog);
        return;
    }

    function updateDataBlog(){
        if(!empty($this->input->post('idblog'))){
             $updateblog = $this->BlogWordpressModel->update_blog_wordpress($this->input->post('idblog'),$this->input->post('new_name'),$this->input->post('new_url'));
            echo json_encode($updateblog);
            return;
        }
    }

    function Misblogsview(){
        $content = $this->load->view('mis-blogs',[],true);
        $this->load->view('panel',["content"=>$content]);
    }

    function updateBlogScrapper(){
        if(!empty($this->input->post('fieldToupdate'))){
            $updateBlogScrapper = $this->ScrapedBlogForWordpress->updateBlogScrapper($this->input->post());
            echo json_encode($updateBlogScrapper);
            return;
        }
    }
    function updateFilter(){
        if(!empty($this->input->post('fieldToupdate'))){
            $updateFilter  = $this->ScrapedBlogForWordpress->updateFilter($this->input->post());
            echo json_encode($updateFilter);
            return;
        }

    }
}
