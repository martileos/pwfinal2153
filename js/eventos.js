var inicio = function(){
	var parametros="";
	var docente="";
	var clave="";

	var entrar = function(){
		
		docente = $("#txtDocente").val();
		clave   = $("#txtClave").val();
		$.ajax({
		  
		  type: "GET",
			dataType: "json",
			url: "http://intertec.itculiacan.edu.mx/intertecmovil/entrada.php?cadena="+docente+"-"+clave,
			data: parametros,

		  success: function(data){
		  	
		     if(data.respuesta){
		     	
		     	$(".entradaUsuario").hide("slow");
		     	$("#btnmuestragrupos").show("slow");
		     }else{
		     	alert("Docente no registrado");
		     }
		  }
		});
	}
	
	var vergrupos = function(){
		$(".gruposDocente").toggle("show");
		$("#tablaGrupos").html("");
		
		$.ajax({
		  
		  type: "GET",
			dataType: "json",
			url: "http://intertec.itculiacan.edu.mx/intertecmovil/grupos.php?cadena="+docente+"-"+clave,
			data: parametros,
		  success: function (response) {

		        var renglon = "<tr><th>Cve. grupo</th><th>Cve. materia</th><th>Nombre corto</th><th>Nombre materia</th><th>Lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th></tr>";
		        $('#tablaGrupos').append(renglon);
		        renglon='';

		        $.each(response, function (i, item) {
		            renglon += '<tr><td>' + item.clavegrupo 
		            		+ '</td><td>' + item.clavemateria 
		            		+ '</td><td>'+ item.nombrecorto
		            		+'</td><td>'+ item.nombremateria 
		            		+'</td><td>' + item.horalunes 
		            		+ '</td><td>'  + item.horamartes  
		            		+ '</td><td>' + item.horamiercoles 
		            		+'</td><td>' + item.horajueves 
		            		+ '</td><td>' + item.horaviernes + '</td></tr>';
		        });
		        $('#tablaGrupos').append(renglon);
		    }
		});

	}



	$("#btnmuestragrupos").on("click",vergrupos);
	$("#btnEntrar").on("click",entrar);
}
$(document).on("ready",inicio);