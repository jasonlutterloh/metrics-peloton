<script>
  export let statNumber;
  export let iconFile;
  export let statTitle;
</script>
<style>
  div {
    flex: 1 1 auto;
    text-align: center;
    box-sizing: border-box;
    padding: 0 10px;
  }
  p{
    font-size: 1.2em;
    margin: 0;
  }
  span {
      display: block;
      font-size: 2.4em;
      font-weight: 200;
  }
  img{
    fill: #fff;
  }
  @media only screen and (max-width: 768px) {
        div{
            flex-basis: 50%;
            padding: 20px 0;
        }
        img{
          height: 30px;
          width: 30px;
        }
    }
</style>
<div>
  <p>
    <img src={iconFile} alt="" />
    <span>{statNumber}</span> 
    {statTitle}
  </p>
</div>