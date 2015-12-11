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
		$("#js-AlumnosGpos").hide();
		$("#js-DocenteParciales").hide();
		$("#js-DocenteUnidad").hide();
		$("#js-CalifGpos").hide();
		$("#datosMateria").hide();
		$("#js-DocenteSeguimiento").hide();
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

	var pideDatosMat = function(){
		$("#datosMateria").hide();
		$("#js-CalifGpos").hide();
		$("#js-gruposDocente").hide();
		$("#js-DocenteParciales").hide();
		$("#js-DocenteUnidad").hide();
		$("#js-DocenteSeguimiento").hide();
		$(".datosMateria").show("slow");
		$("#tablaAlumnos").html("");
		$("#tablaCalif").html("");
		alum=true;
	}
	var pideDatosMat2 = function(){
		$("#datosMateria").hide();
		$("#js-CalifGpos").hide();
		$("#js-gruposDocente").hide();
		$("#js-DocenteParciales").hide();
		$("#js-DocenteUnidad").hide();
		$("#js-AlumnosGpos").hide();
		$("#js-DocenteSeguimiento").hide();
		$(".datosMateria").show("slow");
		$("#tablaAlumnos").html("");
		$("#tablaCalif").html("");
		alum=false;
	}

	var verAlumnosOCalif = function(){
		$("#js-gruposDocente").hide();
		$("#js-DocenteParciales").hide();
		$("#js-DocenteUnidad").hide();
		$("#js-DocenteSeguimiento").hide();
		$("#tablaAlumnos").html("");
		$("#tablaCalif").html("");

		materia = $("#txtMateria").val();
		gpo   = $("#txtGpo").val();



		if(materia=="" || gpo==""){
			alert("Complete los campos para buscar");
		}else{
			if(alum){ //Si se esta en la sección de Alumnos
				$.ajax({
					cache: false,
					type: "GET",
					dataType: "json",
					url: "http://intertec.itculiacan.edu.mx/intertecmovil/alumnos.php?cadena="+docente+"-"+clave+"-"+materia+"-"+gpo,
					data: parametros,
					success: function (data) {
						
						var renglon = "<tr><th>Num control</th><th>Nombre alumno</th></tr>";
						$('#tablaAlumnos').append(renglon);
						renglon='';

						$.each(data, function (i, item) {
							renglon += '<tr><td style="text-align:center">' + item.ncontrol
									+ '</td> <td style="text-align:center">' + item.nombre + '</td></tr>';
						});
						$('#tablaAlumnos').append(renglon);
						$("#datosMateria").hide("slow"); 
						$(".AlumnosGpos").show("slow"); //Muestra el titulo
					}


				});
			}else{ //Si se esta en la sección de Calificaciones
				$.ajax({
					cache: false,
					type: "GET",
					dataType: "json",
					url: "http://intertec.itculiacan.edu.mx/intertecmovil/califica.php?cadena="+docente+"-"+clave+"-"+materia+"-"+gpo,
					data: parametros,
					success: function (data) {						
						var renglon = "<tr><th>Numero de control</th><th>Clave materia</th><th>Clave de grupo</th><th>Parcial 1</th><th>Parcial 2</th><th>Parcial 3</th><th>Parcial 4</th><th>Parcial 5</th><th>Parcial 6</th><th>Parcial 7</th><th>Parcial 8</th></tr>";
						$('#tablaCalif').append(renglon);
						renglon='';

						$.each(data, function (i, item) {
							renglon += '<tr><td style="text-align:center">' + item.aluctr 
							+ '</td><td style="text-align:center">' + item.matcve 
							+ '</td><td style="text-align:center">'+ item.gpocve
							+'</td><td style="text-align:center">'+ item.lispa1 
							+'</td><td style="text-align:center">' + item.lispa2 
							+ '</td><td style="text-align:center">'  + item.lispa3  
							+ '</td><td style="text-align:center">' + item.lispa4
							+'</td><td style="text-align:center">' + item.lispa5
							+'</td><td style="text-align:center">' + item.lispa6 
							+'</td><td style="text-align:center">' + item.lispa7 
							+ '</td><td style="text-align:center">' + item.lispa7 + '</td></tr>';
						});
						$('#tablaCalif').append(renglon);
						$("#datosMateria").hide("slow"); 
						$(".CalifGpos").show("slow"); //Muestra el titulo
					}


				});
			}

		}
	}

	var verfecha = function(){
		$("#datosMateria").hide();
		$("#js-CalifGpos").hide();
		$("#js-AlumnosGpos").hide();
		$("#js-DocenteUnidad").hide();
		$("#js-DocenteParciales").hide();
		$("#js-gruposDocente").hide();
		$(".fechaseguimiento").toggle("show");
		$("#tablasegui").html("");
		
		$.ajax({

			type: "GET",
			dataType: "json",
			url: "http://intertec.itculiacan.edu.mx/intertecmovil/seguimientos.php?cadena="+docente+"-"+clave,
			data: parametros,
			success: function (response) {

				var renglon = "<tr><th>Fecha de planeacion</th><th>Seguimiento01</th><th>Seguimiento02</th><th>Seguimiento03</th> <th>Reporte Final</th></tr>";
				$('#tablasegui').append(renglon);
				renglon='';

				$.each(response, function (i, item) {
					renglon += '<tr><td>' + item.fecplaneainstru 
					+ '</td><td>' + item.seguimiento01
					+ '</td><td>'+ item.seguimiento02
					+'</td><td>'+ item.seguimiento03 
					+'</td><td>' + item.reportefinal  + '</td></tr>';
				});
				$('#tablasegui').append(renglon);
			}
		});

	}

	var verParciales = function(){

		$("#js-DocenteUnidad").hide();
		$("#js-AlumnosGpos").hide();
		$("#datosMateria").hide();
		$("#js-gruposDocente").hide();
		$("#js-DocenteSeguimiento").hide();
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
		$("#js-AlumnosGpos").hide();
		$("#datosMateria").hide();
		$("#js-gruposDocente").hide();
		$("#js-DocenteSeguimiento").hide();
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
	$("#pideDatosMat").on("click",pideDatosMat);
	$("#pideDatosMat2").on("click",pideDatosMat2);
	$("#muestrafecha").on("click",verfecha);
	$("#muestraParciales").on("click",verParciales);
	$("#muestraUnidades").on("click",verUnidades);
	$("#btnEntrar").on("click",entrar);
	$("#btnBuscarGpo").on("click",verAlumnosOCalif);
}
$(document).on("ready",inicio);