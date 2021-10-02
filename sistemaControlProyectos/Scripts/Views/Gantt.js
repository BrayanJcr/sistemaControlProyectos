
function cambiarFecha(fecha) {
    var fechaString = fecha.substr(6);
    var fechaActual = parseInt(fechaString);
    return fechaActual;
}

$(document).ready(function () {
    $("#btnActividades").click("click", function () {
        ListarActividad();
    });
});

function ListarActividad() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Listar",
        data: "{}",
        dataType: "json",
        success: function (Result) {

            Result = Result.data;
            var data = [];
            $.each(Result, function (i, item) {

                var serie = {
                    start: cambiarFecha(item.fechaInicio),
                    end: cambiarFecha(item.fechaFin),
                    name: item.titActividad, y: parseInt(i)
                }
                data.push(serie);
                console.log(data);
                resultados(data);
            })
            },
        error: function (Result) {
            alert("Error");
        }
        });
}

function resultados(array) {
    var data = array;
    dibujarGrafico(data);
}

function prueba() {
    //var serie = [];
    //for (var i=0; i < 2; i++ ) {
    var data = [{ end: 1623301200000, name: 'Nueva', y: 0, start: 1578459600000 },
        { end: 1623301200000, name: 'Otra', y: 1, start: 1578459600000 }];
    console.log(data);
    return data;
    //    serie.push(data);
    //    return serie;
    //    console.log(serie);
        
    //}
    
}

function dibujarGrafico(serie) {
    Highcharts.setOptions({
        lang: {
            months: [
                'Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            weekdays: [
                'Domingo', 'Lunes', 'Martes', 'Miercoles',
                'Juevez', 'Viernes', 'Sabado'
            ]
        }
    });

    Highcharts.ganttChart('container', {

        title: {
            text: 'DIAGRAMA DE GANTT'
        },

        xAxis: {
            tickPixelInterval: 70
        },

        yAxis: {
            type: 'category',
            grid: {
                enabled: true,
                borderColor: 'rgba(0,0,0,0.7)',
                borderWidth: 1,
                columns: [{
                    title: {
                        text: 'Actividad'
                    },
                    labels: {
                        format: '{point.name}'
                    }
                }, {
                    title: {
                        text: 'Dias'
                    },
                    labels: {
                        formatter: function () {
                            var point = this.point,
                                days = (1000 * 60 * 60 * 24),
                                number = (point.x2 - point.x) / days;
                            return Math.round(number * 100) / 100;
                        }
                    }
                }, {
                    labels: {
                        format: '{point.start:%e. %b}'
                    },
                    title: {
                        text: 'Fecha Inicio'
                    }
                }, {
                    title: {
                        text: 'Fecha Fin'
                    },
                    offset: 30,
                    labels: {
                        format: '{point.end:%e. %b}'
                    }
                }]
            }
        },

        tooltip: {
            xDateFormat: '%e %b %Y, %H:%M'
        },

        series: [{
            name: 'Proyecto 1',
            data: serie
        }],

        exporting: {
            sourceWidth: 1000
        }
    });
}