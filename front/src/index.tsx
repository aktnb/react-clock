import React from 'react';
import ReactDOM from "react-dom/client";
import Clock from './components/Clock';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<Clock />);