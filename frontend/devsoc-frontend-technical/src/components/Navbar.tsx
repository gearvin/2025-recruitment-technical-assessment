import Search from '../../public/assets/search_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg?react'
import Grid from '../../public/assets/grid_view_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg?react'
import Map from '../../public/assets/map_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg?react'
import DarkMode from '../../public/assets/dark_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg?react'
import { useState } from 'react';

function Navbar() {
  const [open, setOpen] = useState(true);

  return (
    <header className="h-16 px-4 pt-1 flex justify-between items-center border-b border-gray-200">
      <div className="h-full flex items-center font-[Josefin_Sans] text-[#ef6c00] text-3xl">
        <div onClick={() => setOpen(!open)}>
          {open? (
            <img src="/assets/freeRoomsLogo.png" alt="free rooms logo" className="h-13" />
          ) : (
            <img src="/assets/freeroomsDoorClosed.png" alt="free rooms logo closed" className="h-13" />
          )}
        </div>
        <p>Freerooms</p>
      </div>
      <nav className="flex gap-2">
        <button className="text-[#ef6c00] border rounded border-amber-500 p-2">
          <Search fill='#ef6c00' />
        </button>
        <button className="bg-[#ef6c00] text-white border rounded border-amber-500 p-2">
          <Grid fill='white' />
        </button>
        <button className="text-[#ef6c00] border rounded border-amber-500 p-2">
          <Map fill='#ef6c00' />
        </button>
        <button className="text-[#ef6c00] border rounded border-amber-500 p-2">
          <DarkMode fill='#ef6c00' />
        </button>
      </nav>
    </header>
  )
}

export default Navbar