import React, { useState, useEffect } from 'react';
import './App.css';

export const option = {
  empty: '0',
  external: '1',
  internal: '2',
}

export const internal = 'Some internal data';

function App() {

  const [selected, setSelected] = useState(option.empty);
  const [external, setExternal] = useState('');

  useEffect(() => {
    if (selected === option.external) {
      setExternal('Loading...');
      try {
        fetch('https://api.kanye.rest')
          .then(res => res.json())
          .then(data => {
            setExternal(data.quote);
          });
      } catch (error) {
        setExternal(error.toString());
      }
    }
  }, [selected]);

  return (

    <form className="App App-header">

      <select onChange={e => setSelected(e.target.value)} value={selected} data-testid="select">
        <option value={option.empty}>empty</option>
        <option value={option.external}>external</option>
        <option value={option.internal}>internal</option>
      </select>

      {selected === option.external
        && <textarea name="external" id="ta" cols="30" rows="10" value={external} readOnly data-testid="textarea"></textarea>}

      {selected === option.internal
        && <input type="text" defaultValue={internal} data-testid="input" />}

    </form>

  );

}

export default App;
