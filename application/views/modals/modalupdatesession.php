<div class="col-md-3"></div>
<div class="col-md-6 modalcreateblog">
    <div class="row">
        <div class="col-md-12 text-right"><i class="fas fa-times-circle" onclick="object.Blog.closeModal('parentmodalupdateSession')"></i></div>
    </div>
    <div class="row">
    	<div class="col-md-6">
    		datr:<input type="text" name="datr" value="<?php echo $cookies['datr']?>" class="form-control" id="datr"><br>
		    sb:<input type="text" name="sb" value="<?php echo $cookies['sb']?>" class="form-control" id="sb"><br>
		    m_pixel:<input type="text" name="m_pixel" value="<?php echo $cookies['m_pixel']?>" class="form-control" id="m_pixel"><br>
			_fbp:<input type="text" name="_fbp" value="<?php echo $cookies['_fbp']?>" class="form-control" id="_fbp"><br>
			locale:<input type="text" name="locale" value="<?php echo $cookies['locale']?>" class="form-control" id="locale"><br>
		    c_user:<input type="text" name="c_user" value="<?php echo $cookies['c_user']?>" class="form-control" id="c_user"><br>
    	</div>
    	<div class="col-md-6">
    		spin:<input type="text" name="spin" value="<?php echo $cookies['spin']?>" class="form-control" id="spin"><br>
			xs:<input type="text" name="xs" value="<?php echo $cookies['xs']?>" class="form-control" id="xs"><br>
			fr:<input type="text" name="fr" value="<?php echo $cookies['fr']?>" class="form-control" id="fr"><br>
		    presence:<input type="text" name="presence" value="<?php echo $cookies['presence']?>" class="form-control" id="presence"><br>
		    wd:<input type="text" name="wd" value="<?php echo $cookies['wd']?>" class="form-control" id="wd"><br>
			x_referer:<input type="text" name="x_referer" value="<?php echo $cookies['x_referer']?>" class="form-control" id="x_referer"><br>
    	</div>
    </div>
    <div class="row">
        <div class="col-md-6" id='diverror'>
        </div>
        <div class="col-md-6 text-right">
            <button type="button" class="buttonCrearblog" onclick="updateSession()"><i class="far fa-hand-point-up"></i> Actualizar Session</button>
        </div>
    </div>
</div>