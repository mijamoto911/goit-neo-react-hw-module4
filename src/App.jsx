import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './api/unsplash-api';
import { toast } from 'react-hot-toast';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchImages(query, page);

        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
        setError('Error fetching images.');
        toast.error('Error fetching images.');
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (!newQuery.trim()) {
      toast.error('Please enter a search term.');
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <div>{error}</div>}

      {Array.isArray(images) && images.length > 0 ? (
        <ImageGallery images={images} onImageClick={setSelectedImage} />
      ) : (
        query && !loading && <div>No images found.</div>
      )}

      {loading && <Loader />}

      {page < totalPages && Array.isArray(images) && images.length > 0 && (
        <LoadMoreBtn onClick={loadMore} />
      )}

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default App;
