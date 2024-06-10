import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import {
    addToBookshelfInLocalStorage,
    removeFromBookshelfInLocalStorage,
} from "../../utils/cartUtils";
import "./bookcard.css";

const BookCard = ({ result, inshelf }) => {
    const [text, setText] = useState(inshelf ? "Remove" : "Add");

    const handleAddToBookshelf = () => {
        const response = addToBookshelfInLocalStorage(result);
        setText(response ? "Added" : "Already added");
    };

    const handleRemoveFromBookshelf = () => {
        removeFromBookshelfInLocalStorage(result.key);
        setText("Removed");
    };

    return (
        <div className="book-card">
            <div>
                <h4>{result.title}</h4>
                {result.author_name?.length > 0 && (
                    <p className="author">{result.author_name[0]}</p>
                )}
                <p>Edition number: {result.edition_count}</p>
            </div>

            <div className="card-bottom">
                <button
                    onClick={inshelf ? handleRemoveFromBookshelf : handleAddToBookshelf}
                >
                    <span>{text}</span>
                    {text === "Add" && <IoIosAdd />}
                    {text === "Added" && <TiTickOutline />}
                    {text === "Already added" && null}
                    {inshelf &&
                        (text === "Remove" ? <MdDeleteOutline /> : <TiTickOutline />)}
                </button>

                {result.ratings_average && (
                    <div className="rating">
                        <FaStar />
                        <span>{result.ratings_average.toFixed(1)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookCard;
