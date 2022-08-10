import React, { useEffect, useState } from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      <div>Welcome to the Starter Code!</div>
      <div>
        {(typeof backendData.users === 'undefined') ? (
          <p>Loading...</p>
          ) : (
          backendData.users.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )}
      </div>
    </div>
  )
}

export default App