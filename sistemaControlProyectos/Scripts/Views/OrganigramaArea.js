$(document).ready(function () {
    $("#btnActividades").click("click", function () {
        ListarArea();
    });
});

function ListarArea() {
    jQuery.ajax({
        url: "/Area/ListarAreaPadre",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var area = [];
            area.push(['Accionistas', 'Tablero']);

            var datos = [{ id: 'Accionistas' }];

            $.each(data.data, function (i, item) {
                console.log(i);
                if (i == 0) {
                    area.push(['Tablero', 'Gerente']);
                    datos.push({ id: "Tablero" });
                    datos.push({
                        id: item.nomArea,
                        title: item.nomArea,
                        name: item.nombre,});
                } else {

                    area.push([item.nomPadre, item.nomArea])

                    datos.push(
                        {
                            id: item.nomArea,
                            title: item.nomArea,
                            name: item.nombre,
                        })
                }
            })
            console.log(datos)
            console.log(area)
            resultados(datos, area);
        },
        error: function (Result) {
            alert("Error");
        }
    });
}

function resultados(datos,area) {
    var datos = datos;
    var area = area;
    dibujarOrganigrama(datos,area);
}

function dibujarOrganigrama(data,area) {
    Highcharts.chart('container', {
        chart: {
            height: 600,
            inverted: true
        },

        title: {
            text: 'Organigrama del Proyecto'
        },

        accessibility: {
            point: {
                descriptionFormatter: function (point) {
                    var nodeName = point.toNode.name,
                        nodeId = point.toNode.id,
                        nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
                        parentDesc = point.fromNode.id;
                    return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
                }
            }
        },

        series: [{
            type: 'organization',
            name: 'Highsoft',
            keys: ['from', 'to'],
            data: area,

            levels: [{
                level: 0,
                color: 'silver',
                dataLabels: {
                    color: 'black'
                },
                height: 25
            }, {
                level: 1,
                color: 'silver',
                dataLabels: {
                color: 'black'
                },
                height: 25
            }, {
                level: 2,
                color: '#980104'
            }, {
                level: 4,
                color: '#359154'
            }],

            nodes: data,

            colorByPoint: false,
            color: '#007ad0',
            dataLabels: {
                color: 'white'
            },
            borderColor: 'white',
            nodeWidth: 65
        }],
        tooltip: {
            outside: true
        },
        exporting: {
            allowHTML: true,
            sourceWidth: 800,
            sourceHeight: 600
        }

    });
}