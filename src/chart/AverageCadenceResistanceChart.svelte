<script>
    import { onMount } from "svelte";
    import Chart from 'chart.js';
    import Card from '../components/Card.svelte';
    import * as ChartAnnotation from 'chartjs-plugin-annotation';
    import {averageCadence, averageResistance} from '../store/store.js';
    import moment from 'moment';    
    import {getColor} from './chartUtils.js';  
                   
    const convertDataToPlotPoints = (data) => {
        return data.map(item => {
            return {y: item.average, x: moment(item.createdAt, "YYYY-MM-DD")}
        })
    }
    const getChartData = (averageCadence, averageResistance) => {
        return {
            datasets: [
                {
                    borderColor: "#00cccc",
                    label: "Average Cadence",
                    data: convertDataToPlotPoints(averageCadence),
                    fill: false,
                    lineTension: 0,
                },
                {
                    borderColor: "#ff4d88",
                    label: "Average Resistance (%)",
                    data: convertDataToPlotPoints(averageResistance),
                    fill: false,
                    lineTension: 0
                },
            ]
        }
    }

    let averageCadenceResistanceChart;

    let config = {
        type: 'line',
        data: getChartData($averageCadence, $averageResistance),
        options: {
            borderJoinStyle: "round",
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
        let ctx = document.getElementById('averageCadenceResistanceChart');
        averageCadenceResistanceChart = new Chart(ctx, config);

        averageCadence.subscribe(value => {
            averageCadenceResistanceChart.data = getChartData(value);
            averageCadenceResistanceChart.update();
        });

    }); 
    
   
</script>

<Card>
    <h2>Average Cadence and Resistance (%) Over Time</h2>
    <div>
        <canvas id="averageCadenceResistanceChart"></canvas>
    </div>
</Card>

<style>
div{
    min-height: 90vh;
}
</style>