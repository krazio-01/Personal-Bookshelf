const getBookshelfFromLocalStorage = () => {
    const bookshelf = localStorage.getItem("bookshelf");
    return bookshelf ? JSON.parse(bookshelf) : [];
};

const addToBookshelfInLocalStorage = (book) => {
    const bookshelf = getBookshelfFromLocalStorage();
    const isAlreadyAdded = bookshelf.some((item) => item.key === book.key);

    if (!isAlreadyAdded) {
        const updatedBookshelf = [...bookshelf, book];
        localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
        return true;
    }

    return false;
};

const removeFromBookshelfInLocalStorage = (bookKey) => {
    let bookshelf = getBookshelfFromLocalStorage();
    bookshelf = bookshelf.filter((item) => item.key !== bookKey);
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
};

export {
    getBookshelfFromLocalStorage,
    addToBookshelfInLocalStorage,
    removeFromBookshelfInLocalStorage,
};