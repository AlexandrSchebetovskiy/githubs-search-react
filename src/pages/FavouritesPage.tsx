import React from 'react'
import { useAppSelector } from '../hooks/redux'

const FavouritesPage = () => {

  const {favourites} = useAppSelector(state=> state.github)
  if(favourites.length === 0) return <p className='text-center mt-4 font-bold text-lg'>No items yet.</p> 
  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
    <ul className='list-none'>
      {favourites.map(f =>(
        <li key={f}>
          <a href={f} target="_blanck">{f}</a>
        </li>
      ))}
      </ul>
    </div>
   
  )
}

export default FavouritesPage