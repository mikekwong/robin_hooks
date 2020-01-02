import React, { useState, useEffect } from 'react'

function App () {
  const [data, setData] = useState({ hits: [] })
  const [query, setQuery] = useState('redux')
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux'
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const response = await fetch(url)
        const json = await response.json()

        setData(json)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [url])

  return (
    <>
      <form
        onSubmit={e => {
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
          e.preventDefault()
        }}
      >
        <input
          type='text'
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type='submit'>Search</button>
        {isError && <div>Something went wrong..</div>}
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <ul>
            {data.hits.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  )
}
export default App
