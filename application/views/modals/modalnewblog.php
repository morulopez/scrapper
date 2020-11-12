
<script src="<?php echo CDN;?>/js/generalObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/blogObject.js?id=<?php echo $idrandom?>"></script>
<script src="<?php echo CDN;?>/js/allObjectDeclare.js?id=<?php echo $idrandom?>"></script>
<div class="col-md-3"></div>
<div class="col-md-6 modalcreateblog">
    <div class="row">
        <div class="col-md-12 text-right"><i class="fas fa-times-circle" onclick="object.Blog.closeModal()"></i></div>
    </div>
    <input type="text" name="blogname" placeholder="Inserta el nombre del blog para el que vas a escrapear" class="form-control"><br>
    <input type="text" name="urlblog" placeholder="Inserta la url del blog" class="form-control"><br>
    <div class="row">
        <div class="col-md-12 text-right">
            <button type="button" class="buttonCrearblog" onclick="object.Blog.createNewBlog()"><i class="far fa-hand-point-up"></i> Crear blog nuevo</button>
        </div>
    </div>
</div>