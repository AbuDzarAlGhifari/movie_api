

function Navbar() {
    return (
        <div className='main z-20 lg:flex md:flex flex-wrap justify-between items-center 
     px-4 bg-gray-900 py-4 shadow-md sticky top-0'>
            <div className="left flex items-center space-x-3">
                <h2 className="logo font-bold text-2xl text-white text-center">MovieKu</h2>
            </div>
            <div className="right">
                <ul className='flex space-x-4 text-white justify-center'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>About</li>
                    <li className='cursor-pointer'>Contact</li>
                    <li className='cursor-pointer'>Services</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar