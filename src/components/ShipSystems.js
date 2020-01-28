import React from 'react';
import { useShipSystems } from '../hooks/useShipSystems';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import '../styles.css';

export function ShipSystems({ shipId }) {
  const systems = useShipSystems(shipId);

  return (
    <div className='systemContainer'>
      <h3>Systems</h3>
      <SystemList systems={systems} />
    </div>
  )
};

const SystemList = ({ systems }) => {
  return (
    <List className='systemList'>
      {systems.map(system => (
        <ListItem
          button
          key={system.systemId}
        >
          <ListItemText
            primary={system.name}
            secondary={
              <Typography
                style={{ color: system.status === 'ready' ? 'green' : 'red', fontWeight: 'strong' }}>
                {system.status}
              </Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
}
