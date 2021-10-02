# Peloton Metrics

Visualize your Peloton cycling output over time and other metrics. [Production App / Live Demo](https://peloton.lutterloh.dev).

## Getting Started

### Running Locally

To start locally, run the following commands:

```bash
    npm install
    npm run dev
```  

The app should be available at [http://localhost:5000](http://localhost:5000).

### Production Deploy

If looking to deploy, make sure to use `npm run build` and then deploy the `/public` folder (This will compile the code and create the service worker for the PWA). You can test the production build using `npm run start`.

### Optional: Firebase Config

If you're using Firebase, copy-paste your config object there as an export. For example:

```js
export const firebaseConfig = {
  apiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ...
};
```

## Technical Details

This project is built using the [Svelte](https://svelte.dev/) framework and relies on [ChartJS](https://www.chartjs.org/).
