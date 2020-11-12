class amazon extends general{
    
    constructor(url){
    	super();
    	this.url     = url;
        this.content = [];
        this.page;
        this.titleSlected = true;
        this.buildArray();
    }
    buildArray(){
        for(var i= 1;i<=9;i++){
            this.content[i]={};
            this.content[i].content="";
            this.content[i].palabra="";
        }
        return true;
    }
    getProduct(page=1){
        this.page = page;
    	if(document.getElementById('get-product').value=="") return;
        document.getElementById('content-amazon').innerHTML ='';
        document.getElementById('content-pages').innerHTML  ='';
        if(this.content[this.page].content.length>0){
            if(this.content[this.page].palabra==document.getElementById('get-product').value){
                var clase;
                document.getElementsByClassName('content-amazon')[0].style.display="block";
                document.getElementById('content-pages').innerHTML+=`<div class="col-md-12"><h5>Paginas:</h5></div>`;
                for(var i = 1;i<=9;i++){
                   if(page == i) clase = "page-selected";
                   else clase = '';
                   document.getElementById('content-pages').innerHTML+=`<div class="col-md-1 pages-amazon text-center ${clase}" id="page-${i}" onclick="object.Amazon.getProduct(${i})"><span>P ${i}</span></div>`
                }
                document.getElementById('content-amazon').innerHTML+=this.content[this.page].content;
                return;
            }
        }
        document.getElementsByClassName('content-amazon')[0].style.display="block";
        document.getElementById('content-pages').innerHTML  =`<div class="col-md-12 scrapper-product-animation"><h5>Escrapeando Productos <i class="fas fa-spider"></i></h5></div>`;
        this.content[this.page].palabra = document.getElementById('get-product').value;
    	fetch(`${this.url}Scrapperamazon/GetScrapperamazonContent`,{
	      method:"POST",
	      body:`namecontent=${document.getElementById('get-product').value}&page=${page}`,
	      headers:{
	        'Accept':'application/JSON',
	        'Content-Type':'application/x-www-form-urlencoded'  
	      }
	  	})
    	.then(data=>{
    		data.json().then(response=>{
                this.content[this.page].content = response;
                var clase;
                document.getElementById('content-pages').innerHTML='';
                document.getElementById('content-pages').innerHTML+=`<div class="col-md-12"><h5>Paginas:</h5></div>`;
                for(var i = 1;i<=9;i++){
                   if(page == i) clase = "page-selected";
                   else clase = '';
                   document.getElementById('content-pages').innerHTML+=`<div class="col-md-1 pages-amazon text-center ${clase}" id="page-${i}" onclick="object.Amazon.getProduct(${i})"><span>P ${i}</span></div>`
                }
    			document.getElementById('content-amazon').innerHTML+=response;
    		})
    	})
    }

    selectProduct(id,page){
        if(document.getElementById(`content-amazon-selected`).style.visibility=="hidden"){
            document.getElementById(`content-amazon-selected`).style.visibility="visible";
        }
        var button = document.createElement("BUTTON");
        button.setAttribute("class","button-selected-product");
        button.setAttribute("id",`button-select-product-${id}-${page}`);
        button.setAttribute("title","Pulsa para quitar de la seleccion");
        button.setAttribute("onclick",`object.Amazon.selectOffProduct(${id},${page})`);
        button.style.border = "1px solid #698c7c"
        button.innerHTML = 'Seleccionado V';         
        document.getElementById(`product-box-${id}-${page}`).replaceChild(button,document.getElementById(`product-box-${id}-${page}`).childNodes[1])
        if(this.titleSlected){
            var funcTioForEchoButton = "object.Scraper.addProductToContent()";
            if(window.location.pathname == "/scrapperTrooll/crear-pagina-contenido") funcTioForEchoButton = "object.Amazon.addProductTopageWordpress()";
            document.getElementById(`content-amazon-selected`).innerHTML=`<div class="col-md-12">
                <div class="row">
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-8 text-center">
                        <h5>Elementos Seleccionados:</h5>
                    </div>
                    <div class="col-md-2 text-right">
                        <span class="boton-get-productos" onclick="${funcTioForEchoButton};">Echo <i class="far fa-thumbs-up"></i></span> 
                    </div>
                </div>
            </div>`;
            document.getElementById(`content-amazon-selected`).style.visibility="visible";
            this.titleSlected = false;
        }
        document.getElementById('content-amazon-selected').innerHTML+=`<div class='col-xl-4 col-lg-6 col-md-3 col-sm-6 col-12 each' id='selected-product-box-${id}-${page}'></div>`;
        document.getElementById(`selected-product-box-${id}-${page}`).innerHTML+=document.getElementById(`product-box-${id}-${page}`).innerHTML;
        document.getElementById(`selected-product-box-${id}-${page}`).removeChild(document.getElementById(`selected-product-box-${id}-${page}`).childNodes[1])
        this.content[this.page].content = document.getElementById('content-amazon').innerHTML;
    }
    selectOffProduct(id,page){
        if(document.getElementById(`content-amazon-selected`).style.visibility=="hidden") document.getElementById(`content-amazon-selected`).style.visibility="visible";
        var button = document.createElement("BUTTON");
        button.setAttribute("class","button-select-product");
        button.setAttribute("id",`button-select-product-${id}-${page}`);
        button.setAttribute("onclick",`object.Amazon.selectProduct(${id},${page})`);
        button.innerHTML = 'Seleccionar';
        document.getElementById(`product-box-${id}-${page}`).replaceChild(button,document.getElementById(`product-box-${id}-${page}`).childNodes[1])
        document.getElementById(`selected-product-box-${id}-${page}`).remove();
        this.content[this.page].content = document.getElementById('content-amazon').innerHTML;
    }
    resetProduct(){
        this.buildArray();
        document.getElementById('content-amazon').innerHTML ='';
        document.getElementById('content-pages').innerHTML  ='';
        document.getElementById('content-amazon-selected').innerHTML ='';
        document.getElementById(`content-amazon-selected`).style.visibility="hidden";
        document.getElementsByClassName('content-amazon')[0].style.display="none";
        this.titleSlected = true;

    }

    getAllBlogs(){
        var select = document.getElementById("blogs-for-scrapper-amazon");
        fetch(`${this.url}Misblogs/get_blogs`)
        .then(dataBlogs =>{
            dataBlogs.json().then(data=>{
                document.getElementsByClassName('span-selected')[0].innerHTML = data[0].name_blog;
                for(var i in data){
                    var option = document.createElement("option");
                    option.setAttribute("value",data[i].url_name);
                    option.text = data[i].name_blog;
                    select.add(option);
                }
            })
        })
    }
    changeBlog(){
        var index = document.getElementById("blogs-for-scrapper-amazon").selectedIndex+1;
        document.getElementsByClassName('span-selected')[0].innerHTML = document.getElementById("blogs-for-scrapper-amazon").childNodes[index].text;
        document.getElementsByClassName('span-selected')[0].classList.remove('span-selected-animation');
        document.getElementsByClassName('span-selected')[0].classList.add('span-selected-animation');
    }
    addProductTopageWordpress(){
        var content = `
                    <div class="row">
                        <div class='col-md-12 text-right'>
                            <i class="far fa-times-circle close-modal-content" id="close-modal"></i>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col-md-12'>
                            <input class="form-control" id="name-for-page" placeholder="Inserta el nombre de la pagina">
                        </div>
                         <div class='col-md-12 text-right'>
                            <button id="create-page" class="btn btn-outline-primary button-create-page">Crear Pagina</button>
                        </div>
                        <div class='col-md-12 text-left error'>
                            
                        </div>
                    </div>`
        this.showModal(content);

        document.getElementById('close-modal').addEventListener('click',()=>{
            document.getElementById("emerg").style.display="none";
            return
        })
        document.getElementById('create-page').addEventListener('click',()=>{
            if(document.getElementById('name-for-page').value=='') return document.getElementsByClassName('error')[0].innerHTML ="Rellena el campo del nombre";
            document.getElementById('content-amazon-selected').childNodes[0].remove();
            const formData = new FormData();
            var headerContent = document.getElementById('content-title-page').value;
            var contentAmazon = document.getElementById('content-amazon-selected').innerHTML;
            var titleH2 = document.getElementById('title-h2').value;
            var contentFooter = document.getElementById('content-footer-page').value;
            var allcontent = "<div class='content-entry-page'>"+headerContent+"</div><div class='row'>"+contentAmazon+"</div><div class='content-footer-page'><h2 class='title-footer-content'>"+titleH2+"</h2>"+contentFooter+"</div>";
            formData.append("content",allcontent);
            formData.append('namepage',document.getElementById('name-for-page').value);
            formData.append('urlBlogWordpress',document.getElementById('blogs-for-scrapper-amazon').value);
            fetch(`${this.url}Scrapper/publishOnWordpressPage`,{
              method:"POST",
              body:formData,
            }).then(response=>{
                response.json().then(data=>{
                    console.log("eeeeeeeeee",data)
                    /*document.getElementById("emerg").innerHTML='';
                    document.getElementById("emerg").style.display="none";
                    this.resetProduct()*/
                    return;
                })
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
}