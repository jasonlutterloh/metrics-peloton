# Peloton Metrics

Visualize your Peloton cycling output over time and other metrics. [Production App / Live Demo](https://peloton.lutterloh.dev).

## Getting Started

### Running Locally

To start locally, run the following commands:

```bash
    npm install
    npm run dev
```  

The app should be available at [http://localhost:5000](http://localhost:5000). A `sample-data.json` is provided to test the app.

### Production Deploy

If looking to deploy, make sure to use `npm run build` and then deploy the `/public` folder. You can test the production build using `npm run start`.

## Technical Details

This project is built using the [Svelte](https://svelte.dev/) framework and relies on [ChartJS](https://www.chartjs.org/).
