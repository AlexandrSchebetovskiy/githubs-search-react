import React from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/models'

export function RepoCard({repo} : {repo: IRepo}) {

  const {addFavourite, removeFavourite} = useActions()
  const {favourites} = useAppSelector(state=> state.github)

  const [isFav, setIsFav] = React.useState(favourites.includes(repo.html_url))
  const addToFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addFavourite(repo.html_url)
    setIsFav(true)
  }
  const removeFromFavourites = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    removeFavourite(repo.html_url)
    setIsFav(false)
  }

  return (
    <a href={repo.html_url} target='_blanck'>
        <div className="border py-3 px-5 cursor-poiner rounded mb-2 hover:shadow-md hover: bg-gray-100 transition-all">
            <h2 className='text-lg font-bold'>{repo.full_name}</h2>
            <p className='text-sm'>
                Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                Watchers: <span className='font-bold'>{repo.watchers}</span>
            </p>
            <p className='text-sm font-thin'>{repo?.description}</p>

            {!isFav && <button 
              className='py-2 px-4 mr-2 bg-yellow-400 rounded hover:shadow-md transition-all'
              onClick={addToFavourites}
            >Add</button>}
            {isFav && <button 
              className='py-2 px-4  bg-red-400 rounded hover:shadow-md transition-all'
              onClick={removeFromFavourites}
            >Remove</button>}
        </div>
    </a>
  )
}
