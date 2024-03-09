import Select from "react-select";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Grid from "@mui/material/Grid";
import { TempCold } from "styled-icons/remix-fill";
import { BlackTie } from "styled-icons/fa-brands";

const enableLoadIcon = true;

const CUSIP_options = [
  { value: "0121227V3", label: "0121227V3" },
  { value: "0121227P6", label: "0121227P6" },
  { value: "012432BR0", label: "012432BR0" },
  { value: "012104PN9", label: "012104PN9" },
  { value: "010824GS3", label: "010824GS3" },
  { value: "032452BP8", label: "032452BP8" },
  { value: "032452BR4", label: "032452BR4" },
  { value: "01112CBU9", label: "01112CBU9" },
  { value: "014365CC2", label: "014365CC2" },
  { value: "06738EAV7", label: "06738EAV7" },
  { value: "06741JV89", label: "06741JV89" },
  { value: "06746V776", label: "06746V776" },
  { value: "78013XF52", label: "78013XF52" },
  { value: "78013XTK4", label: "78013XTK4" },
  { value: "025816BW8", label: "025816BW8" },
  { value: "0258M0EG0", label: "0258M0EG0" },
  { value: "00912XAS3", label: "00912XAS3" },
  { value: "459200JG7", label: "459200JG7" },
  { value: "459200JH5", label: "459200JH5" },
  { value: "None", label: "None" },
];

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(19, 19, 21)",
    borderRadius: "10px",
    height: "30px",
    width: "200px",
  }),
  option: (provided, state, isSelected) => ({
    ...provided,
    color: state.isSelected ? "rgb(169, 169, 169)" : "rgb(169, 169, 169)",
    backgroundColor: isSelected ? "rgb(19, 19, 21)" : "rgb(19, 19, 21)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "gray",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.selectProps.menuIsOpen ? "transparent" : provided.color,
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "100%",
  }),
  input: (provided) => ({
    ...provided,
    width: "161px",
    height: "36px",
    margin: "0",
  }),
};

const bgColor = {
  backgroundColor: "#131315",
};

const boxColor = {
  backgroundColor: "#1f2436",
  margin: "5px",
};

const wDrawboxColor = {
  backgroundColor: "#1f2436",
  margin: "5px",
};

const divStyle = {
  margin: "5px",
};

const tableStyle = {
  margin: "5px",
  cellspacing: "0",
  cellpadding: "0",
  width: "350px",
  border: "0px",
};

const tableTitle = {
  color: "white",
  fontSize: 20,
  textAlign: "center",
};

const dropdownTitle = {
  color: "rgb(169, 169, 169)",
  fontSize: 14,
  textAlign: "left",
};

const headerStyle = {
  // backgroundColor: "#131722",
  backgroundColor: "#131315",
  borderBottom: "solid",
  borderBottomColor: "#6c6c6c",
  borderBottomWidth: "1px",
};

export const mainTextColor = {
  color: "#9B9EA3",
};

var quant_layout = {
  //Formatting axis options here: https://github.com/d3/d3-format/blob/main/README.md#locale_format
  yaxis: {
    tickformat: "p",
    tick0: 0,
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
  yaxis: {
    gridcolor: "#444444",
  },
  width: (window.innerWidth - 60) / 2,
  height: 440,
  title: "return Quantiles",
  borderRadius: 10,
};

var month_percent_layout = {
  //Formatting axis options here: https://github.com/d3/d3-format/blob/main/README.md#locale_format
  plot_bgcolor: "#1f2436",
  paper_bgcolor: "#1f2436",
  annotations: [],
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
  width: window.innerWidth - 60,
  height: 440,
  title: "Monthly Returns (%)",
};

var sharpe_layout = {
  //Formatting axis options here: https://github.com/d3/d3-format/blob/main/README.md#locale_format
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
  yaxis: {
    tickformat: "p",
    gridcolor: "#444444",
  },
  xaxis: {
    gridcolor: "#444444",
  },
  width: (window.innerWidth - 80) / 2,
  height: 440,
  title: "Rolling Sharpe (6 Months)",
};

var vol_layout = {
  //Formatting axis options here: https://github.com/d3/d3-format/blob/main/README.md#locale_format
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
  yaxis: {
    tickformat: "p",
    gridcolor: "#444444",
  },
  xaxis: {
    gridcolor: "#444444",
  },
  width: (window.innerWidth - 60) / 2,
  height: 440,
  title: "Rolling Volatility (6 Months)",
};

var beta_layout = {
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
  width: (window.innerWidth - 80) / 2,
  height: 440,
  title: "Rolling Beta to Benchmark",
};

var drawdown_layout = {
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
  width: window.innerWidth - 350 - 80,
  height: 440,
  title: "Top 5 Drawdown Periods",
};

var monthly_layout = {
  //Formatting axis options here: https://github.com/d3/d3-format/blob/main/README.md#locale_format
  xaxis: {
    tickformat: "p",
  },
  yaxis: {
    gridcolor: "#444444",
  },
  font: {
    color: "#ffffff",
  },
  plot_bgcolor: "#1f2436",
  paper_bgcolor: "#1f2436",
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 4,
  },
  width: window.innerWidth - 350 - 80,
  height: 440,
  title: "Distribution of Monthly Returns",
};

