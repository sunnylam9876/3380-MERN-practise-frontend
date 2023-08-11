import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Book = (props) => {

    const deleteBookInsideCard = () => {
        //const bookId = id;
        const requestBody = {
            "_id": props._id
        };
        axios 
            .delete('http://localhost:5000/delete', {data: requestBody})
            .then((response) => {
                console.log(response.data);
                if(response.status === 200) {
                    window.location.reload(); 
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    console.log("Failed to delete the book");
                } else {
                    console.log("An unexpected error occured");
                }
            })
    };

    return (
        <div>
            <h3>Book Name: {props.bookName}</h3>
            <p>Author: {props.author}</p>
            <p>Year: {props.year}</p>
            <p>Book Id: {props.bookId}</p>
            <p>Rating: {props.rating}</p>
            <button onClick={()=> {props.updateBook(props._id);}}>
                Update</button>

            <button onClick={deleteBookInsideCard}>
                Delete inside card
            </button>
            <button onClick={() => {props.deleteBook(props._id)}}>
                Delete outside card
            </button>
        </div>
    )
}

export default Book;