import React from 'react'
import { RepoCard } from '../components/RepoCard'
import { useDebounce } from '../hooks/debounce'
import { useLazyGetUserReposQuery, useSearchUsersQuery} from '../redux/github/github.api'

const HomePage = () => {

  const [search, setSearch] = React.useState('')
  const debounced = useDebounce(search)
  const [dropdown, setDropdown] = React.useState(false)

  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

  React.useEffect(()=>{
    setDropdown(debounced.length>3 &&  data?.length! > 0)
  },[debounced, data])

  const clickHandler = (username:string) => {
    fetchRepos(username)
    setDropdown(false)
    
  }

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && <p className='text-center text-red-600'>Somethin went wrong... </p>}

      <div className='relative w-[560px]'>
        <input 
          className=' border py-2 px-4 w-full h-[42px] mb-2'  
          type="text" 
          placeholder='Search for GitHub username... '
          value={search}
          onChange={e=> setSearch(e.target.value)}
        />
        {dropdown && <ul className='list-none absolute t-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-lg bg-white'>
          {isLoading && <p className="text-center">Loading... </p>}
          {data?.map(user => (
            <li
            onClick={()=>clickHandler(user.login)} 
              key={user.id}
              className='w-full py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
            >{user.login}</li>
          ))}
        </ul>}
          <div className="container">
            {areReposLoading && <p className='text-center'>Repos are loading...</p>}
            {repos?.map(repo => <RepoCard key={repo.id} repo={repo}></RepoCard>)}
          </div>
      </div>
      
    </div>
  )
}

export default HomePage