var EoY_layout = {
  //Formatting axis options here: https://github.com/d3/d3-format/blob/main/README.md#locale_format
  yaxis: {
    tickformat: "p",
    gridcolor: "#444444",
  },
  font: {
    color: "#ffffff",
  },
  barmode: "group",
  plot_bgcolor: "#1f2436",
  paper_bgcolor: "#1f2436",
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 4,
  },
  width: window.innerWidth - 350 - 80,
  height: 440,
  title: "End of Year Returns vs Benchmark",
};
var creturns_layout = {
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
  width: window.innerWidth - 350 - 80,
  height: 440,
  title: "Cumulative Returns",
};

var dreturns_layout = {
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
  width: window.innerWidth - 350 - 80,
  height: 440,
  title: "Daily Returns",
};

var sort_layout = {
  //Formatting axis options here: https://github.com/d3/d3-format/blob/main/README.md#locale_format
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
  yaxis: {
    tickformat: "p",
    gridcolor: "#444444",
  },
  xaxis: {
    gridcolor: "#444444",
  },
  width: (window.innerWidth - 80) / 2,
  height: 440,
  title: "Rolling Sortino (6 Months)",
};

var under_layout = {
  //Formatting axis options here: https://github.com/d3/d3-format/blob/main/README.md#locale_format
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
  yaxis: {
    tickformat: "p",
    gridcolor: "#444444",
  },
  xaxis: {
    gridcolor: "#444444",
  },
  width: window.innerWidth - 350 - 80,
  height: 440,
  title: "Underwater Plot",
};

