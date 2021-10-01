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
            borderColor: 'rgba(0,0,0,0.3)',
            borderWidth: 1,
            columns: [{
                title: {
                    text: 'Actividades'
                },
                labels: {
                    format: '{point.name}'
                }
            }, {
                title: {
                    text: 'Responsable'
                },
                labels: {
                    format: '{point.assignee}'
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
        name: 'Project 1',
        data: [{
            start: Date.UTC(2017, 10, 18, 8),
            end: Date.UTC(2017, 10, 25, 16),
            name: 'Start prototype',
            assignee: 'Richards',
            y: 0
        }, {
            start: Date.UTC(2017, 10, 20, 8),
            end: Date.UTC(2017, 10, 24, 16),
            name: 'Develop',
            assignee: 'Michaels',
            y: 1
        }, {
            start: Date.UTC(2017, 10, 25, 16),
            end: Date.UTC(2017, 10, 25, 16),
            name: 'Prototype done',
            assignee: 'Richards',
            y: 2
        }, {
            start: Date.UTC(2017, 10, 27, 8),
            end: Date.UTC(2017, 11, 3, 16),
            name: 'Test prototype',
            assignee: 'Richards',
            y: 3
        }, {
            start: Date.UTC(2017, 10, 23, 8),
            end: Date.UTC(2017, 11, 15, 16),
            name: 'Run acceptance tests',
            assignee: 'Halliburton',
            y: 4
        }, {
            start: Date.UTC(2017, 10, 23, 8),
            end: Date.UTC(2017, 11, 15, 16),
            name: 'Run acceptance tests',
            assignee: 'Halliburton',
            y: 5
        }, {
            start: Date.UTC(2017, 10, 23, 8),
            end: Date.UTC(2017, 11, 15, 16),
            name: 'Run acceptance tests',
            assignee: 'Halliburton',
            y: 6
        }, {
            start: Date.UTC(2017, 10, 23, 8),
            end: Date.UTC(2017, 11, 15, 16),
            name: 'Run acceptance tests',
            assignee: 'Halliburton',
            y: 7
        }]
    }],

    exporting: {
        sourceWidth: 1000
    }
});
