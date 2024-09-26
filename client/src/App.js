import React, { useState } from 'react';
import useApi from './hook/useApi';

function App() {
  const { data, loading, error, message, create, read, update, remove } = useApi();
  const [inputData, setInputData] = useState({ id: '', name: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = () => create(inputData);
  const handleRead = () => read();
  const handleUpdate = () => update(inputData);
  const handleDelete = () => remove(inputData.id);

  return (
    <div className="App">
      <h1>REST API Client</h1>
      <div>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={inputData.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={inputData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleCreate} disabled={loading}>
          Create
        </button>
        <button onClick={handleRead} disabled={loading}>
          Read
        </button>
        <button onClick={handleUpdate} disabled={loading}>
          Update
        </button>
        <button onClick={handleDelete} disabled={loading}>
          Delete
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {data && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
