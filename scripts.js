
// Año bisiesto
function bisiesto (){
    let year = document.getElementById("year").value; 
        
    let bisiesto = (year % 400 === 0) ? true : (year % 100 === 0) ? false : year % 4 === 0;
    if (bisiesto) {
        document.getElementById("valueInput").innerHTML = 'EL AÑO '+year+ ' ES BISIESTO';
    }else{
        document.getElementById("valueInput").innerHTML = 'EL AÑO '+year+ ' NO ES BISIESTO';
    }
}
// Fin Año bisiesto

// Crear Tabla
function tabla(){
    let filas = document.getElementById("filas").value; 
    let columnas = document.getElementById("columnas").value; 
    document.getElementById('tbl').innerHTML = '';
    for (let i  = 0; i  < filas; i++) {
        let filaActual = document.getElementById('tbl').insertRow(i);
        for (let c = 0; c < columnas; c++) {
            let column = filaActual.insertCell(c);
            column.innerHTML='fila: '+(i+1)+ '- Columna: '+(c+1);
        }
    }
}
// Fin Crear Tabla

// Ordenar arreglo
function arreglo() {
    var lista=new Array(20); 
    rellenar(lista); 
    document.getElementById("arregloNumeros").innerHTML = 'Arreglo original sin ordenar: '+lista;
    function rellenar(matriz){
        var valor;
        for(ind = 0; ind < matriz.length; ind++){
            valor = (Math.random()* (100 - 1) + 1);
            matriz[ind] = Math.round(valor);
        }
    }    
    function ordenar (numeros){
        for (let i = 0; i < numeros.length - 1; i++) {
            
            for (let n = 0; n < numeros.length - i - 1; n++) {
                if (numeros[n] > numeros[n+1]){
                    [numeros[n], numeros[n+1]] = [numeros[n+1], numeros[n]];
                }            
            }
        }
    }
    ordenar(lista);
    document.getElementById("arregloNumerosOrdenados").innerHTML = 'Arreglo nuevo ordenado: '+lista;
}
// Fin Ordenar arreglo

//Arreglos
function creaCadena(){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var letras=new Array(10);
    var letras1=new Array(10);
    const charactersLength = characters.length;
    
    rellenarL(letras); 
    function rellenarL(letras){
        var valor;
        for(i = 0; i < letras.length; i++){
            valor = characters.charAt(Math.floor(Math.random() * charactersLength));
            letras[i] = valor;
        }
    }    
    rellenarL1(letras1); 
    function rellenarL1(letras1){
        var valor;
        for(i = 0; i < letras1.length; i++){
            valor = characters.charAt(Math.floor(Math.random() * charactersLength));
            letras1[i] = valor;
        }
    }
    let interseccion = letras.filter(x => letras1.indexOf(x) !== -1);
    let union = [...letras, ...letras1];
    let resultUnion = union.filter((item,index)=>{
        return union.indexOf(item) === index;
    });
    document.getElementById("arreglo1").innerHTML = 'A= '+letras;
    document.getElementById("arreglo2").innerHTML = 'B= '+letras1;
    document.getElementById("union").innerHTML = '<strong>Unión de los arreglos 𝐴⋃𝐵</strong>= '+resultUnion;
    document.getElementById("interseccion").innerHTML = '<strong>Intersección de los arreglos 𝐴⋂𝐵</strong>= '+interseccion;
    document.getElementById("diferencia").innerHTML = '<strong>Diferencia de los arreglos 𝐴 − 𝐵</strong>= ';
    document.getElementById("simetrica").innerHTML = '<strong>Diferencia Simétrica de los arreglos 𝐴Δ𝐵</strong>= ';
    console.log(letras);
    console.log(letras1);
    console.log(resultUnion);
}
//Fin Arreglos

//Inicio Api Rest
function series(){
    document.getElementById('result').innerHTML = '<tr><th>Tipo de cambio</th><th>Fecha</th><th>Dato</th></tr>';
    let date = new Date();
    var yesterday = new Date();
    yesterday.setDate(date.getDate() - 5);
    let fechaactual = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');
    let fechaanterior = String(yesterday.getFullYear() + '-' + String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + yesterday.getDate()).padStart(2, '0');
    $(function(){
        $.ajax({
            url : `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP74665,SF61745,SF60634,SF43718,SF43773/datos/${fechaanterior}/${fechaactual}?token=1e6b30ac5a96bb3e9dcb7175ae26f7f4085dcd86e2872c990bd7f1b3f36fa005`,
            jsonp : 'callback',
            dataType : 'jsonp', //Se utiliza JSONP para realizar la consulta cross-site
            success : function(response) {  //Handler de la respuesta
                var series=response.bmx.series;
                
                //Se carga una tabla con los registros obtenidos
                for (var i in series) {
                      var serie=series[i];
                      var reg='<tr><td>'+serie.titulo+'</td><td>'+serie.datos[0].fecha+'</td><td>'+serie.datos[0].dato+'</td></tr>'
                      $('#result').append(reg);
                      console.log(series);
                }
            }
        });
    }); 
}
//Fin Api Rest