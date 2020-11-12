<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require 'vendor/autoload.php';
use Intervention\Image\ImageManager;
use Intervention\Image\Filters\DemoFilter;

class Myimages_library{
    function __construct(){
        $this->cdn = CDN;
        $this->manager = new ImageManager(array('driver' => 'imagick'));
    }
    function resizeimage($newImagen){
        $img     = $this->manager->make($newImagen);
        $img->resize(500, 400);
        $img->save($newImagen);
    }
    function makeimg($values){
         $image    = explode("/",$values['image']);
         $urlimage ="";
         $values["keyimg"] = (string)$values["keyimg"];
         foreach ($image as $img) {
             if(strpos($img,".")) $urlimage = $img;
         }
         $img = $this->manager->make(FCPATH.'application/controllers/img/'.$img);
            $arrayValues=[
                "opacityimg".$values["keyimg"]    =>100,
                "blurimg".$values["keyimg"]       =>0,
                "brilloimg".$values["keyimg"]     =>0,
                "rojoimg".$values["keyimg"]       =>0,
                "verdeimg".$values["keyimg"]      =>0,
                "azulimg".$values["keyimg"]       =>0,
                "contrastimg".$values["keyimg"]   =>0,
                "encodeimg".$values["keyimg"]     =>"jpg",
                "filterimg".$values["keyimg"]     =>0,
                "flipimg".$values["keyimg"]       =>false,
                "invertimg".$values["keyimg"]     =>false,
                "pixelarimg".$values["keyimg"]    =>1,
                "rotateimg".$values["keyimg"]     =>0,
                "afinarimg".$values["keyimg"]     =>0,
                "textsecondimg".$values["keyimg"] =>false,
                "text0img".$values["keyimg"]      =>"",
                "size0img".$values["keyimg"]      =>70,
                "color0img".$values["keyimg"]     =>"#fdf6e3",
                "align0img".$values["keyimg"]     =>"center",
                "angle0img".$values["keyimg"]     =>0,
                "valign0img".$values["keyimg"]    =>"top",
                "up0img".$values["keyimg"]        =>390,
                "down0img".$values["keyimg"]      =>340,
                "select-font0img".$values["keyimg"]=>"",
            ];
            $arraytext = [];
            for($i = 1;$i<=$values["numberTextValues"];$i++){
                $arraytext["text{$i}img".$values["keyimg"]]   = "";
                $arraytext["size{$i}img".$values["keyimg"]]   = 70;
                $arraytext["color{$i}img".$values["keyimg"]]  = "#fdf6e3";
                $arraytext["align{$i}img".$values["keyimg"]]  = "center";
                $arraytext["angle{$i}img".$values["keyimg"]]  = 0;
                $arraytext["up{$i}img".$values["keyimg"]]     = 390;
                $arraytext["down{$i}img".$values["keyimg"]]   = 340;
                $arraytext["select-font{$i}img".$values["keyimg"]]   = "";
            }
            foreach($values as $key => $value){
                if(substr_count($key,"text") || substr_count($key,"size") || substr_count($key,"color") || substr_count($key,"align") || substr_count($key,"center") || substr_count($key,"angle") || substr_count($key,"up") || substr_count($key,"down") || substr_count($key,"select-font")){
                    if(!empty($values[$key])){
                        $arraytext[$key] = $values[$key];
                    }
                }
                if(!empty($values[$key])){
                    $arrayValues[$key]= $values[$key];
                }
            }
            if($arrayValues['flipimg'.$values["keyimg"]]=="Deshacer"){
                $arrayValues['flipimg'.$values["keyimg"]]=FALSE;
            }


            $img->opacity($arrayValues['opacityimg'.$values["keyimg"]]);
            $img->blur($arrayValues['blurimg'.$values["keyimg"]]);
            $img->brightness($arrayValues['brilloimg'.$values["keyimg"]]);
            if($arrayValues['flipimg'.$values["keyimg"]]){
                if($arrayValues['flipimg'.$values["keyimg"]]=="Boca abajo"){
                    $arrayValues['flipimg'.$values["keyimg"]]="v";
                }else{
                    $arrayValues['flipimg'.$values["keyimg"]]="h";
                }
                $img->flip($arrayValues['flipimg'.$values["keyimg"]]);
            }
            if($arrayValues["filterimg".$values["keyimg"]]){
                $img->filter(new DemoFilter(1));
            }
            $img->colorize( $arrayValues['rojoimg'.$values["keyimg"]],  $arrayValues['verdeimg'.$values["keyimg"]],  $arrayValues['azulimg'.$values["keyimg"]]);
            $img->contrast($arrayValues['contrastimg'.$values["keyimg"]]);
            $img->pixelate($arrayValues['pixelarimg'.$values["keyimg"]]);
            $number = 1;
            $numbercount = 1;
            foreach ($arraytext as $valuetext) {
                $size  = $arraytext["size".$number."img".$values["keyimg"]];
                $color = $arraytext["color".$number."img".$values["keyimg"]];
                $align = $arraytext["align".$number."img".$values["keyimg"]];
                $angle = $arraytext["angle".$number."img".$values["keyimg"]];
                $fuente  = $arraytext["select-font".$number."img".$values["keyimg"]];
                $img->text($arraytext["text".$number."img".$values["keyimg"]], $arraytext["up".$number."img".$values["keyimg"]], $arraytext["down".$number."img".$values["keyimg"]], function($font) use($size,$color,$align,$angle,$fuente) {
                    $font->file(FCPATH."application/libraries/fuentes/".$fuente);
                    $font->size($size);
                    $font->color($color);
                    $font->align($align);
                    //$font->valign($valign);
                    $font->angle($angle);
                 });
                if($numbercount==8){
                    $numbercount =1;
                    $number++;
                }else{
                    $numbercount++;
                }
            }
            //$img->trim('bottom', null, 10,60);
            $img->sharpen($arrayValues["afinarimg".$values["keyimg"]]);
            $img->rotate($arrayValues["rotateimg".$values["keyimg"]]);
            if($arrayValues["invertimg".$values["keyimg"]]){
                $img->invert();
            }
            $img->save(FCPATH.'application/controllers/imgmade/'.$urlimage);
            return $urlimage;
           
    }
    function removeAllchanges($value){
         $image    = explode("/",$value);
         $folder   = '';
         foreach ($image as $img) {
             if(strpos($img,".")){
                $urlimage = $img;
                break;
            }
            $folder = $img;
         }
        $imgmade = $this->manager->make(FCPATH.'application/controllers/img/'.$img);
        $foldermade  = FCPATH.'application/controllers/imgmade';
        /*
        funcion para mas usuarios AHORA EN BETA
        if(file_exists($foldermade)){
            mkdir($foldermade,0777, true);
        }*/
        $imgmade->save($foldermade.'/'.$urlimage);
        return $folder.'/'.$urlimage;
    }
    function removeAllchangesDilay($value,$primerakey,$segundakey){
         $image    = explode("/",$value);
         $folder   = '';
         foreach ($image as $img) {
             if(strpos($img,".")){
                $urlimage = $img;
                break;
            }
            $folder = $img;
         }
        $imgmade = $this->manager->make(FCPATH.'application/controllers/imgdialy-'.$primerakey.'-'.$segundakey.'/'.$img);
        $foldermade  = FCPATH.'application/controllers/imgmadedialy-'.$primerakey.'-'.$segundakey;
        $imgmade->save($foldermade.'/'.$urlimage);
        return $folder.'/'.$urlimage;
    }

