import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import * as d3 from "d3";

let file_path = "https://gist.githubusercontent.com/Eesha-Jain/ff0306a43ac7792dba154a7ce6239211/raw/8dc2fc2dd2dacc303c80eaafd148b668f25f0be2/muni_regression_imputed.csv"; //"/plotted_datasets/muni_regression_imputed.csv";

class MuniData {
  constructor(c_data, num) {
    this.data = c_data;
    this.keys = Object.keys(this.data[0]);
    this.length = this.data.length;
    this.n = num;
    if (num === -1) {
      this.n = this.length;
    }
  }
  get_val(index, d_key, not_string) {
    // get single value for a column at index and return the value either as a string or double
    if (not_string) {
      let r_d = [];
      if (d_key.length > 1) {
        for (const element of d_key) {
          r_d.push(parseFloat(this.data[index][element]));
        }
        return r_d;
      } else {
        return parseFloat(this.data[index][d_key[0]]);
      }
    } else {
      let r_d = "";
      let i = 0;
      for (const element of d_key) {
        if (i === 0) {
          r_d = element + ": " + this.data[index][element];
          i += 1;
        } else {
          r_d = r_d + "\n" + element + ": " + this.data[index][element];
        }
      }
      return r_d;
    }
  }
  get_col(d_key, not_string) {
    // get values for each column and return array containing either strings or double
    const col_k = [];
    for (let i = 0; i < this.n; i++) {
      col_k.push(this.get_val(i, d_key, not_string));
    }
    return col_k;
  }
  get_values(col_key, d_key, r_key) {
    // get every row where the value of one of the keys (col_key) is equal to a certain target value (col_key) and return the keys specified by r_key

    let r_vals = [];
    for (const element of this.data) {
      if (element[col_key] === d_key) {
        if (r_key !== -1) {
          let r_v = [];

          for (const e of element) {
            r_v.push({ e: element[e] });
          }

          r_vals.push(element);
        } else {
          r_vals.push(element);
        }
      }
    }
    return r_vals;
  }
}