const Tearsheet = (isCrypto) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [creturn_data, setCReturns] = useState([]);
  const [vreturn_data, setVReturns] = useState([]);
  const [eoy_return, setEOYReturns] = useState([]);
  const [daily_returns, setDailyReturns] = useState([]);
  const [monthly_returns, setMonthlyReturns] = useState([]);
  const [worst_drawdowns, setWorstDrawdowns] = useState([]);
  const [beta, setBeta] = useState([]);
  const [sharpe, setSharpe] = useState([]);
  const [vol, setVol] = useState([]);
  const [quants, setQuants] = useState([]);
  const [sortino, setSortino] = useState([]);
  const [underwater, setUnderwater] = useState([]);
  const [monthly_percents, setMonthlyPercents] = useState([]);
  const [selectedCUSIPStrat, setSelectedCUSIPStrat] = useState("00912XAS3");

  const [cret_Layout, setCRetLayout] = useState(creturns_layout);
  const [eoy_Layout, setEOYLayout] = useState(EoY_layout);
  const [month_Layout, setMonthlyLayout] = useState(monthly_layout);

  const [daily_Layout, setDailyLayout] = useState(dreturns_layout);
  const [wdp_Layout, setWDPLayout] = useState(drawdown_layout);

  const [beta_Layout, setBetaLayout] = useState(beta_layout);
  const [sharpe_Layout, setSharpeLayout] = useState(sharpe_layout);
  const [vol_Layout, setVolLayout] = useState(vol_layout);
  const [quant_Layout, setQuantLayout] = useState(quant_layout);
  const [heatmap_Layout, setHeatMapLayout] = useState(month_percent_layout);
  const [sort_Layout, setSortLayout] = useState(sort_layout);
  const [under_Layout, setUnderLayout] = useState(under_layout);

  const [URL, setURL] = useState("");

  useEffect(() => {
    if (isCrypto) {
      setURL("https://quantstats-prod-wmn5n7rc5q-uc.a.run.app/getdata/");
    } else {
      setURL("https://quantstats-prod-wmn5n7rc5q-uc.a.run.app/getdata/");
    }
  }, [isCrypto]);

  // async function queryStackOverflow() {
  //   // Queries a public Stack Overflow dataset.

  //   // Create a client
  //   const bigqueryClient = new BigQuery();

  //   // The SQL query to run
  //   const sqlQuery = `SELECT
  //     CONCAT(
  //       'https://stackoverflow.com/questions/',
  //       CAST(id as STRING)) as url,
  //     view_count
  //     FROM \`bigquery-public-data.stackoverflow.posts_questions\`
  //     WHERE tags like '%google-bigquery%'
  //     ORDER BY view_count DESC
  //     LIMIT 10`;

  //   const options = {
  //     query: sqlQuery,
  //     // Location must match that of the dataset(s) referenced in the query.
  //     location: 'US',
  //   };

  //   // Run the query
  //   const [rows] = await bigqueryClient.query(options);

  //   console.log('Query Results:');
  //   rows.forEach(row => {
  //     const url = row['url'];
  //     const viewCount = row['view_count'];
  //     console.log(`url: ${url}, ${viewCount} views`);
  //   });
  // }
  // queryStackOverflow();

  function clearVisuals() {
    //TODO: Add loading animations...?
    setCReturns([]);
    setVReturns([]);
    setVReturns([]);
    setEOYReturns([]);
    setDailyReturns([]);
    setMonthlyPercents([]);
    setMonthlyReturns([]);
    setWorstDrawdowns([]);
    setBeta([]);
    setSharpe([]);
    setVol([]);
    setQuants([]);
    setSortino([]);
    setUnderwater([]);
    let table = document.querySelector("#w_draw_table");
    table.innerHTML = "";
    let table2 = document.querySelector("#eoy_table");
    table2.innerHTML = "";
    let table3 = document.querySelector("#table");
    table3.innerHTML = "";
  }

  function handleStratInputChange(newValue) {
    setSelectedCUSIPStrat(newValue.value);
    clearVisuals();
    //Call useEffect with new value
    handleRefresh(newValue.value);
    console.log(newValue);
  }

  function generateTable(table, data, Strategy, Benchmark) {
    table.innerHTML = "";
    let keys = Object.keys(data[0]);
    console.log(keys);
    table.style.textAlign = "left";
    table.style.borderSpacing = "10px 5px";

    //Adding row for headers
    let row = table.insertRow();
    row.className = "benchmark_header";
    let th1 = document.createElement("th");
    let met = document.createTextNode("Metric");
    th1.appendChild(met);
    th1.style.textAlign = "left";
    row.appendChild(th1);
    let th2 = document.createElement("th");
    let strat = document.createTextNode("Strategy");
    th2.appendChild(strat);
    th2.style.textAlign = "right";
    row.appendChild(th2);

    const hor_bar = [
      "Cumulative Return ",
      "Sharpe ",
      "Max Drawdown ",
      "Expected Daily % ",
      "Gain/Pain Ratio ",
      "Payoff Ratio ",
      "MTD ",
      "Best Day ",
      "Avg. Drawdown ",
      "Avg. Up Month ",
    ];
    for (const key of keys) {
      //Adding row for each key
      if (hor_bar.includes(key)) {
        let div = table.insertRow();
        let cell_hold = div.insertCell();
        cell_hold.colSpan = "3";
        let bar = document.createElement("hr");
        bar.className = "benchmark_bar";
        cell_hold.appendChild(bar);
        div.className = "benchmark_table";
        div.appendChild(cell_hold);
      }
      let row = table.insertRow();
      let cell = row.insertCell();
      let key_text = document.createTextNode(key);
      cell.appendChild(key_text);
      let cell1 = row.insertCell();
      let strat_text = document.createTextNode(data[0][key]);
      cell1.style.textAlign = "right";
      cell1.appendChild(strat_text);
      let cell2 = row.insertCell();
      row.className = "benchmark_table";
    }
  }

  function generateEOYTable(table, data) {
    table.innerHTML = "";
    const keys = Object.keys(data[0].Strategy);

    table.style.textAlign = "left";
    table.style.borderSpacing = "10px 5px";

    //Adding row for headers
    let row = table.insertRow();
    row.className = "benchmark_header";
    let th1 = document.createElement("th");
    let met = document.createTextNode("Year");
    th1.appendChild(met);
    th1.style.textAlign = "left";
    row.appendChild(th1);
    let th2 = document.createElement("th");
    let bench = document.createTextNode("Benchmark");
    th2.appendChild(bench);
    th2.style.textAlign = "left";
    row.appendChild(th2);
    let th3 = document.createElement("th");
    let strat = document.createTextNode("Strategy");
    th3.appendChild(strat);
    th3.style.textAlign = "left";
    row.appendChild(th3);
    let th4 = document.createElement("th");
    let mult = document.createTextNode("Multiplier");
    th4.appendChild(mult);
    th4.style.textAlign = "left";
    row.appendChild(th4);
    let th5 = document.createElement("th");
    let w = document.createTextNode("Won");
    th5.appendChild(w);
    row.appendChild(th5);
    for (const key of keys) {
      //Adding row for each key
      let row = table.insertRow();
      row.className = "benchmark_table";
      //Making key a header
      // let th = document.createElement("th");
      // let key_text = document.createTextNode(key);
      // th.appendChild(key_text);
      // row.appendChild(th);
      let cell1 = row.insertCell();
      let key_text = document.createTextNode(key);
      cell1.appendChild(key_text);

      //Inserting the data specified by the key
      let cell = row.insertCell();
      let bench_text = document.createTextNode(data[0].Benchmark[key]);
      if (data[0].Benchmark[key] != null) {
        bench_text = document.createTextNode(data[0].Benchmark[key].toFixed(5));
      }
      cell.appendChild(bench_text);
      let cell2 = row.insertCell();
      let strat_text = document.createTextNode(data[0].Strategy[key]);
      if (data[0].Strategy[key] != null) {
        strat_text = document.createTextNode(data[0].Strategy[key].toFixed(5));
      }
      cell2.appendChild(strat_text);
      let cell3 = row.insertCell();
      let mult_text;
      if (data[0].Multiplier[key] == null) {
        mult_text = document.createTextNode("");
      } else {
        mult_text = document.createTextNode(data[0].Multiplier[key].toFixed(5));
      }
      cell3.appendChild(mult_text);
      let cell4 = row.insertCell();
      let w_text = document.createTextNode(data[0].Won[key]);
      cell4.style.textAlign = "center";
      cell4.appendChild(w_text);
    }
  }

  function generateWDrawTable(table, data) {
    table.innerHTML = "";
    const keys = Object.keys(data[0].start);

    table.style.textAlign = "left";
    table.style.borderSpacing = "10px 5px";

    //Adding row for headers
    let row = table.insertRow();
    row.className = "benchmark_header";
    let th1 = document.createElement("th");
    let met = document.createTextNode("Started");
    th1.appendChild(met);
    th1.style.textAlign = "left";
    row.appendChild(th1);
    let th2 = document.createElement("th");
    let bench = document.createTextNode("Recovered");
    th2.appendChild(bench);
    th2.style.textAlign = "left";
    row.appendChild(th2);
    let th3 = document.createElement("th");
    let strat = document.createTextNode("Drawdown");
    th3.appendChild(strat);
    th3.style.textAlign = "left";
    row.appendChild(th3);
    let th4 = document.createElement("th");
    let mult = document.createTextNode("Days");
    th4.appendChild(mult);
    row.appendChild(th4);
    for (const key of keys) {
      //Adding row for each key
      let row = table.insertRow();
      row.className = "benchmark_table";
      //Making key a header
      let cel = row.insertCell();
      let key_text = document.createTextNode(data[0].start[key]);
      cel.appendChild(key_text);
      //Inserting the data specified by the key
      let cell = row.insertCell();
      let bench_text = document.createTextNode(data[0].end[key]);
      cell.appendChild(bench_text);
      let cell2 = row.insertCell();
      let strat_text = document.createTextNode(
        data[0]["max drawdown"][key].toFixed(5) + "%"
      );
      cell2.appendChild(strat_text);
      let cell3 = row.insertCell();
      let mult_text = document.createTextNode(data[0].days[key]);
      cell3.appendChild(mult_text);
    }
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    handleRefresh(selectedCUSIPStrat, "010824GS3");
    window.addEventListener("resize", handleResize, false);
  }, []);

  const handleResize = () => {
    let ret = {};
    //Set size of first set of visuals

    //Entire window - table - margins/padding
    const first_size = window.innerWidth - 350 - 80;
    Object.assign(ret, cret_Layout);
    ret.width = first_size;
    ret.title = "Cumulative Returns";
    setCRetLayout(ret);

    let eoy = {};
    Object.assign(eoy, eoy_Layout);
    eoy.width = first_size;
    setEOYLayout(eoy);

    let month = {};
    Object.assign(month, month_Layout);
    month.width = first_size;
    setMonthlyLayout(month);

    let daily = {};
    Object.assign(daily, daily_Layout);
    daily.width = first_size;
    daily.title = "Daily Returns";
    setDailyLayout(daily);

    let drop = {};
    Object.assign(drop, wdp_Layout);
    drop.width = first_size;
    setWDPLayout(drop);

    const second_size = (window.innerWidth - 80) / 2;
    let beta = {};
    Object.assign(beta, beta_Layout);
    beta.width = second_size;
    setBetaLayout(beta);

    let sharpe = {};
    Object.assign(sharpe, sharpe_Layout);
    sharpe.width = second_size;
    setSharpeLayout(sharpe);

    let vol = {};
    Object.assign(vol, vol_Layout);
    vol.width = second_size;
    setVolLayout(vol);

    let sort = {};
    Object.assign(sort, sort_Layout);
    sort.width = second_size;
    setSortLayout(sort);

    let under = {};
    Object.assign(under, under_Layout);
    under.width = first_size;
    setUnderLayout(under);

    let quant = {};
    Object.assign(quant, quant_Layout);
    quant.width = second_size;
    setQuantLayout(quant);

    const third_size = window.innerWidth - 60;
    let hm = {};
    Object.assign(hm, heatmap_Layout);
    hm.width = third_size;
    setHeatMapLayout(hm);
  };

  const handleRefresh = async (Strategy, Benchmark) => {
    console.log(
      URL + "/cret/" +
        Strategy +
        "/None"
    );
    fetch(
      URL + "/cret/" +
        Strategy +
        "/None"
    )
      .then((res) => res.json())
      .then((result) => {
        data = [JSON.parse(JSON.stringify(result))];

        var trace1 = {
          x: Object.keys(data[0]),
          y: Object.values(data[0]),
          type: "scatter",
          name: "Strategy",
          line: {
            color: "#62bad4",
          },
        };
        var data = [trace1];
        console.log(data);

        setCReturns(data);
      });

    fetch(
      URL + "/metrics/" +
        Strategy +
        "/" +
        "None"
    )
      .then((response) => response.json())
      .then((json) => {
        let bond_metrics = [JSON.parse(JSON.stringify(json))];
        let tab = document.querySelector("#table");
        generateTable(tab, bond_metrics, Strategy, Benchmark); // generate the table first
      });

    fetch(
      URL + "/eoyret/" +
        Strategy +
        "/None"
    )
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];

        var trace1 = {
          x: Object.keys(data[0]),
          y: Object.values(data[0]),
          type: "bar",
          name: "Strategy",
          marker: {
            color: "#62bad4",
          },
        };

        var data = [trace1];
        setEOYReturns(data);
      });

    fetch(
      URL + "/monthdis/" +
        Strategy +
        "/" +
        "None"
    )
      //fetch('https://127.0.0.1:5000/getdata/cret/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        // console.log(data);
        console.log(Object.values(data[0]));

        var trace1 = {
          x: Object.values(data[0]),
          type: "histogram",
          name: "Strategy",
          xbins: {
            size: 0.005,
          },
          marker: {
            color: "#62bad4",
          },
        };

        var data = [trace1];
        setMonthlyReturns(data);
      });

    fetch(
      URL + "/dret/" +
        Strategy +
        "/" +
        "None"
    )
      //fetch('https://127.0.0.1:5000/getdata/cret/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        // console.log(data);

        var trace1 = {
          x: Object.keys(data[0]),
          y: Object.values(data[0]),
          type: "scatter",
          name: "Strategy",
          line: {
            color: "#62bad4",
          },
        };

        var data = [trace1];
        setDailyReturns(data);
      });

    fetch(
      URL + "/ret_draw/" +
        Strategy +
        "/" +
        "None"
    )
      //fetch('https://127.0.0.1:5000/getdata/ret_draw/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        console.log(data);

        var trace1 = {
          x: Object.keys(data[0].Returns),
          y: Object.values(data[0].Returns),
          type: "scatter",
          name: "Strategy",
          line: {
            color: "#62bad4",
          },
        };
        drawdown_layout.shapes = [];

        const keys = Object.keys(data[0].Drawdowns.start);
        for (const key of keys) {
          let result = {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "x",
            // y-reference is assigned to the plot paper [0,1]
            yref: "paper",
            x0: data[0].Drawdowns.start[key],
            y0: 0,
            x1: data[0].Drawdowns.end[key],
            y1: 1,
            fillcolor: "#FF0000",
            opacity: 0.2,
            line: {
              width: 0,
            },
          };
          drawdown_layout.shapes.push(result);
        }

        var data = [trace1];
        setWorstDrawdowns(data);
      });

    fetch(
      URL + "/rolbeta/" +
        Strategy +
        "/" +
        "None'GRO"
    )
      //fetch('https://127.0.0.1:5000/getdata/rolbeta/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        // console.log(data);
        console.log(data);
        var trace1 = {
          x: Object.keys(data[0].Six_Months),
          y: Object.values(data[0].Six_Months),
          type: "scatter",
          name: "Six_Months",
          line: {
            color: "#62bad4",
          },
        };

        var data = [trace1];
        setBeta(data);
      });

    fetch(
      URL + "/eoytable/" +
        Strategy +
        "/" +
        "None'GRO"
    )
      .then((response) => response.json())
      .then((json) => {
        const bond_metrics = [JSON.parse(JSON.stringify(json))];
        let table = document.querySelector("#eoy_table");
        generateEOYTable(table, bond_metrics); // generate the table first
      });

    fetch(
      URL + "/rsharpe/" +
        Strategy +
        "/None'GRO"
    )
      //fetch('https://127.0.0.1:5000/getdata/rsharpe/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        // console.log(data);

        var trace1 = {
          x: Object.keys(data[0]),
          y: Object.values(data[0]),
          type: "scatter",
          name: "Strategy",
          line: {
            color: "#62bad4",
          },
        };

        var data = [trace1];
        setSharpe(data);
      });

    fetch(
      URL + "/wdraw/" +
        Strategy +
        "/" +
        "None"
    )
      .then((response) => response.json())
      .then((json) => {
        const bond_metrics = [JSON.parse(JSON.stringify(json))];
        let table = document.querySelector("#w_draw_table");
        generateWDrawTable(table, bond_metrics); // generate the table first
      });

    fetch(
      URL + "/rvol/" +
        Strategy +
        "/" +
        "None"
    )
      //fetch('https://127.0.0.1:5000/getdata/rvol/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        // console.log(data);
        console.log(Object.values(data[0]));

        var trace1 = {
          x: Object.keys(data[0]),
          y: Object.values(data[0]),
          type: "scatter",
          name: "Strategy",
          line: {
            color: "#62bad4",
          },
        };

        var data = [trace1];

        setVol(data);
      });

    fetch(
      URL + "/retquant/" +
        Strategy +
        "/" +
        "None"
    )
      //fetch('https://127.0.0.1:5000/getdata/retquant/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        // console.log(data);

        var trace1 = {
          y: Object.values(data[0].Daily),
          type: "box",
          name: "Daily",
          marker: {
            color: "#62bad4",
            //color: '#1f77b4'
          },
        };

        var trace2 = {
          y: Object.values(data[0].Weekly),
          type: "box",
          name: "Weekly",
          marker: {
            color: "#929292",
            //color: '#ff7f0e'
          },
        };

        var trace3 = {
          y: Object.values(data[0].Monthly),
          type: "box",
          name: "Monthly",
          marker: {
            color: "#a9c574",
            //color: '#7f7f7f'
          },
        };

        var trace4 = {
          y: Object.values(data[0].Quarterly),
          type: "box",
          name: "Quarterly",
          marker: {
            color: "#82c2ca",
          },
        };

        var trace5 = {
          y: Object.values(data[0].Yearly),
          type: "box",
          name: "Yearly",
          marker: {
            color: "#ffffff",
          },
        };

        var data = [trace1, trace2, trace3, trace4, trace5];
        setQuants(data);
      });

    fetch(
      URL + "/heatmap/" +
        Strategy +
        "/" +
        "None"
    )
      //fetch('https://127.0.0.1:5000/getdata/heatmap/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        console.log(data);

        const xValues = Object.keys(data[0].APR);
        const yValues = Object.keys(data[0]);
        const zValues = [
          Object.values(data[0].JAN),
          Object.values(data[0].FEB),
          Object.values(data[0].MAR),
          Object.values(data[0].APR),
          Object.values(data[0].MAY),
          Object.values(data[0].JUN),
          Object.values(data[0].JUL),
          Object.values(data[0].AUG),
          Object.values(data[0].SEP),
          Object.values(data[0].OCT),
          Object.values(data[0].NOV),
          Object.values(data[0].DEC),
        ];
        var trace1 = {
          x: xValues,
          y: yValues,
          z: zValues,
          type: "heatmap",
          //values here give color scale
          // colorscale: 'RdBl',
          reversescale: true,
          colorscale: [
            ["0.0", "#A9C574"],
            ["0.111111111111", "#B1BA70"],
            ["0.222222222222", "#B9AF6D"],
            ["0.333333333333", "#C0A469"],
            ["0.444444444444", "#C89965"],
            ["0.555555555556", "#D08E62"],
            ["0.666666666667", "#D8835E"],
            ["0.777777777778", "#E0785B"],
            ["0.888888888889", "#E86D57"],
            ["1.0", "#EF6253"],
          ],
          name: "Strategy",
        };

        month_percent_layout.annotations = [];

        for (var i = 0; i < yValues.length; i++) {
          for (var j = 0; j < xValues.length; j++) {
            var currentValue = zValues[i][j];
            //Can experiment with these values for color of text
            var textColor = "white";
            var result = {
              xref: "x1",
              yref: "y1",
              x: xValues[j],
              y: yValues[i],
              text: zValues[i][j],
              // font: {
              //   family: 'Arial',
              //   size: 12,
              //   color: 'rgb(50, 171, 96)'
              // },
              showarrow: false,
              font: {
                color: textColor,
              },
            };
            month_percent_layout.annotations.push(result);
          }
        }

        var data = [trace1];
        setMonthlyPercents(data);
      });

    fetch(
      URL + "/rsortino/" +
        Strategy +
        "/" +
        "None"
    )
      //fetch('https://127.0.0.1:5000/getdata/rsortino/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        // console.log(data);

        var trace1 = {
          x: Object.keys(data[0]),
          y: Object.values(data[0]),
          type: "scatter",
          name: "Strategy",
          line: {
            color: "#62bad4",
          },
        };

        var data = [trace1];

        setSortino(data);
      });

    fetch(
      URL + "/underwater/" +
        Strategy +
        "/" +
        "None"
    )
      //fetch('https://127.0.0.1:5000/getdata/underwater/'+Strat_CUSIP+'/'+Bench_CUSIP)
      .then((response) => response.json())
      .then((json) => {
        data = [JSON.parse(JSON.stringify(json))];
        console.log(data);

        var trace1 = {
          x: Object.keys(data[0]),
          y: Object.values(data[0]),
          type: "scatter",
          fill: "tozeroy",
          name: "Strategy",
          line: {
            color: "#62bad4",
          },
        };
        var data = [trace1];

        setUnderwater(data);
      });
  };

  let initialSubheaderFontSize;
  if (window.innerWidth > 568) {
    initialSubheaderFontSize = 37;
  } else {
    initialSubheaderFontSize = 31;
  }

  const [subheaderFontSize, setSubheaderFontSize] = useState(
    initialSubheaderFontSize
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <div align="center" width="100%" height="80px">
        <h1
          backgroundColor="#131722"
          style={{
            lineHeight: "80px",
            fontSize: 45,
            color: "white",
            marginTop: 10,
          }}
        >
          Strategy Tearsheet
        </h1>
      </div>
      <div style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}>
        <div className="d-flex justify-content-left ml-3 mb-3 selectContainer">
          <div className="d-flex flex-column benchSelectDiv">
            <div style={dropdownTitle}>Strategy CUSIP</div>
            {/* <div className="selectContainer">  */}
            <Select
              className="benchSelect"
              maxWidth={300}
              placeholder={selectedCUSIPStrat}
              onChange={handleStratInputChange}
              options={CUSIP_options}
              styles={customStyles}
              isClearable
              value={selectedCUSIPStrat}
              isFilterable
              showCreate
              // marginBottom="10px"
            />
            {/* </div> */}
          </div>
        </div>
        <div className="d-flex justify-content-evenly ml-3">
          <div className="d-flex flex-column">
            <Plot
              className="plot"
              data={creturn_data}
              layout={cret_Layout}
              style={divStyle}
            />
            <Plot
              className="plot"
              data={eoy_return}
              layout={eoy_Layout}
              style={divStyle}
            />
            <Plot
              className="plot"
              data={monthly_returns}
              layout={month_Layout}
              style={divStyle}
            />
            <Plot
              className="plot"
              data={daily_returns}
              layout={daily_Layout}
              style={divStyle}
            />
          </div>
          <div className="tables d-flex flex-column" style={boxColor}>
            <div id="tableTitle" style={tableTitle}>
              Key Performance Metrics
            </div>
            <table id="table" style={tableStyle} />
          </div>
        </div>
        <div id="First_Visuals" className="d-flex justify-content-evenly ml-3">
          <div className="d-flex flex-column">
            <Plot
              className="plot"
              data={underwater}
              layout={under_Layout}
              style={divStyle}
            />
            <Plot
              className="plot"
              data={worst_drawdowns}
              layout={wdp_Layout}
              style={divStyle}
            />
          </div>
          <div className="d-flex flex-column">
            <div className="tables" style={boxColor}>
              <div id="eoyTitle" style={tableTitle}>
                EOY Returns vs Benchmark
              </div>
              <table id="eoy_table" style={tableStyle} />
            </div>
            <div className="tables" style={wDrawboxColor}>
              <div id="w_draw_table_Title" style={tableTitle}>
                Worst Drawdowns
              </div>
              <table id="w_draw_table" style={tableStyle} />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-evenly ml-3">
          <div className="d-flex flex-column">
            <Plot
              className="plot"
              data={sharpe}
              layout={sharpe_Layout}
              style={divStyle}
            />
            <Plot
              className="plot"
              data={sortino}
              layout={sort_Layout}
              style={divStyle}
            />
          </div>
          <div className="d-flex flex-column">
            <Plot
              className="plot"
              data={vol}
              layout={vol_Layout}
              style={divStyle}
            />
            <Plot
              className="plot"
              data={quants}
              layout={quant_Layout}
              style={divStyle}
            />
          </div>
        </div>
        <div className="ml-3">
          <Plot
            className="big"
            data={monthly_percents}
            layout={heatmap_Layout}
          />
        </div>
      </div>
    </div>
  );
};

export default Tearsheet;