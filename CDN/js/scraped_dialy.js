class scraped_dialy extends general{
    constructor(url){
    	super();
    	this.url                 = url;
        this.controlDivImages    = 0;
        this.otherimages         = [];
        this.displayOtherImages  = [];
        this.displayNormalImages = [];
        this.imagesOtherSelected = [];
        this.imagesSelected      = [];
        this.content             = [];
        this.recuperarcontent    = [];
        this.contentrecuperado   = [];
        this.values              = [];
        this.margintop           = [];
        this.posinitial          = [];
        this.images              = [];
        this.keyimages           = [];
        this.moretextCount       = [];
        this.contentamazon       = [];
        this.page                = [];
        this.titleSelected       = [];
        this.primerakey;
        this.segundakey;
        this.idimg               =[];
        this.idBlog              =[];
        this.get_all_scraped_dialy();
    }
    get_all_scraped_dialy(){
    	fetch(`${this.url}Scrapper/get_all_scraped_dialy`)
    	.then(response=>{
    		response.json().then(data=>{
                for(var i in data){
                    document.getElementsByClassName('parent_scraped_dialy')[0].innerHTML+=`
                    <div class="row row-each-blog-name">
                        <div class="col-md-12 parent-content-dialy">
                            <div class="row">
                                <div class="col-md-11">
                                </div>
                                <div class="col-md-1">
                                    <div class="holder" title="Ver el contenido escrapeado" id="holder${i}" onclick="object.ScrapedDialy.openToggleOrClose('holder${i}','parent-content-dialy${i}',${data[i].pre_content.length>0})">
                                      <div class="toggle"></div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <span class="blog-scraped-name">
                                                <i class="fas fa-signature icon-daily"></i> Nombre del blog escrapeado :
                                            </span>
                                        </div>
                                        <div class="col-md-4">
                                            <span class="blog-scraped-name">
                                                ${data[i].name_blog_scrapper==null ? '-' : data[i].name_blog_scrapper}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <span class="blog-scraped-name">
                                                <i class="fab fa-blogger icon-daily"></i> URL del blog escrapeado :
                                            </span>
                                        </div>
                                        <div class="col-md-4">
                                            <span class="blog-scraped-name">
                                                ${data[i].url_name_scrapper==null ? '-' : data[i].url_name_scrapper}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <span class="blog-scraped-name">
                                                <i class="fab fa-wordpress icon-daily"></i> Blog Wordpress al que pertenece :
                                            </span>
                                        </div>
                                        <div class="col-md-4">
                                            <span class="blog-scraped-name">
                                                ${data[i].name_blog}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 ${data[i].pre_content.length>0 ? 'content-has-scraped' : '' }">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <span class="blog-scraped-name">
                                                <i class="far fa-flag icon-daily"></i> Contenido Escrapeado :
                                            </span>
                                        </div>
                                        <div class="col-md-7">
                                            <span class="blog-scraped-name">
                                                ${data[i].pre_content.length}
                                            </span>
                                        </div>
                                        <div class="col-md-1 text-center">
                                            ${data[i].pre_content.length>0 ? '<i class="far fa-check-circle i-content-has-scraped"></i>' : '' }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 show-parent-content-dialy" id="parent-content-dialy${i}">
                        </div>
                    </div>
                    `
                    this.idBlog[i]=data[i].ID;
                    for(var p in data[i].pre_content){
                        document.getElementById(`parent-content-dialy${i}`).innerHTML+=`
                            <div class="general-child-content-dialy">
                                <div class="row">
                                    <div class="col-md-11">
                                    </div>
                                    <div class="col-md-1">
                                        <div class="holder" title="Ver el contenido escrapeado" id="holder${i}-pre_content-${p}" onclick="object.ScrapedDialy.openToggleOrCloseAndShow('holder${i}-pre_content-${p}','show-pre_content${i}-${p}')">
                                          <div class="toggle"></div>
                                        </div>
                                         <i class="fas fa-trash remove-pre-content" title="Borrar este precontenido" onclick="object.ScrapedDialy.deletePrecontent(${data[i].pre_content[p].id})"></i>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                       <i class="fas fa-th icon-daily"></i> <span class="blog-scraped-name">Titulo del post :</span>
                                    </div>
                                    <div class="col-md-9">
                                        <span class="blog-scraped-name">${data[i].pre_content[p].title_for_check.trim()}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                       <i class="far fa-clock icon-daily"></i> <span class="blog-scraped-name">Fecha en la que se escrapeó :</span>
                                    </div>
                                    <div class="col-md-3">
                                        <span class="blog-scraped-name">${data[i].pre_content[p].date_scrapped}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 show-pre_content-child" id="show-pre_content${i}-${p}">
                                        <div class="row">
                                            <div class="col-md-8 textacontent" id="textacontent${i}-${p}">
                                                <textarea class="form-control" id="textarea${i}-${p}"></textarea>
                                            </div>
                                            <div class="col-md-8 contentScrapper" id="contentScrapper${i}-${p}">
                                                ${JSON.parse(data[i].pre_content[p].content)}
                                            </div>
                                            <div class="col-md-3 contentScrapper" id="modify-contentScrapper${i}-${p}">
                                               <h5>Modifica el contenido si lo deseas</h5>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="editamano" id="editamano-${i}-${p}" onclick="object.ScrapedDialy.editcontent(${i},${p});"><i class="fas fa-keyboard"></i> Editar contenido a mano</div>
                                                    </div>
                                                    <div class="col-md-12" id="buttonEditamano-${i}-${p}">
                                                        <button type="button" class="buttonsfilter" onclick="object.ScrapedDialy.recuperarall(${i},${p});"><i class="fas fa-arrow-alt-circle-up"></i> Recuperar el contenido</button>
                                                        <button type="button" class="buttonsfilter" onclick="object.ScrapedDialy.done(${i},${p});"><i class="fas fa-check-circle"></i>Echo</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 content-scraperrow" id="content-scrapper-amazon-${i}-${p}">
                                                <div class="row">
                                                    <div class="col-md-12 text-right amazon-content" id="add-product-scrapper-${i}-${p}">
                                                        <div class="row">
                                                            <div class="col-md-8">
                                                                <button class="delete-product-scrapper" id="delete-product-scrapper-${i}-${p}" onclick="object.ScrapedDialy.deleteContentAmazon(${i},${p});">
                                                                  Borrar Contenido de productos <i class="fas fa-eraser"></i>
                                                                </button>
                                                            </div>
                                                            <div class="col-md-4 text-right">
                                                                <button class="button-amazon-dialy" onclick="object.ScrapedDialy.addProductScrapper(${i},${p});">
                                                                    Añadir Productos al contenido <i class="fab fa-product-hunt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12" id="div-product-scrapper-${i}-${p}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="parent-images-contentScrapper${i}-${p}">
                                                <div class="col-md-12 div-content-images" id="images-contentScrapper${i}-${p}">
                                                    ${JSON.parse(data[i].pre_content[p].images)}
                                                </div>
                                                <div class='col-md-12 text-center'>
                                                    <button type='button' class='buttonimages' onclick='object.ScrapedDialy.selectOtherImages(${i},${p},${data[i].pre_content[p].id})'>Seleccionar otras imagenes</button>
                                                    <button type='button' class='buttonimages' onclick='object.ScrapedDialy.downloadImages(${i},${p},${data[i].pre_content[p].id})' id='buttondownloadImg-${i}-${p}' disabled><i class='fas fa-file-image'></i> Descargar imagenes</button>
                                                </div>
                                            </div>
                                            <div class="col-md-12 contentScrapper otherimages-all" id="contentotherimages${i}-${p}">
                                                <div class="backbutton">
                                                  <span class="buttonback" id="back${i}-${p}"><i class="fas fa-chevron-circle-left"></i> Volver atras</span>
                                                </div>
                                                <div class="row formotheriimages">
                                                    <div class="col-md-6">
                                                        <input class="form-control inputtab" type="text" placeholder="Inserta el nombre de la imagen a escrapear" id="nameimg${i}-${p}">
                                                    </div>
                                                    <div class="col-md-6 text-left">
                                                        <button type="button" class="buttontab buttontab-all-images" id="getimages${i}-${p}"><i class="fas fa-camera-retro"></i> Escrapear Imagen</button>
                                                    </div>
                                                </div>
                                                 <div id="boxmyotherimages${i}-${p}">
                                                 </div>
                                            </div>
                                            <div class="makeimages" id="makeimages${i}-${p}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    this.makeImagesAndNewsId(i,p);
                    }
                }
    		})
    	})

    }
    deletePrecontent(idPrecontent){
         var content = `<h5>¿Esta seguro de querer borrar este pre contenido?</h5>
        <button type="button" id="yesdelete"><i class="fas fa-thumbs-up"></i> Si</button><button id="nodelete" type="button"><i class="far fa-thumbs-down"></i> No</button>`;
        this.showModal(content);
        document.getElementById("nodelete").addEventListener("click",()=>{
           document.getElementById("emerg").style.display="none";
           return;
        })
        document.getElementById("yesdelete").addEventListener("click",()=>{
            document.getElementById("boxhtml").innerHTML="";
            document.getElementById("boxhtml").innerHTML=`<h1 class="h1download">DESCARGANDO IMAGENES.......</h1>`;
            fetch(`${this.url}Scrapper/removeprecontent`,{
                method:"POST",
                body:"idPrecontent="+idPrecontent,
                headers:{
                  'Accept':'application/JSON',
                  'Content-Type':'application/x-www-form-urlencoded'  
                }
            }).then(data=>{
            data.json().then(response=>{
                       if(response){
                        document.getElementsByClassName('parent_scraped_dialy')[0].innerHTML=''
                        this.get_all_scraped_dialy();
                        document.getElementById("boxhtml").innerHTML="";
                        document.getElementById("emerg").style.display="none";
                        return  this.flash("<h6><i class='fas fa-exclamation'></i> Pre contenido borrado correctamente</h6>","flags");
                       }
                    })
                })
        })
    }
    openToggleOrClose(id,parentDiv,check){
        if(!check) return;
        if(!document.getElementById(id).classList.contains('off') && !document.getElementById(id).classList.contains('on') ){
            document.getElementById(id).classList.add('on');
            document.getElementById(parentDiv).style.display ="block";
        }else if(document.getElementById(id).classList.contains('off') && !document.getElementById(id).classList.contains('on') ){
            document.getElementById(id).classList.remove('off');
            document.getElementById(id).classList.add('on');
            document.getElementById(parentDiv).style.display ="block";
        }
        else{
            document.getElementById(id).classList.remove('on');
            document.getElementById(id).classList.add('off');
            document.getElementById(parentDiv).style.display ="none";
        }
    }

    openToggleOrCloseAndShow(idToggle,idDivshowContent){
        if(!document.getElementById(idToggle).classList.contains('off') && !document.getElementById(idToggle).classList.contains('on') ){
            document.getElementById(idToggle).classList.add('on');
            document.getElementById(idDivshowContent).style.display ="block";
        }else if(document.getElementById(idToggle).classList.contains('off') && !document.getElementById(idToggle).classList.contains('on') ){
            document.getElementById(idToggle).classList.remove('off');
            document.getElementById(idToggle).classList.add('on');
            document.getElementById(idDivshowContent).style.display ="block";
        }
        else{
            document.getElementById(idToggle).classList.remove('on');
            document.getElementById(idToggle).classList.add('off');
            document.getElementById(idDivshowContent).style.display ="none";
        }
    }

    makeImagesAndNewsId(primerakey,segundakey){
        //creamos los arrays para trabajar con ellos
        this.createArray(primerakey,segundakey);
          const allElement = document.getElementsByClassName('contentimagesnormalimages');
          if(allElement[this.controlDivImages]!=undefined){
            for(let i in allElement[this.controlDivImages].childNodes){
                if(allElement[this.controlDivImages].childNodes[i].id!=undefined){
                    allElement[this.controlDivImages].childNodes[i].id = `div-${primerakey}-${segundakey}-${i}`
                    document.getElementById(`divselec${i}`).id   = `divselec-${primerakey}-${segundakey}-${i}`
                    document.getElementById('normalimages'+i).id = `normalimages-${primerakey}-${segundakey}-${i}`
                    allElement[this.controlDivImages].childNodes[i].removeAttribute("onclick");
                    allElement[this.controlDivImages].childNodes[i].setAttribute('onclick',`object.ScrapedDialy.selectImg('normalimages-${primerakey}-${segundakey}-${i}','divselec-${primerakey}-${segundakey}-${i}',${i},${primerakey},${segundakey})`)              
                }              
            }
            this.controlDivImages ++;
          }
    }

    createArray(primerakey,segundakey){

        if(this.imagesSelected[primerakey]      ==undefined)  this.imagesSelected[primerakey]       = [];
        if(this.imagesOtherSelected[primerakey] ==undefined)  this.imagesOtherSelected[primerakey]  = [];
        if(this.displayNormalImages[primerakey] ==undefined)  this.displayNormalImages[primerakey]  = [];
        if(this.displayOtherImages[primerakey]  ==undefined)  this.displayOtherImages[primerakey]   = [];
        if(this.otherimages[primerakey]         ==undefined)  this.otherimages[primerakey]          = [];
        if(this.content[primerakey]             ==undefined)  this.content[primerakey]              = [];
        if(this.recuperarcontent[primerakey]    ==undefined)  this.recuperarcontent[primerakey]     = [];
        if(this.contentrecuperado[primerakey]   ==undefined)  this.contentrecuperado[primerakey]    = [];
        if(this.values[primerakey]              ==undefined)  this.values[primerakey]               = [];
        if(this.margintop[primerakey]           ==undefined)  this.margintop[primerakey]            = [];
        if(this.posinitial[primerakey]          ==undefined)  this.posinitial[primerakey]           = [];
        if(this.images[primerakey]              ==undefined)  this.images[primerakey]               = [];
        if(this.keyimages[primerakey]           ==undefined)  this.keyimages[primerakey]            = [];
        if(this.moretextCount[primerakey]       ==undefined)  this.moretextCount[primerakey]        = [];
        if(this.contentamazon[primerakey]       ==undefined)  this.contentamazon[primerakey]        = [];
        if(this.page[primerakey]                ==undefined)  this.page[primerakey]                 = [];
        if(this.titleSelected[primerakey]       ==undefined)  this.titleSelected[primerakey]        = [];

        this.moretextCount[primerakey][segundakey]          = [];
        this.values[primerakey][segundakey]                 = [];
        this.margintop[primerakey][segundakey]              = [];
        this.posinitial[primerakey][segundakey]             = [];
        this.images[primerakey][segundakey]                 = [];
        this.keyimages[primerakey][segundakey]              = 0;

        this.recuperarcontent[primerakey][segundakey]       = false;
        this.otherimages[primerakey][segundakey]            = false;
        this.displayNormalImages[primerakey][segundakey]    = [];
        this.imagesOtherSelected[primerakey][segundakey]    = [];
        this.imagesSelected[primerakey][segundakey]         = [];
        this.content[primerakey][segundakey]                = [];
        this.contentamazon[primerakey][segundakey]          = [];
        this.page[primerakey][segundakey]                   = [];
        this.titleSelected[primerakey][segundakey]          = [];

        this.contentrecuperado[primerakey][segundakey]      = document.getElementById(`contentScrapper${primerakey}-${segundakey}`).innerHTML;

    }
    selectImg(idImageSelect,idDivslec,keyFromLoop,primerakey,segundakey){
        var brand;
        var display;
        if(this.otherimages[primerakey][segundakey]){  
         
          brand = `buttondownloadImgother-${primerakey}-${segundakey}`; 

          this.displayOtherImages[primerakey][segundakey] =!this.displayOtherImages[primerakey][segundakey];  
          display = this.displayOtherImages[primerakey][segundakey];
        };
        if(!this.otherimages[primerakey][segundakey]){ 

            brand = `buttondownloadImg-${primerakey}-${segundakey}`; 
            this.displayNormalImages[primerakey][segundakey] =!this.displayNormalImages[primerakey][segundakey];  
            display = this.displayNormalImages[primerakey][segundakey] 
        };

        this.selectAndBrandImages(idImageSelect,idDivslec,keyFromLoop,primerakey,segundakey,brand,display);
    }
    selectAndBrandImages(idImageSelect,idDivslec,keyFromLoop,primerakey,segundakey,brand,display){
        if(display){
            document.getElementById(idDivslec).style.display = "none";
            var display = document.getElementById(idImageSelect);
            display.style.border  = "none";
            display.style.opacity = "1";
            var parent = document.getElementById(idImageSelect).parentNode;
            if(this.otherimages[primerakey][segundakey]){
               if(this.imagesOtherSelected[primerakey][segundakey].includes(display.src)){
                  this.imagesOtherSelected[primerakey][segundakey].splice(this.imagesOtherSelected[primerakey][segundakey].indexOf(display.src),1);
                }else{
                  document.getElementById(idDivslec).style.display = "block";
                  display.style.border  = "2px solid #4e5c4f";
                  display.style.opacity = "0.5";
                  var parent = document.getElementById(idImageSelect).parentNode;
                  if(!this.imagesOtherSelected[primerakey][segundakey].includes(display.src)){
                      this.imagesOtherSelected[primerakey][segundakey].push(display.src);
                  }
                }
            }else{
                if(this.imagesSelected[primerakey][segundakey].includes(display.src)){
                  this.imagesSelected[primerakey][segundakey].splice(this.imagesSelected[primerakey][segundakey].indexOf(display.src),1);
                }else{
                   document.getElementById(idDivslec).style.display = "block";
                  display.style.border  = "2px solid #4e5c4f";
                  display.style.opacity = "0.5";
                  var parent = document.getElementById(idImageSelect).parentNode;
                  if(!this.imagesSelected[primerakey][segundakey].includes(display.src)){
                      this.imagesSelected[primerakey][segundakey].push(display.src);
                  }
                }
            }
        }

        var count = 0;
        if(this.otherimages[primerakey][segundakey]){  count = this.imagesOtherSelected[primerakey][segundakey].length;}
        if(!this.otherimages[primerakey][segundakey]){ count = this.imagesSelected[primerakey][segundakey].length;}

        if(count>0){
            document.getElementById(brand).disabled      = false;
            document.getElementById(brand).style.opacity = '1';
        }else{
            document.getElementById(brand).disabled      = true;
            document.getElementById(brand).style.cursor  = 'not-alloweb'
            document.getElementById(brand).style.opacity = '0.5';
        }
    }
    selectOtherImages(primerakey,segundakey,idPrecontent){
        document.getElementById("parent-images-contentScrapper"+primerakey+"-"+segundakey).style.display = "none";
        document.getElementById("contentotherimages"+primerakey+"-"+segundakey).style.display            = "block";
        this.otherimages[primerakey][segundakey]                                                         = true;
        document.getElementById("back"+primerakey+"-"+segundakey).addEventListener("click",()=>{
            this.otherimages[primerakey][segundakey] = false;
            document.getElementById("parent-images-contentScrapper"+primerakey+"-"+segundakey).classList.add("contentScrapper"); 
            document.getElementById("parent-images-contentScrapper"+primerakey+"-"+segundakey).style.display = "block";
            document.getElementById("contentotherimages"+primerakey+"-"+segundakey).style.display            = "none";
        })
        document.getElementById("getimages"+primerakey+"-"+segundakey).addEventListener("click",()=>{
            document.getElementsByClassName("boxquestion")[0].style.background = "transparent";
            var content = `<h1 class="h1download">DESCARGANDO IMAGENES.......</h1>`;
            this.showModal(content);
            document.getElementById("boxmyotherimages"+primerakey+"-"+segundakey).innerHTML="";
            this.download("nameimg"+primerakey+"-"+segundakey,primerakey,segundakey,idPrecontent);
        })
        
    }

    makeOnlyOneImagesBox(id,primerakey,segundakey){
        //creamos los arrays para trabajar con ellos
        const allElements = document.getElementById(id).childNodes[1].childNodes;
        for(let i in allElements){
            if(allElements[i].id!=undefined){
                allElements[i].id                               = `div-${primerakey}-${segundakey}-${i}`
                document.getElementById(`divselecother${i}`).id = `divselecother-${primerakey}-${segundakey}-${i}`
                document.getElementById('otherimages'+i).id     = `otherimages-${primerakey}-${segundakey}-${i}`
                allElements[i].removeAttribute("onclick");
                allElements[i].setAttribute('onclick',`object.ScrapedDialy.selectImg('otherimages-${primerakey}-${segundakey}-${i}','divselecother-${primerakey}-${segundakey}-${i}',${i},${primerakey},${segundakey})`)
            }
        }

    }
     /****funcion para escrapear imagenes para fanpage y para otherimages***/
    download(iDdata,primerakey,segundakey,idPrecontent){
        if(document.getElementById(iDdata).value=="") return;
        fetch(`${this.url}Scrapper/getotherimages`,{
            method:"POST",
            body:"titleimage="+document.getElementById(iDdata).value,
            headers:{
              'Accept':'application/JSON',
              'Content-Type':'application/x-www-form-urlencoded'  
            }
            }).then(data=>{
                data.json().then(images=>{
                  document.getElementById("emerg").style.display="none";
                  var divother =  document.getElementById(`boxmyotherimages${primerakey}-${segundakey}`);
                    divother.innerHTML = '';
                    divother.innerHTML = images.img;
                    divother.innerHTML+= `<div class="row">
                        <div class='col-md-12 text-center'>
                        <button type='button' class='buttonimages' onclick='object.ScrapedDialy.downloadImages(${primerakey},${segundakey},${idPrecontent})' id='buttondownloadImgother-${primerakey}-${segundakey}' disabled><i class='fas fa-file-image'></i> Descargar imagenes</button>
                        </div>
                    </div>`
                this.makeOnlyOneImagesBox(`boxmyotherimages${primerakey}-${segundakey}`,primerakey,segundakey)
               })
            })
    }
    /*funcion para crear contenido de la ventana modal*/
    showModal(content){
        document.getElementById("emerg").style.display="block";
        document.getElementById("boxhtml").innerHTML="";
        document.getElementById("boxhtml").innerHTML=content;
        return true;
    }
     /*con esta funcion pasamos el contenido al textarea y lo dejamos listo para editarlo a man*/
    editcontent(primerakey,segundakey){
        document.getElementById("contentScrapper"+primerakey+"-"+segundakey).style.display = "none";
        document.getElementById("textacontent"+primerakey+"-"+segundakey).style.visibility = "visible";
        document.getElementById("textarea"+primerakey+"-"+segundakey).setAttribute("rows", "20");
        this.content[primerakey][segundakey] = document.getElementById('contentScrapper'+primerakey+"-"+segundakey).innerHTML;
        if(this.recuperarcontent[primerakey][segundakey]){
            document.getElementById("textarea"+primerakey+"-"+segundakey).value = this.contentrecuperado[primerakey][segundakey];
            this.recuperarcontent[primerakey][segundakey]                       = false;
        }else{
            document.getElementById("textarea"+primerakey+"-"+segundakey).value     = this.content[primerakey][segundakey];
            document.getElementById("textarea"+primerakey+"-"+segundakey).innerHTML = this.content[primerakey][segundakey];
        }
    }
    recuperarall(primerakey,segundakey){
        this.content[primerakey][segundakey]                                            = this.contentrecuperado[primerakey][segundakey];
        document.getElementById("textarea"+primerakey+"-"+segundakey).value             = this.contentrecuperado[primerakey][segundakey];
        document.getElementById('contentScrapper'+primerakey+"-"+segundakey).innerHTML  = '';
        document.getElementById("textarea"+primerakey+"-"+segundakey).innerHTML         = this.contentrecuperado[primerakey][segundakey];
        document.getElementById('contentScrapper'+primerakey+"-"+segundakey).innerHTML  = this.contentrecuperado[primerakey][segundakey];
        this.recuperarcontent[primerakey][segundakey]                                   = true;
    }
    done(primerakey,segundakey){
        this.displayContent(primerakey,segundakey);
        this.content[primerakey][segundakey]=document.getElementById("textarea"+primerakey+"-"+segundakey).value;
        document.getElementById('contentScrapper'+primerakey+"-"+segundakey).innerHTML =  this.content[primerakey][segundakey];
    }
    displayContent(primerakey,segundakey){
        document.getElementById("contentScrapper"+primerakey+"-"+segundakey).style.display = "block";
        document.getElementById("textacontent"+primerakey+"-"+segundakey).style.visibility = "hidden";
        document.getElementById("textarea"+primerakey+"-"+segundakey).removeAttribute("rows");
        document.getElementById('contentScrapper'+primerakey+"-"+segundakey).innerHTML = '';
    }


    /***** Funcioness para descargar e iniciar las imagenes///
    /*funcion para descargar las imagenes que hemos seleecinado*/
    downloadImages(primerakey,segundakey,idPrecontent){
          document.getElementsByClassName("boxquestion")[0].style.background = "transparent"
          var content = `<h1 class="h1download">DESCARGANDO IMAGENES.......</h1>`;
          let arrayImages = this.imagesSelected[primerakey][segundakey].concat(this.imagesOtherSelected[primerakey][segundakey]);
          this.showModal(content);
          
          fetch(`${this.url}ScrapperImg/downloadImagesForEditDialy`,{
          method:"POST",
          body:JSON.stringify({img:arrayImages,primerakey:primerakey,segundakey:segundakey}),
          headers:{
            'Accept':'application/JSON',
            'Content-Type':'application/x-www-form-urlencoded'  
          }
        }).then(data=>{
          data.json().then(images=>{
            document.getElementById("emerg").style.display="none";
            document.getElementsByClassName("boxquestion")[0].style.background="#f7f7f7"
            this.initImages(images,primerakey,segundakey);
            document.getElementById('contentScrapper'+primerakey+"-"+segundakey).classList.remove("contentScrapper");
            document.getElementById("parent-images-contentScrapper"+primerakey+"-"+segundakey).style.display="none";
            document.getElementById("contentotherimages"+primerakey+"-"+segundakey).style.display="none";
            this.otherimages[primerakey][segundakey] = false;
            document.getElementById("makeimages"+primerakey+"-"+segundakey).innerHTML=images.view;
            this.changeFunctionsMakeImg(primerakey,segundakey,idPrecontent);
          })
        })
    }

  /*Funcion para inicializar las imagenes para poder editarlas*/

    initImages(images,primerakey,segundakey){
        this.images[primerakey][segundakey]=images.imagenes;
        for(var i =0;i<this.images[primerakey][segundakey].length;i++){
            this.margintop[primerakey][segundakey][i]     = 0;
            this.posinitial[primerakey][segundakey][i]    = 0;
            this.moretextCount[primerakey][segundakey][i] = 1;
            this.values[primerakey][segundakey][i]        = [{"valuetext":"","valuesize":"","valuecolor":"","valueheight":"","valueposition":"","valueangletext":"","valueleftright":"","valueupdown":"","valueselect-font":""}]
        }
    }
    /*funcion para borrar la imagen**/
    deleteImageselected(src,primerakey,segundakey,idPrecontent){
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
            document.getElementById("makeimages"+primerakey+"-"+segundakey).style.display="none";
            document.getElementById("makeimages"+primerakey+"-"+segundakey).innerHTML="";
            fetch(`${this.url}ScrapperImg/removeimageDialy`,{
                method:"POST",
                body:"src="+src+"&primerakey="+primerakey+"&segundakey="+segundakey,
                headers:{
                  'Accept':'application/JSON',
                  'Content-Type':'application/x-www-form-urlencoded'  
                }
            }).then(data=>{
            data.json().then(images=>{
                        document.getElementById("makeimages"+primerakey+"-"+segundakey).style.display="block";
                        document.getElementById("makeimages"+primerakey+"-"+segundakey).innerHTML=images.view;
                        this.initImages(images,primerakey,segundakey)
                        this.makeImagesAndNewsId(primerakey,segundakey)
                        this.changeFunctionsMakeImg(primerakey,segundakey,idPrecontent);
                    })
                })
        })
  }

    selectFont(keyimg,primerakey,segundakey){
        var randomId = Math.floor(Math.random() * 10000);
        var valueimg = document.getElementById("optionfont"+document.getElementById('select-font'+keyimg+'img'+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey).selectedIndex).innerHTML;
        document.getElementById('img-show-font'+keyimg+'img'+this.keyimages[primerakey][segundakey]).src=this.url+'CDN/imagenes/images-font/'+valueimg+'.png?id='+randomId;
        this.makeImg(); 
    }
  /*Funcion para remover todos los cambios echos de la imagen*/
    deleteAllchanges(primerakey,segundakey){
   
        var content = `<h5>¿Esta seguro de querer remover todos los cambios echos de esta imagen?</h5>
            <button type="button" id="yesremove"><i class="fas fa-thumbs-up"></i> Si</button><button id="noderemove" type="button"><i class="far fa-thumbs-down"></i> No</button>
            <img src=${document.getElementById(`imageneshow-${primerakey}-${segundakey}-${this.keyimages[primerakey][segundakey]}`).src} style="widt:100%;margin:20px;">
            `;
        this.showModal(content);

        document.getElementById("noderemove").addEventListener("click",()=>{
           document.getElementById("emerg").style.display="none";
           return;
        })
        document.getElementById("yesremove").addEventListener("click",()=>{
        let img = document.getElementById(`imageneshow-${primerakey}-${segundakey}-${this.keyimages[primerakey][segundakey]}`).src;
        for(i=1;i<=1;i++){
            this.values[primerakey][segundakey][this.keyimages[primerakey][segundakey]]= [{"valuetext":"","valuesize":"","valuecolor":"","valueheight":"","valueposition":"","valueangletext":"","valueleftright":"","valueupdown":""}]
            var arrayValuesStandar = [
                {key: `text${i}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,    value:""},
                {key: `color${i}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,   value:"#000000"},
                {key: `align${i}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,   value:""},
                {key: `position${i}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,value:""},
                {key: `angle${i}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,   value:""},
                {key: `select-font${i}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`, value:""},
                {key: `up${i}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,      value:""},
                {key: `filterimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,      value:0},
                {key: `opacityimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,     value:100},
                {key: `blurimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,        value:0},
                {key: `brilloimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,      value:0},
                {key: `rojoimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,        value:0},
                {key: `azulimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,        value:0},
                {key: `verdeimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,       value:0},
                {key: `contrastimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,    value:0},
                {key: `flipimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,        value:0},
                {key: `invertimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,      value:0},
                {key: `pixelarimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,     value:0},
                {key: `rotateimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,      value:0},
                {key: `afinarimg${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`,      value:0}
            ]
          }
        for(var v in  arrayValuesStandar ){
            document.getElementById(arrayValuesStandar[v].key).value = arrayValuesStandar[v].value;
        }

        for(var i=this.moretextCount[primerakey][segundakey][this.keyimages[primerakey][segundakey]];i>1;i--){
            this.removeNodetext(i,primerakey,segundakey);
        }
        if(img.search("id")!=-1){
            img = img.split("?")[0];
        }
        let idimage =  Math.round(Math.random()*100000000);
        document.getElementById("emerg").style.display="none";
        fetch(`${this.url}ScrapperImg/removeAllchangesDialy`,{
            method:"POST",
            body:"image="+img+"&primerakey="+primerakey+"&segundakey="+segundakey,
            headers:{
              'Accept':'application/JSON',
              'Content-Type':'application/x-www-form-urlencoded'  
            }
        }).then(data=>{
                data.json().then(images=>{
                    document.getElementById(`imageneshow-${primerakey}-${segundakey}-${this.keyimages[primerakey][segundakey]}`).src=`http://localhost/scrapperTrooll/application/controllers/${images}?id=${idimage}`;
                })
            })
        })
    }
    /*Funcion para añadir mas texto a la imagen**/
    addMoretext(number,idimg,primerakey,segundakey){
        ///CON ESTA VARIABLE OBTENEMOS LA KEY DE LA IMAGEN PARA PODER BORRAR EN LA FUNCION REMOVENODETEXT 
        if(this.idimg[primerakey]       ==undefined)  this.idimg[primerakey]        = [];
        this.idimg[primerakey][segundakey] = idimg;
        if(number+1>=10 || !this.doesLetPushevery())  return;
        this.getvalues(primerakey,segundakey); 
        this.animationTop("add",primerakey,segundakey);
        var html = this.teemplateAddtext(number+1,primerakey,segundakey);
        document.getElementById(`parenttextnode-${primerakey}-${segundakey}-${idimg}`).innerHTML+=html;
        this.moretextCount[primerakey][segundakey][this.keyimages[primerakey][segundakey]]++;
        document.getElementById(`divtext1img${idimg}-${primerakey}-${segundakey}`).childNodes[1].childNodes[1].childNodes[0].removeAttribute("onclick");
        document.getElementById(`divtext1img${idimg}-${primerakey}-${segundakey}`).childNodes[1].childNodes[1].childNodes[0].setAttribute('onclick',`object.ScrapedDialy.addMoretext(${this.moretextCount[this.primerakey][this.segundakey][idimg]},${idimg},${primerakey},${segundakey})`);
        this.cloneElement(number+1,primerakey,segundakey);
        this.insertValues(number,primerakey,segundakey);
    }
  
    /*funciopn para borrar texto de la imagen **/
    removeNodetext(id,primerakey,segundakey){
        this.values[primerakey][segundakey].splice(id-1,1);
        if(document.getElementById(`text${id}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value.length>0){
            return this.flash("<h6><i class='fas fa-exclamation'></i> Borra todo el texto de este elemento para poder borrarlo</h6>","warning");
        }
        this.animationTop("rest",primerakey,segundakey);
        document.getElementById(`divtext${id}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).remove();
        this.moretextCount[primerakey][segundakey][this.keyimages[primerakey][segundakey]]--;
        document.getElementById(`divtext1img${this.idimg[primerakey][segundakey]}-${primerakey}-${segundakey}`).childNodes[1].childNodes[1].childNodes[0].removeAttribute("onclick");
        document.getElementById(`divtext1img${this.idimg[primerakey][segundakey]}-${primerakey}-${segundakey}`).childNodes[1].childNodes[1].childNodes[0].setAttribute('onclick',`object.ScrapedDialy.addMoretext(${this.moretextCount[primerakey][segundakey][this.keyimages[primerakey][segundakey]]},${this.idimg[primerakey][segundakey]},${primerakey},${segundakey})`);
        var parent = document.getElementById(`parenttextnode-${primerakey}-${segundakey}-${this.keyimages[primerakey][segundakey]}`).childNodes;
        var number = 1;
        for(var i in parent){ 
            if(parent[i].id){
                document.getElementById(parent[i].id).id=`divtext${number}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`;
                document.getElementById(parent[i].id).id=`divtext${number}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`;
                var parentd = document.querySelectorAll(`#divtext${number}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`);
                for(var c in parentd[0].children){
                    if(parentd[0].children[c].children){
                        for(var bis in parentd[0].children[c].children){
                            if(parentd[0].children[c].children[bis].children){
                            for(var d in parentd[0].children[c].children[bis].children){
                                if(parentd[0].children[c].children[bis].children[d].onclick){
                                    if(parentd[0].children[c].children[bis].children[d].id=="removetext"){
                                     parentd[0].children[c].children[bis].children[d].removeAttribute("onclick");
                                      parentd[0].children[c].children[bis].children[d].setAttribute('onclick',`object.ScrapedDialy.removeNodetext(${number},${primerakey},${segundakey})`)
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
    /****funcion para cambiar las funciones y adaptarlas de las imagenes descargadas para crearlas***///
    changeFunctionsMakeImg(primerakey,segundakey,idPrecontent){
        this.primerakey = primerakey;
        this.segundakey = segundakey;
        document.getElementsByClassName("boximagesformake")[0].classList.add(`boxesimagesformake-${primerakey}-${segundakey}`);
        document.getElementsByClassName("boximagesformake")[0].classList.remove(`boximagesformake`);
        document.getElementById("rowboximagesformake").id=`rowboximagesformake-${primerakey}-${segundakey}`;
        let getimages = document.getElementsByClassName("parentdivimg");
        for(var f = 0; f<=getimages.length;f++){
            if(getimages[f]!=undefined){
                getimages[f].childNodes[1].classList.add(`divimages-${primerakey}-${segundakey}`);
                getimages[f].childNodes[1].classList.remove("divimages");
            }
        }
        let firtsImages = document.getElementsByClassName(`divimages-${primerakey}-${segundakey}`);
        for(var i=0;i<=firtsImages.length;i++){
            if(firtsImages[i]!=undefined){
                firtsImages[i].id = `divimg-${primerakey}-${segundakey}-${i}`;
                let thisImg = document.getElementById(`divimg-${primerakey}-${segundakey}-${i}`).childNodes;
                thisImg[1].removeAttribute("onclick");
                thisImg[1].setAttribute('onclick',`object.ScrapedDialy.changeImage("${thisImg[1].src}",${i},${firtsImages.length},${primerakey},${segundakey})`);
                /*thisImg[3].removeAttribute("onclick");
                thisImg[3].setAttribute('onclick',`object.ScrapedDialy.deleteImageselected("${thisImg[1].src}",${primerakey},${segundakey},${idPrecontent})`);*/

                document.getElementById(`form${i}`).id           = `form-${primerakey}-${segundakey}-${i}`;
                document.getElementById(`parenttextnode${i}`).id = `parenttextnode-${primerakey}-${segundakey}-${i}`;
                document.getElementById(`divtext1img${i}`).id    = `divtext1img${i}-${primerakey}-${segundakey}`;
                document.getElementById(`divtext1img${i}-${primerakey}-${segundakey}`).childNodes[1].childNodes[1].childNodes[0].removeAttribute("onclick");
                document.getElementById(`divtext1img${i}-${primerakey}-${segundakey}`).childNodes[1].childNodes[1].childNodes[0].setAttribute('onclick',`object.ScrapedDialy.addMoretext(${this.moretextCount[this.primerakey][this.segundakey][i]},${i},${this.primerakey},${this.segundakey})`);

                let text = document.getElementById(`text1img${i}`);
                text.id  = `text1img${i}-${primerakey}-${segundakey}`;
                text.removeAttribute("onkeyup");
                text.setAttribute('onkeyup',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let size = document.getElementById(`size1img${i}`);
                size.id  = `size1img${i}-${primerakey}-${segundakey}`;
                size.removeAttribute("onkeyup");
                size.setAttribute('onkeyup',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                size.removeAttribute("onchange");
                size.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let color = document.getElementById(`color1img${i}`);
                color.id  = `color1img${i}-${primerakey}-${segundakey}`;
                color.removeAttribute("onchange");
                color.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let align = document.getElementById(`align1img${i}`);
                align.id  = `align1img${i}-${primerakey}-${segundakey}`;
                align.removeAttribute("onchange");
                align.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let position = document.getElementById(`position1img${i}`);
                position.id  = `position1img${i}-${primerakey}-${segundakey}`;
                position.removeAttribute("onchange");
                position.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let angle = document.getElementById(`angle1img${i}`);
                angle.id  = `angle1img${i}-${primerakey}-${segundakey}`;
                angle.removeAttribute("onchange");
                angle.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let up = document.getElementById(`up1img${i}`);
                up.id  = `up1img${i}-${primerakey}-${segundakey}`;
                up.removeAttribute("onchange");
                up.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let down = document.getElementById(`down1img${i}`);
                down.id  = `down1img${i}-${primerakey}-${segundakey}`;
                down.removeAttribute("onchange");
                down.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let selectfont = document.getElementById(`select-font1img${i}`);
                selectfont.id  = `select-font1img${i}-${primerakey}-${segundakey}`;
                selectfont.removeAttribute("onchange");
                selectfont.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);

                let filter = document.getElementById(`filterimg${i}`);
                filter.id  = `filterimg${i}-${primerakey}-${segundakey}`;
                filter.removeAttribute("onchange");
                filter.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let opacity = document.getElementById(`opacityimg${i}`);
                opacity.id  = `opacityimg${i}-${primerakey}-${segundakey}`;
                opacity.removeAttribute("onchange");
                opacity.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let blur = document.getElementById(`blurimg${i}`);
                blur.id  = `blurimg${i}-${primerakey}-${segundakey}`;
                blur.removeAttribute("onchange");
                blur.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let brillo = document.getElementById(`brilloimg${i}`);
                brillo.id  = `brilloimg${i}-${primerakey}-${segundakey}`;
                brillo.removeAttribute("onchange");
                brillo.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let rojo = document.getElementById(`rojoimg${i}`);
                rojo.id  = `rojoimg${i}-${primerakey}-${segundakey}`;
                rojo.removeAttribute("onchange");
                rojo.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let verde = document.getElementById(`verdeimg${i}`);
                verde.id  = `verdeimg${i}-${primerakey}-${segundakey}`;
                verde.removeAttribute("onchange");
                verde.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let azul = document.getElementById(`azulimg${i}`);
                azul.id  = `azulimg${i}-${primerakey}-${segundakey}`;
                azul.removeAttribute("onchange");
                azul.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);


                let contrast = document.getElementById(`contrastimg${i}`);
                contrast.id  = `contrastimg${i}-${primerakey}-${segundakey}`;
                contrast.removeAttribute("onchange");
                contrast.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let flip = document.getElementById(`flipimg${i}`);
                flip.id  = `flipimg${i}-${primerakey}-${segundakey}`;
                flip.removeAttribute("onchange");
                flip.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let invert = document.getElementById(`invertimg${i}`);
                invert.id  = `invertimg${i}-${primerakey}-${segundakey}`;
                invert.removeAttribute("onchange");
                invert.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let rotate = document.getElementById(`rotateimg${i}`);
                rotate.id  = `rotateimg${i}-${primerakey}-${segundakey}`;
                rotate.removeAttribute("onchange");
                rotate.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let pixelar = document.getElementById(`pixelarimg${i}`);
                pixelar.id  = `pixelarimg${i}-${primerakey}-${segundakey}`;
                pixelar.removeAttribute("onchange");
                pixelar.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);
                let afinar = document.getElementById(`afinarimg${i}`);
                afinar.id  = `afinarimg${i}-${primerakey}-${segundakey}`;
                afinar.removeAttribute("onchange");
                afinar.setAttribute('onchange',`object.ScrapedDialy.makeImg(${this.primerakey},${this.segundakey})`);

                document.getElementById(`imageneshow${i}`).id = `imageneshow-${primerakey}-${segundakey}-${i}`;
                
                var divButtons = document.getElementsByClassName('divButtonsImages');
                for(var b=0;b<divButtons.length;b++){   
                    if(divButtons[b]!=undefined){
                        divButtons[b].innerHTML=''
                    };
                }
                document.getElementById(`form-${primerakey}-${segundakey}-${i}`).innerHTML+=`
                <div class="row divButtonsImagesNew">
                    <div class="col-md-6 text-left">
                        <button class="buttonback" type="button" onclick="object.ScrapedDialy.back(${this.primerakey},${this.segundakey},${i})"><i class="fas fa-chevron-circle-left"></i> Volver atras</button>
                        <button class="buttonremovechanges" type="button" onclick="object.ScrapedDialy.deleteAllchanges(${this.primerakey},${this.segundakey})"><i class="fas fa-backspace"></i> Deshacer cambios de esta imagen</button>
                    </div>
                    <div class="col-md-6 text-right">
                        <button class="buttonsave button-save-dialy" type="button" onclick="object.ScrapedDialy.saveBlog(${this.keyimages[this.primerakey][this.segundakey]},${idPrecontent},${primerakey},${segundakey})"><i class="fas fa-save"></i>Guardar blog</button>
                    </div>
                </div>`


            }
        }

    }

    saveBlog(keyImages,idprecontent,primerakey,segundakey){
      let title = document.getElementById("contentScrapper"+primerakey+"-"+segundakey).children[0].innerHTML;

      document.getElementById("contentScrapper"+primerakey+"-"+segundakey).children[0].remove();
      const formData = new FormData();
      let contentScraped = document.getElementById("contentScrapper"+primerakey+"-"+segundakey).innerHTML;
      contentScraped     = contentScraped.replace(/&nbsp;/g, "");
      formData.append("contentScraped",contentScraped);
      formData.append("title",title);
      formData.append("primerakey",primerakey);
      formData.append("segundakey",segundakey);
      formData.append("idprecontent",idprecontent);
      formData.append("belongBlog",this.idBlog[primerakey])
      let img = document.getElementById("imageneshow-"+primerakey+"-"+segundakey+"-"+keyImages).src;
      if(img.search("id")!=-1){
        img = img.split("?")[0];
      }

      formData.append("img",img);
      formData.append("saveTileForcheck",this.saveTileForcheck);

       fetch(`${this.url}Scrapper/saveDataBlogDialy`,{
        method:"POST",
        body:formData
      }).then(response=>{
        response.json().then(scrapp => {
            console.log(scrapp)
            if(scrapp){
              this.flash("<h6><i class='fas fa-check'></i> Blog Creado y contenido publicado correctamente</h6>","flags");
              setTimeout(()=>{ window.location.reload()}, 3000);
            }else{
              this.flash("<h6><i class='fas fa-check'></i>Hubo un error al publicar y crear el blog</h6>","Error");
            }
        })
    })
    }

    back(primerakey,segundakey,i){
        console.log(primerakey,segundakey,i)
        
    }
    /**funcion para cambiar imagen para editarla**/
    changeImage(src,id,totalimages,primerakey,segundakey){
        this.keyimages[primerakey][segundakey] = id;
        for(var i=0;i<=parseInt(totalimages)-1;i++){
            if(id == i){
                document.getElementById(`divimg-${primerakey}-${segundakey}-${id}`).classList.add("selectimg");
            }else{
                document.getElementById(`divimg-${primerakey}-${segundakey}-${i}`).classList.remove("selectimg");
            }
        }
        document.getElementById(`imageneshow-${primerakey}-${segundakey}-${id}`).src=src;
        this.makeImg(primerakey,segundakey);
        this.showformImage(id,primerakey,segundakey)
    }
    /**funcion para mostrar el formulario de la imagen**/
    showformImage(id,primerakey,segundakey){
        for(var i=0; i<this.images[primerakey][segundakey].length;i++){
            if(`form-${primerakey}-${segundakey}-${id}`==`form-${primerakey}-${segundakey}-${i}`){
              document.getElementById(`form-${primerakey}-${segundakey}-${i}`).classList.add("showform");
            }else{
               document.getElementById(`form-${primerakey}-${segundakey}-${i}`).classList.remove("showform");
            }
        }
    }

     /*funcion para crear la imagen el texto color etc*/
    makeImg(primerakey,segundakey){
        this.getvalues(primerakey,segundakey);
        var valuestext    = [];
        var anotherVlaues = [
        "opacityimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "blurimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "brilloimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "rojoimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "verdeimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "azulimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "contrastimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "flipimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "invertimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "pixelarimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "rotateimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "afinarimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "filterimg"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
        "keyimg"];
        for(var v=1;v<=this.moretextCount[primerakey][segundakey][this.keyimages[primerakey][segundakey]];v++){
          valuestext.push(
            "text"+v+"img"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
            "size"+v+"img"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
            "up"+v+"img"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
            "down"+v+"img"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
            "align"+v+"img"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
            "color"+v+"img"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
            "position"+v+"img"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
            "angle"+v+"img"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey,
            "select-font"+v+"img"+this.keyimages[primerakey][segundakey]+"-"+primerakey+"-"+segundakey);
        }
       var allValues = valuestext.concat(anotherVlaues);
       var url       = "";
       for(var i=0;i<allValues.length;i++){
            if(i==0){
                url+=allValues[i]+"="+document.getElementById(allValues[i]).value;
            }else{
                if(allValues[i]=="keyimg"){
                  url+="&"+allValues[i]+"="+this.keyimages[primerakey][segundakey];
                }else{
                  url+="&"+allValues[i]+"="+document.getElementById(allValues[i]).value;
                }
            }
        }
        let img = document.getElementById(`imageneshow-${primerakey}-${segundakey}-${this.keyimages[primerakey][segundakey]}`).src;
        if(img.search("id")!=-1){
          img = img.split("?")[0];
        }
        url+="&numberTextValues="+this.moretextCount[primerakey][segundakey][this.keyimages[primerakey][segundakey]];
        url+="&image="+img;
        url+=`&folderDialy=-${primerakey}-${segundakey}`;
        url+=`&primerakey=${primerakey}`;
        url+=`&segundakey=${segundakey}`;
        let idimage =  Math.round(Math.random()*100000000);
        fetch(`${this.url}ScrapperImg/textimagen`,{
            method:"POST",
            body:url,
            headers:{
            'Accept':'application/JSON',
            'Content-Type':'application/x-www-form-urlencoded'  
            }
        }).then(data=>{
            data.json().then(dat=>{
                 document.getElementById(`imageneshow-${primerakey}-${segundakey}-${this.keyimages[primerakey][segundakey]}`).src=`http://localhost/scrapperTrooll/application/controllers/imgmadedialy-${primerakey}-${segundakey}/${dat.img}?id=${idimage}`;
            })
        })
    }
    /*cada vez que se ejecute un valor en los campos del texto los recogemos*/
    getvalues(primerakey,segundakey){
        for(var i =0;i<this.moretextCount[primerakey][segundakey][this.keyimages[primerakey][segundakey]];i++){
            this.values[primerakey][segundakey][i]  = {
                 "valuetext":document.getElementById(`text${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value,
                 "valuesize":document.getElementById(`size${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value,
                 "valuecolor":document.getElementById(`color${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value,
                 "valueheight":document.getElementById(`align${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value,
                 "valueposition":document.getElementById(`position${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value,
                 "valueangletext":document.getElementById(`angle${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value,
                 "valueleftright":document.getElementById(`up${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value,
                 "valueupdown":document.getElementById(`down${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value,
                 "valueselect-font":document.getElementById(`select-font${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value
            }
        }
    }

    /*cada vez que creemos un texto nuevo insertamos los valores correspondientes en los campos*/
    insertValues(bucle,primerakey,segundakey){
        for(var i=0;i<bucle;i++){
            if(this.values[primerakey][segundakey][i]["valuetext"]!=""){
                document.getElementById(`text${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value        = this.values[primerakey][segundakey][i]["valuetext"];
            }
            if(this.values[primerakey][segundakey][i]["valuesize"]!=""){
                document.getElementById(`size${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value        = this.values[primerakey][segundakey][i]["valuesize"];
            }
            if(this.values[primerakey][segundakey][i]["valuecolor"]!=""){
                document.getElementById(`color${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value       = this.values[primerakey][segundakey][i]["valuecolor"];
            }
            if(this.values[primerakey][segundakey][i]["valueheight"]!=""){
                document.getElementById(`align${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value       = this.values[primerakey][segundakey][i]["valueheight"];
            }
            if(this.values[primerakey][segundakey][i]["valueposition"]!=""){
                document.getElementById(`position${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value    = this.values[primerakey][segundakey][i]["valueposition"];
            }
            if(this.values[primerakey][segundakey][i]["valueangletext"]!=""){
                document.getElementById(`angle${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value       = this.values[primerakey][segundakey][i]["valueangletext"];
            }
            if(this.values[primerakey][segundakey][i]["valueleftright"]!=""){
                document.getElementById(`up${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value          = this.values[primerakey][segundakey][i]["valueleftright"];
            }
            if(this.values[primerakey][segundakey][i]["valueupdown"]!=""){
                document.getElementById(`down${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value        = this.values[primerakey][segundakey][i]["valueupdown"];
            } 
            if(this.values[primerakey][segundakey][i]["valueselect-font"]!=""){
                document.getElementById(`select-font${i+1}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).value = this.values[primerakey][segundakey][i]["valueselect-font"];
            }           
        }
   }
    /**funcion para la animacion de arriba abajo de la imagen**/
    animationTop(type,primerakey,segundakey){
        if(type=="add") this.margintop[primerakey][segundakey][this.keyimages[primerakey][segundakey]] = this.margintop[primerakey][segundakey][this.keyimages[primerakey][segundakey]]+10;
        if(type=="rest")this.margintop[primerakey][segundakey][this.keyimages[primerakey][segundakey]] = this.margintop[primerakey][segundakey][this.keyimages[primerakey][segundakey]]-10;
        var margin  = this.margintop[primerakey][segundakey][this.keyimages[primerakey][segundakey]];
        var pos     = this.posinitial[primerakey][segundakey][this.keyimages[primerakey][segundakey]];
        var opa     = 1;
        var opaci;
        var initial = setInterval(()=>{
            if(pos==this.margintop[primerakey][segundakey][this.keyimages[primerakey][segundakey]]){
                this.posinitial[primerakey][segundakey][this.keyimages[primerakey][segundakey]] = pos;
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
            document.getElementById(`imageneshow-${primerakey}-${segundakey}-${this.keyimages[primerakey][segundakey]}`).style.marginTop= pos+"0px";
            document.getElementById(`imageneshow-${primerakey}-${segundakey}-${this.keyimages[primerakey][segundakey]}`).style.opacity  = opaci;
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
    /**template para añadir mas texto a la imagen**/
    teemplateAddtext(newnumber,primerakey,segundakey){
        var html = `<div class="col-md-12 boxform" id="divtext${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}">
                <div class="row">
                    <div class="col-md-12 text-right divinsermoretext"><span title="borrar" class="removeNodetext" id="removetext" onclick="object.ScrapedDialy.removeNodetext(${newnumber},${primerakey},${segundakey})">X</span></div>
                    <div class="col-md-4">
                      <label class="labelformimg">Inserta el texto</label>
                      <input type="text" id="text${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}" placeholder="Insertar texto" class="form-control inputimg" onkeyup="object.ScrapedDialy.makeImg(${primerakey},${segundakey})">
                    </div>
                    <div class="col-md-4">

                      <label class="labelformimg">Inserta el tamaño del texto</label>
                      <input type="number" id="size${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}" placeholder="Inserta el tamaño del texto" class="form-control  inputimg" onkeyup="object.ScrapedDialy.makeImg(${primerakey},${segundakey})" onchange="object.ScrapedDialy.makeImg(${primerakey},${segundakey})">
                    </div>
                    <div class="col-md-4">
                      <label class="labelformimg">Inserta el color del texto</label>
                      <input type="color" id="color${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}"  placeholder="isertar color del texto" class="form-control inputimg" onchange="object.ScrapedDialy.makeImg(${primerakey},${segundakey})">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                    <label class="labelformimg">Inserta la altura del texto</label>
                    <select id="align${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}" placeholder="isertar altura del texto"  class="form-control inputimg" onchange="object.ScrapedDialy.makeImg(${primerakey},${segundakey})">
                        <option>top</option>
                        <option>bottom</option>
                        <option>middle</option>
                    </select>
                    </div>
                    <div class="col-md-4">
                        <label class="labelformimg">Inserta la posicion del texto</label>
                        <select id="position${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}" placeholder="isertar posicion texto" class="form-control inputimg" onchange="object.ScrapedDialy.makeImg(${primerakey},${segundakey})">
                            <option>center</option>
                            <option>right</option>
                            <option>left</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="labelformimg">Inserta el angulo del texto</label>
                        <input type="number" id="angle${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}" placeholder="Inserta el angulo del texto" class="form-control inputimg" onkeyup="object.ScrapedDialy.makeImg(${primerakey},${segundakey})" onchange="object.ScrapedDialy.makeImg(${primerakey},${segundakey})">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="labelformimg">Derecha izquierda</label>
                        <input type="range" class="form-control inputimg" id="up${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}" min="0" max="500" onchange="object.ScrapedDialy.makeImg(${primerakey},${segundakey})">
                    </div>
                    <div class="col-md-6">
                        <label class="labelformimg">Subir bajar texto</label>
                        <input type="range" class="form-control inputimg" id="down${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}" min="0" max="400" onchange="object.ScrapedDialy.makeImg(${primerakey},${segundakey})">
                    </div>
                </div>
                <div class="row select-font">
                  <div class="col-md-3 div-select-font">
                    <select id="select-font${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}" class="form-control" onchange="object.ScrapedDialy.selectFont(${newnumber},${primerakey},${segundakey})">
                    </select>
                  </div>
                  <div class="col-md-9">
                    <img id="img-show-font${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}" class="img-font" src="${this.url}CDN/imagenes/images-font/7pixelsofperfect0.png"/>
                  </div>
                </div>
        </div>`;
        return html;
    }
    cloneElement(newnumber,primerakey,segundakey){
        fetch(`${this.url}ScrapperImg/getDirectory`).then(directories=>{
            directories.json().then(images=>{
              var imagesfont = images.imagesfont;
              var files      = images.filesfont;
              for(var i in images.imagesfont){
                  document.getElementById(`select-font${newnumber}img${this.keyimages[primerakey][segundakey]}-${primerakey}-${segundakey}`).innerHTML+=`
                  <option value='${images.filesfont[i]}' id='optionfont${i}'>${images.imagesfont[i].slice(0,-4)}</option>
                  `;
              }
            })
        })
    }


    ///FUNCIONES PARA SCRAPEAR AMAZON y añadir productos

    buildArray(primerakey,segundakey){
        for(var i= 1;i<=9;i++){
            this.contentamazon[primerakey][segundakey][i]={};
            this.contentamazon[primerakey][segundakey][i].content="";
            this.contentamazon[primerakey][segundakey][i].palabra="";
        }
        return true;
    }
    getProduct(page=1,primerakey,segundakey){
        this.page[primerakey][segundakey] = page;
        if(document.getElementById('get-product'+primerakey+'-'+segundakey).value=="") return;
        document.getElementById('content-amazon'+primerakey+'-'+segundakey).innerHTML ='';
        document.getElementById('content-pages'+primerakey+'-'+segundakey).innerHTML  ='';
        if(this.contentamazon[primerakey][segundakey][this.page[primerakey][segundakey]].content.length>0){
            if(this.contentamazon[primerakey][segundakey][this.page[primerakey][segundakey]].palabra==document.getElementById('get-product'+primerakey+'-'+segundakey).value){
                var clase;
                document.getElementsByClassName('content-amazon'+primerakey+'-'+segundakey)[0].style.display="block";
                document.getElementById('content-pages'+primerakey+'-'+segundakey).innerHTML+=`<div class="col-md-12"><h5>Paginas:</h5></div>`;
                for(var i = 1;i<=9;i++){
                   if(this.page[primerakey][segundakey] == i) clase = "page-selected";
                   else clase = '';
                   document.getElementById('content-pages'+primerakey+'-'+segundakey).innerHTML+=`<div class="col-md-1 pages-amazon text-center ${clase}" id="page-${i}" onclick="object.ScrapedDialy.getProduct(${i},${primerakey},${segundakey})"><span>P</span><br><span>${i}</span></div>`
                }
                document.getElementById('content-amazon'+primerakey+'-'+segundakey).innerHTML+=this.contentamazon[primerakey][segundakey][this.page[primerakey][segundakey]].content;
                return;
            }
        }
        document.getElementsByClassName('content-amazon'+primerakey+'-'+segundakey)[0].style.display="block";
        document.getElementById('content-pages'+primerakey+'-'+segundakey).innerHTML  =`<div class="col-md-12 scrapper-product-animation"><h5>Escrapeando Productos <i class="fas fa-spider"></i></h5></div>`;
        this.contentamazon[primerakey][segundakey][this.page[primerakey][segundakey]].palabra = document.getElementById('get-product'+primerakey+'-'+segundakey).value;
        fetch(`${this.url}Scrapperamazon/GetScrapperamazonContent`,{
          method:"POST",
          body:`namecontent=${document.getElementById('get-product'+primerakey+'-'+segundakey).value}&page=${page}&primerakey=${primerakey}&segundakey=${segundakey}&dialy=true`,
          headers:{
            'Accept':'application/JSON',
            'Content-Type':'application/x-www-form-urlencoded'  
          }
        })
        .then(data=>{
            data.json().then(response=>{
                this.contentamazon[primerakey][segundakey][this.page[primerakey][segundakey]].content = response;
                var clase;
                document.getElementById('content-pages'+primerakey+'-'+segundakey).innerHTML='';
                document.getElementById('content-pages'+primerakey+'-'+segundakey).innerHTML+=`<div class="col-md-12"><h5>Paginas:</h5></div>`;
                for(var i = 1;i<=9;i++){
                   if(page == i) clase = "page-selected";
                   else clase = '';
                   document.getElementById('content-pages'+primerakey+'-'+segundakey).innerHTML+=`<div class="col-md-1 pages-amazon text-center ${clase}" id="page-${i}-${primerakey}-${segundakey}" onclick="object.ScrapedDialy.getProduct(${i},${primerakey},${segundakey})"><span>P</span><br><span>${i}</span></div>`
                }
                document.getElementById('content-amazon'+primerakey+'-'+segundakey).innerHTML+=response;
            })
        })
    }

    selectProduct(id,primerakey,segundakey,page){
        if(document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).style.visibility=="hidden"){
            document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).style.visibility="visible";
        }
        var button = document.createElement("BUTTON");
        button.setAttribute("class","button-selected-product"+primerakey+'-'+segundakey+'-'+page+ ' button-selected-product-dialy');
        button.setAttribute("id",`button-select-product-${id}-${primerakey}-${segundakey}-${page}`);
        button.setAttribute("title","Pulsa para quitar de la seleccion");
        button.setAttribute("onclick",`object.ScrapedDialy.selectOffProduct(${id},${primerakey},${segundakey},${page})`);
        button.style.border = "1px solid #698c7c"
        button.innerHTML = 'Seleccionado V';         
        document.getElementById(`product-box-${id}-${primerakey}-${segundakey}-${page}`).replaceChild(button,document.getElementById(`product-box-${id}-${primerakey}-${segundakey}-${page}`).childNodes[1])
        if(this.titleSelected[primerakey][segundakey]){
            document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).innerHTML=`<div class="col-md-12">
                <div class="row">
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-8 text-center">
                        <h5>Elementos Seleccionados:</h5>
                    </div>
                    <div class="col-md-2 text-right">
                        <span class="boton-get-productos" onclick="object.ScrapedDialy.addProductToContent(${primerakey},${segundakey});">Echo <i class="far fa-thumbs-up"></i></span> 
                    </div>
                </div>
            </div>`;
            document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).style.visibility="visible";
            this.titleSelected[primerakey][segundakey] = false;
        }
        document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).innerHTML+=`<div class='col-xl-4 col-lg-6 col-md-3 col-sm-6 col-12 each' id='selected-product-box-${id}-${primerakey}-${segundakey}-${page}'></div>`;
        document.getElementById(`selected-product-box-${id}-${primerakey}-${segundakey}-${page}`).innerHTML+=document.getElementById(`product-box-${id}-${primerakey}-${segundakey}-${page}`).innerHTML;
        document.getElementById(`selected-product-box-${id}-${primerakey}-${segundakey}-${page}`).removeChild(document.getElementById(`selected-product-box-${id}-${primerakey}-${segundakey}-${page}`).childNodes[1])
        this.contentamazon[primerakey][segundakey][this.page[primerakey][segundakey]].content = document.getElementById(`content-amazon${primerakey}-${segundakey}`).innerHTML;
    }
    selectOffProduct(id,primerakey,segundakey,page){
        if(document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).style.visibility=="hidden") document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).style.visibility="visible";
        if(document.getElementsByClassName('content-amazon'+primerakey+'-'+segundakey)[0].style.display=="none") document.getElementsByClassName('content-amazon'+primerakey+'-'+segundakey)[0].style.display="block"
        var button = document.createElement("BUTTON");
        button.setAttribute("class",`button-select-product`);
        button.setAttribute("id",`button-select-product-${id}-${primerakey}-${segundakey}-${page}`);
        button.setAttribute("onclick",`object.ScrapedDialy.selectProduct(${id},${primerakey},${segundakey},${page})`);
        button.innerHTML = 'Seleccionar';
        document.getElementById(`product-box-${id}-${primerakey}-${segundakey}-${page}`).replaceChild(button,document.getElementById(`product-box-${id}-${primerakey}-${segundakey}-${page}`).childNodes[1])
        document.getElementById(`selected-product-box-${id}-${primerakey}-${segundakey}-${page}`).remove();
        this.contentamazon[primerakey][segundakey][this.page[primerakey][segundakey]].content = document.getElementById(`content-amazon${primerakey}-${segundakey}`).innerHTML;

    }
    resetProduct(primerakey,segundakey){
        this.buildArray(primerakey,segundakey);
        document.getElementById('content-amazon'+primerakey+'-'+segundakey).innerHTML ='';
        document.getElementById('content-pages'+primerakey+'-'+segundakey).innerHTML  ='';
        document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).innerHTML ='';
        document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).style.visibility="hidden";
        document.getElementsByClassName('content-amazon'+primerakey+'-'+segundakey)[0].style.display="none";
        this.titleSelected[primerakey][segundakey] = true;

    }
    addProductToContent(primerakey,segundakey){

        document.getElementById(`delete-product-scrapper-${primerakey}-${segundakey}`).style.display = "block";
        document.getElementsByClassName(`content-amazon-parent${primerakey}-${segundakey}`)[0].style.display   = "none";
        document.getElementById(`contentScrapper${primerakey}-${segundakey}`).innerHTML+=`<div class="row" id="row-content-product-${primerakey}-${segundakey}"></div>`;
        document.getElementById(`row-content-product-${primerakey}-${segundakey}`).innerHTML=document.getElementById(`content-amazon-selected-${primerakey}-${segundakey}`).innerHTML;
        document.getElementById(`row-content-product-${primerakey}-${segundakey}`).childNodes[0].remove()
        for(var i = 0; i<document.getElementById(`row-content-product-${primerakey}-${segundakey}`).childNodes.length;i++){
          document.getElementById(`row-content-product-${primerakey}-${segundakey}`).childNodes[i].classList.remove("col-xl-4")
          document.getElementById(`row-content-product-${primerakey}-${segundakey}`).childNodes[i].classList.add("col-xl-3")
        }
        this.resetProduct(primerakey,segundakey);
    }
    addProductScrapper(primerakey,segundakey){
        fetch(`${this.url}Scrapperamazon/ScrapperamazonContent`)
        .then(response=>{
          response.json().then(data=>{
            document.getElementById(`div-product-scrapper-${primerakey}-${segundakey}`).innerHTML=data;
            this.initAmazonProducts(primerakey,segundakey);
          })
        })
    }

    initAmazonProducts(primerakey,segundakey){
        this.buildArray(primerakey,segundakey);
        var input      = document.getElementById('get-product');
        input.id       = `get-product${primerakey}-${segundakey}`;

        var buttonpush = document.getElementsByClassName('buton-push-amazon')[0];
        buttonpush.classList.remove('buton-push-amazon');
        buttonpush.classList.add(`buton-push-amazon${primerakey}-${segundakey}`);
        buttonpush.removeAttribute("onclick");
        buttonpush.setAttribute('onclick',`object.ScrapedDialy.getProduct(1,${primerakey},${segundakey})`); 

        var buttonreset = document.getElementsByClassName('button-reset-product')[0];
        buttonreset.classList.remove('button-reset-product');
        buttonreset.classList.add(`button-reset-product${primerakey}-${segundakey}`);
        buttonreset.removeAttribute("onclick");
        buttonreset.setAttribute('onclick',`object.ScrapedDialy.resetProduct(${primerakey},${segundakey})`);  

        var changeclassParent = document.getElementsByClassName('content-amazon-parent')[1];
        changeclassParent.classList.remove('content-amazon-parent');
        changeclassParent.classList.add(`content-amazon-parent${primerakey}-${segundakey}`);

        var changeclass = document.getElementsByClassName('content-amazon')[0];
        changeclass.classList.remove('content-amazon');
        changeclass.classList.add(`content-amazon${primerakey}-${segundakey}`);
        changeclass.classList.add(`all-content-amazon`);

        var contentPages          = document.getElementById('content-pages');
        contentPages.id           = `content-pages${primerakey}-${segundakey}`;

        var contentAmazon         = document.getElementById('content-amazon');
        contentAmazon.id          = `content-amazon${primerakey}-${segundakey}`;

        var contentAmazonSelected = document.getElementById('content-amazon-selected');
        contentAmazonSelected.id  = `content-amazon-selected-${primerakey}-${segundakey}`;

    }

    deleteContentAmazon(primerakey,segundakey){
        var content = `<h5>¿Esta seguro de querer borrar los articulos del contenido?</h5>
        <button type="button" id="yesdelete"><i class="fas fa-thumbs-up"></i> Si</button><button id="nodelete" type="button"><i class="far fa-thumbs-down"></i> No</button>`
        this.showModal(content);
        document.getElementById("nodelete").addEventListener("click",()=>{
          document.getElementById("emerg").style.display="none";
           return;
        })
        document.getElementById("yesdelete").addEventListener("click",()=>{
            document.getElementById(`delete-product-scrapper-${primerakey}-${segundakey}`).style.displayContent = "none";
            document.getElementById(`row-content-product-${primerakey}-${segundakey}`).remove();
            document.getElementById("emerg").style.display="none";
            document.getElementsByClassName(`content-amazon-parent${primerakey}-${segundakey}`)[0].style.display = "flex";
        })
    }
}
