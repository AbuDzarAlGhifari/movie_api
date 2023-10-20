
function MovieCard() {

              return (
                <div className="p-2 md:w-1/4 w-full">
                  <div className="bg-[#40407a] p-3 rounded-2xl shadow-lg hover:-translate-y-1 border-2 border-gray-200">
                    <img className='rounded-lg w-full h-full mb-2' src={""} alt="" />
                    <h2 className='text-xl text-white font-bold'>judul</h2>
                    <h2 className='text-lg text-white mb-2'>Year : </h2>
  
                  </div>
                </div>
              )
  }
  
  export default MovieCard