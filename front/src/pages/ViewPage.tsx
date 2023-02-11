import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Clock from '../components/Clock';

const ViewPage = () => {
  const [searchParams] = useSearchParams();

  const activeColor = searchParams.get('ac') ?? '#48d1cc';
  const inactiveColor = searchParams.get('ic') ?? 'none';
  const borderColor = searchParams.get('bc') ?? '#a9a9a9';
  const thickness = Number(searchParams.get('t') ?? 15);
  const width = Number(searchParams.get('sw') ?? 100);
  const height = Number(searchParams.get('sh') ?? 200);
  const aspectRatio = searchParams.get('a') ?? 'xMidYMid meet';
  const colonRadius = Number(searchParams.get('cr') ?? 8);
  const backgoundColor = searchParams.get("b") ?? '#dddddd';
  const colonWidth = Number(searchParams.get('cw') ?? 25);
  const colonHeight = Number(searchParams.get('ch') ?? 200);
  const colonGap = Number(searchParams.get('cg') ?? 80);
  const strokeWidth = Number(searchParams.get('s') ?? 1);
  const marginX = Number(searchParams.get('mx') ?? 5);
  const marginY = Number(searchParams.get('my') ?? 10);

  console.log(activeColor);

  return (
    <Clock thickness={thickness}
          width={width}
          height={height}
          colonRadius={colonRadius}
          colonHeight={colonHeight}
          colonWidth={colonWidth}
          colonGap={colonGap}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          borderColor={borderColor}
          strokeWidth={strokeWidth}
          backgroundColor={backgoundColor}
          marginX={marginX}
          marginY={marginY}/>
  );
};

export default ViewPage;