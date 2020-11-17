<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ScrapedBlogForWordpress extends CI_Model{

	public function saveBlogScraper($img,$data){
		$this->db->trans_start();
		$name = $data['urlblog'];
		$name = explode("https://", $name);
		$name = explode("/", $name[1]);
		$dataArray = [
			"id_blog_wordpress"  => $data['belongBlog'],
			"name_blog_scrapper" => $name[0],
			"url_name_scrapper"  => $data['urlblog'],
			"languaje"           => $data['languajeBlog']
		];
		$this->db->insert("blog_scrapper",$dataArray);
		$idBlogScrapper = $this->db->insert_id();
		$datacontent = [
			"id_blog_scrapper" => $idBlogScrapper,
			"content"          => $data['contentScraped'],
			"title"            => ltrim($data['title']),
			"img"              => $img,
			"title_for_check"  => $data['saveTileForcheck'],
			"preview"          => 0
		];
		
		$this->db->insert("content",$datacontent);
		$dataFilter = [
			"id_blog_scrapper" => $idBlogScrapper,
			"filter_post"      => $this->doFilter($data['ancorpost'],$data['typeancorpost']),
			"filter_title"     => $this->doFilter($data['titlefilter'],$data['typetitle']),
			"fil_content"      => $this->doFilter($data['contentfilter'],$data['typecontent'])
		];
		$this->db->insert("filter_content",$dataFilter);
		$filteramano = $data['filteramano'];
		if($filteramano=="empty"){
			$this->db->trans_complete();
			return true;
		}else{
			foreach ($filteramano as $key => $filter) {
				$dataFilter = [
					"id_blog_scrapper"   => $idBlogScrapper,
					"fil_content_manual" => $this->doFilter($filter->value,$filter->key),
					"nested"    	 	 => 0
				];
				$this->db->insert("filter_content_manual",$dataFilter);
			}
			$this->db->trans_complete();
			return true;
		}
		
	}

	public function updateBlogScrapper($data){
		$this->db->where("ID",$data['id_blog_scrapper'])->set([$data['fieldToupdate'] => $data['value']])->update("blog_scrapper");
		return true;
	}
	public function updateFilter($data){
		$this->db->where("id_blog_scrapper",$data['id_blog_scrapper'])->set([$data['fieldToupdate'] => $data['value']])->update("filter_content");
		return true;
	}

	private function doFilter($filter,$type){
		if($type=="class"){
			$filterDone = ".".$filter;
		}elseif($type=="id"){
			$filterDone = "#".$filter;
		}else{
			$filterDone = $filter;
		}
		return $filterDone;
	}

	public function getAllScrapedBlog(){
		$allScrapper = $this->db->select("*,fc.id_blog_scrapper as idblogScrapper")
		->from("blog_scrapper as bs")
		->join('filter_content as fc','fc.id_blog_scrapper = bs.id',"left")
		->get()
		->result_object();
		foreach ($allScrapper as $key => $value) {
			$filter_amano = $this->db->select("*")
			->from("filter_content_manual")
			->where('id_blog_scrapper',$allScrapper[$key]->idblogScrapper)
			->get()
			->result_object();
			$allScrapper[$key]->filter_amano = $filter_amano;
		}
		return $allScrapper;
	}

	/*****GUARDAMOS EL SCRAPEO DIARIO DE LOS BLOGS**/

	public function check_content($title_for_check,$id_blog_scrapper){
		$title = $this->db->select("title_for_check")
		->from('content')
		->where('id_blog_scrapper',$id_blog_scrapper)
		->order_by("title_for_check", "DESC")
		->get()
		->row_array();
		$titlePre = $this->db->select("title_for_check")
		->from('pre_content')
		->where('id_blog_scrapper',$id_blog_scrapper)
		->order_by("title_for_check", "DESC")
		->get()
		->row_array();
		if($title["title_for_check"]==$title_for_check || $titlePre["title_for_check"]==$title_for_check) return false;
		return true;
	}

	/*** guardamos todos los blog scrapeados en modo pre ***///

	public function save_daily_scraped($id_blog_scrapper,$result){
			$dataContent = [
			"id_blog_scrapper" => $id_blog_scrapper,
			"content"		   => json_encode($result['content']),
			"images"		   => json_encode($result['img']),
			"title_for_check"  => $result['title_for_check'],
			"date_scrapped"	   => date("Y-m-d h:m:s"),
		];
		$this->db->insert("pre_content",$dataContent);
		return true;
	}
	public function updateStatusBlogScrapped($idprecontent){
		$this->db->where('id', $idprecontent);
		$this->db->update('pre_content',["published" => 1]);
		return true;
	}

	public function insertContenidoBlog($dataBlog){
		$this->db->insert("contenido_publicado_en_blog",$dataBlog);
		return true;
	}

	//Funcion para obtener todos los scrapeados diarios***/

	public function get_all_daily_scraped(){
		$allScrapper = $this->db->select("*,bs.id as idblogScrapper")
		->from("blog_wordpress as bw")
		->join('blog_scrapper as bs','bs.id_blog_wordpress = bw.id',"left")
		->get()
		->result_object();
		foreach ($allScrapper as $key => $value) {
			$pre_content = $this->db->select("*")
			->from("pre_content")
			->where('id_blog_scrapper',$allScrapper[$key]->idblogScrapper)
			->where('published',0)
			->get()
			->result_object();
			$allScrapper[$key]->pre_content = $pre_content;
		}
		return $allScrapper;

	}

	public function removeprecontent($id){
		if(empty($id)) return false;
		$this->db->where("id",$id)->delete('pre_content');
		return $this->db->affected_rows();
	}

}

?>