function MuniPlots() {
  const [plotData2D, setPlotData2D] = useState([]);
  const [plotLayout2D, setPlotLayout2D] = useState({});

  const [plotData3D, setPlotData3D] = useState([]);
  const [plotLayout3D, setPlotLayout3D] = useState({});

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    async function generate2D() {
      const data = await d3.csv(file_path);
      const csv_data = new MuniData(data, -1);
      // using the raw data, I created a new MuniData instance, which is just a class I created to make manipulation easier

      // Class MuniData() {
      //     MuniData(array d, int num)   constructs a MuniData instance
      // this.data                csv data (array)
      // this.keys                list of keys in csv data (array)
      // this.length              number of rows in csv data (int)
      // this.n                   number of rows each class method is allowed to access (int)

      //     string/double get_val(int index, string d_key, boolean not_string)
      // returns the value of a column (d_key) at specified index (index) either as string or double (not_string)

      //     array get_col(string d_key, boolean not_string)
      // returns any column (d_key) with entries as either string or double (not_string)

      //     array get_values(string col_key, string d_key, array r_key)
      // returns the columns specified by r_key where one of the columns (col_key) has a value equal to d_key

      // }

      const color_dict = {
        "Classifications: 1-1": "#8F828C",
        "Classifications: 1-2": "#646464",
        "Classifications: 1-3": "#ACDCDF",
        "Classifications: 1-4": "#90C3C9",
        "Classifications: 2-1": "#AEC47D",
        "Classifications: 2-2": "#929292",
        "Classifications: 2-3": "#9CC6B0",
        "Classifications: 2-4": "#78B8D1",
        "Classifications: 3-1": "#78B8D1",
        "Classifications: 3-2": "#273D58",
        "Classifications: 3-3": "#D2DFA7",
        "Classifications: 3-4": "#C5C6A9",
        "Classifications: 4-1": "#928FB1",
        "Classifications: 4-2": "#98DCDF",
        "Classifications: 4-3": "#AFC47E",
        "Classifications: 4-4": "#A6C095",
      };

      // keys:
      // ['', 'Risk', 'Yield', 'CUSIP', 'Price', 'Rating1', 'Rating2', 'Rating3', 'Issuer Industry', 'Classifications']
      // '' is the index, 'Risk' is x, 'Yield' is y

      const colors = csv_data.get_col(["Classifications"], false);
      for (let i = 0; i < colors.length; i++) {
        colors[i] = color_dict[colors[i]];
      }

      let x_d = csv_data.get_col(["Risk"], true); // Risk, X
      let y_d = csv_data.get_col(["Yield"], true); // Yield, Y
      let data_text = csv_data.get_col(
        ["Risk", "Yield", "Classifications"],
        false
      );

      let w = window.innerWidth;
      let h = window.innerHeight;

      let graphData = [
        {
          x: x_d,
          y: y_d,
          type: "scatter",
          mode: "markers",
          name: "A1",
          hoverinfo: "text",
          text: data_text,
          marker: {
            color: colors,
          },
        },
      ];

      setPlotData2D(graphData);

      let layout = {
        autosize: false,
        width: w - 75,
        height: h - 25,
        yaxis: {
          title: "Yield",
          color: "#FFFFFF",
          gridcolor: "#969696",
          zerolinecolor: "#FFFFFF",
          range: [-1.5, 1.5],
        },
        xaxis: {
          title: "Risk",
          color: "#FFFFFF",
          gridcolor: "#969696",
          zerolinecolor: "#FFFFFF",
          range: [0.6, -0.6],
        },
        margin: {
          l: 50,
          r: 50,
          b: 100,
          t: 100,
          pad: 4,
        },
        paper_bgcolor: "#141721",
        plot_bgcolor: "#141721",
      };

      setPlotLayout2D(layout);
    }

    async function generate3D() {
      const data = await d3.csv(file_path);
      const csv_data = new MuniData(data, 10000);

      // using the raw data, I created a new MuniData instance, which is just a class I created to make manipulation easier

      // Class MuniData() {
      //     MuniData(array d, int num)   constructs a MuniData instance
      // this.data                csv data (array)
      // this.keys                list of keys in csv data (array)
      // this.length              number of rows in csv data (int)
      // this.n                   number of rows each class method is allowed to access (int)

      //     string/double get_val(int index, string d_key, boolean not_string)
      // returns the value of a column (d_key) at specified index (index) either as string or double (not_string)

      //     array get_col(string d_key, boolean not_string)
      // returns any column (d_key) with entries as either string or double (not_string)

      //     array get_values(string col_key, string d_key, array r_key)
      // returns the columns specified by r_key where one of the columns (col_key) has a value equal to d_key

      // }

      const color_dict = {
        "Classifications: 1-1": "#8F828C",
        "Classifications: 1-2": "#646464",
        "Classifications: 1-3": "#ACDCDF",
        "Classifications: 1-4": "#90C3C9",
        "Classifications: 2-1": "#AEC47D",
        "Classifications: 2-2": "#929292",
        "Classifications: 2-3": "#9CC6B0",
        "Classifications: 2-4": "#78B8D1",
        "Classifications: 3-1": "#78B8D1",
        "Classifications: 3-2": "#273D58",
        "Classifications: 3-3": "#D2DFA7",
        "Classifications: 3-4": "#C5C6A9",
        "Classifications: 4-1": "#928FB1",
        "Classifications: 4-2": "#98DCDF",
        "Classifications: 4-3": "#AFC47E",
        "Classifications: 4-4": "#A6C095",
      };

      // keys:
      // ['', 'Risk', 'Yield', 'CUSIP', 'Price', 'Rating1', 'Rating2', 'Rating3', 'Issuer Industry', 'Classifications']
      // '' is the index, 'Risk' is x, 'Yield' is y, 'Price' is z

      const x_d = csv_data.get_col(["Risk"], true); // Risk
      const y_d = csv_data.get_col(["Yield"], true); // Yield
      const z_d = csv_data.get_col(["Price"], true); //Price
      const data_text = csv_data.get_col(
        ["Risk", "Yield", "Price", "Classifications"],
        false
      );
      const colors = csv_data.get_col(["Classifications"], false);

      for (let i = 0; i < colors.length; i++) {
        colors[i] = color_dict[colors[i]];
      }

      let w = window.innerWidth;
      let h = window.innerHeight;

      let graphData = [
        {
          x: x_d,
          y: y_d,
          z: z_d,
          type: "scatter3d",
          mode: "markers",
          name: "A1",
          hoverinfo: "text",
          text: data_text,
          marker: {
            color: colors,
          },
        },
      ];

      setPlotData3D(graphData);

      let layout = {
        autosize: false,
        width: w - 75,
        height: h - 25,
        scene: {
          xaxis: {
            title: "Risk",
            color: "#FFFFFF",
            gridcolor: "#969696",
            zerolinecolor: "#FFFFFF",
            range: [-1, 1],
          },
          yaxis: {
            title: "Yield",
            color: "#FFFFFF",
            gridcolor: "#969696",
            zerolinecolor: "#FFFFFF",
          },
          zaxis: {
            title: "Price",
            color: "#FFFFFF",
            gridcolor: "#969696",
            zerolinecolor: "#FFFFFF",
          },
        },
        margin: {
          l: 20,
          r: 20,
          b: 50,
          t: 50,
          pad: 4,
        },
        paper_bgcolor: "#141721",
        plot_bgcolor: "#141721",
      };

      setPlotLayout3D(layout);
    }

    if (!updated) {
      setUpdated(true);
      generate2D();
      generate3D();
    }
  }, [plotData2D, plotLayout2D, plotData3D, plotLayout3D, updated]);

  return (
    <div className="App">
      <Plot data={plotData2D} layout={plotLayout2D} />
      {/* <Plot
        data={plotData3D}
        layout={plotLayout3D}
      /> */}
    </div>
  );
}

export default MuniPlots;
