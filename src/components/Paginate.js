import React from 'react'
import { Link } from 'react-router-dom';


function Paginate({pages, page, keyword='', isAdmin=false}) {

  if(keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0]
  }

  return (
    pages > 1 && (
      <div>
        {[...Array(pages).keys()].map((x) => (
          <Link key={x+1} to={!isAdmin ? `/?keyword=${keyword}&page=${x + 1}` : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`}>
            <button>
              {x+1}
            </button>
          </ Link>
        ))}
      </div>
    )
  )
}

export default Paginate
