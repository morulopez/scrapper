 
 let url             = "http://localhost/scrapperTrooll/";
 
 const object = {};
 if(typeof scrapper 	 === 'function'){ object.Scraper  	  = new scrapper(url);}
 if(typeof images   	 === 'function'){ object.Images   	  = new images(url);}
 if(typeof blog     	 === 'function'){ object.Blog     	  = new blog(url);}
 if(typeof usuarios 	 === 'function'){ object.Usuarios 	  = new usuarios(url);}
 if(typeof scraped_dialy === 'function'){ object.ScrapedDialy = new scraped_dialy(url);}
 if(typeof amazon		 === 'function'){ object.Amazon		  = new amazon(url);}

if(window.location.pathname!="/scrapperTrooll/login"){
	
	 promiseForcheck();
	 let check = setInterval(()=>{
	 	 promiseForcheck();
	 }, 30000);
	function promiseForcheck(){
		fetch(`${url}Usuarios/check_token`,{
			method:"POST",
	      	body:'check=true',
	      	headers:{
	        'Accept':'application/JSON',
	        'Content-Type':'application/x-www-form-urlencoded'  
	      }
			}).then(data=>{
				data.json().then(dat=>{
					if(dat.message=='session expirada'){
						document.getElementById('modalexpiredsesion').style.display="block";
						document.getElementById('modalexpiredsesion').innerHTML=dat.view;
						clearInterval(check)
					}else if(dat.message=='token invalido'){
						window.location.href = `${url}login`;
					}
				})
			})
	}

	function renovetoken(){
		fetch(`${url}Usuarios/renovetoken`,{
			  method:"POST",
		      body:`user=${document.getElementById('user').value}&pass=${encodeURIComponent(document.getElementById('pass').value)}`,
		      headers:{
		        'Accept':'application/JSON',
		        'Content-Type':'application/x-www-form-urlencoded'  
		      }
	    	}).then(data=>{
	    		data.json().then(message=>{
	    			if(message=="error"){
	    				window.location==`${url}Usuarios/closeSesion`;
	    			}else{
	    				document.getElementById('modalexpiredsesion').style.display="none";
				 		document.getElementById('modalexpiredsesion').innerHTML='';
				 		let check = setInterval(()=>{
						 	 promiseForcheck(check);
						 }, 30000);
	    			}
	    		})
	    	})
	}
}
