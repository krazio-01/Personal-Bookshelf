import { useState, useEffect } from "react";
import BookCard from "../../components/bookCard/BookCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { FiShoppingCart } from "react-icons/fi";
import "./home.css";

const Home = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const fetchBooks = async (controller) => {
        if (!query) return;

        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const { data } = await axios.get(
                `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`,
                {
                    signal: controller.signal,
                }
            );
            setResults(data.docs);
            setLoading(false);
        } catch (error) {
            if (axios.isCancel(error)) return;
            setLoading(false);
            setError("Error fetching suggestions: " + error.message);
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        fetchBooks(controller);

        return () => {
            controller.abort();
        };
    }, [query]);

    return (
        <div className="app-wrapper">
            <div className="app-header">
                <input
                    type="text"
                    placeholder="Search Books by Name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="input"
                />

                <div className="shelf-link">
                    <Link to="/bookshelf" className="desktop-view">
                        <FiShoppingCart />
                        <span>My Bookshelf</span>
                    </Link>
                    <Link to="/bookshelf" className="mobile-view">
                        <FiShoppingCart />
                    </Link>
                </div>
            </div>

            <div className="app-container">
                {loading && (
                    <Bars
                        height="42"
                        width="42"
                        color="#fff"
                        ariaLabel="bars-loading"
                        visible={true}
                    />
                )}

                {error && <p className="error">{error}</p>}

                {!loading && !error && (
                    <div className="book-results">
                        {results.length === 0 && query ? (
                            <h3 className="no-result">No results found</h3>
                        ) : (
                            results.map((result) => (
                                <BookCard key={result.key} result={result} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;