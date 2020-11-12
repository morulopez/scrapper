<div class="col-md-3"></div>
<div class="col-md-6 modalcreateblog">
    <div class="row">
        <div class="col-md-12 text-right"><i class="fas fa-times-circle" onclick="object.Blog.closeModal()"></i></div>
    </div>
    <input type="text" name="groupname" placeholder="Inserta el nombre del grupo" class="form-control" id="groupname"><br>
    <input type="text" name="idgroup" placeholder="Inserta el ID del grupo" class="form-control" id="idgroup"><br>
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
            <button type="button" class="buttonCrearblog" onclick="crearNewGroup()"><i class="far fa-hand-point-up"></i> Crear Nuevo Grupo</button>
        </div>
    </div>
</div>