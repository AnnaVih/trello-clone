import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from "react-dnd"
import { HTML5Backend as Backend} from 'react-dnd-html5-backend'
import { AppStateProvider } from "./AppStateContext"
import App from './App';
import './index.css';
ReactDOM.render(
  <DndProvider backend={Backend}>
    <AppStateProvider>
      <App />
    </AppStateProvider>
    </DndProvider>,
  document.getElementById('root')
);
