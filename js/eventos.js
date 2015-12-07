var inicio = function(){
	var parametros="";
	var docente="";
	var clave="";

	var entrar = function(){

		docente = $("#txtDocente").val();
		clave   = $("#txtClave").val();

		if(docente=="" || clave==""){
			alert("Complete los campos para acceder");
		}else{
			$.ajax({
				type: "GET",
				dataType: "json",
				url: "http://intertec.itculiacan.edu.mx/intertecmovil/entrada.php?cadena="+docente+"-"+clave,
				data: parametros,

				success: function(data){

					if(data.respuesta){
						$(".entradaUsuario").hide("slow");

						$("#barra").show("slow");

						$("#user").find("a").before("<i class='material-icons'>perm_identity</i>  "+docente+"<br><br>");
						$("#user").show("slow");
					}else{
						alert("Docente no registrado");
					}
				}
			});
		}
		
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

				var renglon = "<tr><th>Clave grupo</th><th>Clave materia</th><th>Nombre corto</th><th>Nombre materia</th><th>Lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th></tr>";
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
	const TECLA_ENTER = 13;
	var txtCajas = $("#entradaUsuario").find("input");

	
	var teclatxtCajas = function(tecla)
	{
		var cajaActual = txtCajas.index(this);
		if(tecla.which == TECLA_ENTER)
		{
			if(txtCajas[cajaActual + 1]!=null)
			{
				var cajaSiguiente=txtCajas[cajaActual + 1];
				cajaSiguiente.focus();
			}
		}
	}
	var login =function(tecla){
		if(tecla.which == TECLA_ENTER)
		{
			$("#btnEntrar").click();
		}
	}
	var muestraClave = function(){
		var val = $("#mostrarClave").find("i");
		if(val.html() == "visibility"){
			$("#txtClave").attr("type","password");
			val.html("visibility_off");
		}else{
			$("#txtClave").attr("type","text");
			val.html("visibility");
		}

	}
	

	$(txtCajas[1]).on("keypress",login);
	$(txtCajas).on("keypress",teclatxtCajas);
	$("#mostrarClave").on("click",muestraClave);
	$("#muestragrupos").on("click",vergrupos);
	$("#btnEntrar").on("click",entrar);
}
$(document).on("ready",inicio);