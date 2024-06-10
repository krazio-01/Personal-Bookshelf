import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookshelfFromLocalStorage } from "../../utils/cartUtils";
import BookCard from "../../components/bookCard/BookCard";
import { FaArrowLeft } from "react-icons/fa";
import "./bookshelf.css";

const Bookshelf = () => {
    const [bookshelf, setBookshelf] = useState([]);

    useEffect(() => {
        const storedBooks = getBookshelfFromLocalStorage();
        setBookshelf(storedBooks);
    }, []);

    return (
        <div className="bookshelf-container">
            <div className="bookshelf-header">
                <Link to="/">
                    <FaArrowLeft />
                    <span>Back</span>
                </Link>
                <h2>My Bookshelf</h2>
            </div>

            <div className="bookshelf-books">
                {bookshelf.length > 0 ? (
                    bookshelf.map((book, index) => (
                        <BookCard key={index} result={book} inshelf={true} />
                    ))
                ) : (
                    <p>Your bookshelf is empty</p>
                )}
            </div>
        </div>
    );
};

export default Bookshelf;
