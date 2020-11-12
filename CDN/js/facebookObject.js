

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


/** funcion para checkear el status del login*/
function checkLoginState() {
    FB.getLoginStatus((response)=>{
        if (response.status === 'connected') {

            /* recogemos aqui ojooooooo el token de usuarioooo*/
            setCookie("idfanpage",response.authResponse.userID);
            setCookie("token_user",response.authResponse.accessToken);
            FB.AppEvents.logPageView();   
            /*/*En esta promesa recogemos el id del usuario que es igual que el id que nos otorga la facebook para la fanpage 
            FB.api(' https://graph.facebook.com/v4.0/me?access_token='+checkCookie('token_user'), function(response) {
            setCookie("user_id",response.id);
            console.log({"idusuario":response});
        
            });*/


        }else{
            console.log("eeeeeee")
        }
    });
}

function test(){
     var params = {
        //Page Token with publish_pages (to post as Page)
        access_token: checkCookie("token_user"),
        //status message
        message: "Probandoel mensageeeee y la apiiiiii"
    };

    //API call - pageId could also be userId or albumId*/
   FB.api(`https://graph.facebook.com/v4.0/1369032283305695/feed`, 'post', params, (response) => {
        console.log(response)
   })
}
/*++Funcion para seleccionar la fanpage y recoger sus valores id key etc */
function selectfanpage(id,total){

    for(var i =0;i<total; i++ ){
        var ele =  document.getElementById('selectedfanpage'+i);
        if(id!=i){
            ele.classList.remove("selected");
        }else{
            ele.classList.add("selected");
        }
    }
    var keyFanpaApi   = document.getElementById('newkey'+id).value; 
    var idFanpaApi    = document.getElementById('newid'+id).value;
    var fanpagename   = document.getElementById('newname'+id).value;

    setCookie("idfanpageapi",idFanpaApi);
    setCookie("keyfanpage",keyFanpaApi);
    setCookie("fanpagename",fanpagename);
    setCookie("page_selected","selected");
    
     ///EN ESTA PROMESA OBTENEMOS EL PAGE ID  Y EL TOKEN PAGE 
    FB.api("https://graph.facebook.com/v4.0/"+checkCookie('idfanpage')+"/accounts?access_token="+checkCookie('token_user'),function(response){
        console.log(checkCookie('idfanpage'))
        console.log(checkCookie('token_user'))
        console.log("illlloooooooooooooooooooo",response.data)
        setCookie("page_id",response.data[0].id); /*ojoooooo coger el id de la pagina para poder publicar fotos*/
        setCookie("token_page",response.data[0].access_token);
    });



    var divshowname   = document.getElementById('divchangename');
    divshowname.classList.remove('nameselectchange');
    divshowname.innerHTML ="";
    setTimeout(function(){ 
        divshowname.innerHTML = fanpagename;
        divshowname.classList.add('nameselectchange'); 
    }, 100);
}
https://graph.facebook.com/oauth/access_token ?client_id={your-app-id} &client_secret={your-app-secret} &grant_type=client_credentials
/*funcion para insertar el id de nuestra fanpage*/

/*window.fbAsyncInit = function() {
    FB.init({
    appId      : checkCookie('idfanpage'),
    cookie     : true,
    xfbml      : true,
    version    : 'v4.0'
    });
}*/

/* subir imagenes desde url creamos una imagen la subimos a cloudinari y con la url de cloudinary la pasamos al facebook*/
function uploadImage(img,id){
    var params = {
        //Page Token with publish_pages (to post as Page)
        access_token: checkCookie('token_page'),
        //status message
        message: "",
        //absolute url to the image, must be public
        url: img
    };

    //API call - pageId could also be userId or albumId*/
   FB.api(`https://graph.facebook.com/v4.0/${checkCookie('page_id')}/photos`, 'post', params, (response) => {
    console.log("mi iddddddddddddddddddd",checkCookie('page_id'));
        console.log("respuestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",response)
        if (response && response.error) {
            flash("<h6>Tu <strong>Token de facebook a caducado o la fanpage no es correcta,</strong> cierra sesion con facebook y vuelve a iniciar sesion</h6>","warning");
            removeCookieandSelected();
            fetch(`http://localhost/scrapperTrooll/Facebook/delete_img_cloudinary`,{
                method:"POST",
                body:"id="+id,
                headers:{
                    'Accept':'application/JSON',
                    'Content-Type':'application/x-www-form-urlencoded'  
                }
            }).then(data=>{
                return;
            })
        } else {
            flash("<h6><i class='fas fa-check'></i> Imagen publicada correctamente en "+checkCookie('fanpagename')+"</h6>","flags");
            fetch(`http://localhost/scrapperTrooll/ScrapperImg/removeAllimages`,{
                method:"POST",
                body:"removeallimg="+"remove",
                headers:{
                    'Accept':'application/JSON',
                    'Content-Type':'application/x-www-form-urlencoded'  
                }
            }).then(data=>{
                document.getElementById('makeimages').innerHTML = "";
            })
        }
        document.getElementsByClassName("boxquestion")[0].style.background="#fff";
        document.getElementById("emerg").style.display="none";
    });
   
   return true;
}


