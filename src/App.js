import React, { useState, useEffect } from 'react';
import * as Rx from 'rxjs';
import * as Streams from './streams/getShipSystems$';
import { strikeGroups$ } from './streams/strikeGroups$';
import { useStream } from './hooks/useStream';
import { StrikeGroups } from './components/StrikeGroups';
import { StrikeGroupShips } from './components/StrikeGroupShips';
import { ShipSystems } from './components/ShipSystems';
import './styles.css';

export function App() {

  // All strike groups
  const strikeGroups = useStream(strikeGroups$);

  // Id of selected strike group
  const [selectedSgId, setSelectedSgId] = useState();

  // Id of selected ship in the selected strike group
  const [selectedShipId, setSelectedShipId] = useState();

  // Systems in the selected ship
  const [shipSystems$, setShipSystems$] = useState(new Rx.BehaviorSubject([]));

  useEffect(() => {
    const systems$ =  Streams.getShipSystems$(selectedShipId);
    setShipSystems$(systems$);
    return () => systems$.complete();
  }, [selectedShipId]);

  function selectStrikeGroup(sgId) {
    setSelectedSgId(sgId);
    setSelectedShipId(undefined);
  }

  return (
    <div className='mainContainer'>
      <StrikeGroups
        className='strikeGroupContainer'
        strikeGroups={strikeGroups}
        selectedSgId={selectedSgId}
        onSgSelected={selectStrikeGroup}
      />
      <StrikeGroupShips
        className='shipContainer'
        sgId={selectedSgId}
        onShipSelected={setSelectedShipId}
      />
      <ShipSystems
        className='systemContainer'
        shipId={selectedShipId}
      />
    </div>
  )
};
