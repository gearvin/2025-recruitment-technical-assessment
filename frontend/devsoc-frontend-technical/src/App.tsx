import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'

function App() {
  const data = [
    {
      "name": "AGSM",
      "rooms_available": 9,
      "building_picture": "../public/assets/agsm.webp"
    },
    {
      "name": "Ainsworth Building",
      "rooms_available": 16,
      "building_picture": "../public/assets/ainsworth.webp"
    },
    {
      "name": "Anita B Lawrence Centre",
      "rooms_available": 44,
      "building_picture": "../public/assets/anitab.webp"
    },
    {
      "name": "Biological Sciences",
      "rooms_available": 6,
      "building_picture": "../public/assets/biologicalScience.webp"
    },
    {
      "name": "Biological Science (West)",
      "rooms_available": 8,
      "building_picture": "../public/assets/biologicalScienceWest.webp"
    },
    {
      "name": "Blockhouse",
      "rooms_available": 42,
      "building_picture": "../public/assets/blockhouse.webp"
    },
    {
      "name": "Business School",
      "rooms_available": 18,
      "building_picture": "../public/assets/businessSchool.webp"
    },
    {
      "name": "Civil Engineering Building",
      "rooms_available": 8,
      "building_picture": "../public/assets/civilBuilding.webp"
    },
    {
      "name": "Colombo Building",
      "rooms_available": 5,
      "building_picture": "../public/assets/colombo.webp"
    },
    {
      "name": "Computer Science & Eng (K17)",
      "rooms_available": 7,
      "building_picture": "../public/assets/cseBuilding.webp"
    }
  ]

  return (
    <div>
      <Navbar />
      <main className="px-6 py-3 space-y-4">
        <SearchBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data.map((room, index) => (
            <div key={index} className="rounded-xl overflow-hidden">
              <div className="relative h-[385px]">
                <img src={room.building_picture} alt={room.name} className="absolute object-cover h-full" />
                <div className="flex flex-col justify-between">
                  <div className="absolute top-0 right-0 m-2 px-4 py-2 bg-white rounded-xl text-sm font-medium flex items-center gap-2">
                    <div className="rounded-full border-5 border-green-500 size-1"></div>
                    <p>{room.rooms_available} rooms available</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 m-2 px-4 py-2 bg-amber-600 rounded-xl text-white">
                    <p>{room.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