/* funcion para borrar las cookies y deseleccionar la fanpage seleccionada por si tenemos que obtener nuevo token */

function removeCookieandSelected(){
    var divshowname   = document.getElementById('divchangename');
    divshowname.classList.remove('nameselectchange');
    divshowname.innerHTML ="";
    var selectAtributes = document.getElementsByClassName('selected')[0];
        selectAtributes.classList.remove('selected');
    fordeletecookie('fanpagename');
    fordeletecookie("idfanpage");
    fordeletecookie("keyfanpage");
    setCookie("page_selected","noselected");
    console.log(checkCookie("keyfanpage"));
}

function fordeletecookie(name){
     document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
     console.log(checkCookie("keyfanpage"));
}

/*funcion para publicar post en facebook**/
/*function publicarPost(){

    var body = 'Buenos diaas a todooos!!! Positivismo,(forget your tubbles) olvida los problemas, disfruta y a comerte la semanaa!!';
        FB.api(' https://graph.facebook.com/feed?&access_token='+checkCookie('token_page'), 'post', { message: body,link:"https://www.youtube.com/watch?v=049km3Vc02c" }, function(response) {
        if (!response || response.error) {
            console.log(response.error);
        } else {
            console.log('Post ID: ' + response.id);
        }
    });
}*/

function init_cookieselected(){
    setCookie("page_selected","noselected");
}
init_cookieselected();

///**********FUNCION PARA PUBLICAR CONTENIDO EN FANPAGE****////

 /*Funcion para remover todos los cambios echos de la imagen*/
  function publicPostFanpage(){
    if(checkCookie('page_selected')=="noselected"){
        flash("<h6>Tienes que elegir una Fan Page para publicar</h6>","warning");
        return;
    };
    let img = document.getElementsByClassName('divimage')[object.Images.keyimages].childNodes[0].src;
    var content = `<h5>¿Esta seguro de publicar esta imagen en tu Fanpage?</h5>
    <button type="button" id="yespubli"><i class="fas fa-thumbs-up"></i> Si</button><button id="nopublish" type="button"><i class="far fa-thumbs-down"></i> No</button>
    <img src=${img} style="widt:100%;margin:20px;">
    `;
    showModal(content);

    document.getElementById("nopublish").addEventListener("click",()=>{
       document.getElementById("emerg").style.display="none";
       return;
    })
    document.getElementById("yespubli").addEventListener("click",()=>{
      document.getElementById("emerg").style.display="none";
      document.getElementsByClassName("boxquestion")[0].style.background="transparent";
      var content = `<h1 class="h1download">Publicando en Fan Page ${checkCookie('fanpagename')}.......</h1>`;
      showModal(content);
      if(img.search("id")!=-1){
        img = img.split("?")[0];
      }
      fetch(`http://localhost/scrapperTrooll/Facebook/publishFanPage`,{
        method:"POST",
        body:"image="+img+"&namefanpage="+checkCookie('fanpagename'),
        headers:{
          'Accept':'application/JSON',
          'Content-Type':'application/x-www-form-urlencoded'  
        }
      }).then(data=>{
        data.json().then(imagepublish =>{
          uploadImage(imagepublish.secure_url,imagepublish.public_id)
        })
      })
    })
  }

