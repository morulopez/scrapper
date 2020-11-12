<?php
$idrandom = rand(0,2032323232);
?>
<script src="<?php echo CDN;?>/js/generalObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/blogObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/allObjectDeclare.js?id=<?php echo $idrandom?>"></script>

<div class="firstdiv divtableblogs" id="datablogs">
	<div class="row ">
		<div class="col-md-9 col-lg-9 parenttabs">
			<div class="row">
                <div class="col-md-6 col-lg-6 text-left">
                    <span class="title-table">Mis Blogs</span>
                </div>
            </div>
			<div class="row tabs">
			    <div class="col-md-4 col-lg-4 text-center tab">
			    	<span>Nombre Blog</span>
				</div>
				<div class="col-md-4 col-lg-4 text-center tab">
					<span>Url Blog</span>
				</div>
			</div>
		</div>
	</div>
</div>


