import React from 'react';
import MuniPlots2D from './MuniPlots2D';
import MuniPlots3D from './MuniPlots3D'
import CorpPlots2D from './CorpPlots2D';
import CorpPlots3D from './CorpPlots3D'

const RelvalPlots = () => {
  const element_styler = {
    position: "relative",
    top: "50px",
    left: document.body.clientWidth / 8 + "px",
    backgroundColor: "#151720",
    color:"white",
    fontSize:"20px",
    zIndex:"10",
    borderColor:"white",
    borderWidth:"2px",
    borderRadius:"10px",
  }
  let prevId = "MPlot2D"
  function changeModel(evt) {
    document.getElementById(prevId).style.display='none'
    document.getElementById(evt.target.value).style.display = 'block'
    prevId = evt.target.value
  }
  return(
    <>
      <select
        onChange={(e) => changeModel(e)}
        style= {
          element_styler
        }
      >
        <option 
          value="MPlot2D"
        >
          Municipal Plot 2D</option>
        
        <option 
          value="MPlot3D"
        >
          Municipal Plot 3D</option>
        
        <option 
          value="CPlot2D"
        >
          Corporate Plot 2D</option>
        
        <option 
          value="CPlot3D"
        >
          Corporate Plot 3D</option>
      </select>
      <div
        id="MPlot2D"
        style={{
          display:'block'
        }}
      >
        <MuniPlots2D />
        
      </div>
      <div
        id="MPlot3D"
        style={{
          display:'none'
        }}
      >
        <MuniPlots3D />
        
      </div>
      <div
        id="CPlot2D"
        style={{
          display:'none'
        }}
      >
        <CorpPlots2D />
        
      </div>
      <div
        id="CPlot3D"
        style={{
          display:'none'
        }}
      >
        <CorpPlots3D />
        
      </div>
    </>
  );
};

export default RelvalPlots;
