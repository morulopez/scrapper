class blog extends general{
	constructor(url){
		super();
		this.url = url;
		this.content = [];
		this.getAllBlogs();
		this.get_blog_detail();
	}
	createNewBlog(){
		if( document.getElementsByName("blogname")[0].value=="" || document.getElementsByName("urlblog")[0].value==""){
	      return;
	    }
	    const obj={blogname: document.getElementsByName("blogname")[0].value,urlblog:document.getElementsByName("urlblog")[0].value};
	    fetch(`${this.url}Misblogs/newblog`,{
	      method:"POST",
	      body:JSON.stringify(obj),
	      headers:{
	        'Accept':'application/JSON',
	        'Content-Type':'application/x-www-form-urlencoded'  
	      }
	    }).then(data=>{
	      data.json().then(newblog=>{
	        this.closeModal();
	        this.flash("<h6><i class='fas fa-check'></i> Blog creado correctamente</h6>","flags");
	        document.getElementsByName("selectblog")[0].innerHTML ="";
	        this.getAllBlogs()
	      })
	    })
	} 
	getAllBlogs(){
		fetch(`${this.url}Misblogs/get_blogs`)
		.then(dataBlogs =>{
			dataBlogs.json().then(data=>{
				if(window.location.pathname=="/scrapperTrooll/mis-blogs"){
					this.makeViewMisBlogs(data)
				}else if(window.location.pathname=='/scrapperTrooll/'){
					this.makeSelect(data)
				}
			})
		})
	}
	/*Funcion para crear la vista con la data de los blogs en la ruta mis-blogs*/
	makeViewMisBlogs(data){
		for(var i in data){
			document.getElementById("datablogs").innerHTML +=`
			<div class="row">
				<div class="col-md-7 col-lg-9 eachrowmisblogs">
					<div class="row rowmis-blogs">
						<div class="col-md-12 col-lg-12">
							<div class="row">
							    <div class="col-md-3 col-lg-4">
							    	<div class="inputnewname" id="divnewname${i}">
										<input type="text" class="form-control" id="newname${i}" value="${data[i].name_blog}">
									</div>
									<div class="currentname" id="currentname${i}">${data[i].name_blog}</div>
								</div>
								<div class="col-md-3 col-lg-4 text-left">
									<div class="inputnewurl" id="divnewurl${i}">
										<input type="text" class="form-control" id="newurl${i}" value="${data[i].url_name}">
									</div>
									<div class="currenturl" id="currenturl${i}"><a href="${data[i].url_name}" target="blank">${data[i].url_name}</a></div>
								</div>
								<div class="col-md-1">
									<span class="update" onclick="object.Blog.changeInput(${i},${data[i].ID})" id="update${i}"><i class="fas fa-edit" title="editar"></i></span>
									<span class="fingerup" id="finger${i}" title="actualizar"><i class="fas fa-thumbs-up"></i></span>	
								</div>
								<div class="col-md-3 col-lg-3 text-center">
									<span onclick="object.Blog.details(${data[i].ID})" class="butoninfoblogs"><i class="fas fa-info"></i> Ver detalles</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`
		}
	}
	/*funcion para actualizar datos del blog*/
	changeInput(id,idblog){
		document.getElementById(`divnewname${id}`).style.display  = "block";
		document.getElementById(`divnewurl${id}`).style.display   = "block";
		document.getElementById(`finger${id}`).style.display      = "block";
		document.getElementById(`currentname${id}`).style.display = "none";
		document.getElementById(`currenturl${id}`).style.display  = "none";
		document.getElementById(`update${id}`).style.display      = "none";
		document.getElementById(`finger${id}`).addEventListener('click',()=>{

			fetch(`${this.url}Misblogs/updateDataBlog`,{
		      method:"POST",
		      body:`idblog=${idblog}&new_name=${document.getElementById("newname"+id).value}&new_url=${document.getElementById("newurl"+id).value}`,
		      headers:{
		        'Accept':'application/JSON',
		        'Content-Type':'application/x-www-form-urlencoded'  
		      }
		  	})
			.then(dataupdate =>{
				dataupdate.json().then(data=>{
					document.getElementById(`divnewname${id}`).style.display  = "none";
					document.getElementById(`divnewurl${id}`).style.display   = "none";
					document.getElementById(`finger${id}`).style.display      = "none";
					document.getElementById(`currentname${id}`).style.display = "block";
					document.getElementById(`currenturl${id}`).style.display  = "block";
					document.getElementById(`update${id}`).style.display      = "block";
					this.flash("<h6><i class='fas fa-check'></i> Datos actualizados correctamente</h6>","flags");
					document.getElementById("datablogs").innerHTML="";
					document.getElementById("datablogs").innerHTML+=`
					<div class="row ">
						<div class="col-md-7 parenttabs">
							<div class="row tabs">
							    <div class="col-md-4 col-lg-4 text-center tab">
							    	<span>Nombre Blog</span>
								</div>
								<div class="col-md-4 col-lg-4 text-center tab">
									<span>Url Blog</span>
								</div>
							</div>
						</div>
					</div>`
					this.getAllBlogs();
				})
			})
		})

	}

	/*Funcion para crear el select en la pagina scrapperblogs a partir de todos los blogs que tenemos*/
	makeSelect(data){
		var select = document.getElementsByName("selectblog")[0];
		var html;
		for(var i in data){
			var option = document.createElement("option"); 
			option.setAttribute("value", data[i].ID);
			option.text = data[i].name_blog;
			select.add(option);
		}
	}
	
  	 /**Funcion para cargar el html a una ventana modal para posteriormente insertar un blog nuevo */
	newBlog(){
	   fetch(`${this.url}controllermodal/newblogmodal`)
	    .then(dataModal=>{
	      dataModal.json().then(modal=>{
	        document.getElementById('parentmodalInsertBlog').style.display="block";
	        document.getElementById("modalNewBlog").innerHTML=modal;
	      })
	    })
	}

	/*Funcion para cargar en un modal los detalles de los blogs relacionados escrapeados*/
	details(id){
		window.location.href=this.url+"detalles-blog/"+id;
	}

	get_blog_detail(){
		if(window.location.pathname.split('/')[2]=="detalles-blog"){
			var idBlog = window.location.pathname.split('/');
			fetch(`${this.url}Misblogs/get_blog/${idBlog[idBlog.length-1]}`)
		    .then(datablog=>{
		      datablog.json().then(blogDetails=>{
		    	document.getElementsByClassName('firstdiv')[0].innerHTML+=`
		    	<div class="row">
		    		<div class="col-md-2">
		    			Url del blog:
		    		</div>
		    		<div class="col-md-6 text-left">
		    			<a href="${blogDetails[0].url_name}" target="blank">${blogDetails[0].url_name}</a>
		    		</div>
		    	</div>
		    	<div class="row">
		    		<div class="col-md-2">
		    			Nombre del blog:
		    		</div>
		    		<div class="col-md-6">
		    			${blogDetails[0].name_blog.charAt(0).toUpperCase() + blogDetails[0].name_blog.slice(1)}
		    		</div>
		    	</div>
		    	<div class="row title-relacionados">
		    		<div class="col-md-12 text-center">
		    			<u><h2>${!blogDetails[0].url_name_scrapper ? 'Sin blog para Scrapear' : 'Blog relacionados para Scrapear'}</h2></u>
		    		</div>
		    	</div>
		    	`;
		    	if(!blogDetails[0].url_name_scrapper) return;
		 
		    	let parimparTitleBlog = "impar-title";
		    	for(var i in blogDetails){
		    		document.getElementsByClassName('firstdiv')[0].innerHTML+=`
		    			<div class="row each-div-relacionados-${parimparTitleBlog}">
				    		<div class="col-md-3">
				    			Url del blog a Scrapear :
				    		</div>
				    		<div class="col-md-6 text-left">
				    			<div class="input-relacionados" id="div_url_name_scrapper${i}">
				    				<input type="text" class="form-control" title="Pulsa Enter para actualizar" value="${blogDetails[i].url_name_scrapper}" id="url_name_scrapper${i}" onkeypress="object.Blog.updateData('url_name_scrapper',${blogDetails[i].id_blog_scrapper},${i},event,'url_name_scrapper_change${i}','div_url_name_scrapper${i}','url_name_scrapper${i}')">
				    			</div>
				    			<span class="change-relacionados" title="Pulsa para actualizar" id="url_name_scrapper_change${i}" onclick='object.Blog.showInputChange("div_url_name_scrapper${i}","url_name_scrapper_change${i}")'>${blogDetails[i].url_name_scrapper}</span>
				    		</div>
				    		<div class="col-md-3 text-right icon-candados">
				    			<i class="fas fa-lock" title="Ver informacion" id="close${i}" onclick="object.Blog.showinfo(${i})"></i>
				    			<i class="fas fa-lock-open open-icon" title="Cerrar" id="open${i}" onclick="object.Blog.closeinfo(${i})"></i>
				    		</div>
				    		<div class="col-md-12 info-relacionados" id="info${i}">
				    			<div class="row">
					    			<div class="col-md-4 text-center header-info">
					    				Filtro del post
					    			</div>
					    			<div class="col-md-4 text-center header-info">
					    				Filtro del titulo
					    			</div>
					    			<div class="col-md-4 text-center header-info">
					    				Filtro del contenido
					    			</div> 
					    			<div class="col-md-4 text-center body-info">
					    				<div class="input-relacionados" id="div_filter_post${i}">
					    					<input type="text" class="form-control" title="Pulsa Enter para actualizar" value="${blogDetails[i].filter_post}" id="filter_post${i}" onkeypress="object.Blog.updateData('filter_post',${blogDetails[i].id_blog_scrapper},${i},event,'filter_post_change${i}','div_filter_post${i}','filter_post${i}')">
				    					</div>
				    					<span class="change-relacionados" title="Pulsa para actualizar" id="filter_post_change${i}" onclick='object.Blog.showInputChange("div_filter_post${i}","filter_post_change${i}")'>${blogDetails[i].filter_post}</span>
					    			</div>
					    			<div class="col-md-4 text-center body-info">
					    				<div class="input-relacionados" id="div_filter_title${i}">
					    					<input type="text" class="form-control" title="Pulsa Enter para actualizar" value="${blogDetails[i].filter_title}" id="filter_title${i}" onkeypress="object.Blog.updateData('filter_title',${blogDetails[i].id_blog_scrapper},${i},event,'filter_title_change${i}','div_filter_title${i}','filter_title${i}')">
				    					</div>
				    					<span class="change-relacionados" title="Pulsa para actualizar" id="filter_title_change${i}" onclick='object.Blog.showInputChange("div_filter_title${i}","filter_title_change${i}")'>${blogDetails[i].filter_title}</span>
					    			</div>
					    			<div class="col-md-4 text-center body-info">
					    				<div class="input-relacionados" id="div_filter_content${i}">
					    					<input type="text" class="form-control" title="Pulsa Enter para actualizar" value="${blogDetails[i].fil_content}" id="filter_content${i}" onkeypress="object.Blog.updateData('fil_content',${blogDetails[i].id_blog_scrapper},${i},event,'filter_content_change${i}','div_filter_content${i}','filter_content${i}')">
				    					</div>
				    					<span class="change-relacionados" title="Pulsa para actualizar" id="filter_content_change${i}" onclick='object.Blog.showInputChange("div_filter_content${i}","filter_content_change${i}")'>${blogDetails[i].fil_content}</span>
					    			</div>
				    			</div>
				    			<div class="row count-content-blog">
						    		<div class="col-md-6">
						    			Numero de post : ${blogDetails[i]['content'].length}
						    		</div>
						    		<div class="col-md-12 div-show-content" id="divshow-content${i}">
						    		</div>
				    			</div>
				    		</div>
				    	</div>
		    		`
		    		if(parimparTitleBlog=="impar-title") parimparTitleBlog = "par-title";
		    		else parimparTitleBlog="impar-title"
		    		let parimpar = "impar";
		    		for(var c in blogDetails[i]['content']){
		    			this.content[i] = blogDetails[i]['content'];
		    			document.getElementById(`divshow-content${i}`).innerHTML+=`
		    			<div class="row info-content-${parimpar}" onclick="object.Blog.showContent(${i},${c})">
		    				<div class="col-md-2">
		    					Titulo :
		    				</div>
		    				<div class="col-md-10">
		    					${blogDetails[i]['content'][c]['title'].trim()}
		    				</div>
		    			</div>
		    			`
		    			if(parimpar=="impar") parimpar = "par";
		    			else parimpar="impar"
		    		}
		    	}
		      })
		    })
		}else{
			return false;
		}
	}
	showinfo(id){
		document.getElementById('info'+id).style.display="block";
		document.getElementById('close'+id).style.display="none";
		document.getElementById('open'+id).style.display="block";
	}
	closeinfo(id){
		document.getElementById('info'+id).style.display="none";
		document.getElementById('close'+id).style.display="block";
		document.getElementById('open'+id).style.display="none";
	}
	showInputChange(elementShow,elementNone){
		document.getElementById(elementShow).style.display="block";
		document.getElementById(elementNone).style.display="none";
	}
	updateData(fieldToupdate,id_blog_scrapper,id,event,elementShow,elementNone,elementValue){
		if(event.keyCode==13){
			var pathController;
			if(fieldToupdate=="url_name_scrapper") pathController = "updateBlogScrapper";
			else pathController = "updateFilter";
			fetch(`${this.url}Misblogs/${pathController}`,{
			  	method:"POST",
		      	body:`fieldToupdate=${fieldToupdate}&value=${document.getElementById(elementValue).value}&id_blog_scrapper=${id_blog_scrapper}`,
		      	headers:{
		        'Accept':'application/JSON',
		        'Content-Type':'application/x-www-form-urlencoded'  
			}}).then(result=>{
				result.json().then(data=>{
					this.flash("<h6><i class='fas fa-check'></i> Datos actualizados correctamente</h6>","flags");
					var elInput = document.getElementById(elementNone);
					elInput.style.display	= "none";
					var elSpan              = document.getElementById(elementShow);
					elSpan.innerHTML		= document.getElementById(elementValue).value;
					elSpan.style.display 	= "block";
					return;
				})
			})
		}else{
			return;
		}
	}
	showContent(firstKey,secondkey){
		let content = this.content[firstKey][secondkey];
		document.getElementsByClassName("modal-content")[0].style.display = "block";
		document.getElementsByClassName("div-show-content-modal")[0].innerHTML  =`
		<div class="row">
			<div class="col-md-12 text-right">
				<i class="far fa-times-circle close-content" onclick="object.Blog.closeShowContent()"></i>
			</div>
			<div class="col-md-12 text-center">
				<h1 class="title-content-scraped">${content['title']}<h1>
			</div>
			<div class="col-md-12">
				<img src="${content['img']}" class="img-content-scraped">
			</div>
			<div class="col-md-12">
				${content['content']}
			</div>
		</div>
		`		
	}
	closeShowContent(){
		document.getElementsByClassName("modal-content")[0].style.display = "none";
		document.getElementsByClassName("div-show-content-modal")[0].innerHTML  = "";
	}

}