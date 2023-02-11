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
  strokeWidth?: number;
  marginX?: number;
  marginY?: number;
};

type ColonProps = {
  width?: number;
  height?: number;
  size?: number;
  viewBox?: number[];
  activeColor?: string;
  borderColor?: string;
  strokeWidth?: number;
  gap?: number;
};

type ClockProps = {
  activeColor?: string;
  borderColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  thickness?: number;
  colonRadius?: number;
  width?: number;
  height?: number;
  margin?: number;
  colonWidth?: number;
  colonHeight?: number;
  colonGap?: number;
  strokeWidth?: number;
  marginX?: number;
  marginY?: number;
};

const Colon = (props: ColonProps) => {
  const width = props.width ?? 25;
  const height = props.height ?? 200;
  const size = props.size ?? 8;
  const viewBox = props.viewBox ?? [0, 0, 20, 140];
  const activeColor = props.activeColor ?? "#000000";
  const borderColor = props.borderColor ?? "#a9a9a9";
  const strokeWidth = props.strokeWidth ?? 1;
  const gap = props.gap ?? 80

  return (
    <div>
      <svg width={width} height={height} viewBox={viewBox.map(v => v.toString()).join(' ')} stroke={borderColor} fill={activeColor} strokeWidth={strokeWidth}>
        <circle cx={viewBox[2]/2} cy={viewBox[3]/2+gap/2} r={size}/>
        <circle cx={viewBox[2]/2} cy={viewBox[3]/2-gap/2} r={size}/>
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
  const activeColor = props.activeColor ?? "#000000";
  const inactiveColor = props.inactiveColor ?? "#eeeeee";
  const borderColor = props.borderColor ?? "#a9a9a9";
  const strokeWidth = props.strokeWidth ?? 1;
  const marginX = props.marginX ?? 5;
  const marginY = props.marginY ?? 10;

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
      <svg width={width} height={height} viewBox={viewBox.map(v => v.toString()).join(' ')} stroke={borderColor} fill="none" strokeWidth={strokeWidth}>
        <path d={`M${thickness/2+marginX} ${thickness/2+marginY}
                  L${marginX} ${thickness+marginY} 
                  L${marginX} ${viewBox[3]/2-thickness/2} 
                  L${thickness/2+marginX} ${viewBox[3]/2} 
                  L${thickness+marginX} ${viewBox[3]/2-thickness/2}
                  L${thickness+marginX} ${thickness+marginY} z`} fill={num[n][0] ? activeColor : inactiveColor}/>
        <path d={`M${thickness/2+marginX} ${viewBox[3]/2}
                  L${marginX} ${viewBox[3]/2+thickness/2}
                  L${marginX} ${viewBox[3]-thickness-marginY}
                  L${thickness/2+marginX} ${viewBox[3]-thickness/2-marginY}
                  L${thickness+marginX} ${viewBox[3]-thickness-marginY}
                  L${thickness+marginX} ${viewBox[3]/2+thickness/2} z`} fill={num[n][1] ? activeColor : inactiveColor}/>
        <path d={`M${thickness/2+marginX} ${thickness/2+marginY}
                  L${thickness+marginX} ${thickness+marginY}
                  L${viewBox[2]-thickness-marginX} ${thickness+marginY}
                  L${viewBox[2]-thickness/2-marginX} ${thickness/2+marginY}
                  L${viewBox[2]-thickness-marginX} ${marginY}
                  L${thickness+marginX} ${marginY} z`} fill={num[n][2] ? activeColor : inactiveColor}/>
        <path d={`M${thickness/2+marginX} ${viewBox[3]/2}
                  L${thickness+marginX} ${viewBox[3]/2+thickness/2}
                  L${viewBox[2]-thickness-marginX} ${viewBox[3]/2+thickness/2}
                  L${viewBox[2]-thickness/2-marginX} ${viewBox[3]/2}
                  L${viewBox[2]-thickness-marginX} ${viewBox[3]/2-thickness/2}
                  L${thickness+marginX} ${viewBox[3]/2-thickness/2} z`} fill={num[n][3] ? activeColor : inactiveColor}/>
        <path d={`M${thickness/2+marginX} ${viewBox[3]-thickness/2-marginY}
                  L${thickness+marginX} ${viewBox[3]-marginY}
                  L${viewBox[2]-thickness-marginX} ${viewBox[3]-marginY}
                  L${viewBox[2]-thickness/2-marginX} ${viewBox[3]-thickness/2-marginY}
                  L${viewBox[2]-thickness-marginX} ${viewBox[3]-thickness-marginY}
                  L${thickness+marginX} ${viewBox[3]-thickness-marginY} z`} fill={num[n][4] ? activeColor : inactiveColor}/>
        <path d={`M${viewBox[2]-thickness/2-marginX} ${thickness/2+marginY}
                  L${viewBox[2]-thickness-marginX} ${thickness+marginY}
                  L${viewBox[2]-thickness-marginX} ${viewBox[3]/2-thickness/2}
                  L${viewBox[2]-thickness/2-marginX} ${viewBox[3]/2}
                  L${viewBox[2]-marginX} ${viewBox[3]/2-thickness/2}
                  L${viewBox[2]-marginX} ${thickness+marginY} z`} fill={num[n][5] ? activeColor : inactiveColor}/>
        <path d={`M${viewBox[2]-thickness/2-marginX} ${viewBox[3]/2}
                  L${viewBox[2]-thickness-marginX} ${viewBox[3]/2+thickness/2}
                  L${viewBox[2]-thickness-marginX} ${viewBox[3]-thickness-marginY}
                  L${viewBox[2]-thickness/2-marginX} ${viewBox[3]-thickness/2-marginY}
                  L${viewBox[2]-marginX} ${viewBox[3]-thickness-marginY}
                  L${viewBox[2]-marginX} ${viewBox[3]/2+thickness/2} z`} fill={num[n][6] ? activeColor : inactiveColor}/>
      </svg>
    </div>
  );
};

