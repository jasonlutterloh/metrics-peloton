<script>
import {totalDistance, totalCalories, filteredData, totalMinutes} from '../store/store';
import Card from '../components/Card.svelte';
import { getFriendlyDate, formatNumberWithCommas } from './utils';

let beginDate = getFriendlyDate($filteredData[0].date);
let endDate = getFriendlyDate($filteredData[$filteredData.length - 1].date);
</script>

<Card>
    <h2>Totals</h2>
    <p class="time-period">{beginDate} - {endDate}</p>
    <div class="wrapper">
        <div>
            <p><span>{formatNumberWithCommas($totalDistance)}</span> miles traveled</p>
        </div>
        <div>
            <p><span>{formatNumberWithCommas($totalCalories)}</span> calories burned</p>
        </div>
        <div>
            <p><span>{formatNumberWithCommas($totalMinutes)}</span> minutes spent</p>
        </div>
    </div>
</Card>

<style>
    .wrapper{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .wrapper div{
        flex: 1 1 auto;
        text-align: center;
    }
    span{
        display: block;
        font-size: 3em;
        font-weight: 100;
    }
    .time-period{
        font-size: 75%;
    }
</style>