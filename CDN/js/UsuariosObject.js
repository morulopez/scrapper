class usuarios extends general{
	constructor(url){
		super();
		this.url = url;
	}

	login(){
		if(document.getElementById('user').value=="" || document.getElementById('pass').value=="") return;
		fetch(`${this.url}Usuarios/Login_token`,{
		  method:"POST",
	      body:`user=${document.getElementById('user').value}&pass=${encodeURIComponent(document.getElementById('pass').value)}`,
	      headers:{
	        'Accept':'application/JSON',
	        'Content-Type':'application/x-www-form-urlencoded'  
	      }
    	}).then(data=>{
    		data.json().then(message=>{
    			if(message=="error"){
    				this.flash("<h6>Error al Iniciar Sesion</h6>","warning");
    			}else{
    				window.location.href=`${this.url}`;
    			}
    		})
    	})
	}
	listener(){
		document.getElementById("button-login").addEventListener("click",()=>{
			this.login();
		});
		document.addEventListener("keypress",(e)=>{
			if(e.keyCode==13) this.login();
		});
	}
	closeSesion(){
		fetch(`${this.url}Usuarios/closeSesion`,{
		  method:"POST",
	      body:`closeSesion=true`,
	      headers:{
	        'Accept':'application/JSON',
	        'Content-Type':'application/x-www-form-urlencoded'  
	      }
    	}).then(data=>{
    		data.json().then(message=>{
    			window.location.href=`${this.url}login`;
    		})
    	})
	}
}
