import { useEffect, useState } from "react";

type SevenSegmentProps = {
  n: number;
  width?: number;
  height?: number;
  thickness?: number;
  viewBox?: number[];
  margin?: number;
  activeColor?: string;
  inactiveColor?: string;
  borderColor?: string;
};

type ColonProps = {
  width?: number;
  height?: number;
  size?: number;
  viewBox?: number[];
  activeColor?: string;
  borderColor?: string;
};

const Colon = (props: ColonProps) => {
  const width = props.width ?? 25;
  const height = props.height ?? 200;
  const size = props.size ?? 8;
  const viewBox = props.viewBox ?? [0, 0, 20, 140];
  const activeColor = props.activeColor ?? "#000000";
  const borderColor = props.borderColor ?? "#a9a9a9";

  return (
    <div>
      <svg width={width} height={height} viewBox={viewBox.map(v => v.toString()).join(' ')} stroke={borderColor} fill={activeColor}>
        <circle cx={viewBox[2]/2} cy={viewBox[3]/3} r={size}/>
        <circle cx={viewBox[2]/2} cy={2*viewBox[3]/3} r={size}/>
      </svg>
    </div>
  )
};

const SevenSegment = (props: SevenSegmentProps) => {
  const n = Math.max(0, Math.min(props.n, 9));
  const width = props.width ?? 100;
  const height = props.height ?? 200;
  const thickness = props.thickness ?? 15;
  const viewBox = props.viewBox ?? [0, 0, 80, 140];
  const margin = props.margin ?? 5;
  const activeColor = props.activeColor ?? "#000000";
  const inactiveColor = props.inactiveColor ?? "#eeeeee";
  const borderColor = props.borderColor ?? "#a9a9a9";

  const num = [
    [true, true, true, false, true, true, true],
    [false, false, false, false, false, true, true],
    [false, true, true, true, true, true, false],
    [false, false, true, true, true, true, true],
    [true, false, false, true, false, true, true],
    [true, false, true, true, true, false, true],
    [true, true, true, true, true, false, true],
    [false, false, true, false, false, true, true],
    [true, true, true, true, true, true, true],
    [true, false, true, true, true, true, true],
  ];

  return (
    <div>
      <svg width={width} height={height} viewBox={viewBox.map(v => v.toString()).join(' ')} stroke={borderColor} fill="none">
        <path d={`M${thickness/2+margin} ${thickness/2+margin}
                  L${margin} ${thickness+margin} 
                  L${margin} ${viewBox[3]/2-thickness/2} 
                  L${thickness/2+margin} ${viewBox[3]/2} 
                  L${thickness+margin} ${viewBox[3]/2-thickness/2}
                  L${thickness+margin} ${thickness+margin} z`} fill={num[n][0] ? activeColor : inactiveColor}/>
        <path d={`M${thickness/2+margin} ${viewBox[3]/2}
                  L${margin} ${viewBox[3]/2+thickness/2}
                  L${margin} ${viewBox[3]-thickness-margin}
                  L${thickness/2+margin} ${viewBox[3]-thickness/2-margin}
                  L${thickness+margin} ${viewBox[3]-thickness-margin}
                  L${thickness+margin} ${viewBox[3]/2+thickness/2} z`} fill={num[n][1] ? activeColor : inactiveColor}/>
        <path d={`M${thickness/2+margin} ${thickness/2+margin}
                  L${thickness+margin} ${thickness+margin}
                  L${viewBox[2]-thickness-margin} ${thickness+margin}
                  L${viewBox[2]-thickness/2-margin} ${thickness/2+margin}
                  L${viewBox[2]-thickness-margin} ${margin}
                  L${thickness+margin} ${margin} z`} fill={num[n][2] ? activeColor : inactiveColor}/>
        <path d={`M${thickness/2+margin} ${viewBox[3]/2}
                  L${thickness+margin} ${viewBox[3]/2+thickness/2}
                  L${viewBox[2]-thickness-margin} ${viewBox[3]/2+thickness/2}
                  L${viewBox[2]-thickness/2-margin} ${viewBox[3]/2}
                  L${viewBox[2]-thickness-margin} ${viewBox[3]/2-thickness/2}
                  L${thickness+margin} ${viewBox[3]/2-thickness/2} z`} fill={num[n][3] ? activeColor : inactiveColor}/>
        <path d={`M${thickness/2+margin} ${viewBox[3]-thickness/2-margin}
                  L${thickness+margin} ${viewBox[3]-margin}
                  L${viewBox[2]-thickness-margin} ${viewBox[3]-margin}
                  L${viewBox[2]-thickness/2-margin} ${viewBox[3]-thickness/2-margin}
                  L${viewBox[2]-thickness-margin} ${viewBox[3]-thickness-margin}
                  L${thickness+margin} ${viewBox[3]-thickness-margin} z`} fill={num[n][4] ? activeColor : inactiveColor}/>
        <path d={`M${viewBox[2]-thickness/2-margin} ${thickness/2+margin}
                  L${viewBox[2]-thickness-margin} ${thickness+margin}
                  L${viewBox[2]-thickness-margin} ${viewBox[3]/2-thickness/2}
                  L${viewBox[2]-thickness/2-margin} ${viewBox[3]/2}
                  L${viewBox[2]-margin} ${viewBox[3]/2-thickness/2}
                  L${viewBox[2]-margin} ${thickness+margin} z`} fill={num[n][5] ? activeColor : inactiveColor}/>
        <path d={`M${viewBox[2]-thickness/2-margin} ${viewBox[3]/2}
                  L${viewBox[2]-thickness-margin} ${viewBox[3]/2+thickness/2}
                  L${viewBox[2]-thickness-margin} ${viewBox[3]-thickness-margin}
                  L${viewBox[2]-thickness/2-margin} ${viewBox[3]-thickness/2-margin}
                  L${viewBox[2]-margin} ${viewBox[3]-thickness-margin}
                  L${viewBox[2]-margin} ${viewBox[3]/2+thickness/2} z`} fill={num[n][6] ? activeColor : inactiveColor}/>
      </svg>
    </div>
  );
};

const Clock = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const next = new Date();
    next.setSeconds(next.getSeconds()+1);
    next.setMilliseconds(0);
    const interval = next.getTime() - Date.now();
    setTimeout(() => setDate(next), interval);
  });

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  console.log((new Date).toString());

  return (
    <div className="d-flex">
      <SevenSegment n={~~(hour/10)}/>
      <SevenSegment n={hour%10}/>
      <Colon/>
      <SevenSegment n={~~(minute/10)}/>
      <SevenSegment n={minute%10}/>
      <Colon/>
      <SevenSegment n={~~(second/10)}/>
      <SevenSegment n={second%10}/>
    </div>
  );
};

export default Clock;