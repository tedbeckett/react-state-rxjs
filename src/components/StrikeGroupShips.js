import React, { useState } from 'react';
import '../styles.css';
import { useStrikeGroupShips } from '../hooks/useStrikeGroupShips';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles.css';

export function StrikeGroupShips({ sgId, onShipSelected }) {
  const ships = useStrikeGroupShips(sgId);
  const [selectedShipId, setSelectedShipId] = useState();

  function handleShipSelection(shipId) {
    setSelectedShipId(shipId);
    onShipSelected(shipId);
  }

  return (
    <div className='shipContainer'>
      <h3 className='shipTitle'>Ships</h3>
      <ShipList 
        ships={ships}
        selectedShipId={selectedShipId}
        onShipSelected={handleShipSelection} />
    </div>
  )
};

function ShipList({ ships, selectedShipId, onShipSelected }) {
  return (
    <List className='shipList'>
      {ships.map(ship => (
        <ListItem
          button
          selected={ship.shipId === selectedShipId}
          onClick={e => onShipSelected(ship.shipId)}
          key={ship.shipId}
        >
          <ListItemText primary={ship.name} />
        </ListItem>
      ))}
    </List>
  );
}
