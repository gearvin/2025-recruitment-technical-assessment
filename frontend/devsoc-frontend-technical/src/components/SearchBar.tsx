import Search from '../../public/assets/search_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react'
import Filters from '../../public/assets/filter_alt_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg?react'
import Sort from '../../public/assets/filter_list_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react'


function SearchBar() {
  return (
    <div className="flex justify-between">
      <button className="text-amber-600 flex items-center gap-2 border-2 border-amber-600 px-7 py-2 rounded-xl">
        <Filters fill='#ef6c00' />
        <p className="font-semibold">Filters</p>
      </button>

      <div className="border border-gray-300 rounded max-w-2xl flex-1 px-4 py-2 flex items-center gap-2">
        <Search fill='gray'/>
        <input type="text" className="w-full" placeholder='Search for a building...' />
      </div>

      <button className="text-amber-600 flex items-center gap-2 border-2 border-amber-600 px-7 py-2 rounded-xl">
        <Sort fill='#ef6c00' />
        <p className="font-semibold">Sort</p>
      </button>
    </div>
  )
}

export default SearchBar