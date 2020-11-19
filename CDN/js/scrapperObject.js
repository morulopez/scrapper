class scrapper extends general{
    constructor(url){
      super();
      this.cargando          = false;
      this.display           = false;
      this.url               = url;
      this.number            = 0;
      this.forminput         = [];
      this.formtype          = [];
      this.content;
      this.recuperarcontent  = false;
      this.contentrecuperado;
      this.arrayfilter       = [true,false,true,false,true,true];
      this.newUrl;
      this.english           = false;
      this.contentEnglish;
      this.saveTileForcheck;
    }
    getNewUrl(objt){
      this.newUrl=objt.value;
    }
    getScraper($urlAmano=false){
      var div = document.getElementById('contentScrapper');
      div.classList.remove("contentScrapper");
      var modal = document.getElementById('parentmodal');
      modal.style.display="block";
      document.getElementById("errordiv").innerHTML="";
      div.innerHTML='';
      let key = ["selectblog","url","ancorpost","title","content","typeancorpost","typetitle","typecontent"];
      var obj = {};
      var form = document.getElementsByTagName('form');
      for(var i=0; i< form[0].length;i++){
        if(document.getElementsByName([key[i]])[0].value.length<1){
          return document.getElementById("errordiv").innerHTML="Todas los campos tienes que rellenarlos por favor";
        }
        if($urlAmano){
          obj["newUrl"]= this.newUrl;
        }else{
          obj[key[i]]= document.getElementsByName([key[i]])[0].value;
        }
        $urlAmano=false
      }
      fetch(`${this.url}Scrapper/getscraper`,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
          'Accept':'application/JSON',
          'Content-Type':'application/x-www-form-urlencoded'  
        }
      }).then(response=>{
        response.json().then(scrapp => {
           if(scrapp.error){
            document.getElementById("errordiv").innerHTML=scrapp.error;
           }else if(scrapp.errorenlacemodif){
            div.classList.add("contentScrapper");
            div.innerHTML=scrapp.errorenlacemodif;
           }else{
            document.getElementsByClassName('add-product-scrapper')[0].style.display = "block";
            document.getElementById('add-product-scrapper').classList.add("contentScrapper");
            this.saveTileForcheck = scrapp.title_for_check
            div.classList.add("contentScrapper");
            div.innerHTML+=scrapp.content;
            var divimg = document.getElementById('contentScrapperimg');
            divimg.classList.add("contentScrapper");
            divimg.innerHTML=scrapp.img;
            divimg.innerHTML+=`<div class="row">
                <div class='col-md-12 text-center'>
                <button type='button' class='buttonimages' onclick='object.Images.selectOtherImages()'>Seleccionar otras imagenes</button>
                <button type='button' class='buttonimages' onclick='object.Images.downloadImages()' id='buttondownloadImg' disabled><i class='fas fa-file-image'></i> Descargar imagenes</button>
              </div>
            </div>`;
            document.getElementById('secondformid').style.display='block';
           }
           if(document.getElementById('languaje').value=="en"){
             this.translate("es");
             setTimeout(()=>{ 
                this.contentrecuperado = document.getElementById("contentScrapper").innerHTML;
              }, 3000);
           }else{
            this.contentrecuperado = document.getElementById("contentScrapper").innerHTML;
           }
           modal.style.display="none";
        })
    })
  }
  /**Funcion para traducir el contenido, el select de goolgle le damos u n value de español y creamos un evento change para que se dispare solo */
  translate(len){
    document.getElementsByClassName("goog-te-combo")[0].value='en';
     var evt = new Event('change');
    document.getElementsByClassName("goog-te-combo")[0].dispatchEvent(evt);
    setTimeout(()=>{ 
          document.getElementsByClassName("goog-te-combo")[0].value=len;
          var ev = new Event('change');
          document.getElementsByClassName("goog-te-combo")[0].dispatchEvent(ev);
    }, 3000);
  }
     /*con esta funcion creamos elements coon input y select para poder insertar los filtros que queramos*/
  moreFilter(number){
    var form = document.getElementById('formfilter');
    var div = document.createElement('div');
    if(this.forminput.length==0){
      this.number=0;
      number = 0;
    }
    div.setAttribute("id", "element"+this.number);
    div.innerHTML=`
        <div class="row">
          <div class="col-md-6">
              <input class="form-control inputfilter" id="input${this.number}" type="text" placeholder="Inserta que quieres eliminar">
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-2 type">
                <span>Type:</span>
              </div>
              <div class="col-md-8 select">
                <select class="form-control tagfilter" id="type${this.number}">
                    <option value='class'>class</option>";
                    <option value='id'>id</option>";
                    <option value='tag'>tag</option>";
                    <option value='plaintext'>texto plano</option>";
                </select>
              </div>
              <div class="col-md-2">
                <i class="fas fa-trash-alt" onclick="object.Scraper.removefilter(${this.number})"></i>
              </div> 
            </div>
          </div>
         </div>
    `;
    this.forminput.push(`input${this.number}`);
    this.formtype.push(`type${this.number}`);
    form.appendChild(div);
    this.number = number +1;

  }
  /**function para scrapear de nnuevo con los filtros que hayamos puesto */
  filter(){
    var form = document.getElementById('formfilter');
    if(form.length<1){
      return;
    }
    document.getElementById('errorfilter').style.display="none";
    var obj = {};
    for(var i=0; i< this.forminput.length;i++){
      var tag = document.getElementById(`type${i}`).value;
      var input = document.getElementById(`input${i}`).value;
      if(input==""){
        return document.getElementById('errorfilter').style.display="block";
      }
      obj[i] =[{key:tag,value:input}];
      }
      var modal = document.getElementById('parentmodalfilter');
      modal.style.display="block";
      var div = document.getElementById('contentScrapper');
      div.classList.remove("contentScrapper");
      div.innerHTML="";
    fetch(`${this.url}Scrapper/getscraperwhitdFilter`,{
      method:"POST",
      body:JSON.stringify(obj),
      headers:{
        'Accept':'application/JSON',
        'Content-Type':'application/x-www-form-urlencoded'  
      }
    }).then(response=>{
          response.json().then(scrapp => {
            div.classList.add("contentScrapper");
            div.innerHTML=scrapp.content;
            modal.style.display="none";
          })
      })
  }
  removefilter(key){
    this.forminput.splice(0,1);
    document.getElementById("element"+key).remove();
    /*a la hora de remover un div creamos un bucle y cambiamos de nuevo todos los id con su numero para que no haya desequilibrio en los numeros
    osea que haya un input cn el id=input1 y otro por ejemplo con el id=input10 ya que en el for de arriba en la funcion filter() a la hora de recorrer este form 
    para obtener los datos daria error por que lo recorremos con el length por tanto si hay dos elementos y uno de ellos tiene el id=input10 daria error*/
    var form = document.getElementById('formfilter');
    for(var i=0; i<this.forminput;i++){
       document.getElementsByClassName("inputfilter")[i].id="input"+i;
       document.getElementsByClassName("tagfilter")[i].id="type"+i;
    }
  }
  /*funcion para retroceder*/
  back(){
    var content = `<h5>Si retrocede perdera todos los cambios.¿Esta seguro de retroceder?</h5>
    <button type="button" id="yesback"><i class="fas fa-thumbs-up"></i> Si</button><button id="noback" type="button"><i class="far fa-thumbs-down"></i> No</button>`
     this.showModal(content);
     document.getElementById("noback").addEventListener("click",()=>{
       document.getElementById("emerg").style.display="none";
       return;
    })
    document.getElementById("yesback").addEventListener("click",()=>{
      fetch(`${this.url}ScrapperImg/removeAllimages`,{
          method:"POST",
          body:"removeallimg="+true,
          headers:{
            'Accept':'application/JSON',
            'Content-Type':'application/x-www-form-urlencoded'  
          }
      }).then(response=>{
          response.json().then(data=>{
            console.log(data)
            document.getElementsByClassName("secondform")[0].style.display="block";
            document.getElementsByClassName("div-button")[0].style.display="block"; 
            document.getElementById("contentScrapperimg").classList.add("contentScrapper");
            document.getElementById("contentScrapperimg").style.display="block";
            document.getElementById("makeimages").innerHTML="";
            document.getElementsByClassName("text-right")[0].classList.remove("col-md-12");
            document.getElementById("emerg").style.display="none";
          })
      })
    })
  }
  /*con esta funcion pasamos el contenido al textarea y lo dejamos listo para editarlo a man*/
  editcontent(){
    document.getElementById('errorfilter').style.display="none";
    this.displayElement();
    document.getElementById("contentScrapper").style.display="none";
    document.getElementById("textacontent").style.visibility="visible";
    document.getElementById("textarea").setAttribute("rows", "20");
    this.content= document.getElementById('contentScrapper').innerHTML;
    if(this.recuperarcontent){
        document.getElementById("textarea").value=this.contentrecuperado;
        this.recuperarcontent = false;
    }else{
        document.getElementById("textarea").value=this.content;
        document.getElementById("textarea").innerHTML=this.content;
    }
  }
  /*con esta funcion pasamos al div del contenido el contenido editado a mano*/
  editedcontent(){
    this.displayContent();
    this.content = document.getElementById("textarea").value;
    document.getElementById('contentScrapper').innerHTML=this.content;
  }
  /*con esta funcion recuperamos todo el contenido de nuevo*/
  recuperarall(){
    this.content = this.contentrecuperado;
    document.getElementById("textarea").value=this.contentrecuperado;
    document.getElementById('contentScrapper').innerHTML='';
    document.getElementById("textarea").innerHTML=this.contentrecuperado;
    document.getElementById('contentScrapper').innerHTML=this.contentrecuperado;
    this.recuperarcontent = true;
  }
   /*con esta funcion recuperamos el con tenido y lo dejamos preparado para scrapearlo con filtro de nuevo*/
  editcontentWhitFilter(){
    this.displayElement();
    this.displayContent();
    this.content = this.contentrecuperado;
    document.getElementById('contentScrapper').innerHTML=this.contentrecuperado;
  }
    /*con esta funcion pasamos el contenido editado a mano al div donde tenemos el contenido escrapeado*/
  done(){
    this.displayElement();
    this.displayContent();
    this.content=document.getElementById("textarea").value;
    document.getElementById('contentScrapper').innerHTML=this.content;
  }
     /*con esta mostramos el div del contenido o el textarea segun el boton que pulsemos*/
  displayContent(){
    document.getElementById("contentScrapper").style.display="block";
    document.getElementById("textacontent").style.visibility="hidden";
    document.getElementById("textarea").removeAttribute("rows");
    document.getElementById('contentScrapper').innerHTML='';
  }
     /*con esta funcion mostranoos los elementoos que necesitamos que se muestren*/
  displayElement(){
    var array = ["editamano","editwhitfilter","titleselect","buttonEditamano","formfilter","buttonEditfilter"]
    for(var i=0;i<array.length;i++){
       this.arrayfilter[i]=!this.arrayfilter[i];
      if(this.arrayfilter[i]){
        document.getElementById(array[i]).style.display="block"
      }else{
        document.getElementById(array[i]).style.display="none"
      }
    }
  }  
 
  /*funcion para crear contenido de la ventana modal*/
   showModal(content){
    document.getElementById("emerg").style.display="block";
    document.getElementById("boxhtml").innerHTML="";
    document.getElementById("boxhtml").innerHTML=content;
    return true;
   }

   /***Funcion para guardar blog**/
   saveBlog(keyimages){
      let title = document.getElementById("contentScrapper").children[0].innerHTML;

      document.getElementById("contentScrapper").children[0].remove();
      const formData = new FormData();
      let contentScraped = document.getElementById("contentScrapper").innerHTML;
      contentScraped     = contentScraped.replace(/&nbsp;/g, "");
      formData.append("contentScraped",contentScraped);
      formData.append("title",title);
      formData.append("languajeBlog",document.getElementById("languaje").value);
      formData.append("belongBlog",document.getElementsByName("selectblog")[0].value);
      formData.append("urlblog",document.getElementsByName("url")[0].value);
      formData.append("ancorpost",document.getElementsByName("ancorpost")[0].value);
      formData.append("typeancorpost",document.getElementsByName("typeancorpost")[0].value);
      formData.append("titlefilter",document.getElementsByName("title")[0].value);
      formData.append("typetitle",document.getElementsByName("typetitle")[0].value);
      formData.append("contentfilter",document.getElementsByName("content")[0].value);
      formData.append("typecontent",document.getElementsByName("typecontent")[0].value);

      var form           = document.getElementById('formfilter');
      if(this.forminput.length>0){
          var obj           = {};
          for(var i=0; i< this.forminput.length;i++){
            var tag = document.getElementById(`type${i}`).value;
            var input = document.getElementById(`input${i}`).value;
            if(input==""){
              return document.getElementById('errorfilter').style.display="block";
            }
            obj[i] ={key:tag,value:input};
          }
      }else{
        var obj = "empty";
      }
      let img = document.getElementById("imageneshow"+keyimages).src;
      if(img.search("id")!=-1){
        img = img.split("?")[0];
      }

      formData.append("img",img);
      formData.append("filteramano",obj);
      formData.append("saveTileForcheck",this.saveTileForcheck);

       fetch(`${this.url}Scrapper/saveDataBlog`,{
        method:"POST",
        body:formData
      }).then(response=>{
        response.json().then(scrapp => {
            if(scrapp){
              this.flash("<h6><i class='fas fa-check'></i> Blog Creado y contenido publicado correctamente</h6>","flags");
              setTimeout(()=>{ window.location.reload()}, 3000);
            }else{
              this.flash("<h6><i class='fas fa-check'></i>Hubo un error al publicar y crear el blog</h6>","Error");
            }
        })
    })
  }
  addProductScrapper(){
    fetch(`${this.url}Scrapperamazon/ScrapperamazonContent`)
    .then(response=>{
      response.json().then(data=>{
        document.getElementById('div-product-scrapper').innerHTML=data;
      })
    })
  }

  addProductToContent(){
    document.getElementsByClassName("delete-product-scrapper")[0].style.display = "block";
    document.getElementsByClassName("content-amazon-parent")[1].style.display   = "none";
    document.getElementById('contentScrapper').innerHTML+=`<div class="row" id="row-content-product"></div>`;
    document.getElementById('row-content-product').innerHTML=document.getElementById('content-amazon-selected').innerHTML;
    document.getElementById('row-content-product').childNodes[0].remove()
    for(var i = 0; i<document.getElementById('row-content-product').childNodes.length;i++){
      document.getElementById('row-content-product').childNodes[i].classList.remove("col-xl-4")
      document.getElementById('row-content-product').childNodes[i].classList.add("col-xl-3")
    }
  }

  deleteContentAmazon(){
    var content = `<h5>¿Esta seguro de querer borrar los articulos del contenido?</h5>
      <button type="button" id="yesdelete"><i class="fas fa-thumbs-up"></i> Si</button><button id="nodelete" type="button"><i class="far fa-thumbs-down"></i> No</button>`
    this.showModal(content);
    document.getElementById("nodelete").addEventListener("click",()=>{
      document.getElementById("emerg").style.display="none";
       return;
    })
    document.getElementById("yesdelete").addEventListener("click",()=>{
      document.getElementsByClassName("delete-product-scrapper")[0].style.display = "none";
      document.getElementById("row-content-product").remove();
      document.getElementById("emerg").style.display="none";
     document.getElementsByClassName("content-amazon-parent")[1].style.display   = "flex";
    })
    

  }

}
