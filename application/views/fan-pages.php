
<?php
$arrayoptionsWhitdAncor=["class","id","tag"];
$arrayoptions=["class","id","tag"];

$idrandom = rand(0,2032323232);
?>
<script src="<?php echo CDN;?>/js/generalObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/facebookObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/blogObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/scrapperObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/workingimages.js?id=<?php echo $idrandom?>"></script>
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
<div id="parentmodal">
  <div id="mymodal">
    <div class="row rowmodal">
      <div class="col-md-3"></div>
      <div class="col-md-6 text-center titlemodal">
          <h1>SCRAPEANDO IMAGENES ESPERA POR FAVOR</h1>
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6"><div class="preloader"><img class="logomodal" src="<?php echo CDN;?>/imagenes/troll.jpg"></div></div>
      </div>
      </div>
    </div>
  </div>
</div>
<div id="parentmodalInsertBlog">
  <div id="mymodal">
    <div class="row rowmodal" id="modalNewBlog">
    </div>
    <div class="row" id="modalupdateBlog">
    </div>
  </div>
</div>
<div id="parentmodalupdateSession">
  <div id="mymodal">
    <div class="row modal-update-session" id="modalupdatesession">
    </div>
  </div>
</div>
<div class="row divpermisosfacebook">
    <div class="divper col-md-3">
        <div class="row">
            <div class="col-md-3 text-left divpermisos">
                <span class="permisos"><i class="fab fa-facebook iconpermisos"></i> Permisos:</span>
            </div>
            <div class="col-md-4 text-left">
            <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" auto-logout-link="true" data-use-continue-as="true" onlogin="checkLoginState();"></div>
            </div>
        </div>
    </div>
    <div class="col-md-5 text-right">
        <span class="fanpageselected"><i class="far fa-check-circle"></i>Fan page Seleccionada</span>
        <span class="nameselected" id="divchangename">Ninguna pagina Seleccionada</span>
    </div>
    <div class="col-md-2 text-right divfanpageselected">
         <span class="buttoninsert" onclick="newFanpage()"><i class="fab fa-facebook-f"></i>Insertar Fan Page Nueva</span>
         <div class="buttoninsert session-facebook" onclick="updateSessionFacebook()"><i class="fab fa-facebook-f"></i>Actualizar Session</div>
         <div class="buttoninsert grupo-facebook" onclick="insertgroupFacebook()"><i class="fab fa-facebook-f"></i>Insertar nuevo grupo</div>
    </div>
</div>
<div class="row">
  <div class="col-md-11">
      <div class="firstdiv divtablefanpage" id="datafanpages">
      </div>
  </div>
</div>
<div class="row">
  <div class="col-md-11 parenttabs">
      <div class="row tabs">
          <div class="col-md-2 text-center tab puimg" onclick="openTab('contentTabsimg')"><i class="far fa-image"></i> Publicar imagen</div>
          <div class="col-md-2 text-center tab puyou" onclick="openTab('contentTabsyoutube')"><i class="fab fa-youtube"></i> Publicar video</div>
      </div>
  </div>
</div>
<div class="row contentTabsyoutube">
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-11 inside">
          <div class="row" id="rowaudio">
          </div>
          <div class="row form-dowload-youtube">
              <div class="col-md-6">
                  <input class="form-control inputtab" type="text" placeholder="Inserta el nombre del video a escrapear" id="titleYoutube">
              </div>
              <div class="col-md-6 text-left">
                  <button type="button" class="buttontab" onclick="getSrcyoutube()"><i class="fas fa-play"></i> Escrapear Youtube</button>
              </div>
          </div>
          <div class="youtubecontent">
              <div class="row">
                  <div class="col-md-12" id="contentyoutube">
                  </div>
              </div>
           </div>
      </div>
    </div>
  </div>
</div>
<div class="contentTabsimg">
  <div class="row">
    <div class="col-md-11 inside">
        <div class="row">
            <div class="col-md-6">
                <input class="form-control inputtab" type="text" placeholder="Inserta el nombre de la imagen a escrapear" id="nameimg">
            </div>
            <div class="col-md-6 text-left">
                <button type="button" class="buttontab" onclick="object.Images.imgFanpage()"><i class="fas fa-camera-retro"></i> Escrapear Imagen</button>
            </div>
        </div>
        <div>
        <div class="row">
            <div class="col-md-12" id="boxmyotherimages">
           </div>
        </div> 
        </div>
    </div>
  </div>
</div>
<div id="makeimages"></div>
<div class="row publiimgbutton">
  <div class="col-md-10">
  </div>
</div>
<div class="row publivideobutton">
  <div class="col-md-10">
  </div>
</div>

<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v4.0&appId=975453686291791&autoLogAppEvents=1"></script>