const Clock = (props: ClockProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const activeColor = props.activeColor ?? '#48d1cc';
  const inactiveColor = props.inactiveColor ?? 'none';
  const borderColor = props.borderColor ?? '#a9a9a9';
  const thickness = props.thickness ?? 15;
  const width = props.width ?? 100;
  const height = props.height ?? 200;
  const colonRadius = props.colonRadius ?? 8;
  const backgound = props.backgroundColor ?? '#dddddd';
  const colonWidth = props.colonWidth ?? 25;
  const colonHeight = props.colonHeight ?? 200;
  const colonGap = props.colonGap ?? 80;
  const strokeWidth = props.strokeWidth ?? 1;
  const marginX = props.marginX ?? 5;
  const marginY = props.marginY ?? 10;

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

  return (
    <div className="d-flex justify-content-center align-items-center" style={{background: backgound}}>
      <SevenSegment n={~~(hour/10)} marginX={marginX} marginY={marginY} viewBox={[0, 0, width, height]} strokeWidth={strokeWidth} width={width} height={height} thickness={thickness} activeColor={activeColor} inactiveColor={inactiveColor} borderColor={borderColor}/>
      <SevenSegment n={hour%10} marginX={marginX} marginY={marginY} viewBox={[0, 0, width, height]} strokeWidth={strokeWidth} width={width} height={height} thickness={thickness} activeColor={activeColor} inactiveColor={inactiveColor} borderColor={borderColor}/>
      <Colon activeColor={activeColor} gap={colonGap} strokeWidth={strokeWidth} size={colonRadius} width={colonWidth} height={colonHeight} viewBox={[0, 0, colonWidth, colonHeight]} borderColor={borderColor}/>
      <SevenSegment n={~~(minute/10)} marginX={marginX} marginY={marginY} viewBox={[0, 0, width, height]} strokeWidth={strokeWidth} width={width} height={height} thickness={thickness} activeColor={activeColor} inactiveColor={inactiveColor} borderColor={borderColor}/>
      <SevenSegment n={minute%10} marginX={marginX} marginY={marginY} viewBox={[0, 0, width, height]} strokeWidth={strokeWidth} width={width} height={height} thickness={thickness} activeColor={activeColor} inactiveColor={inactiveColor} borderColor={borderColor}/>
      <Colon activeColor={activeColor} gap={colonGap} viewBox={[0, 0, colonWidth, colonHeight]} strokeWidth={strokeWidth} size={colonRadius} width={colonWidth} height={colonHeight} borderColor={borderColor}/>
      <SevenSegment n={~~(second/10)} marginX={marginX} marginY={marginY} viewBox={[0, 0, width, height]} strokeWidth={strokeWidth} width={width} height={height} thickness={thickness} activeColor={activeColor} inactiveColor={inactiveColor} borderColor={borderColor}/>
      <SevenSegment n={second%10} marginX={marginX} marginY={marginY} viewBox={[0, 0, width, height]} strokeWidth={strokeWidth} width={width} height={height} thickness={thickness} activeColor={activeColor} inactiveColor={inactiveColor} borderColor={borderColor}/>
    </div>
  );
}
export default Clock;