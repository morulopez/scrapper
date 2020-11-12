<?php
$arrayoptionsWhitdAncor=["class","id","tag"];
$arrayoptions=["class","id","tag"];

$idrandom = rand(0,2032323232);
?>
<script src="<?php echo CDN;?>/js/generalObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/scrapperObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/workingimages.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/amazon.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/blogObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/allObjectDeclare.js?id=<?php echo $idrandom?>"></script>

<!-- ventana emergente para borrar imagenes y para borrar cambios de imagen-->
<div class="emerg" id="emerg">
  <div id="mymodalquestion">
    <div class="row questionmodal">
      <div class="col-md-4">
      </div>
      <div class="col-md-4 text-center boxquestion" id="boxhtml">
      </div>
    </div>
  </div>
</div>
<div id="parentmodalInsertBlog">
  <div id="mymodal">
    <div class="row rowmodal" id="modalNewBlog">
    </div>
  </div>
</div>
<div id="parentmodal">
  <div id="mymodal">
    <div class="row rowmodal">
      <div class="col-md-3"></div>
      <div class="col-md-6 text-center titlemodal">
          <h1>SCRAPEANDO BLOG, PACIENCIA EL PROCESO PUEDE TARDAR VARIOS MINUTOS</h1>
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6"><div class="preloader"><img class="logomodal" src="<?php echo CDN;?>/imagenes/troll.jpg"></div></div>
      </div>
      </div>
    </div>
  </div>
</div>
<div id="parentmodalfilter">
  <div id="mymodal">
    <div class="row rowmodal">
      <div class="col-md-3"></div>
      <div class="col-md-6 text-center titlemodal">
          <h1>SCRAPEANDO BLOG CON LOS FILTROS APLICADOS,EL PROCESO ACABARA ENSEGUIDA</h1>
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6"><div class="preloader"><img class="logomodal" src="<?php echo CDN;?>/imagenes/troll.jpg"></div></div>
      </div>
      </div>
    </div>
  </div>
</div>
<div class="firstcontent">
  <div class="row firstdiv">
    <div class="col-md-6 firsform">
        <div class="row">
            <div class="col-md-9">
                <div class="titleselec">
                    <span >Selecciona el blog para el que vas a scrapear y el idioma:</span>
                </div>
            </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <select id="languaje" class="form-control">
              <option value="es">Español</option>
              <option value="en">Ingles</option>
            </select>
          </div>
        </div>
        <form name="form">
            <div class="row">
                <div class="col-md-9">
                  <select name="selectblog" class="form-control">
                  </select>
                  <input class="form-control" value="https://www.todosmartwatches.com/" name="url" type="url" placeholder="Inserta la url del blog a scrapear" autocomplete="on">
                </div>
            </div>
            <div class="row">
                <div class="col-md-9">
                    <input class="form-control" value="entry-header" name="ancorpost" type="text" placeholder="Inserta la clase etiqueta del blog que dirige hacia el post">
                    <input class="form-control" value="entry-title" name="title" type="text" placeholder="Inserta la clase para obtener el titulo">
                    <input class="form-control" value="entry-content" name="content" type="text" placeholder="Inserta la clase para obtener el contenido">
                </div>
                <div class="col-md-3">
                    <div class="row">
                      <div class="col-md-3 type">
                        <span>Type:</span>
                      </div>
                      <div class="col-md-9 select">
                        <select class="form-control" name="typeancorpost">
                            <?php foreach($arrayoptionsWhitdAncor as $options){
                                echo "<option value='{$options}'>{$options}</option>";
                            }
                            ?>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 type">
                        <span>Type:</span>
                      </div>
                      <div class="col-md-9 select">
                        <select class="form-control" name="typetitle">
                            <?php foreach($arrayoptions as $options){
                                echo "<option value='{$options}'>{$options}</option>";
                            }
                            ?>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 type">
                        <span>Type:</span>
                      </div>
                      <div class="col-md-9 select">
                        <select class="form-control" name="typecontent">
                            <?php foreach($arrayoptions as $options){
                                echo "<option value='{$options}'>{$options}</option>";
                            }
                            ?>
                        </select>
                      </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="div-button">
            <button onclick="object.Scraper.getScraper();" type="button" class="btn btn-dark"> <img class="iconbutton" src="<?php echo CDN;?>/imagenes/troll.jpg">Scrapear</button>
        </div>
        <div id="errordiv"></div>
    </div>
    <div class="col-md-6 text-right">
    <span class="buttoninsert" onclick="object.Blog.newBlog()"><i class="fas fa-marker"></i>Insertar blog nuevo</span>
    </div>
  </div>
