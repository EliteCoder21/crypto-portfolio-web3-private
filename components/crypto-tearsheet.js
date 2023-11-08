import React, { useEffect, useState } from "react";
import Plot from "./plot.js";

var scatter_layout = {
  //Formatting axis options here: https://github.com/d3/d3-format/blob/main/README.md#locale_format
  yaxis: {
    tickformat: "p",
    gridcolor: "#444444",
  },
  xaxis: {
    gridcolor: "#444444",
  },
  plot_bgcolor: "#1f2436",
  paper_bgcolor: "#1f2436",
  font: {
    // family: 'sans-serif',
    // size: 12,
    color: "#ffffff",
  },
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 4,
  },
  width: "100%",
  height: 440,
};

var flex = {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  marginBottom: 15
}

const CryptoTearsheet = () => {
  const cryptoTokens = ["XRP", "DOGE", "DAI"];

  const [plotData, setPlotData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const newPlotData = {};
      for (const cryptoToken of cryptoTokens) {
        try {
          const res = await fetch(
            `https://api.app-mobula.com/api/1/market/history?asset=${cryptoToken}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();

          let xs = [];
          let ys = [];
          for (var dataPoint in data.data.price_history) {
            xs.push(data.data.price_history[dataPoint][0]);
            ys.push(data.data.price_history[dataPoint][1]);
          }

          newPlotData[cryptoToken] = {
            x: xs,
            y: ys,
            type: "scatter",
            name: cryptoToken,
            line: {
              color: "#62bad4",
            },
          };
        } catch (error) {
          console.error(`Error fetching data for ${cryptoToken}:`, error);
        }
      }
      console.log(newPlotData);
      setPlotData(newPlotData);
    };

    fetchData();
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}>
        {cryptoTokens.map((crypto) => (
          <div style={flex}>
            <Plot className="plot" data={[plotData[crypto]]} layout={{...scatter_layout, ...{title: crypto + " Historical Prices"}}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTearsheet;