<?php
$images_hide = $images;
if(!empty($dialy)){
	$folder = $dialy;
}else{
	$folder = "img/";
}
?>
<script src="<?php echo CDN;?>/js/workingimages.js?id=31"></script>
<div class="boximagesformake">
	<div class="row" id="rowboximagesformake">
		<?php 
		foreach ($images as $key =>$image) {
			if($image!='..' AND $image!='.' AND $image!='.DS_Store'){?>
		<div class="col-md-3 parentdivimg">
			<div class='divimages <?php echo $key==0 ? "selectimg" : " " ?>' id='divimg<?php echo $key;?>'>
				<img src='<?php echo IMGPATH.$folder.$image; ?>' class='imagesforedit' onclick='object.Images.changeImage("<?php echo IMGPATH.$folder.$image;?>","<?php echo $key ?>","<?php echo count($images) ?>")'>
				<!--<span class="topright" title="Borrar Imagen" onclick="object.Images.deleteImageselected('<?php echo IMGPATH.$folder.$image;?>');">
					<i class="fas fa-trash deleteimage"></i>
				</span>-->
			</div>
		</div>
		<?php }} ?>
	</div>
	<?php 
		$showform = "";
		foreach ($images as $key =>$image) {
			if($key ==0){
				$showform = "showform";
			}else{
				$showform = "";
			}?>
	<div class="noneform <?php echo $showform; ?>" id="form<?php echo $key?>">
		<div class="row formimgmake">
			<div class="col-md-6">
				<div class="row">
					<div id="parenttextnode<?php echo $key;?>">
						<div class="col-md-12 boxform" id="divtext1img<?php echo $key;?>">
							<div class="row">
								<div class="col-md-12 text-right divinsermoretext"><span class="insertmoretext" id="insertmoretext" onclick="object.Images.addMoretext(object.Images.moretextCount[<?php echo $key; ?>],<?php echo $key; ?>)"><i class="fas fa-pencil-alt"></i> Mas texto</span></div>
								<div class="col-md-4">
									<label class="labelformimg">Inserta el texto</label>
									<input type="text" id="text1img<?php echo $key;?>" placeholder="Insertar texto" class="form-control inputimg" onkeyup="object.Images.makeImg()">
								</div>
								<div class="col-md-4">

									<label class="labelformimg">Inserta el tamaño del texto</label>
									<input type="number" id="size1img<?php echo $key;?>"  placeholder="Inserta el tamaño del texto" class="form-control  inputimg" onkeyup="object.Images.makeImg()" onchange="object.Images.makeImg()">
								</div>
								<div class="col-md-4">
									<label class="labelformimg">Inserta el color del texto</label>
									<input type="color" id="color1img<?php echo $key;?>" placeholder="isertar color del texto" class="form-control inputimg"  onchange="object.Images.makeImg()">
								</div>
							</div>
							<div class="row">
								<div class="col-md-4">
									<label class="labelformimg">Inserta la altura del texto</label>
									<select id="align1img<?php echo $key;?>" placeholder="isertar altura del texto" class="form-control inputimg" onchange="object.Images.makeImg()">
				                        <option>top</option>
				                        <option>bottom</option>
				                        <option>middle</option>
				                    </select>
			                	</div>
			                	<div class="col-md-4">
				                    <label class="labelformimg">Inserta la posicion del texto</label>
									<select id="position1img<?php echo $key;?>" placeholder="isertar posicion del texto" class="form-control inputimg" onchange="object.Images.makeImg()">
				                        <option>center</option>
				                        <option>right</option>
				                        <option>left</option>
				                    </select>
			            		</div>
			            		<div class="col-md-4">
			            			<label class="labelformimg">Inserta el angulo del texto</label>
				                    <input type="number" id="angle1img<?php echo $key;?>" placeholder="Inserta el angulo del texto" class="form-control inputimg" onkeyup="object.Images.makeImg()" onchange="object.Images.makeImg()">
				                </div>
			                </div>
			                <div class="row">
			                	<div class="col-md-6">
				                    <label class="labelformimg">Derecha izquierda</label>
				                    <input type="range" class="form-control inputimg" id="up1img<?php echo $key;?>" min="0" max="500" onchange="object.Images.makeImg()">
			                	</div>
			                	<div class="col-md-6">
				                    <label class="labelformimg">Subir bajar texto</label>
				                    <input type="range" class="form-control inputimg" id="down1img<?php echo $key;?>" min="0" max="400" onchange="object.Images.makeImg()">
			                	</div>
			            	</div>
			            	<div class="row select-font">
			            		<div class="col-md-3 div-select-font">
			            			<select id="select-font1img<?php echo $key;?>" class="form-control" onchange="object.Images.selectFont('1',<?php echo $key ?>)">
			            				<?php
				            				$img = scandir(FCPATH.'/CDN/imagenes/images-font/');
											array_shift($img);
											array_shift($img);
											array_shift($img);
											$file = scandir(FCPATH.'/application/libraries/fuentes/');
											array_shift($file);
											array_shift($file);
											array_shift($file);
			            					foreach ($img as $keyfont => $value) {
			            						echo "<option value='{$file[$keyfont]}' id='optionfont{$keyfont}'>".substr($value,0,-4)."</option>";
			            					}
			            				?>
			            			</select>
			            		</div>
			            		<div class="col-md-9">
			            			<img id="img-show-font1img<?php echo $key;?>" class="img-font" src="<?php echo CDN.'/imagenes/images-font/'.$img[0] ?>"/>
			            		</div>
			            	</div>
			            </div>

					</div>
					<div class="col-md-12 boxform">
						<div class="row">
							<div class="col-md-12">
								<label class="labelformimg" style="margin-top: 10px;">Convertir Blanco y Negro</label>
		                    		<select placeholder="isertar centrado del texto" id="filterimg<?php echo $key;?>" class="form-control" onchange="object.Images.makeImg()">
				                        <option value=0>No</option>
				                        <option value=1>Si</option>
				                    </select>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<label class="labelformimg" style="margin-top: 10px;">Opacidad</label>
				                <input type="range" class="form-control" id="opacityimg<?php echo $key;?>" min="0" max="100" value="100" onchange="object.Images.makeImg()">
							</div>
							<div class="col-md-4">
								<label class="labelformimg" style="margin-top: 10px;">Enfoque Desenfoque</label>
		                		<input type="range" class="form-control" id="blurimg<?php echo $key;?>" min="0" max="100" value="0" onchange="object.Images.makeImg()">
							</div>
							<div class="col-md-4">
								<label class="labelformimg" style="margin-top: 10px;">Brillo</label>
		            			<input type="range" class="form-control" id="brilloimg<?php echo $key;?>" min="0" max="100" value="0" onchange="object.Images.makeImg()">
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<label class="labelformimg" style="margin-top: 10px;">Rojo</label>
			                    <input type="range" class="form-control" id="rojoimg<?php echo $key;?>" min="-100" max="100" value="0" onchange="object.Images.makeImg()">
		                	</div>
		                	<div class="col-md-4">
			                    <label class="labelformimg" style="margin-top: 10px;">Verde</label>
			                    <input type="range" class="form-control" id="verdeimg<?php echo $key;?>" min="-100" max="100" value="0" onchange="object.Images.makeImg()">
		                	</div>
		                	<div class="col-md-4">
			                    <label class="labelformimg" style="margin-top: 10px;">Azul</label>
			                    <input type="range" class="form-control" id="azulimg<?php echo $key;?>" min="-100" max="100" value="0" onchange="object.Images.makeImg()">
		                	</div>
						</div>
					</div>
					<div class="col-md-12 boxform">
						<div class="row">
							<div class="col-md-4">
								<label class="labelformimg" style="margin-top: 10px;">Contraste</label>
		                		<input type="range" class="form-control" id="contrastimg<?php echo $key;?>" min="-100" max="100" value="0" onchange="object.Images.makeImg()">
							</div>
							<div class="col-md-4">
								<label class="labelformimg" style="margin-top: 10px;">Voltear Imagen</label>
		                		 <select placeholder="isertar centrado del texto" id="flipimg<?php echo $key;?>" class="form-control" onchange="object.Images.makeImg()">
			                        <option>Deshacer</option>
			                        <option>Boca abajo</option>
			                        <option>Hacia un lado</option>
			                    </select>
							</div>
							<div class="col-md-4">
								<label class="labelformimg" style="margin-top: 10px;">Invertir Colores</label>
		            			<select placeholder="isertar centrado del texto" id="invertimg<?php echo $key;?>" class="form-control" onchange="object.Images.makeImg()">
			                        <option value=0>No</option>
			                        <option value=1>Si</option>
			                    </select>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<label class="labelformimg" style="margin-top: 10px;">Pixelar</label>
			                    <input type="range" class="form-control" id="pixelarimg<?php echo $key;?>" min="1" max="20" value="1" onchange="object.Images.makeImg()">
		                	</div>
		                	<div class="col-md-4">
			                    <label class="labelformimg" style="margin-top: 10px;">Rotar Imagen</label>
			                    <input type="range" class="form-control" id="rotateimg<?php echo $key;?>" min="-180" max="180" value="0" onchange="object.Images.makeImg()">
		                	</div>
		                	<div class="col-md-4">
			                    <label class="labelformimg" style="margin-top: 10px;">Afinar Imagen</label>
			                    <input type="range" class="form-control" id="afinarimg<?php echo $key;?>" min="0" max="100" value="0" onchange="object.Images.makeImg()">
		                	</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class='divimage'><img src='<?php echo IMGPATH.$folder.$images[0]; ?>' class='imageschosed' id="imageneshow<?php echo $key;?>"></div>
			</div>
		</div>
	</div>
	<?php }?>
	<div class="row divButtonsImages">
		<div class="col-md-6 text-left">
			<button class="buttonback" type="button" onclick="object.Scraper.back()"><i class="fas fa-chevron-circle-left"></i> Volver atras</button>
			<button class="buttonremovechanges" type="button" onclick="object.Images.deleteAllchanges()"><i class="fas fa-backspace"></i> Deshacer cambios de esta imagen</button>
		</div>
		<div class="col-md-6 text-right">
			<button class="buttonsave" type="button" onclick="object.Scraper.saveBlog(object.Images.keyimages)"><i class="fas fa-save"></i>Guardar blog</button>
		</div>
	</div>
</div>