/****PUBLICAR VIDEO EN FACEBOOK**/
function publicVideoPostFanpage(){
     if(checkCookie('page_selected')=="noselected"){
        flash("<h6>Tienes que elegir una Fan Page para publicar</h6>","warning");
        return;
    };
    let img   = document.getElementsByClassName('divimage')[object.Images.keyimages].childNodes[0].src;
    let video = document.getElementById('sourceaudiowebm').src;
    var content = `<h5>¿Esta seguro de publicar un video con esta imagen en tu Fanpage?</h5>
    <button type="button" id="yespublivideo"><i class="fas fa-thumbs-up"></i> Si</button><button id="nopublivideo" type="button"><i class="far fa-thumbs-down"></i> No</button>
    <img src=${img} style="widt:100%;margin:20px;">
    `;
    showModal(content);

    document.getElementById("nopublivideo").addEventListener("click",()=>{
       document.getElementById("emerg").style.display="none";
       return;
    })
    document.getElementById("yespublivideo").addEventListener("click",()=>{
      document.getElementById("emerg").style.display="none";
      document.getElementsByClassName("boxquestion")[0].style.background="transparent";
      var content = `<h1 class="h1download">Publicando video en Fan Page ${checkCookie('fanpagename')}.......</h1>`;
      showModal(content);
      if(img.search("id")!=-1){
        img = img.split("?")[0];
      }
      fetch(`http://localhost/scrapperTrooll/Facebook/publishVideoFanPage`,{
        method:"POST",
        body:"image="+img+"&namefanpage="+checkCookie('fanpagename')+"&video="+video+"&token="+checkCookie('token_page')+"&idpage="+checkCookie('page_id')+"&idFanpage="+checkCookie('idfanpageapi')+"&keyfanpage="+checkCookie('keyfanpage'),
        headers:{
          'Accept':'application/JSON',
          'Content-Type':'application/x-www-form-urlencoded'  
        }
      }).then(data=>{
        data.json().then(videopublish =>{
            if(!videopublish){
                 flash("<h6><i class='fas fa-check'></i>Tu token de facebook ha expirado inicia de nuevo sesion con facebook</h6>","Error");
            }else{
                  flash("<h6><i class='fas fa-check'></i> Video publicado correctamente en "+checkCookie('fanpagename')+"</h6>","flags");
            }
            document.getElementsByClassName("boxquestion")[0].style.background="#fff";
            document.getElementById("emerg").style.display="none";
            return;
        })
      })
    })
}


/********GET CREATE  COOKIE */

function setCookie(name,value) {
    document.cookie = name + "=" + value;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cookiename) {
    var user = getCookie(cookiename);
    if (user != "") {
       return user
    }
}

/***********************************************************FIN DE LAS FUNCIONES DE FACEBOOK API***********************************************************************************/



/*funcion que muestra una ventana modal para crear la fanpage*/
function newFanpage(){
    fetch(`http://localhost/scrapperTrooll/controllermodal/modalNewFanPage`)
    .then(dataModal=>{
      dataModal.json().then(modal=>{
        document.getElementById('parentmodalInsertBlog').style.display="block";
        document.getElementById("modalNewBlog").innerHTML=modal;
      })
    })
}

/*funcion que muestra una ventana modal para crear la fanpage*/
function updateSessionFacebook(){
    fetch(`http://localhost/scrapperTrooll/controllermodal/modalupdateSessionFacebbok`)
    .then(dataModal=>{
      dataModal.json().then(modal=>{
        document.getElementById('parentmodalupdateSession').style.display="block";
        document.getElementById("modalupdatesession").innerHTML=modal;
      })
    })
}

function insertgroupFacebook(){
    fetch(`http://localhost/scrapperTrooll/controllermodal/insertgroupFacebook`)
    .then(dataModal=>{
      dataModal.json().then(modal=>{
        document.getElementById('parentmodalInsertBlog').style.display="block";
        document.getElementById("modalNewBlog").innerHTML=modal;
      })
    })
}

function updateSession(){
     fetch(`http://localhost/scrapperTrooll/Facebook/updateSessionFacebook`,{
        method:"POST",
        body:`datr=${document.getElementById('datr').value}&sb=${document.getElementById('sb').value}&m_pixel=${document.getElementById('m_pixel').value}&_fbp=${document.getElementById('_fbp').value}&locale=${document.getElementById('locale').value}&spin=${document.getElementById('spin').value}&c_user=${document.getElementById('m_pixel').value}&xs=${document.getElementById('xs').value}&fr=${document.getElementById('fr').value}&presence=${document.getElementById('presence').value}&wd=${document.getElementById('locale').value}&x_referer=${document.getElementById('x_referer').value}`,
        headers:{
            'Accept':'application/JSON',
            'Content-Type':'application/x-www-form-urlencoded'  
        }
    })
    .then(data=>{
      data.json().then(res=>{
        document.getElementById('parentmodalupdateSession').style.display="none";
        flash("<h6><i class='fas fa-check'></i> Session Actualizada</h6>","flags");
      })
    })
}

