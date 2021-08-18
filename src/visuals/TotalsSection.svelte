<script>
    import {
      totalDistance,
      totalCalories,
      filteredData,
      totalMinutes,
      dateFilter
    } from "../store/store";
    import {getFriendlyDate} from "../utils/dateUtils";
    import {formatNumberWithCommas} from "../utils/numberUtils";

    const beginDate = getFriendlyDate($filteredData[0].date);
    const endDate = getFriendlyDate(
        $filteredData[$filteredData.length - 1].date,
    );
</script>

<style>
    h2{
        margin-bottom: 0;
    }
    section {
        background-color: #1A5B92;
        color: #fff;
        margin: 0;
        position: relative;
        max-width: 100vw;
        padding: 20px 10px;
    }
    .section-wrapper {
        max-width: 800px;
        margin: 0 auto;
        padding-top: 0;
        padding-bottom: 20px;
    }
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .wrapper div {
        flex: 1 1 auto;
        text-align: center;
        box-sizing: border-box;
        padding: 0 10px;
    }
    .wrapper > div > p{
        font-size: 1.2em;
        margin: 0;
    }
    span {
        display: block;
        font-size: 2.4em;
        font-weight: 200;
    }
    .time-period {
        text-align: center;
        margin-top: 0;
    }
</style>

<section>
    <div class="section-wrapper">
        <h2>Totals</h2>
        <p class="time-period"><span class="sr-only">For dates: </span>{getFriendlyDate($dateFilter.startDate)} - {getFriendlyDate($dateFilter.endDate)} (with filters applied)</p>
        <div class="wrapper">
            <div>
                <p>
                    <span>{formatNumberWithCommas($filteredData.length)}</span> rides
                </p>
            </div>
            <div>
                <p>
                    <span>{formatNumberWithCommas($totalMinutes)}</span>
                    minutes spent
                </p>
            </div>
            <div>
                <p>
                    <span>{formatNumberWithCommas($totalDistance)}</span>
                    miles traveled
                </p>
            </div>
            <div>
                <p>
                    <span>{formatNumberWithCommas($totalCalories)}</span>
                    calories burned
                </p>
            </div>
        </div>
    </div>
</section>
