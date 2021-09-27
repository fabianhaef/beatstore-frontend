import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


function SearchBox() {
  const [keyword, setKeyword] = useState('') 

  let history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword) {
      history.push(`/?keyword=${keyword}&page=1`)
    } else {
      history.push(history.push(history.location.pathname))
    }
  }

  return (
    <form onSubmit={submitHandler} onChange={(e) => setKeyword(e.target.value)}>
      <input type="text" id="keyword" name="keyword" className="search-box inputField"/>
    </form>
  )
}

export default SearchBox