/*funcion para crear la fanpage*/
function crearNewfanpage(){
    document.getElementById("diverror").innerHTML ='';
    if(document.getElementById('namefanpage').value=="" || document.getElementById('idfanpage').value=="" || document.getElementById('secretkey').value=="" || document.getElementById('selectblogfanpage').value==""){
        document.getElementById("diverror").innerHTML = "<span class='error'><i class='fas fa-exclamation'></i> Tienes que rellenar todos los campos</span>";
        return;
    }
    fetch(`http://localhost/scrapperTrooll/Facebook/NewFanPage`,{
        method:"POST",
        body:`name=${document.getElementById('namefanpage').value}&id_fanpage=${document.getElementById('idfanpage').value}&key=${document.getElementById('secretkey').value}&blog=${document.getElementById('selectblogfanpage').value}`,
        headers:{
            'Accept':'application/JSON',
            'Content-Type':'application/x-www-form-urlencoded'  
        }
    })
    .then(data=>{
      data.json().then(res=>{
        document.getElementById('parentmodalInsertBlog').style.display="none";
        flash("<h6><i class='fas fa-check'></i> Blog creado correctamente</h6>","flags");
        get_all_fan_pages();
      })
    })
}

function crearNewGroup(){
    document.getElementById("diverror").innerHTML ='';
    if(document.getElementById('groupname').value=="" || document.getElementById('idgroup').value=="" || document.getElementById('selectblogfanpage').value==""){
        document.getElementById("diverror").innerHTML = "<span class='error'><i class='fas fa-exclamation'></i> Tienes que rellenar todos los campos</span>";
        return;
    }
    fetch(`http://localhost/scrapperTrooll/Facebook/NewGroup`,{
        method:"POST",
        body:`name=${document.getElementById('groupname').value}&id_group=${document.getElementById('idgroup').value}&blog=${document.getElementById('selectblogfanpage').value}`,
        headers:{
            'Accept':'application/JSON',
            'Content-Type':'application/x-www-form-urlencoded'  
        }
    })
    .then(data=>{
      data.json().then(res=>{
        document.getElementById('parentmodalInsertBlog').style.display="none";
        flash("<h6><i class='fas fa-check'></i> Blog creado correctamente</h6>","flags");
        get_all_fan_pages();
      })
    })
}

/*funcion para obtener todas las fanpages*/
function get_all_fan_pages(){
    fetch(`http://localhost/scrapperTrooll/Facebook/getAll`)
    .then(data=>{
      data.json().then(res=>{
        makeheadtable(res);
        makeViewMyFanpages(res);
      })
    })
}

//funcion para las tabs youtube e imagenes**/
function openTab(divclass){
    if(divclass=="contentTabsyoutube"){
        document.getElementsByClassName('contentTabsimg')[0].style.display ="none";
        document.getElementsByClassName(divclass)[0].style.display ="block";
        document.getElementsByClassName('puyou')[0].style.background ="#575759";
        document.getElementsByClassName('puyou')[0].style.color ="#c9c9c9";
        document.getElementsByClassName('puimg')[0].style.background ="#e6e6e6";
        document.getElementsByClassName('puimg')[0].style.color ="#212529";
    }else{
        document.getElementsByClassName('contentTabsyoutube')[0].style.display ="none";
        document.getElementsByClassName(divclass)[0].style.display ="block";
        document.getElementsByClassName('puimg')[0].style.background ="#575759";
        document.getElementsByClassName('puimg')[0].style.color ="#c9c9c9";
        document.getElementsByClassName("puyou")[0].style.background ="#e6e6e6";
        document.getElementsByClassName("puyou")[0].style.color ="#212529";
    }
}
function flash(content,addclass){
    var divparent = document.createElement("div");
    divparent.setAttribute("class", "parentdivwarning");
    var div = document.createElement("div");
    div.setAttribute("class", "row");
    var divchild = document.createElement("div");
    divchild.setAttribute("class", "col-md-9");
    div.appendChild(divchild);
    var divchild2 = document.createElement("div");
    divchild2.setAttribute("class", "col-md-2 divwarning "+ addclass);
    divchild2.innerHTML = content;
    div.appendChild(divchild2);
    divparent.appendChild(div);
    document.body.appendChild(divparent);
    setTimeout(function(){ document.getElementsByClassName("parentdivwarning")[0].remove()}, 10000);
}
 /*funcion para actualizar datos de la fan page*/
