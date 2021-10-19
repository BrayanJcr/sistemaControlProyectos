$(document).ready(function () {
    $("#btnActividades").click("click", function () {
        ListarArea();
    });
});

function ListarArea() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Listar",
        data: "{}",
        dataType: "json",
        success: function (Result) {
            console.log(Result);
            Result = Result.data;
            console.log(Result);
            var data = [];
            var area = [];
            $.each(Result, function (i, item) {
                var serieA = [
                    item.IdNomAreaPadre, item.IDArea
                ]
                var serie = {
                    id: item.IDArea, 
                    title: item.nomArea,
                    name: item.encargado,
                }

                area.push(serieA);
                data.push(serie);

                console.log(data);
                console.log(area);
                resultados(data,area);
            })
        },
        error: function (Result) {
            alert("Error");
        }
    });
}

function resultados(data,area) {
    var data = data;
    var area = area
    dibujarOrganigrama(data,area);
}

function dibujarOrganigrama(data,area) {
    Highcharts.chart('container', {
        chart: {
            height: 600,
            inverted: true
        },

        title: {
            text: 'Organigrama de BRAVAJAL'
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
                color: '#980104',
                height: 25
            }, {
                level: 1,
                color: 'silver',
                dataLabels: {
                color: 'black'
                },
                color: '#980104',
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