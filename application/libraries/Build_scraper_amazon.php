<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('user_agent', 'NameOfAgent (http://www.google.com)');

require 'Simple_html_dom.php';

class Build_scraper_amazon{
	public $getTitlepost;
	public $getcontent;
	public $getimg;
	public $titleforimage;
	public $imgsrc            = [];
	public $number            = 0;
	public $numberImg         = 0;
	public $numberNameimg     = 0;
	public $numbermoreimg     = 0;
	public $numberpage        = 1;
	public $duplicate         = [];
	public $content           = [];
	public $reservertitleimg;
	public $dominiomake;
	public $ancor             = false;
  public $primerakey        = false;
  public $segundakey        = false;
  public $dialy             = false;

	function __construct(){
	}

    public function loopamazoncontent($page){
        $this->getcontent.="<div class='conta'>";
        $numberKey=0;
       foreach($this->content as $img){
        if(!$this->dialy){
          $iddiv    = 'product-box-'.$numberKey.'-'.$page;
          $idButton = 'button-select-product-'.$numberKey.'-'.$page;
          $onclick  = 'object.Amazon.selectProduct('.$numberKey.','.$page.')';
        }else{
          $iddiv    = 'product-box-'.$numberKey.'-'.$this->primerakey.'-'.$this->segundakey.'-'.$page;
          $idButton = 'button-select-product-'.$numberKey.'-'.$this->primerakey.'-'.$this->segundakey.'-'.$page;
          $onclick  = 'object.ScrapedDialy.selectProduct('.$numberKey.','.$this->primerakey.','.$this->segundakey.','.$page.')';
        }
        $this->getcontent.="<div class='col-xl-4 col-lg-6 col-md-3 col-sm-6 col-12 each' id='{$iddiv}'>";
        $this->getcontent.="<div class='inside-product-amazon no-click'><a target='blank' href='https://www.amazon.es{$img['href']}?tag=miID' class='principalancor'>";
        $this->getcontent.="<div class='row'>";
        $this->getcontent.="<div class='col-md-12 col-sm-12 divimg'>";
        $this->getcontent.=$img['img'];
        $this->getcontent.="</div>";
        $this->getcontent.="<div class='col-md-12 col-sm-12 divdescription'>";
        $this->getcontent.="<span class='description'><a target='blank' href='https://www.amazon.es{$img['href']}'>".$img['description']."</a></span>";
        $this->getcontent.="</div>";
        $this->getcontent.="<div class='col-md-12 col-sm-12 divprecio text-right'>";
        $this->getcontent.="<span class='global'><span class='spanprecio'>Precio </span><span class='cifra'>".$img['precio']." €</span></span>";
        $this->getcontent.="</div>";
        $this->getcontent.="</div>";
        $this->getcontent.="</a></div>";
        $this->getcontent.="<button class='button-select-product' id='{$idButton}' onclick='{$onclick}'>Seleccionar</div>";
        $this->getcontent.="</div>";
        $numberKey++;
    
       }
       $this->getcontent.="</div>";
    }
    public function getproduct($urlname,$page,$primerakey = false ,$segundakey = false,$dialy = false){

        if($dialy){
          $this->dialy      = true;
          $this->primerakey = $primerakey;
          $this->segundakey = $segundakey;
        }
        $newUrl = $this->makeurl($urlname);
        $urlblog = "https://www.amazon.es/s?k={$newUrl}&page={$page}&language=es&&__mk_es_ES=ÅMÅŽÕÑ&qid=1591830025&ref=sr_pg_{$page}";
        @$html = file_get_html($urlblog);
        if(empty($html)){
            return "Error en la url, url <strong>({$newUrl})</strong> no valida o el blog no se puede scrapear";
        }
       $number=0;
       $enlace =[];
       $section =  $html->find('.a-spacing-medium');
       $numeroenlace=0;
      foreach($section as $container){
                   $img =$container->find('.s-image',0);
                   $h2  =$container->find('.a-size-mini',0);
                   $href=$container->find('.a-text-normal',0);
                   $precio =$container->find(".a-price-whole",0);
                   if(!empty($img) && !empty($h2) && !empty($href->href) && !empty($precio)){ 
                     $contenido = ["href"=>$href->href,"img"=>$img,"description"=>$h2->plaintext,"precio"=>$precio];
                    array_push($this->content,$contenido);
                   }
           $number++;
      }
       	$this->numberpage++;
            
        $this->loopamazoncontent($page);
        return $this->getcontent;
        
    }
       /*funcion para crear el titulo para encontrar las imagenes en google*/
    public function makeurl($gettitle){
      $gettitle = explode(" ",$gettitle);
      $number=0;
      $url="";
      foreach($gettitle as $getti){
        if($number == count($gettitle)-1){
        $url.=$getti;
        }else{
        if(!empty($getti)) $url.=$getti."+";
        }
        $number++;
      }
      return $url;
    }
}

?>