</div>
<hr>
<div class="row content-scraperrow">
  <div class="col-md-8 textacontent" id="textacontent">
    <textarea class="form-control" id="textarea"></textarea>
  </div>
  <div id="contentScrapper" class="col-md-8">
  </div>
  <div class="col-md-3 secondform" id="secondformid">
    <div class="row">
      <div class="col-md-12">
        <div class="editamano" id="editamano" onclick="object.Scraper.editcontent();"><i class="fas fa-keyboard"></i> Editar contenido a mano</div>
        <div class="editamano" id="editwhitfilter" onclick="object.Scraper.editcontentWhitFilter();"><i class="fas fa-edit"></i> Editar contenido con filtros</div>
      </div>
      <div class="col-md-12" id="titleselect">
          <div class="titleselec">
              <span >Levanta la consola y elige lo que quieras eliminar del contenido :</span>
          </div>
      </div>
      <div class="col-md-12" id="buttonEditamano">
        <button type="button" class="buttonsfilter" onclick="object.Scraper.recuperarall();"><i class="fas fa-arrow-alt-circle-up"></i> Recuperar el contenido</button>
        <button type="button" class="buttonsfilter" onclick="object.Scraper.done();"><i class="fas fa-check-circle"></i> Echo</button>
      </div>
    </div>
    <form  name="secondform" id="formfilter"></form>
      <div class="row" id="errorfilter">
        <div class="col-md-12 text-center errorfilter">
          Error: Todos los campos que mandes deben de estar rellenos por favor
        </div>
      </div>
      <div id="buttonEditfilter">
        <button type="button" class="buttonsfilter" onclick="object.Scraper.moreFilter(object.Scraper.number);"><i class="fas fa-filter"></i> Insertar filtro</button>
        <button type="button" class="buttonsfilter" onclick="object.Scraper.filter();"><img class="iconbutton" src="<?php echo CDN;?>/imagenes/troll.jpg"> Escrapear de nuevo</button>
      </div>
  </div>
</div>
<div class="row content-scraperrow">
  <div class="col-md-12 text-right amazon-content" id="add-product-scrapper">
    <div class="row">
      <div class="col-md-8 text-left">
        <button class="delete-product-scrapper" onclick="object.Scraper.deleteContentAmazon();">
          Borrar Contenido de productos <i class="fas fa-eraser"></i>
        </button>
      </div>
      <div class="col-md-4 text-right">
        <button class="add-product-scrapper" onclick="object.Scraper.addProductScrapper();">
          Añadir Productos al contenido <i class="fab fa-product-hunt"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" id="div-product-scrapper">
      </div>
    </div>
  </div>
</div>
<div class="row content-scraperrow">
  <div id="contentScrapperimg" class="col-md-8">
  </div>
  <div class="col-md-8 contentScrapper" id="contentotherimages">
    <div class="backbutton">
      <span class="buttonback" id="back"><i class="fas fa-chevron-circle-left"></i> Volver atras</span>
    </div>
    <div class="row formotheriimages">
        <div class="col-md-6">
            <input class="form-control inputtab" type="text" placeholder="Inserta el nombre de la imagen a escrapear" id="nameimg">
        </div>
        <div class="col-md-6 text-left">
            <button type="button" class="buttontab" id="getimages"><i class="fas fa-camera-retro"></i> Escrapear Imagen</button>
        </div>
    </div>
    <div class="imgcontent">
        <div class="row">
            <div class="col-md-12" id="contentimg">
            </div>
        </div>
    </div>
     <div id="boxmyotherimages">
     </div>
  </div>
</div>
<div class="makeimages" id="makeimages">
</div>
 <div id="google_translate_element"></div>
<script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'es'}, 'google_translate_element');
  }
</script> 
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<script src="https://apis.google.com/js/client.js?onload=checkAuth"></script>