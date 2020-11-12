class images extends general{
    constructor(url,images=null){
       super();
       this.moretextCount       = [];
       this.url                 = url;
       this.values              = [];
       this.margintop           = [];
       this.posinitial          = [];
       this.imagesSelected      = [];
       this.keyimages           = 0;
       this.display             = [];
       this.displayother        = [];
       this.otherimages         = false;
       this.images;
       this.time                = Date.now();
       this.numbertext          = [];
       this.display             = [];
       this.imagesOtherSelected = [];
       this.buttonDisplay       = '';
       this.box                 = 'boxmyotherimages';
    }

    /************** function for images *************/
     /**Funcion para seleccionar la imagen que vamos a recoger para mostrar en el post*/
  selectImg(id,selectimages,number){
      var brand;
      var display;
      if(this.otherimages){  brand = 'buttondownloadImgother'; this.displayother[number]=!this.displayother[number];  display = this.displayother[number] };
      if(!this.otherimages){ brand = 'buttondownloadImg'; this.display[number]=!this.display[number];  display = this.display[number] };
      this.selectAndBrandImages(id,selectimages,number,brand,display);
  }
  selectAndBrandImages(id,selectimages,number,brand,display){
     if(display){
        document.getElementById(selectimages+number).style.display = "none";
        var display = document.getElementById(id+number);
        display.style.border  = "none";
        display.style.opacity = "1";
        var parent = document.getElementById(id+number).parentNode;
        if(this.otherimages){
           if(this.imagesOtherSelected.includes(display.src)){
              this.imagesOtherSelected.splice(this.imagesOtherSelected.indexOf(display.src),1);
            }else{
               document.getElementById(selectimages+number).style.display = "block";
              display.style.border  = "2px solid #4e5c4f";
              display.style.opacity = "0.5";
              var parent = document.getElementById(id+number).parentNode;
              if(!this.imagesOtherSelected.includes(display.src)){
                  this.imagesOtherSelected.push(display.src);
              }
            }
        }else{
            if(this.imagesSelected.includes(display.src)){
              this.imagesSelected.splice(this.imagesSelected.indexOf(display.src),1);
            }else{
               document.getElementById(selectimages+number).style.display = "block";
              display.style.border  = "2px solid #4e5c4f";
              display.style.opacity = "0.5";
              var parent = document.getElementById(id+number).parentNode;
              if(!this.imagesSelected.includes(display.src)){
                  this.imagesSelected.push(display.src);
              }
            }
        }
      }
      var count = 0;
      if(this.otherimages){  count = this.imagesOtherSelected.length;}
      if(!this.otherimages){ count = this.imagesSelected.length;}

      if(count>0){
        document.getElementById(brand).disabled=false;
        document.getElementById(brand).style.opacity='1';
      }else{
        document.getElementById(brand).disabled=true;
        document.getElementById(brand).style.cursor='not-alloweb'
        document.getElementById(brand).style.opacity='0.5';
      }
  }

  /*Funion para descargar las imagenes para fanpage*/
  donwloadImagesFanpage(buttonimages = false){
    document.getElementsByClassName("boxquestion")[0].style.background="transparent"
      var content = `<h1 class="h1download">DESCARGANDO IMAGENES.......</h1>`;
      this.showModal(content);
      fetch(`${this.url}scrapperimg/downloadImagesForEdit`,{
      method:"POST",
      body:JSON.stringify({img:this.imagesOtherSelected}),
      headers:{
        'Accept':'application/JSON',
        'Content-Type':'application/x-www-form-urlencoded'  
      }
    }).then(data=>{
      data.json().then(images=>{                                            
        document.getElementById("emerg").style.display="none";
        document.getElementsByClassName("boxquestion")[0].style.background="#f7f7f7"
        this.initImages(images);
        document.getElementById(this.box).style.display="none";
        this.otherimages = false;
        document.getElementById("makeimages").innerHTML=images.view;
        this.createButton(buttonimages);
      })
    })
  }

  createButton(buttonimages){
    var onclickE;
    var title;
    if(buttonimages){
      onclickE = 'publicPostFanpage()';
      title    = 'Publicar Imgen';
    }else{
      onclickE = 'publicVideoPostFanpage()';
      title    = 'Publicar Video';
    }
    document.getElementsByClassName("buttonback")[0].remove();
    document.getElementsByClassName("buttonsave")[0].remove();
    var buttonFacebook = document.createElement("BUTTON");
    buttonFacebook.classList.add('publicvideofan');
    buttonFacebook.setAttribute("onclick",onclickE);
    buttonFacebook.innerHTML ='<i class="fab fa-facebook"></i> '+ title;
    document.getElementsByClassName('divButtonsImages')[0].children[1].appendChild(buttonFacebook);
  }
  /*funcion para descargar las imagenes que hemos seleecinado*/
  downloadImages(){
      document.getElementsByClassName("boxquestion")[0].style.background="transparent"
      var content = `<h1 class="h1download">DESCARGANDO IMAGENES.......</h1>`;
      let arrayImages = this.imagesSelected.concat(this.imagesOtherSelected);
      this.showModal(content);
      
      fetch(`${this.url}scrapperimg/downloadImagesForEdit`,{
      method:"POST",
      body:JSON.stringify({img:arrayImages}),
      headers:{
        'Accept':'application/JSON',
        'Content-Type':'application/x-www-form-urlencoded'  
      }
    }).then(data=>{
      data.json().then(images=>{
        document.getElementsByClassName("secondform")[0].style.display="none";
        document.getElementsByClassName("div-button")[0].style.display="none";                                               
        document.getElementById("emerg").style.display="none";
        document.getElementsByClassName("boxquestion")[0].style.background="#f7f7f7"
        document.getElementsByClassName("text-right")[0].classList.add("col-md-12");
        this.initImages(images);
        document.getElementsByClassName('contentScrapper')[1].classList.remove("contentScrapper");
        document.getElementById("contentScrapperimg").style.display="none";
        document.getElementById("contentotherimages").style.display="none";
        this.otherimages = false;
        document.getElementById("makeimages").innerHTML=images.view;
      })
    })
  }

  /*Funcion para inicializar las imagenes para poder editarlas*/

  initImages(images){
    this.images=images.imagenes;
       for(var i =0;i<this.images.length;i++){
         this.margintop[i]     = 0;
         this.posinitial[i]    = 0;
         this.moretextCount[i] = 1;
         this.values[i]        = [{"valuetext":"","valuesize":"","valuecolor":"","valueheight":"","valueposition":"","valueangletext":"","valueleftright":"","valueupdown":"","valueselect-font":""}]
      }
  }
  /*funcion para sleecionar otras imagenes mediante un formulario*/
  selectOtherImages(){
        document.getElementById("contentScrapperimg").style.display="none";
        document.getElementById("contentotherimages").style.display="block";
         this.otherimages = true;
        document.getElementById("back").addEventListener("click",()=>{
          this.otherimages = false;
          document.getElementById("contentScrapperimg").classList.add("contentScrapper"); 
          document.getElementById("contentScrapperimg").style.display="block";
          document.getElementById("contentotherimages").style.display="none";
        })
        document.getElementById("getimages").addEventListener("click",()=>{
           document.getElementsByClassName("boxquestion")[0].style.background="transparent";
           var content = `<h1 class="h1download">DESCARGANDO IMAGENES.......</h1>`;
          this.showModal(content);
          document.getElementById("boxmyotherimages").innerHTML="";
          this.download("downloadImages()","nameimg");
       })
    }

    /*funcion para escrapear imagenes para fan page*/
    imgFanpage(box='boxmyotherimages',downloadfunction = 'donwloadImagesFanpage("images")', idData = 'nameimg', buttonDisplay = "publicphotofan"){
      this.buttonDisplay = buttonDisplay;
      this.otherimages = true;
      this.box = box;
      document.getElementsByClassName("boxquestion")[0].style.background="transparent";
       var content = `<h1 class="h1download">DESCARGANDO IMAGENES.......</h1>`;
      this.showModal(content);
      document.getElementById(this.box).innerHTML="";
      document.getElementById(this.box).style.display="block";
      document.getElementById("makeimages").innerHTML="";
      this.download(downloadfunction,idData);

    }
    /****funcion para escrapear imagenes para fanpage y para otherimages***/
    download(funtionname = 'downloadImages()',iDdata){
      if(document.getElementById(iDdata).value=="") return;
      fetch(`${this.url}scrapper/getotherimages`,{
            method:"POST",
            body:"titleimage="+document.getElementById(iDdata).value,
            headers:{
              'Accept':'application/JSON',
              'Content-Type':'application/x-www-form-urlencoded'  
            }
            }).then(data=>{
                data.json().then(images=>{
                  document.getElementById("emerg").style.display="none";
                  var divother =  document.getElementById(this.box);
                   divother.innerHTML=images.img;
                    divother.innerHTML+=`<div class="row">
                    <div class='col-md-12 text-center'>
                    <button type='button' class='buttonimages' onclick='object.Images.${funtionname}' id='buttondownloadImgother' disabled><i class='fas fa-file-image'></i> Descargar imagenes</button>
                  </div>
                  </div>`
               })
            })
    }
  /**funcion para cambiar imagen para editarla**/
  changeImage(src,id,totalimages){
    this.keyimages = id;
    for(var i=0;i<parseInt(totalimages)-1;i++){
      if(id == i){
        document.getElementById("divimg"+id).classList.add("selectimg");
      }else{
        document.getElementById("divimg"+i).classList.remove("selectimg");
      }
    }
    document.getElementById("imageneshow"+id).src=src;
    this.makeImg();
    this.showformImage(id)
  }
  /**funcion para mostrar el formulario de la imagen**/
  showformImage(id){
    for(var i=0; i<this.images.length;i++){
        if("form"+id=="form"+i){
          document.getElementById("form"+i).classList.add("showform");
        }else{
           document.getElementById("form"+i).classList.remove("showform");
        }
    }
  }
  /*funcion para borrar la imagen**/
  deleteImageselected(src){
    if(document.getElementsByClassName("parentdivimg").length==1) return this.flash("<h6><i class='fas fa-exclamation'></i> No puedes borrar todas las imagenes, necesitas al menos una</h6>","warning");
    var content = `<h5>¿Esta seguro de querer borrar esta imagen?</h5>
    <button type="button" id="yesdelete"><i class="fas fa-thumbs-up"></i> Si</button><button id="nodelete" type="button"><i class="far fa-thumbs-down"></i> No</button>`;
    this.showModal(content);
    document.getElementById("nodelete").addEventListener("click",()=>{
       document.getElementById("emerg").style.display="none";
       return;
    })
    document.getElementById("yesdelete").addEventListener("click",()=>{
      document.getElementById("emerg").style.display="none";
      document.getElementById("makeimages").style.display="none";
      document.getElementById("makeimages").innerHTML="";
      fetch(`${this.url}scrapperimg/removeimage`,{
        method:"POST",
        body:"src="+src,
        headers:{
          'Accept':'application/JSON',
          'Content-Type':'application/x-www-form-urlencoded'  
        }
      }).then(data=>{
        data.json().then(images=>{
          document.getElementById("makeimages").style.display="block";
          document.getElementById("makeimages").innerHTML=images;
        })
      })
    })
  }
  selectFont(keyimg,id){
    var randomId = Math.floor(Math.random() * 10000);
    var valueimg = document.getElementById("optionfont"+document.getElementById('select-font'+keyimg+'img'+id).selectedIndex).innerHTML;
    document.getElementById('img-show-font'+keyimg+'img'+id).src=this.url+'CDN/imagenes/images-font/'+valueimg+'.png?id='+randomId;
    this.makeImg();
  }
  /*Funcion para remover todos los cambios echos de la imagen*/
  deleteAllchanges(){
   
    var content = `<h5>¿Esta seguro de querer remover todos los cambios echos de esta imagen?</h5>
    <button type="button" id="yesremove"><i class="fas fa-thumbs-up"></i> Si</button><button id="noderemove" type="button"><i class="far fa-thumbs-down"></i> No</button>
    <img src=${document.getElementById(`imageneshow${this.keyimages}`).src} style="widt:100%;margin:20px;">
    `;
    this.showModal(content);

    document.getElementById("noderemove").addEventListener("click",()=>{
       document.getElementById("emerg").style.display="none";
       return;
    })
    document.getElementById("yesremove").addEventListener("click",()=>{
      let img = document.getElementById("imageneshow"+this.keyimages).src;
      for(i=1;i<=this.values[this.keyimages].length;i++){
        this.values[this.keyimages][0] = [{"valuetext":"","valuesize":"","valuecolor":"","valueheight":"","valueposition":"","valueangletext":"","valueleftright":"","valueupdown":"","valueselect-font":""}]
         var arrayValuesStandar = [
          {key:`text${i}img${this.keyimages}`,    value:""},
          {key:`color${i}img${this.keyimages}`,   value:"#000000"},
          {key:`align${i}img${this.keyimages}`,   value:""},
          {key:`position${i}img${this.keyimages}`,value:""},
          {key:`angle${i}img${this.keyimages}`,   value:""},
          {key:`up${i}img${this.keyimages}`,      value:""},
          {key:`select-font${i}img${this.keyimages}`,value:"7pixelsofperfection.ttf"},
          {key:`filterimg${this.keyimages}`,      value:0},
          {key:`opacityimg${this.keyimages}`,     value:100},
          {key:`blurimg${this.keyimages}`,        value:0},
          {key:`brilloimg${this.keyimages}`,      value:0},
          {key:`rojoimg${this.keyimages}`,        value:0},
          {key:`azulimg${this.keyimages}`, value:0},
          {key:`verdeimg${this.keyimages}`,       value:0},
          {key:`contrastimg${this.keyimages}`,    value:0},
          {key:`flipimg${this.keyimages}`,        value:0},
          {key:`invertimg${this.keyimages}`,        value:0},
          {key:`pixelarimg${this.keyimages}`, value:0},
          {key:`rotateimg${this.keyimages}`,       value:0},
          {key:`afinarimg${this.keyimages}`,      value:0}
        ]
      }

      for(var v in  arrayValuesStandar ){
        document.getElementById(arrayValuesStandar[v].key).value = arrayValuesStandar[v].value;
      }

      for(var i=this.moretextCount[this.keyimages];i>1;i--){
        this.removeNodetext(i);
      }
      if(img.search("id")!=-1){
        img = img.split("?")[0];
      }
      let idimage =  Math.round(Math.random()*100000000);
      document.getElementById("emerg").style.display="none";
      fetch(`${this.url}scrapperimg/removeAllchanges`,{
        method:"POST",
        body:"image="+img,
        headers:{
          'Accept':'application/JSON',
          'Content-Type':'application/x-www-form-urlencoded'  
        }
      }).then(data=>{
        data.json().then(images=>{
          document.getElementById(`imageneshow${ this.keyimages}`).src=`http://localhost/scrapperTrooll/application/controllers/${images}?id=${idimage}`;
        })
      })
    })
  }
  /*Funcion para añadir mas texto a la imagen**/
  addMoretext(number,idimg){
     if(number+1>=10 || !this.doesLetPushevery())  return;
     this.getvalues(); 
     this.animationTop("add");
     var html = this.teemplateAddtext(number+1);
     document.getElementById(`parenttextnode${this.keyimages}`).innerHTML+=html;
     this.cloneElement(number+1,this.keyimages);
     this.moretextCount[idimg]++; 
     this.insertValues(number);
  }
  /*funciopn para borrar texto de la imagen **/
  removeNodetext(id){
    this.values[this.keyimages].splice(id-1,1);
    if(document.getElementById(`text${id}img${this.keyimages}`).value.length>0){
      return this.flash("<h6><i class='fas fa-exclamation'></i> Borra todo el texto de este elemento para poder borrarlo</h6>","warning");
    }
    this.animationTop("rest");
    document.getElementById(`divtext${id}img${this.keyimages}`).remove();
    this.moretextCount[this.keyimages]--;
    var parent = document.getElementById('parenttextnode'+this.keyimages).childNodes;
    var number = 1;
    for(var i in parent){ 
      if(parent[i].id){
        document.getElementById(parent[i].id).id=`divtext${number}img${this.keyimages}`;
         document.getElementById(parent[i].id).id=`divtext${number}img${this.keyimages}`;
         var parentd = document.querySelectorAll(`#divtext${number}img${this.keyimages}`);
         for(var c in parentd[0].children){
            if(parentd[0].children[c].children){
              for(var bis in parentd[0].children[c].children){
                if(parentd[0].children[c].children[bis].children){
                  for(var d in parentd[0].children[c].children[bis].children){
                    if(parentd[0].children[c].children[bis].children[d].onclick){
                      if(parentd[0].children[c].children[bis].children[d].id=="removetext"){
                         parentd[0].children[c].children[bis].children[d].removeAttribute("onclick");
                          parentd[0].children[c].children[bis].children[d].setAttribute('onclick',`object.Images.removeNodetext(${number})`)
                      }
                    }else{
                      if(parentd[0].children[c].children[bis].children[d].id){
                          parentd[0].children[c].children[bis].children[d].id = parentd[0].children[c].children[bis].children[d].id.replace(/[0-9]/,number);
                      }
                    }
                  }
                }
              }
            }
          }
        number ++;
      }
     }
   }
   /*funcion para crear la imagen el texto color etc*/
   makeImg(){
    this.getvalues();
    var valuestext    = [];
    var anotherVlaues = [
    "opacityimg"+this.keyimages,
    "blurimg"+this.keyimages,
    "brilloimg"+this.keyimages,
    "rojoimg"+this.keyimages,
    "verdeimg"+this.keyimages,
    "azulimg"+this.keyimages,
    "contrastimg"+this.keyimages,
    "flipimg"+this.keyimages,
    "invertimg"+this.keyimages,
    "pixelarimg"+this.keyimages,
    "rotateimg"+this.keyimages,
    "afinarimg"+this.keyimages,
    "filterimg"+this.keyimages,
    "keyimg"];
    for(var v=1;v<=this.moretextCount[this.keyimages];v++){
      valuestext.push("text"+v+"img"+this.keyimages,"size"+v+"img"+this.keyimages,"up"+v+"img"+this.keyimages,"down"+v+"img"+this.keyimages,
        "align"+v+"img"+this.keyimages,"color"+v+"img"+this.keyimages,"position"+v+"img"+this.keyimages,"angle"+v+"img"+this.keyimages,"select-font"+v+"img"+this.keyimages);
    }
   var allValues = valuestext.concat(anotherVlaues);
   var url       = "";
   for(var i=0;i<allValues.length;i++){
        if(i==0){
            url+=allValues[i]+"="+document.getElementById(allValues[i]).value;
        }else{
            if(allValues[i]=="keyimg"){
              url+="&"+allValues[i]+"="+this.keyimages;
            }else{
              url+="&"+allValues[i]+"="+document.getElementById(allValues[i]).value;
            }
        }
    }
    let img = document.getElementById("imageneshow"+this.keyimages).src;
    if(img.search("id")!=-1){
      img = img.split("?")[0];
    }
    url+="&numberTextValues="+this.moretextCount[this.keyimages];
    url+="&image="+img;
    let idimage =  Math.round(Math.random()*100000000);
    fetch(`${this.url}scrapperimg/textimagen`,{
        method:"POST",
        body:url,
        headers:{
        'Accept':'application/JSON',
        'Content-Type':'application/x-www-form-urlencoded'  
        }
    }).then(data=>{
        data.json().then(dat=>{
             document.getElementById('imageneshow'+this.keyimages).src=`http://localhost/scrapperTrooll/application/controllers/imgmade/${dat.img}?id=${idimage}`;
        })
    })
   }
   /*cada vez que se ejecute un valor en los campos del texto los recogemos*/
   getvalues(){
    for(var i =0;i<this.moretextCount[this.keyimages];i++){
       this.values[this.keyimages][i]  = {
         "valuetext":document.getElementById(`text${i+1}img${this.keyimages}`).value,
         "valuesize":document.getElementById(`size${i+1}img${this.keyimages}`).value,
         "valuecolor":document.getElementById(`color${i+1}img${this.keyimages}`).value,
         "valueheight":document.getElementById(`align${i+1}img${this.keyimages}`).value,
         "valueposition":document.getElementById(`position${i+1}img${this.keyimages}`).value,
         "valueangletext":document.getElementById(`angle${i+1}img${this.keyimages}`).value,
         "valueleftright":document.getElementById(`up${i+1}img${this.keyimages}`).value,
         "valueupdown":document.getElementById(`down${i+1}img${this.keyimages}`).value,
         "valueselect-font":document.getElementById(`select-font${i+1}img${this.keyimages}`).value
       }
    }
   }
   /*cada vez que creemos un texto nuevo insertamos los valores correspondientes en los campos*/
   insertValues(bucle){
    for(var i=0;i<bucle;i++){
      if(this.values[this.keyimages][i]["valuetext"].value!=""){
        document.getElementById(`text${i+1}img${this.keyimages}`).value     = this.values[this.keyimages][i]["valuetext"];
      }
      if(this.values[this.keyimages][i]["valuesize"].value!=""){
         document.getElementById(`size${i+1}img${this.keyimages}`).value    = this.values[this.keyimages][i]["valuesize"];
      }
      if(this.values[this.keyimages][i]["valuecolor"].value!=""){
        document.getElementById(`color${i+1}img${this.keyimages}`).value    = this.values[this.keyimages][i]["valuecolor"];
      }
      if(this.values[this.keyimages][i]["valueheight"].value!=""){
        document.getElementById(`align${i+1}img${this.keyimages}`).value    = this.values[this.keyimages][i]["valueheight"];
      }
      if(this.values[this.keyimages][i]["valueposition"].value!=""){
        document.getElementById(`position${i+1}img${this.keyimages}`).value = this.values[this.keyimages][i]["valueposition"];
      }
      if(this.values[this.keyimages][i]["valueangletext"].value!=""){
        document.getElementById(`angle${i+1}img${this.keyimages}`).value    = this.values[this.keyimages][i]["valueangletext"];
      }
      if(this.values[this.keyimages][i]["valueleftright"].value!=""){
        document.getElementById(`up${i+1}img${this.keyimages}`).value       = this.values[this.keyimages][i]["valueleftright"];
      }
      if(this.values[this.keyimages][i]["valueupdown"].value!=""){
        document.getElementById(`down${i+1}img${this.keyimages}`).value     = this.values[this.keyimages][i]["valueupdown"];
      }
      if(this.values[this.keyimages][i]["valueselect-font"].value!=""){
        document.getElementById(`select-font${i+1}img${this.keyimages}`).value     = this.values[this.keyimages][i]["select-font"];
      }
        
    }

   }
   /**funcion para la animacion de arriba abajo de la imagen**/
   animationTop(type){
    if(type=="add") this.margintop[this.keyimages] = this.margintop[this.keyimages]+10;
    if(type=="rest")this.margintop[this.keyimages] = this.margintop[this.keyimages]-10;
    var margin  = this.margintop[this.keyimages];
    var pos     = this.posinitial[this.keyimages];
    var opa     = 1;
    var opaci;
    var initial = setInterval(()=>{
      if(pos==this.margintop[this.keyimages]){
        this.posinitial[this.keyimages] = pos;
        clearInterval(initial);
      }else{
        if(type=="add")pos++;
        if(type=="rest")pos--;
        if(opa==9){
          opaci =1;
        }else{
          opa++;
          opaci ="0."+opa;
        }
        document.getElementById("imageneshow"+this.keyimages).style.marginTop= pos+"0px";
        document.getElementById("imageneshow"+this.keyimages).style.opacity  = opaci;
      }
    },38);
   }
   /*funcion para no permitir pulsar un boton seguidamente*/
   doesLetPushevery(){
     if(this.time>Date.now()){
        return false;
     }
       this.time = Date.now()+2000;
       return true;
   }

   /*funcion para crear contenido de la ventana modal*/
   showModal(content){
    document.getElementById("emerg").style.display="block";
    document.getElementById("boxhtml").innerHTML="";
    document.getElementById("boxhtml").innerHTML=content;
    return true;
   }
  /**template para añadir mas texto a la imagen**/
  teemplateAddtext(newnumber){
     var html = `<div class="col-md-12 boxform" id="divtext${newnumber}img${this.keyimages}">
          <div class="row">
            <div class="col-md-12 text-right divinsermoretext"><span title="borrar" class="removeNodetext" id="removetext" onclick="object.Images.removeNodetext(${newnumber})">X</span></div>
            <div class="col-md-4">
              <label class="labelformimg">Inserta el texto</label>
              <input type="text" id="text${newnumber}img${this.keyimages}" placeholder="Insertar texto" class="form-control inputimg" onkeyup="object.Images.makeImg()">
            </div>
            <div class="col-md-4">

              <label class="labelformimg">Inserta el tamaño del texto</label>
              <input type="number" id="size${newnumber}img${this.keyimages}" placeholder="Inserta el tamaño del texto" class="form-control  inputimg" onkeyup="object.Images.makeImg()" onchange="Images.makeImg()">
            </div>
            <div class="col-md-4">
              <label class="labelformimg">Inserta el color del texto</label>
              <input type="color" id="color${newnumber}img${this.keyimages}"  placeholder="isertar color del texto" class="form-control inputimg"  onchange="object.Images.makeImg()">
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <label class="labelformimg">Inserta la altura del texto</label>
              <select id="align${newnumber}img${this.keyimages}" placeholder="isertar altura del texto"  class="form-control inputimg" onchange="object.Images.makeImg()">
                            <option>top</option>
                            <option>bottom</option>
                            <option>middle</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="labelformimg">Inserta la posicion del texto</label>
              <select id="position${newnumber}img${this.keyimages}" placeholder="isertar posicion texto" class="form-control inputimg" onchange="object.Images.makeImg()">
                            <option>center</option>
                            <option>right</option>
                            <option>left</option>
                        </select>
                  </div>
                  <div class="col-md-4">
                     <label class="labelformimg">Inserta el angulo del texto</label>
                        <input type="number" id="angle${newnumber}img${this.keyimages}" placeholder="Inserta el angulo del texto" class="form-control inputimg" onkeyup="object.Images.makeImg()" onchange="Images.makeImg()">
                          </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                        <label class="labelformimg">Derecha izquierda</label>
                        <input type="range" class="form-control inputimg" id="up${newnumber}img${this.keyimages}" min="0" max="500" onchange="object.Images.makeImg()">
                    </div>
                    <div class="col-md-6">
                        <label class="labelformimg">Subir bajar texto</label>
                        <input type="range" class="form-control inputimg" id="down${newnumber}img${this.keyimages}" min="0" max="400" onchange="object.Images.makeImg()">
                    </div>
                </div>
                <div class="row select-font">
                  <div class="col-md-3 div-select-font">
                    <select id="select-font${newnumber}img${this.keyimages}" class="form-control" onchange="object.Images.selectFont(${newnumber},${this.keyimages})">
                    </select>
                  </div>
                  <div class="col-md-9">
                    <img id="img-show-font${newnumber}img${this.keyimages}" class="img-font" src="${this.url}CDN/imagenes/images-font/7pixelsofperfect0.png"/>
                  </div>
                </div>
        </div>`;
        return html;
  }
  cloneElement(newnumber,keyimages){
    fetch(`${this.url}scrapperimg/getDirectory`).then(directories=>{
        directories.json().then(images=>{
          var imagesfont = images.imagesfont;
          var files      = images.filesfont;
          for(var i in images.imagesfont){
              document.getElementById(`select-font${newnumber}img${keyimages}`).innerHTML+=`
              <option value='${images.filesfont[i]}' id='optionfont${i}'>${images.imagesfont[i].slice(0,-4)}</option>
              `;
          }
        })
    })
  }

}
