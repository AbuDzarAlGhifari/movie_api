

  const search = async(q) => {
    console.log(q)
  }

function SearchBar() {
  return (
    <div>
      <div className="input flex justify-center  px-5 lg:px-0 py-5">
        <input 
          placeholder='Cari film....' 
          className='Movie-search shadow-md bg-gray-200 placeholder-gray-400 rounded-l-lg 
          px-2 py-2 w-80 outline-none border-2 border-gray-500 text-black '
          onChange={({target}) => search(target.value)}
          />
      </div>
    </div>
  )
}

export default SearchBar