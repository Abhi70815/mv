import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from "@/components/Spinner";
import Head from 'next/head';

export default function MoviesPost() {
    const router = useRouter();
    const { slug } = router.query; // Get the slug from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        if (slug) {
            // Fetch movie data based on the slug
            const fetchMovieData = async () => {
                try {
                    const response = await fetch(`/api/getmovies?slug=${slug}`); // Adjust the API endpoint as needed
                    const data = await response.json();
                    console.log(data);
                    setMovie(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchMovieData();
        }
    }, [slug]);

    if (loading) return <Spinner />; // Show a loading spinner while fetching data
    if (error) return <div>{error}</div>; // Show error message if movie not found

    return (
        <div className="bg-gray-900 text-white">
            <Head>
                {/* <script src="https://cdn.tailwindcss.com"></script> */}
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
                <title>{movie.title}</title>
            </Head>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{movie?.title || "RRR - South Movie"}</h1>
                <div className="mb-4 text-center">
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded">{movie.category}</span>
                </div>
                <div className="mb-8 flex justify-center w-full">
                    <img src={movie.bgposter} alt={movie.slug} className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" />
                </div>
                <p className="mb-4 text-center">{movie?.description || "RRR is a 2022 Indian Telugu-language epic historical action drama film directed by S. S. Rajamouli."}</p>
                <h2 className="text-2xl font-bold text-yellow-500 mb-2 text-center">Series Info</h2>
                <ul className="list-disc list-inside mb-4 mx-auto max-w-md">
                    <li>Release Year: {movie?.year || "2000"}</li>
                    <li>IMDB Rating: {movie?.rating || "8"}</li>
                    <li>Language: {movie.language}</li>
                    <li>Quality: {movie.quality}</li>
                    <li>File Size: {movie.size}</li>
                    <li>Genre: {movie.genre}</li>
                    <li>Duration: {movie.duration}</li>
                    <li>Subtitle: {movie.subtitle}</li>
                </ul>
                <h2 className="text-2xl font-bold mb-4 text-center">{movie.slug}</h2>
                <div className="mb-8 flex justify-center">
                    <img src={movie.smposter} alt="Screenshot from the movie" className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Download Links</h2>

                {console.log(Object.entries(movie.downloadlink))}
              <div className="space-y-4 flex flex-col items-center">
  {Object.entries(movie.downloadlink).map(([resolution, link]) => (
    <a
      key={resolution}
      className="block w-full sm:w-1/2 bg-green-500 text-black text-center py-2 rounded hover:bg-green-600"
      href={link}
    >
      {resolution} DOWNLOAD Now <i className="fas fa-download"></i>
    </a>
  ))}
</div>
                <h2 className="text-2xl font-bold mb-6 text-center mt-6">Watch Online Trailer</h2>
                <div className="mb-8 flex justify-center">
                    <iframe className="w-full sm:w-1/2 h-64 sm:h-80 md:h-96 lg:h-112 xl:h-128" src="https://www.youtube.com/embed/bESWkKFsKZE" frameBorder="0" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    );
}