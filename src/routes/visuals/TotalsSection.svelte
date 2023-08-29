<script>
  import {
    totalDistance,
    totalCalories,
    filteredData,
    totalMinutes,
    dateFilter,
    distanceUnit
  } from "../store/store";
  import {getFriendlyDate} from "../utils/dateUtils";
  import {formatNumberWithCommas} from "../utils/numberUtils";
  import IconStat from "./IconStat.svelte";
</script>

<section>
  <div class="section-wrapper">
    <h2>Totals</h2>
    <p class="time-period">
      <span class="sr-only">For dates: </span>{getFriendlyDate($dateFilter.startDate)} - {getFriendlyDate(
        $dateFilter.endDate
      )} (with filters applied)
    </p>
    <div class="wrapper">
      <IconStat
        statTitle="Rides"
        statNumber={formatNumberWithCommas($filteredData.length)}
        iconFile="../images/bike.svg"
      />
      <IconStat
        statTitle="Minutes"
        statNumber={formatNumberWithCommas($totalMinutes)}
        iconFile="../images/stopwatch.svg"
      />
      <IconStat
        statTitle={distanceUnit == "km" ? "Kilometers" : "Miles"}
        statNumber={formatNumberWithCommas($totalDistance)}
        iconFile="../images/moving.svg"
      />
      <IconStat
        statTitle="Calories"
        statNumber={formatNumberWithCommas($totalCalories)}
        iconFile="../images/energy.svg"
      />
    </div>
  </div>
</section>

<style>
  h2 {
    margin-bottom: 0;
  }
  section {
    background-color: #1a5b92;
    color: #fff;
    margin: 0;
    position: relative;
    max-width: 100vw;
    padding: 20px 10px;
  }
  .section-wrapper {
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 40px;
  }
  .time-period {
    text-align: right;
    margin-top: -3em;
    font-size: 9px;
    text-transform: lowercase;
  }
  @media only screen and (max-width: 768px) {
    .time-period {
      margin-top: -2em;
    }
  }
</style>
