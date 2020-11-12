<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FacebookModel extends CI_Model{

	public function getAllFanPages(){
		$fanPages = $this->db->select("*")->where("id_usuario",$this->session->userdata['ID'])->get("facebook_fan_page")->result_array();
		$this->load->library('Encrypt_object');
		foreach ($fanPages as $key => $fanpage) {
			$fanPages[$key]['id_fanpage'] = $this->encrypt_object->decryptdata($fanpage['id_fanpage']);
			$fanPages[$key]['key_secret'] = $this->encrypt_object->decryptdata($fanpage['key_secret']);
		}
		return $fanPages;
	}

	public function newFanpage($name,$idFanpage,$keyFanpage,$idBlog){
		$this->load->library('Encrypt_object');
		$idFanPage     = $this->encrypt_object->encryptdata($idFanpage);
		$keyFanPage    = $this->encrypt_object->encryptdata($keyFanpage);
		$newfanpage    = $this->db->insert("facebook_fan_page",[ 
		"name" => $name,"id_fanpage" =>$idFanPage ,"key_secret" => $keyFanPage ,"id_blog_wordpress" => $idBlog,"id_usuario" => $this->session->userdata['ID']]);
		return $newfanpage;
	}

	public function newGroup($name,$idgroup,$idBlog){
		$newgroup   = $this->db->insert("groups",[ 
		"name_group" => $name,"id_group" =>$idgroup ,"id_blog" => $idBlog]);
		return $newgroup;
	}

	public function update_fan_page($id,$newname,$newid,$newkey){
		if(empty($id) || empty($newname) || empty($newkey) ||empty($newid)) return false;
		$this->load->library('Encrypt_object');
		$idFanPage     = $this->encrypt_object->encryptdata($newid);
		$keyFanPage    = $this->encrypt_object->encryptdata($newkey);
		$updateblog    = $this->db->where("ID",$id)->where("id_usuario",$this->session->userdata['ID'])->set(["name"=>$newname,"key_secret"=>$keyFanPage,"id_fanpage"=>$idFanPage])->update("facebook_fan_page");
		return $updateblog;
	}

	public function deleteFanpage($id){
		if(empty($id)) return false;
		$delete =  $this->db->where("ID",$id)->where("id_usuario",$this->session->userdata['ID'])->delete('facebook_fan_page');
		return true;
	}

}

?>