import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles.css';

export function StrikeGroups({ strikeGroups, selectedSgId, onSgSelected }) {

  return (
    <div className='sgContainer'>
      <h3 className='sgTitle'>Strike Groups</h3>
      <StrikeGroupList
        strikeGroups={strikeGroups}
        selectedSgId={selectedSgId}
        onSgSelected={onSgSelected}/>
    </div>
  )
};

const StrikeGroupList = ({ strikeGroups, selectedSgId, onSgSelected }) => {
  return (
    <List className='sgList'>
      {strikeGroups.map(sg => (
        <ListItem
          button
          selected={selectedSgId === sg.sgId}
          onClick={e => onSgSelected(sg.sgId)}
          key={sg.sgId}
        >
          <ListItemText primary={sg.name}/>
        </ListItem>
      ))}
    </List>
  );
}
