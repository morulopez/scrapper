<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require 'Simple_html_dom.php';

class Build_scraper{
	public $error 				= false;
	public $caming_from_db      = false;
	public $getcontent;
	public $titleforimage;
	public $filter				= [];
	public $imgsrc				= [];
	public $number 				= 0;
	public $numberNameimg		= 0;
	public $numbermoreimg		= 0;
	public $numberImg;
	public $reservertitleimg;
	public $dominiomake;
	public $getimg;
	public $arrayfilter;
	public $countcontentImg 	= false;
	public $arraytitleimg 		= []; /// este array es para insertar el titulo de seleccionar una foto para el post para que no se repita el titulo;
	public $cdn;
	public $idimages 			= "normalimages";
	public $divselec 			= "divselec";
	public $firstline 			= false;
	public $ancor    			= false;
	function __construct(){
		
	}
	/* FUNCION LOOP PARA RECOGER EL CONTENIDO DEL SCRAPPEO */
	function loop($object,$getblog){
		$array = [];
		$texto = [];
		$arrayfilternested =[];
		$coincidences = [];
		$filter =[];
		$conditional="";
		$numero = 0;
		$content="";
		foreach($object as $key=>$parrafo){
			foreach($array as $arr){
				if($numero==0){
					$conditional.=".{$arr},";
				}else if($numero == count($array)-1){
				   $conditional.=".{$arr}";
				}else{
				   $conditional .=".{$arr},";
				}
				$numero++;
			 }
			 $numero=0;
			foreach($parrafo->find("p,div,h1,h2,h3,h4,h5,ul,ol,table") as $parra){
				if(!in_array($parra->tag,$array)){
					if($parra->tag=="div"){
						if(!$parra->find("img,".$conditional) || !in_array($parra->class,$array) || !in_array($parra->tag,$array)){
							foreach($parra->find("div,p,h1,h2,h3,h4,h5,ul,ol,table") as $co){
								if(!$co->find("img,".$conditional) && !in_array($co->class,$array) && !in_array($co->tag,$array)){
									if($co->tag=="div"){
										$p = $getblog->find($co->class);
										$this->loop($p,$getblog);
										array_push($coincidences,$parra->plaintext);
									}
								}elseif(in_array($co->class,$arrayfilternested)){
									array_push($filter,$co->tag);
								}
							}
						}else{
							continue;
						}
					}elseif(!$parra->find("img,".$conditional) && !in_array($parra->class,$array)  && !in_array($parra->id,$array)  && !in_array($parra->tag,$array) && !in_array(trim($parra->plaintext),$texto)){
						if(!in_array($parra->tag,$filter)){
							if($parra->tag=="h2" && $numero==0){
								$this->reservertitleimg=$parra->plaintext;
								$numero++;
							}elseif($parra->tag=="h3" && $numero==0){
								$this->reservertitleimg=$parra->plaintext;
								$numero++;
							}elseif($parra->tag=="h3" && $numero==0){
								$this->reservertitleimg=$parra->plaintext;
								$numero++;
							}
							if(!in_array($parra->plaintext,$coincidences)){
									$this->getcontent.=$parra;
									array_push($coincidences,$parra->plaintext);
							}
						}else{
							unset($filter[0]);
						}
		
					}
				}
			}
		}
	}
	/* FUNCION LOOP PARA RECOGER EL CONTENIDO DEL SCRAPPEO */
	function loopwhidtfilter($object,$getblog){
		$texto = [];
		$arrayfilternested =[];
		$coincidences = [];
		$arrayforfilter =[];  /// este array lo relleno en el foreach de abajo con los valores que traemos desde el frontend para filtrar
		$filter =[];
		$conditional="";
		$numero = 0;
		$content="";
		$method ="";
		foreach($object as $key=>$parrafo){
			foreach($this->arrayfilter as $filterarra){
				if($this->caming_from_db){
					if($numero==0){
					$conditional.=$filterarra->fil_content_manual.",";
					}else if($numero == count($filterarra)-1){
					   $conditional.=$filterarra->fil_content_manual.",";
					}else{
					   $conditional .=$filterarra->fil_content_manual.",";
					}
					array_push($arrayforfilter,$filterarra->fil_content_manual);
					$numero++;
				}else{
					foreach($filterarra as $filtervalues){
						if($filtervalues->key =="class"){
							$method=".";
						}elseif($filtervalues->key =="id"){
							$method="#";
						}elseif($filtervalues->key =="tag"){
							$method="";
						}elseif($filtervalues->key =="plaintext"){
							$method="";
						}
						if($numero==0){
							$conditional.=$method.$filtervalues->value.",";
						}else if($numero == count($filterarra)-1){
						   $conditional.=$method.$filtervalues->value.",";
						}else{
						   $conditional .=$method.$filtervalues->value.",";
						}
						array_push($arrayforfilter,$filtervalues->value);
						$numero++;
					}
				}
			}
			 $numero=0;
			foreach($parrafo->find("p,div,h1,h2,h3,h4,h5,ul,ol,table") as $parra){
				if(!in_array($parra->tag,$arrayforfilter)){
					if($parra->tag=="div"){
						if(!$parra->find("img,".$conditional) || !in_array($parra->class,$arrayforfilter) || !in_array($parra->tag,$arrayforfilter)){
							foreach($parra->find("div,p,h1,h2,h3,h4,h5,ul,ol,table") as $co){
								if(!$co->find("img,".$conditional) && !in_array($co->class,$arrayforfilter) && !in_array($co->tag,$arrayforfilter)){
									if($co->tag=="div"){
										$p = $getblog->find($co->class);
										$this->loop($p,$getblog);
										array_push($coincidences,$parra->plaintext);
									}
								}elseif(in_array($co->class,$arrayfilternested)){
									array_push($filter,$co->tag);
								}
							}
						}else{
							continue;
						}
					}elseif(!$parra->find("img,".$conditional) && !in_array($parra->class,$arrayforfilter)  && !in_array($parra->id,$arrayforfilter)  && !in_array($parra->tag,$arrayforfilter) && !in_array(trim($parra->plaintext),$arrayforfilter)){
						if(!in_array($parra->tag,$filter)){
							if($parra->tag=="h2" && $numero==0){
								$this->reservertitleimg=$parra->plaintext;
								$numero++;
							}elseif($parra->tag=="h3" && $numero==0){
								$this->reservertitleimg=$parra->plaintext;
								$numero++;
							}elseif($parra->tag=="h3" && $numero==0){
								$this->reservertitleimg=$parra->plaintext;
								$numero++;
							}
							if(!in_array($parra->plaintext,$coincidences)){
									$this->getcontent.=$parra;
									array_push($coincidences,$parra->plaintext);
							}
						}else{
							unset($filter[0]);
						}
		
					}
				}
			}
		}
	}

