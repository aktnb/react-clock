import React, { useState } from 'react';
import Clock from "../components/Clock";

const copyToClip = (text: string) => {
  navigator.clipboard.writeText(text);
}

const SettingPage = () => {
  const [thickness, setThickness] = useState<number>(20);
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(200);
  const [marginX, setMarginX] = useState<number>(5);
  const [marginY, setMarginY] = useState<number>(10);

  const [strokeWidth, setStrokeWidth] = useState<number>(2);

  const [colonRadius, setColonRadius] = useState<number>(10);
  const [colonWidth, setColonWidth] = useState<number>(50);
  const [colonHeight, setColonHeight] = useState<number>(200);
  const [colonGap, setColonGap] = useState<number>(80);

  const [activeColor, setActiveColor] = useState<string>('#000000');
  const [chooseInactiveColor, setChooseInactiveColor] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>('#a9a9a9');
  const [backgoundColor, setBackgoundColor] = useState<string>('#dddddd');
  const [inactiveColor, setInactiveColor] = useState<string>(backgoundColor);

  const params: { [key: string]: string|number } = {
    't': thickness,
    'sw': width,
    'sh': height,
    'cr': colonRadius,
    'ch': colonHeight,
    'cw': colonWidth,
    'cg': colonGap,
    'ac': activeColor,
    'ic': chooseInactiveColor ? inactiveColor : 'none',
    'bc': borderColor,
    's': strokeWidth,
    'b': backgoundColor,
    'mx': marginX,
    'my': marginY
  };

  const url = 'http://localhost:3000/view/?' + Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');

  return (
    <div>
      <div className='sticky-top'>
        <Clock
              thickness={thickness}
              width={width}
              height={height}
              colonRadius={colonRadius}
              colonHeight={colonHeight}
              colonWidth={colonWidth}
              colonGap={colonGap}
              activeColor={activeColor}
              inactiveColor={chooseInactiveColor ? inactiveColor : 'none'}
              borderColor={borderColor}
              strokeWidth={strokeWidth}
              backgroundColor={backgoundColor}
              marginX={marginX}
              marginY={marginY}/>
      </div>

      <div className='m-4 overflow-auto' >
        <h4>Settings</h4>
        <div className='mb-3'>
          <h5>Common</h5>

          <div>
            <label className='customRange1' htmlFor='marginXInput'>Margin X <strong>{marginX}</strong></label>
            <input className='form-range' type='range' id='marginXInput' min='0' max={(width-strokeWidth*2-thickness*2)/2} onChange={e => {
              const dmx = Number(e.target.value) - marginX;
              setMarginX(Number(e.target.value));
              setWidth(old => old + dmx*2);
            }} value={marginX}/>
          </div>

          <div>
            <label className='customRange1' htmlFor='marginYInput'>Margin Y <strong>{marginY}</strong></label>
            <input className='form-range' type='range' id='marginYInput' min='0' max={(height-strokeWidth*3-thickness*3)/2} onChange={e => {
              const dmy = Number(e.target.value) - marginY;
              setMarginY(Number(e.target.value));
              setHeight(old => old + dmy*2);
            }} value={marginY}/>
          </div>

          <div>
            <label className='customRange1' htmlFor='borderThicknessInput'>Stroke Width <strong>{strokeWidth}</strong></label>
            <input className='form-range' type='range' id='borderThicknessInput' min='0' max={Math.min((width-thickness*2-marginX*2)/2, (height-thickness*3-marginY*2)/3, colonWidth-colonRadius*2, colonHeight-colonRadius*2)} onChange={e => setStrokeWidth(Number(e.target.value))} value={strokeWidth}/>
          </div>
          
          <div className='me-5 d-inline-block'>
            <label htmlFor='backgroundColorInput' className='form-label'>Background Color <strong>{backgoundColor}</strong></label>
            <input type='color' className='form-control form-control-color' id='backgroundColorInput' value={backgoundColor} onChange={e => setBackgoundColor(e.target.value)} title='Choose Backgound Color'/>
          </div>

          <div className='me-5 d-inline-block'>
            <label htmlFor='activeColorInput' className='form-label'>Active Color <strong>{activeColor}</strong></label>
            <input type='color' className='form-control form-control-color' id='activeColorInput' value={activeColor} onChange={e => setActiveColor(e.target.value)} title='Choose Active Color'/> 
          </div>
          
          <div className='me-5 d-inline-block'>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' value='' id='chooseInactiveColor' checked={chooseInactiveColor} onChange={e => setChooseInactiveColor(!chooseInactiveColor)}/>
              <label className='form-check-label' htmlFor='chooseInactiveColor'>Enable Inactive Color</label>
            </div>
            <div>
              <label htmlFor='inactiveColorInput' className='form-label'>Inactive Color <strong>{inactiveColor}</strong></label>
              <input disabled={!chooseInactiveColor} type='color' className='form-control form-control-color' id='inactiveColorInput' value={inactiveColor} onChange={e => setInactiveColor(e.target.value)} title='Choose Inactive Color'/>
            </div>
          </div>

          <div className='me-5 d-inline-block'>
            <label htmlFor='borderColorInput' className='form-label'>Border Color <strong>{borderColor}</strong></label>
            <input type='color' className='form-control form-control-color' id='borderColorInput' value={borderColor} onChange={e => setBorderColor(e.target.value)} title='Chouse Border Color'/>
          </div>
        </div>

        <div className='mb-3'>
          <h5>7 segment</h5>
          <div>
            <label className='customRange1' htmlFor='thickness'>Thickness <strong>{thickness}</strong></label>
            <input className='form-range' type='range' id='thickness' min='1' max='30' onChange={e => setThickness(Number(e.target.value))} value={thickness}/>
          </div>

          <div>
            <label className='customRange1' htmlFor='width'>Width <strong>{width}</strong></label>
            <input className='form-range' type='range' id='width' min={thickness*2+marginX*2} max='500' onChange={e => setWidth(Number(e.target.value))} value={width}/>
          </div>

          <div>
            <label className='customRange1' htmlFor='height'>Height <strong>{height}</strong></label>
            <input className='form-range' type='range' id='height' min={thickness*3+marginY*2} max='500' onChange={e => setHeight(Number(e.target.value))} value={height}/>
          </div>
        </div>

        <div className='mb-3'>
          <h5>colon</h5>
          <div>
            <label className='customRange1' htmlFor='size'>Radius <strong>{colonRadius}</strong></label>
            <input className='form-range' type='range' id='size' min='1' max='30' onChange={e => {
              setColonRadius(Number(e.target.value));
              if (colonWidth < (colonRadius + strokeWidth) * 2) setColonWidth((colonRadius + strokeWidth) * 2);
              if (colonHeight < (colonRadius + strokeWidth) * 2) setColonHeight((colonRadius + strokeWidth) * 2);
            }} value={colonRadius}/>
          </div>

          <div>
            <label className='customRange1' htmlFor='colonWidth'>Width <strong>{colonWidth}</strong></label>
            <input className='form-range' type='range' id='colonWidth' min='1' max='500' onChange={e => {
              setColonWidth(Number(e.target.value));
              if (colonWidth < colonRadius * 2) setColonRadius(Math.floor(colonWidth / 2));
            }} value={colonWidth}/>
          </div>

          <div>
            <label className='customRange1' htmlFor='colonHeight'>Height <strong>{colonHeight}</strong></label>
            <input className='form-range' type='range' id='colonHeight' min={(colonRadius+strokeWidth)*4} max='500' onChange={e => {
              setColonHeight(Number(e.target.value));
              if (colonHeight < colonRadius * 2) setColonRadius(Math.floor(colonHeight / 2));
              if (colonHeight < colonGap+(colonRadius+strokeWidth)*2) setColonGap(colonHeight-(colonRadius+strokeWidth)*2);
            }} value={colonHeight}/>
          </div>

          <div>
            <label className='customRange1' htmlFor='colonGapInput'>Gap <strong>{colonGap}</strong></label>
            <input className='form-range' type='range' id='colonGapInput' min={(colonRadius+strokeWidth)*2} max={colonHeight} onChange={e =>{
              setColonGap(Number(e.target.value));
            }}/>
          </div>
        </div>
      </div>
      <div className='m-4'>
        <h6><label htmlFor='urlReadonly' className='me-3 form-label'>URL</label></h6>
        <input type='text' className='form-control' readOnly={true} id='urlReadonly' value={url}/>
        <button className='btn btn-primary my-3' onClick={e => copyToClip(url)}>Copy</button>
      </div>
    </div>
  );
};

export default SettingPage;