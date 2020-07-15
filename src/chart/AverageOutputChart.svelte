<script>
    import { onMount } from "svelte";
    import Chart from 'chart.js';
    import * as ChartAnnotation from 'chartjs-plugin-annotation';
    import {averageOutputs} from '../store/store.js';
    import moment from 'moment';      
                   
    const convertDataToPlotPoints = (data) => {
        return data.map(item => {
            return {y: Math.round(item.average * 10)/10, x: moment(item.createdAt, "MM-DD-YYYY")}
        })
    }
    const getChartData = (data) => {
        return {
            datasets: [
                {
                    borderColor: "#00cc00",
                    label: "Average Output Per Minute",
                    data: convertDataToPlotPoints(data),
                    fill: false,
                    lineTension: 0
                }
            ]
        }
    }

    let averageOutputChart;

    let config = {
        type: 'line',
        plugins: [ChartAnnotation],
        data: getChartData($averageOutputs),
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    bounds: 'data',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMM DD YYYY'
                    }
                }]
            }
        }
    }

    onMount(async () => {
        let ctx = document.getElementById('averageOutputChart');
        averageOutputChart = new Chart(ctx, config);

        averageOutputs.subscribe(value => {
            averageOutputChart.data = getChartData(value);
            averageOutputChart.update();
        });

    }); 
    
   
</script>

<div class="card chart-card">
    <h2>Average Output Per Minute Over Time</h2>
    <div class="canvas-wrapper">
        <canvas id="averageOutputChart"></canvas>
    </div>
</div>

<style>
.chart-card {
    max-width: 100vw;
}
.canvas-wrapper{
    min-height: 70vh;
}
</style>