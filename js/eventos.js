 var inicio = function(){
	var parametros="";
	var docente="";
	var clave="";

	var entrar = function(){
		debugger

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
						$("#user").append("<i class='material-icons'>perm_identity</i>"+docente+"<br><br>");
						$("#user").show("slow");
					}else{
						alert("Docente no registrado");
					}
				}
			});
		}
		
	}
	
	var vergrupos = function(){
		$("#js-DocenteParciales").hide();
		$("#js-DocenteUnidad").hide();
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


	var verParciales = function(){
		$("#js-DocenteUnidad").hide();
		$("#js-gruposDocente").hide();
		$(".DocenteParciales").toggle("show");
		$("#tablaParciales").html("");
		
		$.ajax({

			type: "GET",
			dataType: "json",
			//url: "http://intertec.itculiacan.edu.mx/intertecmovil/grupos.php?cadena="+docente+"-"+clave,
			url:"http://intertec.itculiacan.edu.mx/intertecmovil/unidadesexa.php?cadena=920-12345678-AEB1011-9A",
			data: parametros,
			success: function (response) {
				debugger
				//var obj = response;
				//var lst = $.map(obj, function(el) { return el });

				var renglon = "<tr><th>Parcial</th><th>Fecha Programada</th><th>Fecha Real</th></tr>";
				$('#tablaParciales').append(renglon);
				renglon='';
				var contador = 1;
				var pos1 = 0;
				var pos2 = 1;
				$.each(response, function (i, item) {
					debugger
					var lst = showOBJ(item);

					for (var i = 0; i<15; i++) {
					    renglon += 
					'<tr><td>' + contador 
					+ '</td><td style="text-align:center">' + lst[pos1]
					+ '</td><td style="text-align:center">'+ lst[pos2]
					+ '</td></tr>';
					contador++;
					pos1 = pos2+1;
					pos2 = pos1+1;
					}
					
					
				});
				$('#tablaParciales').append(renglon);
			}
		});

	}


	var verUnidades = function(){
		$("#js-DocenteParciales").hide();
		$("#js-gruposDocente").hide();
		$(".DocenteUnidad").toggle("show");
		$("#tablaUnidades").html("");
		
		$.ajax({

			type: "GET",
			dataType: "json",
			//url: "http://intertec.itculiacan.edu.mx/intertecmovil/grupos.php?cadena="+docente+"-"+clave,
			url:"http://intertec.itculiacan.edu.mx/intertecmovil/unidadesmat.php?cadena=920-12345678-AEB1011-9A",
			data: parametros,
			success: function (response) {
				debugger

				var obj = response;

				var renglon = "<tr><th>Unidad</th><th>Fecha Inicial Programada</th><th>Fecha Final Programada</th><th>Fecha Inicial Real</th><th>Fecha Final Real</th></tr>";
				$('#tablaUnidades').append(renglon);
				renglon='';
				var contador = 1;
				var pos1 = 0;
				var pos2 = 1;
				$.each(response, function (i, item) {
					debugger

					renglon += 
					'<tr><td>' + item.unidad 
					+ '</td><td style="text-align:center">' + item.fechainicialprog
					+ '</td><td style="text-align:center">'+ item.fechafinalprog
					+ '</td><td style="text-align:center">'+ item.fechainicialreal
					+ '</td><td style="text-align:center">'+ item.fechafinalreal
					+ '</td></tr>';
					contador++;
					pos2 ++;
					pos1 ++;
					
				});
				$('#tablaUnidades').append(renglon);
			}
		});

	}

	function showOBJ(item)
	{
		debugger
		var obj = item;
		var lst = $.map(obj, function(el) { return el });

		return lst;


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
	$("#muestraParciales").on("click",verParciales);
	$("#muestraUnidades").on("click",verUnidades);
	$("#btnEntrar").on("click",entrar);
}
$(document).on("ready",inicio);