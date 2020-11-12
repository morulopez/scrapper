<?php
$idrandom = rand(0,2032323232);
?>
<script src="<?php echo CDN;?>/js/generalObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/scrapperObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/workingimages.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/amazon.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/blogObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/allObjectDeclare.js?id=<?php echo $idrandom?>"></script>
<script>
	window.onload = function(){ object.Amazon.getAllBlogs()}
</script>
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
<div class="firstdiv">
	<div class="row">
		<div class="col-md-4 text-center">
			<h4>Selecciona un blog para añadir el contenido</h4>
			<select class="form-control" id="blogs-for-scrapper-amazon" onchange="object.Amazon.changeBlog()">
			</select>
		</div>
		<div class="col-md-5  text-left div-blog-selected">
			<span>Blog Seleccionado:</span><br>
			<span class="span-selected span-selected-animation"></span>
		</div>
	</div>
	<div class="row content-amazon-parent">
		<div class="col-md-4 text-right">
			<input type="text" class="form-control" id="get-product" placeholder="inserta el nombre del producto a escrapear">
			<button type="button" class="btn btn-outline-primary buton-push-amazon"  onclick="object.Amazon.getProduct()">Pulsar</button>
			<button class="btn btn-outline-primary button-reset-product" onclick="object.Amazon.resetProduct()">Reset Todo <i class="fas fa-trash-restore-alt"></i></button>
		</div>
	</div>
	<hr class="separator">

	<div class="row content-amazon-parent">
		<div class="col-md-6 content-amazon">
			<div class="row">
				<div class="col-md-1">
				</div>
				<div class="col-md-10">
					<div class="row text-center" id="content-pages">
					</div>
				</div>
			</div>
			<div class="row" id="content-amazon">
			</div>
		</div>
		<div class="col-md-5">
			<div class="row content-amazon-selected" id="content-amazon-selected">
			</div>
			<textarea class="form-control data-for-page" id="content-title-page" placeholder="Inserta algun texto de encabezado de la pagina"></textarea>
			<input type="text" id="title-h2" class="form-control data-for-page" placeholder="Inserta un h2 para el pie de la pagina">
			<textarea class="form-control data-for-page data-for-page" id="content-footer-page" placeholder="Inserta algun texto para el final de la pagina"></textarea>
		</div>
	</div>
</div>

<div class="row" id="test">
	
</div>
