
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import useFetchPhotos from './hooks/useFetchPhotos'
import { favoritesReducer } from './favoritesReducer'

function App() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState('')

  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    [],
    () => {
      try {
        return JSON.parse(
          localStorage.getItem('favorites') || '[]'
        )
      } catch {
        return []
      }
    }
  )

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    )
  }, [photos, search])

  const toggleFavorite = (photo) => {
    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: photo,
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Celebrare Photo Gallery
      </h1>

      <div className="mx-auto mb-8 max-w-xl">
        <input
          type="text"
          placeholder="Search photos by author..."
          value={search}
          onChange={handleSearch}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => {
          const isFavorite = favorites.some(
            (favorite) => favorite.id === photo.id
          )

          return (
            <div
              key={photo.id}
              className="overflow-hidden rounded-xl bg-white shadow-md"
            >
              <img
                src={`https://picsum.photos/id/${photo.id}/400/300`}
                alt={`Photo by ${photo.author}`}
                className="h-56 w-full object-cover"
              />

              <div className="flex items-center justify-between p-4">
                <p className="font-medium text-gray-800">
                  {photo.author}
                </p>

                <button
                  type="button"
                  onClick={() => toggleFavorite(photo)}
                  aria-label={
                    isFavorite
                      ? 'Remove from favourites'
                      : 'Add to favourites'
                  }
                  aria-pressed={isFavorite}
                  className={`text-2xl ${
                    isFavorite ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  {isFavorite ? '♥' : '♡'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredPhotos.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          No photos found.
        </p>
      )}
    </div>
  )
}

export default App
