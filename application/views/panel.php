<?php  
    $menu=[
        ["icon"=>"fas fa-spider","name"=>"Scrapear blog","href"=>""],
        ["icon"=>"fas fa-blog","name"=>"Mis blogs","href"=>"mis-blogs"],
        ["icon"=>"fab fa-facebook-f","name"=>"Publicar en facebook","href"=>"fan-pages"],
        ["icon"=>"fas fa-user-secret","name"=>"Mi contenido Diario","href"=>"mi-contenido-diario",],
        ["icon"=>"fas fa-cart-arrow-down","name" => "Crear pagina con contenido", "href"=>"crear-pagina-contenido"],
        ["icon"=>"fas fa-sign-out-alt","name"=>"Cerrar Sesion","href"=>"Usuarios/closeSesion",],
    ];
    $idrandom = rand(0,2032323232);
?>
<html>
    <head>
        <meta charset="utf-8">
        <title>ScrapperTrooll</title>
        <meta http-equiv="Expires" content="0">
        <meta http-equiv="Last-Modified" content="0">
        <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <link rel="stylesheet" href="<?php echo CDN;?>/style.css?id=<?php echo $idrandom; ?>">
        <link rel="stylesheet" href="<?php echo CDN;?>/styleamazon.css?id=<?php echo $idrandom; ?>">
        <!--LIBRERIA FONTAWESOME-->
	    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
       <!--BOOTSTRAP ESTILOS-->
    <script src="<?php echo CDN;?>/bootstrap/js/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="<?php echo CDN;?>/bootstrap/js/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="<?php echo CDN;?>/bootstrap/js/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="<?php echo CDN;?>/bootstrap/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="<?php echo CDN;?>/bootstrap/css/bootstrap.min.css">
    </head>
    <body>
        <div class="modal-content" id="modal-content-blog">
            <div class="div-show-content-modal">
            </div>
        </div>
        <div id="modalexpiredsesion">
        </div>
        <div class="row">
            <div class="col-md-2 menu">
                <div class="row">
                    <div class="col-md-12 text-center">
                    <img class="logo" src="<?php echo CDN;?>/imagenes/troll.jpg">
                    <h5>ScrapperTrooll</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-left">
                    <ul class="menulist">
                        <?php 
                            foreach($menu as $menuSidebar){
                                 echo "<li class='menulistLista'>
                                    <a class='arcormenu' href='".site_url($menuSidebar['href'])."'><i class='{$menuSidebar['icon']} icono'></i>{$menuSidebar['name']}</a>
                                  </li>";
                                
                            }
                        ?>
                    </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-10">
            <?php echo $content; ?>
            </div>
        </div>
    </body>
</html>