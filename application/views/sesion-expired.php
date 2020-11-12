<?php
 $idrandom = rand(0,2032323232);
?>
<html>
	<head>
		 <!--LIBRERIA FONTAWESOME-->
	    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="<?php echo CDN;?>/style.css?id=<?php echo $idrandom; ?>">
	</head>
	<body>
		<div class="sesionexpired">
			<div class="row">
				<div class="col-md-3">
				</div>
				<div class="col-md-6 divh1modal">
					<div class="row">
						<div class="col-md-12">
							<h1>Tu sesion ha expirado Troooolll!!</h1>
						</div>
                        <div class="col-md-12 divinput">
                            <input class="form-control" placeholder="inserta el nombre" type="text" name="user" id="user">
                        </div>
                        <div class="col-md-12 divinput">
                            <input class="form-control" placeholder="inserta la password" type="password" name="pass" id="pass">
                        </div>
                        <div class="col-md-12 text-right divbutton">
                            <span class="buttonlogin" onclick="renovetoken()">Iniciar</span>
                        </div>
                        <div class="col-md-12 text-center">
							<a href="" class="buttonloginback">Volver a la pagina de inicio</a>
						</div>
                    </div>
                </div>
            </div>
        </div>
	</body>
</html>