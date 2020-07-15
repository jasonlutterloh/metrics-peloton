<script>
    import { onMount } from "svelte";
    import Chart from 'chart.js';
    import * as ChartAnnotation from 'chartjs-plugin-annotation';
    import {showAverages, organizedRidesByLength, averagesByLength} from '../store/store.js';
    import moment from 'moment';
    import {getAverageEffort, getColor} from './chartUtils.js';     
    import {convertRawTotalWork} from '../data/utils.js';
    import AveragesByLength from './AveragesByLength.svelte';
                 
    const getPlotPoints = (data) => {
        return data.map(ride => {
            return {y: ride.output, x: moment(ride.date, "MM-DD-YYYY")}
        })
    }
    const getChartData = (ridesByDuration) => {
        let datasets = [];
        const durations = Object.keys(ridesByDuration);

        for (const [i, duration] of durations.entries()) {
            let rides = ridesByDuration[duration];
            let workouts = getPlotPoints(rides);
            let dataset = {
                borderColor: getColor(durations.length, i),
                label: duration +" Minute Workouts",
                data: workouts,
                fill: false,
                lineTension: 0.2
            }
            datasets.push(dataset);
        }
        
        let chartData = {
            datasets: datasets
        };

        return chartData;
    }

    const getAnnotations = (ridesByDuration) => {
        let annotations = [];
        const durations = Object.keys(ridesByDuration);
        for (const [i, duration] of durations.entries()) {
            let rides = ridesByDuration[duration];
            let average = getAverageEffort(rides);
            let annotation = {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: average,
                borderColor: getColor(durations.length, i),
                borderWidth: .5
            }
            annotations.push(annotation);
        }

        return {
            drawTime: 'afterDatasetsDraw',
            annotations: annotations
        }
    }

    let outputChart;

    let config = {
        type: 'line',
        plugins: [ChartAnnotation],
        data: getChartData($organizedRidesByLength),
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
            },
            annotation: getAnnotations($organizedRidesByLength)
        }
    }

    onMount(async () => {
        let ctx = document.getElementById('outputChart');
        outputChart = new Chart(ctx, config);

        showAverages.subscribe(value => {
            outputChart.options.annotation.drawTime = value ? "afterDatasetsDraw" : null;
            outputChart.update();
        });

        organizedRidesByLength.subscribe(value => {
            outputChart.data = getChartData(value);
            outputChart.options.annotation = getAnnotations(value);
            outputChart.options.annotation.drawTime = $showAverages ? "afterDatasetsDraw" : null;
            outputChart.update();
        });

    }); 
    
   
</script>

<div class="card chart-card">
    <h2>Output Over Time</h2>
    <div class="canvas-wrapper">
        <canvas id="outputChart"></canvas>
    </div>
    <AveragesByLength />
</div>

<style>
    .chart-card {
        max-width: 100vw;
    }
    .canvas-wrapper{
        min-height: 70vh;
    }
</style>