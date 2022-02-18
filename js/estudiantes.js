async function leerJSON(url) {

  try {
    let response = await fetch(url);
    let user = await response.json();
    return user;
  } catch(err) {
    
    alert(err);
  }
}

function leerEstudiantes()
{

	var msg="";
	var url="https://raw.githubusercontent.com/madarme/persistencia/main/estudiantes";
	var resultado=document.getElementById("r");
	leerJSON(url).then(datos=>{
		console.log(datos);

		msg+="<br><h2>Nombre Materia:"+datos.nombreMateria+"</h2>";
		//LLamar el vector de notas
		leerNotas(datos.estudiantes);

		resultado.innerHTML=msg;

	})
}


function leerNotas(estudiantes)
{
	var data = new google.visualization.DataTable();
	var data2 = new google.visualization.DataTable();
	//Encabezados de las tablas:
	crearEncabezados(data);
	crearEncabezados2(data2);
	//Crear las filas:
	data.addRows(estudiantes.length);
	data2.addRows(2);
	let aprobados=0;
	for(let i=0;i<estudiantes.length;i++)
	{
		//Filas y columnas setCell(indicefila, indiceColumna, dato)
		data.setCell(i,0,estudiantes[i].codigo+"");
		data.setCell(i,1,estudiantes[i].nombre);
		data.setCell(i,2,estudiantes[i].previo1);
		data.setCell(i,3,estudiantes[i].previo2);
		data.setCell(i,4,estudiantes[i].previo3);
		data.setCell(i,5,estudiantes[i].examen);
		let calculo=(estudiantes[i].previo1+estudiantes[i].previo2+estudiantes[i].previo3)/3*0.7+estudiantes[i].examen*0.3;
		calculo=Math.round(calculo*10)/10;
		if(calculo>=3)
			{
				aprobados++;
			}
		data.setCell(i,6,calculo);


	}

	var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});

    crearGrafico(data2,aprobados, estudiantes.length-aprobados);

}


function crearGrafico(data2, aprobados, reprobados)
{
	//Crear tabla para graficar:
		data2.setCell(0,0,"Aprobados");
		data2.setCell(0,1,aprobados);
		data2.setCell(1,0,"Reprobados");
		data2.setCell(1,1,reprobados);

		var options = {
          title: 'Estadística de Notas',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data2, options);


}

function crearEncabezados(data)
{
data.addColumn('string', 'Código'); //0
data.addColumn('string', 'Nombre'); //1
data.addColumn('number', 'Previo1'); //2
data.addColumn('number', 'Previo2'); //3
data.addColumn('number', 'Previo3'); //4
data.addColumn('number', 'Exam'); //5
data.addColumn('number', 'Definitiva'); //6
}


function crearEncabezados2(data2)
{
data2.addColumn('string', 'Descripción'); //0
data2.addColumn('number', 'Valor'); //1

}