	/*FUNCION PARA SCRAPPEAR */
	function getscraper($post,$caming,$aditionalfilter = false){

		if($caming=="db"){
			$this->caming_from_db = true;
			$this->typetitle   	  = $post->filter_title;
			$this->typeancor   	  = $post->filter_post;
			$this->typecontent 	  = $post->fil_content;
			$post->url            = $post->url_name_scrapper;
			$this->titleforimage  = '';
			$this->getimg         = '';
			$this->getcontent 	  = '';
		}else{
			$this->buildFilter($post);
		}
		if($aditionalfilter){
			$this->arrayfilter 	= $aditionalfilter;
			$functionLoop       = "loopwhidtfilter";
		}else{
			$functionLoop       = "loop";
		}

		@$html = file_get_html($post->url);
		if(empty(@$html)){
			return ["error"=>"Error en la url, la url <strong><u>(''{$post->url}'')</u></strong> no es valida o el blog no se puede scrapear"];
		}else{
			$cogerblog= $html->find($this->typeancor);
			if(empty($cogerblog)){
				return ["error"=>"El enlace <strong><u>(''{$post->url}'')</u></strong> no es valido para obtener el post, utiliza otro por favor"];
			}else{
				if(is_string($cogerblog[0]->href)){
					$gethref = $cogerblog[0]->href;
				}else{
					$gethref  = $cogerblog[0]->find('a',0);
				}
			}
		
			if(empty($gethref)){
				return ["error"=>"Error al recoger el enlace, posiblemente la clase <strong>''<u>({$post->ancorpost})</u>''</strong> no coincida o no se encuentre el este blog, inserta otra por favor"];
			}else{
				if(is_string($gethref)){
					if(substr_compare($gethref, "https://", 0, 8) ==0 || substr_compare($gethref, "http://", 0, 7) ==0){
						@$getBlog = file_get_html($gethref);
					}else{
						@$getBlog = file_get_html(substr($post->url, 0, -1).$gethref);
					}
				}else{
					if(substr_compare($gethref->href, "https://", 0, 8) ==0 || substr_compare($gethref->href, "http://", 0, 7) ==0){
						@$getBlog = file_get_html($gethref->href);
					}else{
						if(!empty($this->dominiomake)){
							@$getBlog = file_get_html($this->dominiomake.$gethref->href);
						}else{
							@$getBlog = file_get_html(substr($post->url, 0, -1).$gethref->href);
						}
					}
				}
				if(is_string($gethref)){
					if(empty($getBlog)){
						return ["error"=>" El enlace <strong><u>(''{$gethref}'')</u></strong> que has obtenido para scrapear el post esta mal o no es valido, inserta otro por favor"];
					}else{
						$title = $getBlog->find("head");
						$ti   = $title[0]->find('title');
						$getTitlepost =$getBlog->find($this->typetitle);
						if(empty($getTitlepost[0])){
							return ["error"=>"El enlace <strong><u>(''{$post->title}'')</u></strong> para obtener el titulo esta mal,cambialo por favor"];
						}
						$this->maketitle($getTitlepost[0]->plaintext);
						$p = $getBlog->find($this->typecontent);
						if(empty($p)){
							return ["error"=>" El enlace  <stroong><u>(''{$this->typecontent}{$post->content}''</u></strong> que has obtenido para scrapear el post esta mal o no es valido, inserta otro por favor"];
						}else{
							$this->getcontent.= "<h1>".$getTitlepost[0]->plaintext."</h1>";
				
							$this->$functionLoop($p,$getBlog);
							if(!$aditionalfilter || $caming=="db"){
								$this->getSrcimages();
								if(empty($this->getimg)){
									$this->getimg ="<h1>No se puede descargar fotos de este post, lo siento</h1>";
								}
								return ["content"=>$this->load->view("contentscrapper",["contentscrapper"=>$this->getcontent],true),"img"=>$this->getimg,"title_for_check"=>$getTitlepost[0]->plaintext];
							}else{
								return ["content"=>$this->load->view("contentscrapper",["contentscrapper"=>$this->getcontent],true)];
							}
						}
					
					}
				}else{
					if(empty($getBlog)){
						return ["errorenlacemodif"=>" <span class='errorfilter'>El enlace <strong></
							u>(''".$post->url."'')</u></strong> que has obtenido para scrapear no es valido.<br>
						Este blog tiene url relativas, por lo tanto debes de insertar a mano la url que enlaza con el contenido.<br>
						Normalmente hay dos palabras que se repiten.
						SI por ejemplo  una url es 'www.dominio.com/blog' y el enlace al post es '/blog/mipost' las dos tienen la palabra 'blog',
						<br> por lo tanto debes de insertar el dominio sin la palabra blog y en este coaso seria 'www.dominio.com'</span><br><br>
						<input class='form-control' type='text' value='{$post->url}' name='selectblogChangeUrl' id='inputchange' onkeyup='Scraper.getNewUrl(this)'><br><button type='button' class='buttonsfilter' id='buttonchangeurl' onclick='object.Scraper.getScraper(true);'>Cambiar url</button>
						<br>"];
					}else{
						$title = $getBlog->find("head");
						$ti    = $title[0]->find('title');
						$getTitlepost =$getBlog->find($this->typetitle);
						if(empty($getTitlepost[0])){
							return ["error"=>"El enlace <strong>(''{$post->title}'')</strong> para obtener el titulo esta mal,cambialo por favor"];
						}
						$this->maketitle($getTitlepost[0]->plaintext);
						$p = $getBlog->find($this->typecontent);
						if(empty($p)){
							return ["error"=>"Contenido invalido"];
						}else{
							$this->getcontent.= "<h1>".$getTitlepost[0]->plaintext."</h1>";
				
							$this->$functionLoop($p,$getBlog);
							if(!$aditionalfilter || $caming=="db"){
								//$this->getSrcimages();
								if(!$this->countcontentImg){
									$this->getimg ="<h1>No se puede descargar fotos de este post, lo siento</h1>";
								}
								return ["content"=>$this->getcontent,"img"=>$this->getimg,"title_for_check"=>$getTitlepost[0]->plaintext];
							}else{
								return ["content"=>$this->getcontent];
							}
							
							
						}
					
					}
				}
			}
		}
	}
	/* FUNCION PARA OBTENR LAS URL DE LAS IMAGENES */
	function downloadImages(){
		if(!in_array("Selecciona una foto para ponerla en tu post",$this->arraytitleimg)){
			$this->getimg.="<div class='row title-images-scrapper'>
							<div class='col-md-12 text-center'><h1>Selecciona una foto para ponerla en tu post</h1></div>
							</div>";
			array_push($this->arraytitleimg,"Selecciona una foto para ponerla en tu post");
		}
		if(!$this->firstline){
			$this->getimg.="<div class='row contentimages{$this->idimages}'>";
			$this->firstline=true;
		}
		$number=0;
		$divselect = "divselect";
		foreach($this->imgsrc as $src){
			$this->countcontentImg = true;
			$this->getimg.="<div class='col-md-3 boximages' id='div{$number}' style='padding:5px;cursor:pointer:position:relative' onclick='object.Images.selectImg(`{$this->idimages}`,`{$this->divselec}`,{$number})'><img style='width:100%';border:2px solid #7e8fab;border-radius:4px;cursor:pointer;' src='{$src}' id='{$this->idimages}{$number}'><div id='{$this->divselec}{$number}' style='display:none;' class='row selecimg'><div class='col-md-12 text-center'><img class='troolimg' src='".base_url('/CDN/imagenes/troll.jpg')."'><i class='fas fa-check'></i></div></div></div>";
			$this->numberNameimg++;
			$number++;
		}
		if($this->firstline AND $this->countcontentImg){
			$this->getimg.="</div>";
			$this->firstline=false;
		}
		if($this->numberNameimg<10){
			if($this->reservertitleimg){
				$this->titleforimage='';
				$this->maketitle($this->reservertitleimg);
				$this->getSrcimages();
			}
		}
	}

	/* FUNCION PARA IMPRIMIR LAS IMAGENES */
	function getSrcimages(){
		$html   = '';
		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://www.google.com/search?q={$this->titleforimage}&rlz=1C5CHFA_enGB874GB874&sxsrf=ALeKk03Gvs4vmEwPtMiuh6Ttp7esEDptJA:1602190434160&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjp4cK98KXsAhWpQhUIHYChADEQ_AUoAXoECA8QAw&biw=1920&bih=1001",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
		    "authority: www.google.com",
		    "cache-control: max-age=0",
		    "upgrade-insecure-requests: 1",
		    "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
		    "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		    "x-client-data: CI62yQEIo7bJAQjEtskBCKmdygEI0qDKAQiXrMoBCJm1ygEI9sfKAQjnyMoBCOnIygEIpM3KAQjB18oBCJ/YygEI/JfLARjOv8oB",
		    "sec-fetch-site: none",
		    "sec-fetch-mode: navigate",
		    "sec-fetch-user: ?1",
		    "sec-fetch-dest: document",
		    "accept-language: es-ES,es;q=0.9",
		    "cookie: NID=204=eEpkgsAwQAowg5ggI2D5MZNMHF_qKJ1F3jDZh6F09UVQXaAzMVBoqX7RhTFx-fT5RtAbcfpWG6fP6tie7MtsgkrVy-piOTvzhfRZ4DlQOF_zgUFJzaeW8Kdts_ySgGeWI7O6uawKXkcqbaqt_T_iCsIh-Ah7_K808iXtfyNSMm0"
		  ),
		));

		$response = curl_exec($curl);

		curl_close($curl);
		$html = new simple_html_dom();
		$an = $html->load($response);

		$un = $an->find(".T1diZc");
		foreach($un as $getimg){
		    foreach($getimg->find("a,img") as $img){
		        if(!strpos($img->href,"search") && !strpos($img->href,"google") && !strpos($img->href,"facebook") && !strpos($img->href,"flights") && !strpos($img->href,"preferences") && !strpos($img->href,"wikipedia") && !strpos($img->href,"youtube")){
		            if($img->href!=""){
		                if($this->numberImg<60){
		                    @$getImg = file_get_html($img->href);
		                    if(empty($getImg)){
		                        continue;
		                    }else{
		                        $getimg = $getImg->find("img");
		                        foreach($getimg as $img){
		                            if($this->numberImg<=60){
		                                if(!strpos($img->src,'banner')){
		                                    if(!in_array($img->src,$this->imgsrc)){
		                                        $extension = substr($img->src,-3,3);
		                                        if($extension=="png" || $extension=="jpg"){
		                                            @$imgsize = getimagesize($img->src);
		                                            if($imgsize){
		                                                if($imgsize[0]>300 || $imgsize[1]>300){ 
		                                                    array_push($this->imgsrc,$img->src); 
		                                                    $this->numberImg++;     
		                                                }
		                                            }
		                                        }
		                                    }
		                                }
		                            }
		                        } 
		                    }
		                }
		            }
		        }
		    }
		} 
		$this->downloadImages();
	}

    function getotherimages($titleImage){
    	$this->titleforimage = '';
		$this->idimages = "otherimages";
		$this->divselec = "divselecother";
		$gettitle = $titleImage;
		$this->maketitle($gettitle);
		$this->getSrcimages();
		if(!$this->countcontentImg){
			$this->getimg="<h1>No se puede descargar fotos con este nombre <u>{$this->titleforimage}<u></h1>";
	    }
		return ["img"=>$this->getimg];
		
    }
    /*funcion para crear el titulo para encontrar las imagenes en google*/
	function maketitle($gettitle){
		$gettitle = explode(" ",$gettitle);
		$number=0;
		foreach($gettitle as $getti){
			if($number == count($gettitle)-1){
			$this->titleforimage.=$getti;
			}else{
			if(!empty($getti)) $this->titleforimage.=$getti."+";
			}
			$number++;
		}
	}

	//funcion para chekear si existe un titulo igual en la base de datos para no scrapear el mismo contenido

	function check_content_scrapped($object_filter){
		$html 	   = file_get_html($object_filter->url_name_scrapper);
		$cogerblog = $html->find($object_filter->filter_post);
		
		if(is_string($cogerblog[0]->href)){
			$gethref = $cogerblog[0]->href;
		}else{
			$gethref = $cogerblog[0]->find('a',0);
		}

		if(is_string($gethref)){
			if(substr_compare($gethref, "https://", 0, 8) ==0 || substr_compare($gethref, "http://", 0, 7) ==0){
				@$getBlog = file_get_html($gethref);
			}else{
				@$getBlog = file_get_html(substr($post->url, 0, -1).$gethref);
			}
		}else{
			if(substr_compare($gethref->href, "https://", 0, 8) ==0 || substr_compare($gethref->href, "http://", 0, 7) ==0){
				@$getBlog = file_get_html($gethref->href);
			}else{
				if(!empty($this->dominiomake)){
					@$getBlog = file_get_html($this->dominiomake.$gethref->href);
				}else{
					@$getBlog = file_get_html(substr($post->url, 0, -1).$gethref->href);
				}
			}
		}
		$getTitlepost = $getBlog->find($object_filter->filter_title);
		return $getTitlepost[0]->plaintext;
						
	}
    function buildFilter($post){
    	if($post->typeancorpost=="class"){
			$this->typeancor='.'.$post->ancorpost;
		}elseif($post->typeancorpost=="id"){
			$this->typeancor='#'.$post->ancorpost;
		}elseif($post->typeancorpost=="tag"){
			$this->typeancor=$post->ancorpost;
		}
		if($post->typecontent=="class"){
			$this->typecontent='.'.$post->content;
		}elseif($post->typecontent=="id"){
			$this->typecontent='#'.$post->content;
		}elseif($post->typecontent=="tag"){
			$this->typecontent=$post->content;
		}
		if($post->typetitle=="class"){
			$this->typetitle='.'.$post->title;
		}elseif($post->typetitle=="id"){
			$this->typetitle='#'.$post->title;
		}elseif($post->typetitle=="tag"){
			$this->typetitle=$post->title;
		}
		return;
    }

    function scrapperBlogPusblished($url){
		
		$html = file_get_html($url);

		$title = $html->find("title",0)->plaintext;


		foreach ($html->find('meta') as $meta) {
			if($meta->name=="description") $description = $meta->content;
		}

		foreach($html->find('link') as $link){
		    if($link->rel=='icon') $urlIcon = $link->href;
		}

		$imageUrl = $html->find('img')[1]->src;
		$imageUrlShort  = $this->buildUrl($imageUrl);

		return [
				"urlblog"=>$url,
				"urlicon"=>$urlIcon,
				"urlimagen"=>$imageUrl,
				"urlimagenshort"=>$imageUrlShort,
				"title"=>$title,
				"summary"=>$description,
				"date"=>NOW()
			];
    }
    function buildUrl($url){
	    $urlblog = explode("/",$url);
	    $urlblogBuild = '';
	    $keys = array_keys($urlblog);
	    foreach($urlblog as $key => $partUrl){

	        if($key === end($keys)){
	            $urlblogBuild.=$partUrl;
	        }
	        else{
	            $urlblogBuild.=$partUrl.'\/';
	        }
	    }
    	return $urlblogBuild;
	}
}

?>