function changeInput(id,idfanpage){
        document.getElementById(`divnewname${id}`).style.display  = "block";
        document.getElementById(`divnewkey${id}`).style.display   = "block";
        document.getElementById(`divnewid${id}`).style.display    = "block";
        document.getElementById(`finger${id}`).style.display      = "block";
        document.getElementById(`currentname${id}`).style.display = "none";
        document.getElementById(`currentkey${id}`).style.display  = "none";
        document.getElementById(`currentid${id}`).style.display   = "none";
        document.getElementById(`update${id}`).style.display      = "none";
        document.getElementById(`finger${id}`).addEventListener('click',()=>{

            fetch(`http://localhost/scrapperTrooll/Facebook/updateFanpage`,{
              method:"POST",
              body:`idfanpage=${idfanpage}&new_name=${document.getElementById("newname"+id).value}&newid=${document.getElementById("newid"+id).value}&newkey=${document.getElementById("newkey"+id).value}`,
              headers:{
                'Accept':'application/JSON',
                'Content-Type':'application/x-www-form-urlencoded'  
              }
            })
            .then(dataupdate =>{
                dataupdate.json().then(data=>{
                    document.getElementById(`divnewname${id}`).style.display  = "none";
                    document.getElementById(`divnewkey${id}`).style.display   = "none";
                    document.getElementById(`divnewid${id}`).style.display    = "none";
                    document.getElementById(`finger${id}`).style.display      = "none";
                    document.getElementById(`currentname${id}`).style.display = "block";
                    document.getElementById(`currentkey${id}`).style.display  = "block";
                    document.getElementById(`currentid${id}`).style.display   = "block";
                    document.getElementById(`update${id}`).style.display      = "block";
                    this.flash("<h6><i class='fas fa-check'></i> Datos actualizados correctamente</h6>","flags");
                    makeheadtable(data);
                    this.get_all_fan_pages();
                })
            })
        })

    }

  /*Funcion para borrar fan page*/
  function deletefanpage(id,name){
    var content = `<h5>¿Esta seguro de querer borrar esta Fan Page <span class="titledeletefanpage"> "${name}" </span>?</h5>
    <button type="button" id="yesdelete"><i class="fas fa-thumbs-up"></i> Si</button><button id="nodelete" type="button"><i class="far fa-thumbs-down"></i> No</button>`;
    showModal(content);
    document.getElementById("nodelete").addEventListener("click",()=>{
       document.getElementById("emerg").style.display="none";
       return;
    })
    document.getElementById("yesdelete").addEventListener("click",()=>{
      document.getElementById("emerg").style.display="none";
      fetch(`http://localhost/scrapperTrooll/Facebook/deleteFanpage`,{
        method:"POST",
        body:"id="+id,
        headers:{
          'Accept':'application/JSON',
          'Content-Type':'application/x-www-form-urlencoded'  
        }
      }).then(data=>{
        data.json().then(fanpage=>{
        document.getElementById("datafanpages").innerHTML="";
         this.get_all_fan_pages();
        })
      })
    })
  }
 /*Funcion para crear la vista con la data de los blogs en la ruta mis-blogs*/
