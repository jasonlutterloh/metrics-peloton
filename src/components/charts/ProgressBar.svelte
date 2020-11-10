<script>
  export let percentage;
  export let leftLabel;
  export let rightLabel;
  export let barLabel;
  export let fillColor;
</script>

<style>
  .progress-bar-wrapper {
    width: 100%;
    height: 30px;
    background: #ddd;
    margin-bottom: 10px;
  }
  .progress-bar {
    height: 30px;
    line-height: 30px;
    width: 0;
    transition: 0.5s all;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
  .left-label,
  .right-label {
    font-size: 14px;
    padding-bottom: 2px;
    display: inline-block;
  }
  .right-label {
    float: right;
  }
</style>

<div>
  <span class="left-label">{leftLabel}</span>
  <span class="right-label">{rightLabel}</span>
  <div class="progress-bar-wrapper">
    <div
      class="progress-bar"
      style="width:{percentage}%; background-color:{fillColor}">
      {barLabel}
    </div>
  </div>
</div>
