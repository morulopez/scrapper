<?php
 $idrandom = rand(0,2032323232);
?>
<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dis$palyeragaint/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link rel="stylesheet" href="<?php echo CDN;?>/style.css?id=<?php echo $idrandom; ?>">
        <script src="<?php echo CDN;?>/js/generalObject.js?id=<?php echo $idrandom?>"></script>
        <script src="<?php echo CDN;?>/js/UsuariosObject.js?id=<?php echo $idrandom?>"></script>
        <script src="<?php echo CDN;?>/js/allObjectDeclare.js?id=<?php echo $idrandom?>"></script>
        <script>window.onload=function(){object.Usuarios.listener();}</script>
    </head>
    <body class="bodylogin">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6 text-center divimagelogin">
                <h1 class="h4login">Scrappertrooll Login</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6 parentdivform">
                <div class="divform">
                    <div class="row">
                        <div class="col-md-12 divinput">
                            <input class="form-control" placeholder="inserta el nombre" type="text" name="user" id="user">
                        </div>
                        <div class="col-md-12 divinput">
                            <input class="form-control" placeholder="inserta la password" type="password" name="pass" id="pass">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-right divbutton">
                            <span class="buttonlogin" id="button-login">Iniciar</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>