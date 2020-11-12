<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BlogWordpressModel extends CI_Model{

	public function get_blogs(){
		$blogs = $this->db->select("*")->where("id_usuario",$this->session->userdata['ID'])->get("blog_wordpress")->result_array();
		return $blogs;
	}

	public function new_blog_wordpress($data){
 
		$newblog = $this->db->insert("blog_wordpress",[ "name_blog" => $data->blogname,"url_name" => $data->urlblog,"id_usuario" => $this->session->userdata['ID']]);
		return $newblog;
	}

	public function update_blog_wordpress($id,$newname,$newurl){
		$updateblog = $this->db->where("ID",$id)->where("id_usuario",$this->session->userdata['ID'])->set(["name_blog"=>$newname,"url_name"=>$newurl])->update("blog_wordpress");
		return $updateblog;
	}

	public function get_blog($id_blog){
		$blog = $this->db->select("*")->where("id_usuario",$this->session->userdata['ID'])->where('id',$id_blog)->get("blog_wordpress")->row_array();
		return $blog;
	}
	public function get_details_blog($id_blog){
		$blog = $this->db->select("*,bs.id as idblogScrapper")
				->from("blog_wordpress as bw")
				->join('blog_scrapper as bs','bs.id_blog_wordpress = bw.id',"left")
				->join('filter_content as fc','fc.id_blog_scrapper = bs.id',"left")
				->where("bw.id_usuario",$this->session->userdata['ID'])
				->where('bw.id',$id_blog)
				->get()
				->result_array();
			foreach ($blog as $key => $value) {
				$content = $this->db->select("*")
				->from("content")
				->where('id_blog_scrapper',$blog[$key]['idblogScrapper'])
				->get()
				->result_array();
				$filter_amano = $this->db->select("*")
				->from("filter_content_manual")
				->where('id_blog_scrapper',$blog[$key]['idblogScrapper'])
				->get()
				->result_array();
				$blog[$key]['content']       = $content;
				$blog[$key]['filter_amano '] = $filter_amano;
			}

		return $blog;
	}

	public function get_session(){
		$session = $this->db->select("*")->get("facebook_session")->row_array();
		return $session;
	}

	public function update_facebook_session($data){
		$dataUpdated = [
						"datr"=>$data['datr'],
						"spin"=>$data['spin'],
						"sb"=>$data['sb'],
						"xs"=>$data['xs'],
						"m_pixel"=>$data['m_pixel'],
						"fr"=>$data['fr'],
						"_fbp"=>$data['_fbp'],
						"presence"=>$data['presence'],
						"locale"=>$data['locale'],
						"wd"=>$data['wd'],
						"c_user"=>$data['c_user'],
						"x_referer"=>$data['x_referer'],
						];
		$this->db->set($dataUpdated)->update("facebook_session");
	}

}

?>
	