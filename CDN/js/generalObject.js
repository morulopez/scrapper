class general{

		flash(content,addclass){
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
	   	closeModal(parent='parentmodalInsertBlog'){
			document.getElementById(parent).style.display="none";
		}
}
