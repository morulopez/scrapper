<?php
//namespace Intervention\Image\Filters;
//use Intervention\Image\ImageManager;
defined('BASEPATH') OR exit('No direct script access allowed');

class ScrapperImg extends CI_Controller {
    public $getcontent;
    public $numberImg     = 0;
    public $etcontent;
    public $imgsrc        = [];
    public $numberNameimg = 0;
    public $titleforimage = "";
    public $getimg;
    function __construct(){
		$this->cdn = CDN;
        parent::__construct();
        $this->load->library('Myimages_library');
    }
    function downloadImagesForEdit(){
        $dataimages    = file_get_contents("php://input");
        $data          = json_decode($dataimages);
        foreach($data->img as $key=>$imgUrl){
            $imageName = explode("/",$imgUrl);
            foreach ($imageName as $nameimg) {
                if(strpos($nameimg, ".jpg") || strpos($nameimg, ".png")){
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $imgUrl);
                    curl_setopt($ch, CURLOPT_HEADER, 0);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    $imagen = curl_exec($ch);
                    curl_close($ch);
                    $archivo = fopen(FCPATH.'application/controllers/img/'."image".$key.".jpg", 'w');
                    fwrite($archivo, $imagen);
                    fclose($archivo);
                    $this->myimages_library->resizeimage(FCPATH.'application/controllers/img/'."image".$key.".jpg");
                }
            }
        }
        $images = scandir(FCPATH.'application/controllers/img/',1);
        
        array_pop($images);
        array_pop($images);
        echo json_encode(["view"=>$this->load->view('imagesformake',["images"=>$images],true),"imagenes"=>$images]);
        return;
        
    }
    function downloadImagesForEditDialy(){
        $dataimages    = file_get_contents("php://input");
        $data          = json_decode($dataimages);
        $folder        = FCPATH.'application/controllers/imgdialy-'.$data->primerakey."-".$data->segundakey."/";
        $foldermade    = FCPATH.'application/controllers/imgmadedialy-'.$data->primerakey."-".$data->segundakey."/";
        $this->checkIfExitFile($folder);
        $this->checkIfExitFile($foldermade);
        mkdir($folder,0777, true);
        foreach($data->img as $key=>$imgUrl){
            $imageName = explode("/",$imgUrl);
            foreach ($imageName as $nameimg) {
                if(strpos($nameimg, ".jpg") || strpos($nameimg, ".png")){
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $imgUrl);
                    curl_setopt($ch, CURLOPT_HEADER, 0);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    $imagen = curl_exec($ch);
                    curl_close($ch);
                    $archivo = fopen($folder."image".$key.".jpg", 'w');
                    fwrite($archivo, $imagen);
                    fclose($archivo);
                    $this->myimages_library->resizeimage($folder."image".$key.".jpg");
                }
            }
        }
        $images = scandir($folder,1);
        
        array_pop($images);
        array_pop($images);
        echo json_encode(["view"=>$this->load->view('imagesformake',["images"=>$images,"dialy"=>'imgdialy-'.$data->primerakey."-".$data->segundakey."/"],true),"imagenes"=>$images]);
        return;
        
    }
    /***********FUNCION DE IMAGENESSS *****/
    function textimagen(){
        if(!empty($this->input->post())){
            if(!empty($this->input->post("folderDialy"))){
                $i = $this->myimages_library->makeimgdialy($this->input->post());
            }else{
                $i = $this->myimages_library->makeimg($this->input->post());
            }
            echo json_encode(["img"=>$i]);
            return;
        }
    }
    function removeAllchanges(){
         if(!empty($this->input->post('image'))){
             $i = $this->myimages_library->removeAllchanges($this->input->post('image'));
              echo json_encode($i);
              return;
         }
    }
    function removeAllchangesDialy(){
         if(!empty($this->input->post('image'))){
             $i = $this->myimages_library->removeAllchangesDilay($this->input->post('image'),$this->input->post('primerakey'),$this->input->post('segundakey'));
              echo json_encode($i);
              return;
         }
    }
     function removeimageDialy(){
        if(!empty($this->input->post('src'))){
            $getImage = explode("/",$this->input->post('src'));
            $image    = end($getImage);
            unlink(FCPATH.'application/controllers/imgdialy-'.$this->input->post('primerakey')."-".$this->input->post('segundakey')."/".$image);
            if(file_exists(FCPATH.'application/controllers/imgmadedialy-'.$this->input->post('primerakey')."-".$this->input->post('segundakey')."/".$image))  unlink(FCPATH.'application/controllers/imgmadedialy-'.$this->input->post('primerakey')."-".$$this->input->post('segundakey')."/".$image);
            $images = scandir(FCPATH.'application/controllers/imgdialy-'.$this->input->post('primerakey')."-".$this->input->post('segundakey')."/",1);
            array_pop($images);
            array_pop($images);
            echo json_encode(["view"=>$this->load->view('imagesformake',["images"=>$images,"dialy"=>'imgdialy-'.$this->input->post('primerakey')."-".$this->input->post('segundakey')."/"],true),"imagenes"=>$images]);
            return;
        }

    }
    function removeimage(){
        if(!empty($this->input->post('src'))){
            $getImage = explode("/",$this->input->post('src'));
            $image    = end($getImage);
            unlink(FCPATH.'application/controllers/img/'.$image);
            if(file_exists(FCPATH.'application/controllers/imgmade/'.$image))  unlink(FCPATH.'application/controllers/imgmade/'.$image);
            $images = scandir(FCPATH.'application/controllers/img/',1);
            array_pop($images);
            array_pop($images);
            echo json_encode($this->load->view('imagesformake',["images"=>$images],true));
            return;
        }

    }
    function removeAllimages(){
        if(!empty($this->input->post('removeallimg'))){
           $response = $this->myimages_library->removeAllimages();
           echo json_encode($response);
           return;
        }
    }

    private function checkIfExitFile($folder){
        if(file_exists($folder)){
            $images     = scandir($folder,1);
            array_pop($images);
            array_pop($images);
            
            foreach($images as $key=>$image){
                unlink($folder.$image);
            }
            rmdir($folder);
        }
        return true;
        
    }
    function getDirectory(){
        $img = scandir(FCPATH.'/CDN/imagenes/images-font/');
        array_shift($img);
        array_shift($img);
        array_shift($img);
        $file = scandir(FCPATH.'/application/libraries/fuentes/');
        array_shift($file);
        array_shift($file);
        array_shift($file);

        echo json_encode(["imagesfont" => $img, "filesfont" => $file]);
        return;
    }
}
?>
