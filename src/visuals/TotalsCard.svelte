<script>
    import {
      totalDistance,
      totalCalories,
      filteredData,
      totalMinutes,
    } from "../store/store";
    import {getFriendlyDate} from "../utils/dateUtils";
    import {formatNumberWithCommas} from "../utils/numberUtils";

    const beginDate = getFriendlyDate($filteredData[0].date);
    const endDate = getFriendlyDate(
        $filteredData[$filteredData.length - 1].date,
    );
</script>

<style>
    section {
        background-color: #1A5B92;
        color: #fff;
        margin: 0;
        position: relative;
        max-width: 100vw;
        padding: 60px 10px;
    }
    .section-wrapper {
        max-width: 800px;
        margin: 0 auto;
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
        padding: 20px;
    }
    span {
        display: block;
        font-size: 3em;
        font-weight: 200;
    }
    .time-period {
        text-align: center;
        margin-top: -22px;
    }
</style>

<section>
    <div class="section-wrapper">
        <h2>Totals</h2>
        <p class="time-period">For {beginDate} - {endDate}</p>
        <div class="wrapper">
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
            <div>
                <p>
                    <span>{formatNumberWithCommas($totalMinutes)}</span>
                    minutes spent
                </p>
            </div>
        </div>
    </div>
</section>
