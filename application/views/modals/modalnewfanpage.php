
<div class="col-md-3"></div>
<div class="col-md-6 modalcreateblog">
    <div class="row">
        <div class="col-md-12 text-right"><i class="fas fa-times-circle" onclick="object.Blog.closeModal()"></i></div>
    </div>
    <input type="text" name="fanpagename" placeholder="Inserta el nombre de la fan page" class="form-control" id="namefanpage"><br>
    <input type="text" name="idfanpage" placeholder="Inserta el ID de tu fan page" class="form-control" id="idfanpage"><br>
    <input type="text" name="keysecret" placeholder="Inserta la key secret de tu fan page" class="form-control" id="secretkey"><br>
    <select class="form-control" id="selectblogfanpage">
        <?php
            foreach($blogs as $blog){ ?>
                <option value="<?php echo $blog['ID'];?>"><?php echo $blog['name_blog'];?></option>
        <?php }?>
    </select><br>
    <div class="row">
        <div class="col-md-6" id='diverror'>
        </div>
        <div class="col-md-6 text-right">
            <button type="button" class="buttonCrearblog" onclick="crearNewfanpage()"><i class="far fa-hand-point-up"></i> Crear Nueva Fan Page</button>
        </div>
    </div>
</div>