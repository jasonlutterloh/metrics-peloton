<script>
    import { onMount } from "svelte";
    import Chart from 'chart.js';
    import * as ChartAnnotation from 'chartjs-plugin-annotation';
    import {averageOutputs} from '../store/store.js';
    import moment from 'moment';      
                   
    const convertDataToPlotPoints = (data) => {
        return data.map(item => {
            return {y: item.average, x: moment.unix(item.createdAt)}
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
                    lineTension: 0.2
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
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    bounds: 'data',
                    time: {
                        unit: 'day'
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

<div class="card">
    <h2>Average Output Per Minute Over Time</h2>
    <canvas id="averageOutputChart"></canvas>
</div>

<style>
div {
    max-height: 60vh;
    min-height: 400px;
    padding-bottom: 60px;
    max-width: 100vw;
}
</style>