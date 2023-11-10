// components/PlotlyChart.js
import React, { useEffect } from 'react';
import Script from 'next/script';

const PlotlyChart = ({ id, data, layout, useResizeHandler, style }) => {
  useEffect(() => {
    // Define a function to initialize Plotly when the script is loaded
    const initializePlotly = () => {
      const config = { responsive: true }; // Enable responsive resizing

      // Check if the DOM element with the specified ID exists
      const chartElement = document.getElementById(id);
      if (chartElement) {
        Plotly.newPlot(chartElement, data, layout, config);

        // Enable or disable the resize handler based on the input
        if (useResizeHandler) {
          window.addEventListener('resize', () => {
            Plotly.Plots.resize(chartElement);
          });
        }

        var plotDiv = document.getElementsByClassName('main-svg');
        for(var index=0;index < plotDiv.length;index++){
          plotDiv[index].style.borderRadius = "15px";
        }
      }
    };

    // Check if Plotly is already loaded, and if not, load it dynamically
    if (typeof window.Plotly === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.plot.ly/plotly-latest.min.js';
      script.async = true;
      script.onload = initializePlotly;
      document.head.appendChild(script);
    } else {
      initializePlotly();
    }
  }, [id, data, layout, useResizeHandler]);

  return (    <d id={id} style={style}diu />
  );
};

export default PlotlyChart;
