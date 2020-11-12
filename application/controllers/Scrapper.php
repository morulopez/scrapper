<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Scrapper extends CI_Controller {
	public $error = false;
	public $getTitlepost;
	public $getcontent;
	public $titleforimage;
	public $filter=[];
	public $imgsrc=[];
	public $number=0;
	public $numberNameimg=0;
	public $numbermoreimg=0;
	public $numberImg;
	public $reservertitleimg;
	public $dominiomake;
	public $getimg;
	public $arrayfilter;
	public $countcontentImg = false;
	public $arraytitleimg =[]; /// este array es para insertar el titulo de seleccionar una foto para el post para que no se repita el titulo;
	public $cdn;
	public $idimages ="normalimages";
	public $divselec ="divselec";
	public $firstline = false;
	public $ancor    = false;
	function __construct(){
		$this->cdn = CDN;
		parent::__construct();
        $this->load->library('Myimages_library');
        $this->load->model('ScrapedBlogForWordpress');
        $this->load->library('Build_scraper');
	}
	public function Scraperblog(){
		$content = $this->load->view('scrapper-blog',[],true);
		$this->load->view('panel',["content"=>$content]);
	}

	/*FUNCION PARA SCRAPPEAR */
	function getscraper(){
		$postdata    = file_get_contents("php://input");
		$post        = json_decode($postdata);
		if(!empty($post->newUrl)){
			$this->dominiomake = $post->newUrl;
			setcookie('dominiomake',$post->newUrl);
		}else{
			if(!empty($this->input->cookie('dominiomake'))){
				delete_cookie('dominiomake');
			}
		}
		setcookie('datawhidtfilter',$postdata);
		$result = $this->build_scraper->getscraper($post,"front");
		echo json_encode($result);
		return;
	}

    function getotherimages(){
    	if(!empty(($this->input->post("titleimage")))){
    		$this->myimages_library->removeAllimages();
 			$img = $this->build_scraper->getotherimages($this->input->post("titleimage"));
    		echo json_encode($img);
			return; 
    	}
    }

	/*FUNCION PARA SCRAPPEAR con los filtros */
	function getscraperwhitdFilter(){
		$postdata    		= file_get_contents("php://input");
		$aditionalfilter    = json_decode($postdata);
		echo json_encode($aditionalfilter);
		return;
		$data 		 		= json_decode($this->input->cookie('datawhidtfilter'));

		/*primero recojo los filtros en este array objeto y lo recorro en la funcion de arriba  loopwhidtfilter()*/
		if(!empty($this->input->cookie('dominiomake'))){
			$this->dominiomake = $this->input->cookie('dominiomake');
		}	
		$result = $this->build_scraper->getscraper($data,"front",$aditionalfilter);
		echo json_encode($result);
		return;
	}
	
	function saveDataBlog(){
		if(!empty($this->input->post())){
			$transaction = $this->transactionSavedata($this->input->post());
			if($transaction) echo json_encode(true);
			else echo json_encode(false);
			return;
		}
		
	}

	function saveDataBlogDialy(){
		if(!empty($this->input->post())){
			/**SUBIMOS LA IMAGEN A CLOUDINARI**/
			$path = explode("/", $this->input->post('img'));
            $path = array_slice($path,-2,2);
            $this->load->library('Cloud_image');
            $img = $this->cloud_image->subir_imagen('application/controllers/'.$path[0]."/".$path[1],"idblog{$this->input->post('belongBlog')}");
            /// removemos las imagenes
            $this->ScrapedBlogForWordpress->updateStatusBlogScrapped($this->input->post('idprecontent'));
            $this->myimages_library->removeAllImagesDialy(FCPATH.'application/controllers/imgdialy-'.$this->input->post('primerakey')."-".$this->input->post('segundakey'));
            $this->myimages_library->removeAllImagesDialy(FCPATH.'application/controllers/imgmadedialy-'.$this->input->post('primerakey')."-".$this->input->post('segundakey'));

            $rigth = $this->publishOnWordpressBlog($img['secure_url'],$this->input->post());
        	if($rigth) echo json_encode(true);
        	else echo json_encode(false);
		}
	}
	private function transactionSavedata($data){
			/**SUBIMOS LA IMAGEN A CLOUDINARI**/
			$path = explode("/", $data['img']);
            $path = array_slice($path,-2,2);
            $this->load->library('Cloud_image');
            $img = $this->cloud_image->subir_imagen('application/controllers/'.$path[0]."/".$path[1],"idblog{$data['belongBlog']}");
            $success = $this->ScrapedBlogForWordpress->saveBlogScraper($img['secure_url'],$data);
            if($success){
            	$rigth = $this->publishOnWordpressBlog($img['secure_url'],$data);
            	if($rigth) return json_encode(true);
            	else return json_encode(false);
            } 
	}

	public function publishOnWordpressPage(){
		if(!empty($this->input->post())){
			//OBTENEMOS EL TOKEN PARA PODER PUBLICAR PUBLICAR
		$headers = [
		    'Accept:application/JSON',
		     'Content-Type:application/x-www-form-urlencoded'  
		];

		$ch = curl_init();

	    curl_setopt($ch, CURLOPT_URL,$this->input->post('urlBlogWordpress')."/wp-json/jwt-auth/v1/token");
	    curl_setopt($ch, CURLOPT_POST, 1);

	    # Admin credentials here
	    curl_setopt($ch, CURLOPT_POSTFIELDS,"username=morulopez&password=jesus17121987."); 

	    // receive server response ...
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

	    $server_output = curl_exec ($ch);
	    $dataToken = json_decode($server_output);
	    curl_close($ch);

		$content = array(
			'title' 		 =>$this->input->post('namepage'), 
			'content'		 => "<div class='row'>".$this->input->post('content')."</div>",
			"status"		 => "publish"
		);

		$dataString = json_encode($content);


		$headers = array(
		'Content-Type:application/json',
		'Content-Length:' .strlen($dataString),
		'Authorization:Bearer' .$dataToken->token 
		) ;

		$ch = curl_init($this->input->post('urlBlogWordpress')."/wp-json/wp/v2/pages");

		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
		curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		$result = curl_exec($ch);
		$result = json_decode($result);
		curl_close($ch);

		echo json_encode(true);
		return;
		}
	}
	private function publishOnWordpressBlog($img,$data){
   
   		 $this->load->model("BlogWordpressModel");
   		 $urlBlog = $this->BlogWordpressModel->get_blog($data['belongBlog']);

		//OBTENEMOS EL TOKEN PARA PODER PUBLICAR PUBLICAR
		$headers = [
		    'Accept:application/JSON',
		     'Content-Type:application/x-www-form-urlencoded'  
		];

		$ch = curl_init();

	    curl_setopt($ch, CURLOPT_URL,$urlBlog['url_name']."/wp-json/jwt-auth/v1/token");
	    curl_setopt($ch, CURLOPT_POST, 1);

	    # Admin credentials here
	    curl_setopt($ch, CURLOPT_POSTFIELDS,"username=morulopez&password=jesus17121987."); 

	    // receive server response ...
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

	    $server_output = curl_exec ($ch);
	    $dataToken = json_decode($server_output);
	    curl_close($ch);


	    ////SUBIMOS Y OBTENEMOS LA IMAGEN OBTENEMOS LA IMAGEN PARA PUBLICAR
	   
		$curl = curl_init();

		$imgcontent = file_get_contents($img);
		curl_setopt_array($curl, array(
		     CURLOPT_URL => $urlBlog['url_name']."/wp-json/wp/v2/media",
		     CURLOPT_RETURNTRANSFER => true,
		     CURLOPT_ENCODING => "",
		     CURLOPT_MAXREDIRS => 10,
		     CURLOPT_TIMEOUT => 30,
		     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		     CURLOPT_CUSTOMREQUEST => "POST",
		     CURLOPT_HTTPHEADER => array(
		      'Content-Type:application/json',
				'Authorization:Bearer' .$dataToken->token,
				"cache-control: no-cache",
				"content-disposition: attachment; filename=".$img,
				"content-type: image/png"
		     ),
		     CURLOPT_POSTFIELDS => $imgcontent,
		));

		$response = curl_exec($curl);
		$response = json_decode($response);
		$err = curl_error($curl);

		curl_close($curl);

		$content = array(
			'title' 		 => $data['title'] , 
			'content'		 => $data['contentScraped'], 
			"status"		 => "publish" ,
			"featured_media" => $response->id );

		$dataString = json_encode($content);


		$headers = array(
		'Content-Type:application/json',
		'Content-Length:' .strlen($dataString),
		'Authorization:Bearer' .$dataToken->token 
		) ;

		$ch = curl_init($urlBlog['url_name']."/wp-json/wp/v2/posts");

		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
		curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		$result = curl_exec($ch);
		$result = json_decode($result);
		curl_close($ch);

		return true;

	}

	public function createPageContentAmzon(){

	}

	/******* Screpear todos los blogs para mostrarlos despues y poder publicarlos en wordpress *****///

	public function ScrapperAllBlog(){
		$data 	 = $this->ScrapedBlogForWordpress->getAllScrapedBlog();
		foreach ($data as $object) {
			$check_content = $this->check_content($object);
			if(!$check_content){
				continue;
			}
			$result = $this->build_scraper->getscraper($object,"db");
			$this->ScrapedBlogForWordpress->save_daily_scraped($object->id_blog_scrapper,$result);
		}
	}

	private function check_content($object_filter){
		$title_for_check = $this->build_scraper->check_content_scrapped($object_filter);
		return $this->ScrapedBlogForWordpress->check_content($title_for_check,$object_filter->id_blog_scrapper);

	}

	/*funciones  para la vista y obtener todo el contenido scrapeado diariamente*/

	public function all_scraped_dialy(){
		$content = $this->load->view('scraped_dialy',[],true);
		$this->load->view('panel',["content"=>$content]);
	}
	public function get_all_scraped_dialy(){
		$data = $this->ScrapedBlogForWordpress->get_all_daily_scraped();
		echo json_encode($data);
		return;
	}

	public function removeprecontent(){
		if(!empty($this->input->post())){
			$data = $this->ScrapedBlogForWordpress->removeprecontent($this->input->post("idPrecontent"));
			echo json_encode($data);
			return;
		}
	}
}


	