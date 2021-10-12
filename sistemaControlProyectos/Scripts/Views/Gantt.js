
function cambiarFecha(fecha) {
    var fechaString = fecha.substr(6);
    var fechaActual = parseInt(fechaString);
    return fechaActual;
}

function datos() {
    let fechaIniD = new Date('10/5/2021');
    let fechaFinD = new Date('10/14/2021');
    let fechaFinP = new Date('10/5/2021');
    porcentajeDeAvance(fechaIniD, fechaFinD)
}

//Cambiar Fechas
function CambiarFormatofecha(fechaEntra) {
    var fechaString = fechaEntra.substr(6);
    var fechaActual = new Date(parseInt(fechaString));
    var mes = fechaActual.getMonth() + 1;
    var dia = fechaActual.getDate();
    var anio = fechaActual.getFullYear();
    var fecha = mes + "/" + dia + "/" + anio;
    console.log(fecha);
    let fechaCam = new Date(fecha);
    console.log(fechaCam);
    return fechaCam;
}

function porcentajeDeAvance(fechaIni, fechaFin) {
    const fechaActual = new Date().getTime();
    let miliSegDia = 24 * 60 * 60 * 1000;

    console.log(fechaIni);
    console.log(fechaFin);

    let fechIni = CambiarFormatofecha(fechaIni).getTime();
    let fechFin = CambiarFormatofecha(fechaFin).getTime();

    var porc;
    let miliTraAct;
    console.log(fechaActual);
    console.log(fechIni);
    console.log(fechFin);

    if (fechaActual <= fechIni && fechIni < fechFin) {
        porc = 0.0001;
    }
    if (fechIni <= fechaActual && fechaActual < fechFin) {
        let miliTraTot = fechFin - fechIni;
        miliTraAct = fechFin - fechaActual;

        let diaTraTot = Math.round(miliTraTot / miliSegDia);
        let diaTraActu = Math.round(miliTraAct / miliSegDia);

        console.log(diaTraActu);
        console.log(diaTraTot);

        var porc = (diaTraTot-diaTraActu) / diaTraTot;
    } if (fechIni < fechFin && fechFin <= fechaActual) {
        porc = 1;
    }
    console.log(porc);
    return porc;
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
                    name: item.titActividad, y: parseInt(i),
                    completed: parseFloat(porcentajeDeAvance(item.fechaInicio, item.fechaFin).toFixed(4))
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
            uniqueNames: true
        },

        navigator: {
            enabled: true,
            liveRedraw: true,
            series: {
                type: 'gantt',
                pointPlacement: 0.5,
                pointPadding: 0.25
            },
            yAxis: {
                min: 0,
                max: 3,
                reversed: true,
                categories: []
            }
        },
        scrollbar: {
            enabled: true
        },
        rangeSelector: {
            enabled: true,
            selected: 0
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
                        formatter: function() {
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
                        text: 'Inicio'
                    }
                }, {
                    title: {
                        text: 'Fin'
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