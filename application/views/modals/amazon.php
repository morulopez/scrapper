<?php
$idrandom = rand(0,2032323232);
?>
<div class="row content-amazon-parent first-div-amazon-content">
	<div class="col-md-6 text-right">
		<div class="row">
			<div class="col-md-10">
				<input type="text" class="form-control" id="get-product" placeholder="inserta el nombre del producto a escrapear">
			</div>
			<div class="col-md-2">
				<button type="button" class="btn btn-outline-primary buton-push-amazon"  onclick="object.Amazon.getProduct()">Pulsar</button>
			</div>
		</div>
	</div>
	<div class="col-md-3 text-left">
		<button class="btn btn-outline-primary button-reset-product" onclick="object.Amazon.resetProduct()">Reset Todo <i class="fas fa-trash-restore-alt"></i></button>
	</div>
</div>

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
	</div>
</div>