    function removeAllImages(){
        $images     = scandir(FCPATH.'application/controllers/img/',1);
        $imagesmade = scandir(FCPATH.'application/controllers/imgmade/',1);
        array_pop($images);
        array_pop($images);
        array_pop($images);
        array_pop($imagesmade);
        array_pop($imagesmade);
        array_pop($imagesmade);
        foreach($images as $key=>$image){
            unlink(FCPATH.'application/controllers/img/'.$image);
            if(!empty($imagesmade[$key])){
                unlink(FCPATH.'application/controllers/imgmade/'.$imagesmade[$key]);
            }
        }
        return [$images,$imagesmade];
    }

    function removeAllImagesDialy($dir){
        $result = false;
        if ($handle = opendir($dir)){
            $result = true;
            while ((($file=readdir($handle))!==false) && ($result)){
                if($file!='.' && $file!='..'){
                    if(is_dir($dir."/".$file)){
                        $result = eliminar_directorio($dir."/".$file);
                    }else{
                        $result = unlink($dir."/".$file);
                    }
                }
            }
            closedir($handle);
            if ($result){
                $result = rmdir($dir);
            }
        }
        return $result;
    }

    function makeimgDialy($values){
         $primerakey = $values["primerakey"];
         $segundakey = $values["segundakey"];
         $foldermade = FCPATH.'application/controllers/imgmadedialy'.$values['folderDialy'].'/';
         $this->checkIfExitFile($foldermade);
         $image    = explode("/",$values['image']);
         $urlimage ="";
         $values["keyimg"] = (string)$values["keyimg"];
         foreach ($image as $img) {
             if(strpos($img,".")) $urlimage = $img;
         }
         $img = $this->manager->make(FCPATH.'application/controllers/imgdialy'.$values['folderDialy'].'/'.$img);
            $arrayValues=[
                "opacityimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"      =>100,
                "blurimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"         =>0,
                "brilloimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"       =>0,
                "rojoimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"         =>0,
                "verdeimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"        =>0,
                "azulimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"         =>0,
                "contrastimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"     =>0,
                "encodeimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"       =>"jpg",
                "filterimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"       =>0,
                "flipimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"         =>false,
                "invertimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"       =>false,
                "pixelarimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"      =>1,
                "rotateimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"       =>0,
                "afinarimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"       =>0,
                "textsecondimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"   =>false,
                "text0img{$values["keyimg"]}-{$primerakey}-{$segundakey}"        =>"",
                "size0img{$values["keyimg"]}-{$primerakey}-{$segundakey}"        =>70,
                "color0img{$values["keyimg"]}-{$primerakey}-{$segundakey}"       =>"#fdf6e3",
                "align0img{$values["keyimg"]}-{$primerakey}-{$segundakey}"       =>"center",
                "angle0img{$values["keyimg"]}-{$primerakey}-{$segundakey}"       =>0,
                "valign0img{$values["keyimg"]}-{$primerakey}-{$segundakey}"      =>"top",
                "up0img{$values["keyimg"]}-{$primerakey}-{$segundakey}"          =>390,
                "down0img{$values["keyimg"]}-{$primerakey}-{$segundakey}"        =>340,
                "select-font0img{$values["keyimg"]}-{$primerakey}-{$segundakey}" =>"",
            ];
            $arraytext = [];
            for($i = 1;$i<=$values["numberTextValues"];$i++){
                $arraytext["text{$i}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"]          = "";
                $arraytext["size{$i}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"]          = 70;
                $arraytext["color{$i}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"]         = "#fdf6e3";
                $arraytext["align{$i}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"]         = "center";
                $arraytext["angle{$i}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"]         = 0;
                $arraytext["up{$i}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"]            = 390;
                $arraytext["down{$i}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"]          = 340;
                $arraytext["select-font{$i}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"]   = "";
            }
            foreach($values as $key => $value){
                if(substr_count($key,"text") || substr_count($key,"size") || substr_count($key,"color") || substr_count($key,"align") || substr_count($key,"center") || substr_count($key,"angle") || substr_count($key,"up") || substr_count($key,"down") || substr_count($key,"select-font")){
                    if(!empty($values[$key])){
                        $arraytext[$key] = $values[$key];
                    }
                }
                if(!empty($values[$key])){
                    $arrayValues[$key]= $values[$key];
                }
            }
            if($arrayValues["flipimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]=="Deshacer"){
                $arrayValues["flipimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]=FALSE;
            }


            $img->opacity($arrayValues["opacityimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]);
            $img->blur($arrayValues["blurimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]);
            $img->brightness($arrayValues["brilloimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]);
            if($arrayValues["flipimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]){
                if($arrayValues["flipimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]=="Boca abajo"){
                    $arrayValues["flipimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]="v";
                }else{
                    $arrayValues["flipimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]="h";
                }
                $img->flip($arrayValues["flipimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]);
            }
            if($arrayValues["filterimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]){
                $img->filter(new DemoFilter(1));
            }
            $img->colorize( $arrayValues["rojoimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"],  $arrayValues["verdeimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"],  $arrayValues["azulimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]);
            $img->contrast($arrayValues["contrastimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]);
            $img->pixelate($arrayValues["pixelarimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]);
            $number = 1;
            $numbercount = 1;
            foreach ($arraytext as $valuetext) {
                $size   = $arraytext["size{$number}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"];
                $color  = $arraytext["color{$number}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"];
                $align  = $arraytext["align{$number}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"];
                $angle  = $arraytext["angle{$number}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"];
                $fuente = $arraytext["select-font{$number}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"];
                $img->text($arraytext["text{$number}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"], $arraytext["up{$number}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"], $arraytext["down{$number}img{$values["keyimg"]}-{$primerakey}-{$segundakey}"], function($font) use($size,$color,$align,$angle,$fuente) {
                    $font->file(FCPATH."application/libraries/fuentes/".$fuente);
                    $font->size($size);
                    $font->color($color);
                    $font->align($align);
                    //$font->valign($valign);
                    $font->angle($angle);
                 });
                if($numbercount==8){
                    $numbercount =1;
                    $number++;
                }else{
                    $numbercount++;
                }
            }
            //$img->trim('bottom', null, 10,60);
            $img->sharpen($arrayValues["afinarimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]);
            $img->rotate($arrayValues["rotateimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]);
            if($arrayValues["invertimg{$values["keyimg"]}-{$primerakey}-{$segundakey}"]){
                $img->invert();
            }
            $img->save(FCPATH.'application/controllers/imgmadedialy'.$values['folderDialy'].'/'.$urlimage);
            return $urlimage;
           
    }

    private function checkIfExitFile($folder){
        if(!file_exists($folder)){
           mkdir($folder,0777, true);
        }
        return true;
    
    }
}