function makeViewMyFanpages(data){
    if(data.length<1){
        document.getElementById("datafanpages").innerHTML +=`
            <div class="row">
                <div class="col-md-12 text-center">
                    <h1 class="title-no-fan">No hay Fan Pages</h1>
                </div>
            </div>
        `;
        return
    }
    var total = data.length;
    for(var i in data){
        document.getElementById("datafanpages").innerHTML +=`
        <div class="row">
            <div class="col-md-9 eachrowmisblogs">
                <div class="row rowmis-blogs">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-1 text-center">
                                <span class="selectfanpage" onclick="selectfanpage(${i},${total})" id="selectedfanpage${i}"><i class="far fa-check-circle"></i></span>  
                            </div>
                            <div class="col-md-3">
                                <div class="inputnewname" id="divnewname${i}">
                                    <input type="text" class="form-control" id="newname${i}" value="${data[i].name}">
                                </div>
                                <div class="currentname" id="currentname${i}">${data[i].name}</div>
                            </div>
                            <div class="col-md-3 text-left">
                                <div class="inputnewid" id="divnewid${i}">
                                    <input type="text" class="form-control" id="newid${i}" value="${data[i].id_fanpage}">
                                </div>
                                <div class="currentid" id="currentid${i}">${data[i].id_fanpage}</div>
                            </div>
                            <div class="col-md-3 text-left">
                                <div class="inputnewkey" id="divnewkey${i}">
                                    <input type="text" class="form-control" id="newkey${i}" value="${data[i].key_secret}">
                                </div>
                                <div class="currentkey" id="currentkey${i}">${data[i].key_secret}</div>
                            </div>
                            <div class="col-md-1 text-center">
                                <span class="update" onclick="changeInput(${i},${data[i].ID})" id="update${i}"><i class="fas fa-edit" title="editar"></i></span>
                                <span class="fingerup" id="finger${i}" title="actualizar"><i class="fas fa-thumbs-up"></i></span>   
                            </div>
                             <div class="col-md-1 text-center">
                                <span class="deletefanpage" onclick="deletefanpage(${data[i].ID},'${data[i].name}')" id="deletefanpage${i}"><i class="fas fa-trash" title="borrar fan page"></i></span>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

/****funcion para crear la cabecera de la tabla de datos de las fan pages***/
function makeheadtable(data){
        if(data.length<1) return;
        document.getElementById("datafanpages").innerHTML="";
        document.getElementById("datafanpages").innerHTML+=`
            <div class="row">
                <div class="col-md-6 text-left">
                    <span class="title-table">Mis Fan Pages</span>
                </div>
            </div>
            <div class="row ">
                <div class="col-md-9 parenttabs">
                    <div class="row tabs">
                        <div class="col-md-1 text-center tab">
                            <span>Select</span>
                        </div>
                        <div class="col-md-3 text-center tab">
                            <span>Fan page</span>
                        </div>
                        <div class="col-md-3 text-center tab">
                            <span>Id Fanpage</span>
                        </div>
                         <div class="col-md-3 text-center tab">
                            <span>Key Secret</span>
                        </div>
                        <div class="col-md-1 text-center tab">
                            <span>Editar</span>
                        </div>
                        <div class="col-md-1 text-center tab">
                            <span>Borrar</span>
                        </div>
                    </div>
                </div>
            </div>`;
}

  /*funcion para crear contenido de la ventana modal*/
  function showModal(content){
    document.getElementById("emerg").style.display="block";
    document.getElementById("boxhtml").innerHTML="";
    document.getElementById("boxhtml").innerHTML=content;
    return true;
   }

   /*Funcion para descargar mp3 de youtube*/

   function getSrcyoutube(){
    if( document.getElementById("titleYoutube").value==""){
        return;
    }
    document.getElementById('boxhtml').classList.add('boxquestion');      
    document.getElementsByClassName("boxquestion")[0].style.background="#fff";
    var content = `<h5>¿Descargar audio mp3 o video mp4?</h5>
    <button type="button" id="mp3" onclick="downloadSrcYoutube('mp3')"><i class="fas fa-file-audio"></i> Audio MP3</button><button id="mp4" type="button" onclick="downloadSrcYoutube('mp4')"><i class="far fa-file-video"></i> Video MP4</button>`;
    showModal(content);
   }

   function downloadSrcYoutube(type){
         var pathaudio = 'http://localhost/scrapperTrooll/application/controllers/videos/';
         var content = `<h1 class="h1download">Descargando ${type} de Youtube.......</h1>`;
         document.getElementsByClassName("boxquestion")[0].style.background="transparent";
         showModal(content);
         fetch(`http://localhost/scrapperTrooll/Facebook/downloadyoutube`,{
            method:"POST",
            body:"urlyoutube="+document.getElementById("titleYoutube").value+"&type="+type,
            headers:{
              'Accept':'application/JSON',
              'Content-Type':'application/x-www-form-urlencoded'  
            }
          }).then(data=>{
            data.json().then(audio=>{
                if(!audio){
                    flash("<h6>No se ha podido descargar el audio intentalo en unos minutos</h6>","warning");
                    document.getElementById("emerg").style.display="none";
                    document.getElementById('boxhtml').classList.remove('boxquestion');
                    return;
                }
                document.getElementById("emerg").style.display="none";
                document.getElementById('boxhtml').classList.remove('boxquestion');
                if(type =="mp3"){
                     document.getElementById('rowaudio').innerHTML=`
                     <div class="col-md-2 text-left">
                     <span class="back" onclick="backyoutube('${pathaudio+audio}')"><i class="fas fa-arrow-circle-left"></i> Volver</span>
                     </div>
                     <div class="col-md-4 text-left">
                     <span class="img-defecto"><i class="fas fa-images"></i> Usar imagen por defecto</span> <span class="img-own" onclick="formImagesVideo()"><i class="far fa-images"></i> Scrapear imagen</span>
                     </div>
                     <div class="col-md-3 text-left">
                      <audio controls id="idaudio">
                       <!-- <source id="sourceaudio" src="" type="audio/mpeg">-->
                        <source id="sourceaudiowebm" src="" type="audio/webm">
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                     <div class="col-md-2 text-left">
                      <i class="fas fa-trash deleteaudio" title="borrar audio" onclick="deleteaudio('${pathaudio+audio}')"></i>
                     </div>
                    <div class="col-md-12" id="boxmyotherimagesvideoform">
                    </div>
                    <div class="col-md-12" id="boxmyotherimagesvideo">
                   </div>
                    `;
                    document.getElementById('sourceaudiowebm').src=pathaudio+audio;

                }else if(type =="mp4"){
                    document.getElementById('rowaudio').innerHTML=`
                     <div class="col-md-2 text-left">
                     <span class="back" onclick="backyoutube('${pathaudio+audio}')"><i class="fas fa-arrow-circle-left"></i> Volver</span>
                     </div>
                     <div class="col-md-3 text-left">
                     <span class="img-defecto" onclick="public-video('${pathaudio+audio}')"><i class="fas fa-paper-plane"></i> Publicar video</span>
                     </div>
                     <div class="col-md-3 text-left">
                      <video width="320" height="240" controls>
                          <source id="sourceaudiovideo" src="" type="video/mp4">
                          <!--<source src="" type="video/ogg">-->
                          Your browser does not support the video tag.
                    </video>
                    </div>
                     <div class="col-md-2 text-left">
                      <i class="fas fa-trash deleteaudio" title="borrar audio" onclick="deleteaudio('${pathaudio+audio}')"></i>
                     </div>`;
                    document.getElementById('sourceaudiovideo').src=pathaudio+audio;
                }
                document.getElementsByClassName('form-dowload-youtube')[0].style.display="none";
                document.getElementById('contentyoutube').innerHTML="";
            })
        })

   }

   function formImagesVideo(){
      document.getElementById('boxhtml').classList.add('boxquestion');
    document.getElementById('boxmyotherimagesvideoform').innerHTML=`
        <div class="row">
            <div class="col-md-6">
                <input class="form-control inputtab" type="text" placeholder="Inserta el nombre de la imagen a escrapear" id="nameimgforfusion">
            </div>
            <div class="col-md-6 text-left">
                <button type="button" class="buttontab" onclick="object.Images.imgFanpage('boxmyotherimagesvideo','donwloadImagesFanpage()','nameimgforfusion','publicvideofan')"><i class="fas fa-camera-retro"></i> Escrapear Imagen</button>
            </div>
        </div>`;

    }

   /***funcion para volver hacia atras***/
   function backyoutube(src){
    document.getElementsByClassName('form-dowload-youtube')[0].style.display="flex";
    deleteaudio(src);
   }

   /*Funcion para borrar audio descargado de youtube*/

   function deleteaudio(src){
    fetch(`http://localhost/scrapperTrooll/Facebook/removeDownLoadYoutube`,{
        method:"POST",
        body:"src="+src,
        headers:{
          'Accept':'application/JSON',
          'Content-Type':'application/x-www-form-urlencoded'  
        }
      }).then(data=>{
            data.json().then(data=>{
                document.getElementById('rowaudio').innerHTML=``;
                document.getElementsByClassName('form-dowload-youtube')[0].style.display="flex";
            })
        })
   }

    get_all_fan_pages();
    var finished_rendering = function() {
    console.log("finished rendering plugins");
    var spinner = document.getElementById("spinner");
    spinner.removeAttribute("style");
    spinner.removeChild(spinner.childNodes[0]);
}
