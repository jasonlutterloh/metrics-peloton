<script>
    import { onMount } from "svelte";
    import Chart from 'chart.js';
    import Card from '../components/Card.svelte';
    import {classesTakenPerInstructor} from '../store/store.js';
    import {getColor} from './chartUtils.js';

    const getCounts = (data) => {
        return data.map(item => {
            return item.count;
        })
    }
    const getCountsLabels = (data) => {
        return data.map(item => {
            return item.instructor;
        })
    }
    const getBackgroundColor = (data) => {
        let colors = [];
        for (const [i, entry] of data.entries()){
            if (i < 9){ // 9 is the max in the getColor function
                colors.push(getColor(data.length, i));
            } else { // Default to a gray
                colors.push("#BBBBBB");
            }
        }
        return colors;
    }
    const getChartData = (instructorsData) => {
        
        return {
            datasets: [
                {
                    data: getCounts(instructorsData),
                    backgroundColor: getBackgroundColor(instructorsData)
                }
            ],
            labels: getCountsLabels(instructorsData)
        }
    }

    let instructorChart;

    let config = {
        data: getChartData($classesTakenPerInstructor),
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }

    onMount(async () => {
        let ctx = document.getElementById('instructorChart');
        instructorChart = new Chart(ctx, config);

        classesTakenPerInstructor.subscribe(value => {
            instructorChart.data = getChartData(value);
            instructorChart.update();
        });

    }); 
    
</script>

<Card>
    <h2>Classes Taken Per Instructor</h2>
    <div>
        <canvas id="instructorChart"></canvas>
    </div>
</Card>

<style>
    div {
        position: relative;
        min-height: 50vh;
    }
</style>