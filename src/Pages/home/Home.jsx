import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards";

const Home = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchText, setSearchText] = useState('')
  const [brand, setBrand] = useState('')
  const [products, setProducts] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/all-products?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}`
      )
      setProducts(data)
    }
    getData()
  }, [currentPage, filter, itemsPerPage, search, sort,minPrice,maxPrice,brand])
  console.log(products)

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/products-count?filter=${filter}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}`
      )

      setCount(data.count)
    }
    getCount()
  }, [filter,search,minPrice,maxPrice,brand])

  console.log(count)
  const numberOfPages = Math.ceil(count / itemsPerPage)
  const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

  //  handle pagination button
  const handlePaginationButton = value => {
    console.log(value)
    setCurrentPage(value)
  }

   const handleReset = () => {
    setFilter('');
    setSort('');
    setSearch('');
    setSearchText('');
    setMinPrice('');
    setMaxPrice('');
    setBrand('')
    setCurrentPage(1);
  };

  const handleSearch = e => {
    e.preventDefault()

    setSearch(searchText)
  }

  return (
    <div>
      <div className='flex flex-col md:flex-row lg:flex-row lg:flex-wrap justify-center items-center gap-5 '>
          <div>
            <select
              onChange={e => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
              value={filter}
              name='category'
              id='category'
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value='Electronics'>Electronics</option>
              <option value='Home Appliances'>Home Appliances</option>
              <option value='Wearables'>Wearables</option>
              <option value='Accessories'>Accessories</option>
              <option value='Furniture'>Furniture</option>
              <option value='Home Decor'>Home Decor</option>
              <option value='Outdoors'>Outdoors</option>
              <option value='Footwear'>Footwear</option>
              <option value='Home Security'>Home Security</option>
            </select>
          </div>
          
          <div>
            <select
              onChange={e => {
                setBrand(e.target.value)
                setCurrentPage(1)
              }}
              value={brand}
              name='brand'
              id='brand'
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Brand</option>
              <option value='TechFlow'>TechFlow</option>
              <option value='ByteWare'>ByteWare</option>
              <option value='SoundEdge'>SoundEdge</option>
              <option value='ChronoTek'>ChronoTek</option>
              <option value='StrideFlex'>StrideFlex</option>
              <option value='UrbanEdge'>UrbanEdge</option>
              <option value='HomeEssence'>HomeEssence</option>
              <option value='SmilePro'>SmilePro</option>
              <option value='AquaGuard'>AquaGuard</option>
              <option value='PowerPulse'>PowerPulse</option>
              <option value='VisionWare'>VisionWare</option>
              <option value='GripGear'>GripGear</option>
            </select>
              
          </div>

          <div>
          <input
            type="number"
            placeholder="Min Price"
            onChange={e => setMinPrice(e.target.value)}
            value={minPrice}
            className='border p-4 rounded-lg'
          />
          <input
            type="number"
            placeholder="Max Price"
            onChange={e => setMaxPrice(e.target.value)}
            value={maxPrice}
            className='border p-4 rounded-lg'
          />
        </div>


          <form onSubmit={handleSearch}>
            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                name='search'
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />

              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              onChange={e => {
                setSort(e.target.value)
                setCurrentPage(1)
              }}
              value={sort}
              name='sort'
              id='sort'
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By Price & Date</option>
              <option value='dsc'>High to Low</option>
              <option value='asc'>Low to High</option>
              <option value='newest'>Newest</option>
            </select>
          </div>
          <button onClick={handleReset} className='btn'>
            Reset
          </button>
        </div>
          
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
              products.map(product=> <Cards key={product._id} product={product}></Cards>)
            }
          </div>

        {/* pagination */}
        {/* Pagination Section */}
      <div className='flex justify-center mt-12'>
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'
        >
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map(btnNum => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? 'bg-blue-500 text-white' : ''
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
        >
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;