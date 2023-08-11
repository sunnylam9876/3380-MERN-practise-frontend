import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Navbar from '../components/navbar';
import Book from './Book';

const uri = 'https://three380-practise-backend.onrender.com/';

const BookList =() => {
    const [bookData, setBookData] = useState([]);   //store book data that get from database
    const [message, setMessage] = useState("");     //capture server return message

//---------------------------------------------------------------------------------------------
//delete record
    const deleteBookOutSideCard = (id) => {

        const requestBody = {
            "_id": id
        };
        
        axios 
            .delete(uri + 'delete', {data: requestBody})
            .then((response) => {
                console.log(response.data);
                if(response.status === 200) {
                    setMessage("Book deleted successfully!");
                    setBookData(bookData.filter((el) => el._id !== id));
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setMessage("Failed to delete the book");
                } else {
                    setMessage("An unexpected error occured");
                }
            })
    };
//---------------------------------------------------------------------------------------------
//update record
const updateBook = (id) => {
    window.location = '/update/' + id;
};
//---------------------------------------------------------------------------------------------
//get all data from database
    useEffect(() => {
        axios 
            .get(uri)
            .then((response) => {
                setBookData(response.data);
            })
            .catch((error) => {
                console.log("Error when getting book data from server");
            });
    }, []);
//---------------------------------------------------------------------------------------------
//Search function
    const [searchField, setSearchField] = useState('');
    const handleSearchChange = (event) => {
        setSearchField(event.target.value);
    };

    const filteredData = bookData.filter(book => {
        return (
            book.bookName.toLowerCase().includes(searchField.toLowerCase())
        );
    });
//---------------------------------------------------------------------------------------------
//rednering

    return (
        <div>
            <Navbar />            
            <h1>Book List (Total Book: {filteredData.length})</h1>
            <input type='search' placeholder='Search here...' onChange={handleSearchChange} />
            <h3>{message}</h3>
            {filteredData.map((eachBook) => {
                return(
                    <Book
                        key = {eachBook._id}
                        _id = {eachBook._id}
                        bookName = {eachBook.bookName}
                        author = {eachBook.author}
                        year = {eachBook.year}
                        bookId = {eachBook.bookId}
                        rating = {eachBook.rating}
                        updateBook = {updateBook}
                        deleteBook = {deleteBookOutSideCard}
                    />
                );
            })}
        </div>
    );
};

export default BookList;