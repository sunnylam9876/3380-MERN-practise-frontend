import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from './navbar';

const uri = 'https://three380-practise-backend.onrender.com/';

const UpdateBook =() => {
    const [updatedBookName, setUpdatedBookName] = useState('');
    const [updatedAuthor, setUpdatedAuthor] = useState('');
    const [updatedYear, setUpdatedYear] = useState('');
    const [updatedRating, setUpdatedRating] = useState('');
    
    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];

    //get bookData
    const [bookData, setBookData] = useState([]);
    //console.log("Id: " + id);
    useEffect(() => {
        axios
            .get(uri + `get/${id}`)
            .then((response) => {
                setUpdatedBookName(response.data.bookName);
                setUpdatedAuthor(response.data.author);
                setUpdatedYear(response.data.year);
                setUpdatedRating(response.data.rating);
                setBookData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },[id]);

    const handleSubmit = (e) => {

        e.preventDefault();
         const requestBody = {
            "_id": id,
            "bookName": updatedBookName,
            "author": updatedAuthor,
            "year": updatedYear,
            "rating": updatedRating
        }

        axios
            .post(uri + `update/`, requestBody)
            .then((res) => {
                window.location = '/';
            }); 
    };

    return(
        <div>
            <Navbar />
            <h3>Update book data</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book Name
                        <input type='text' value={updatedBookName} 
                            onChange={(e) => setUpdatedBookName(e.target.value)}/>
                    </label>
                    <br></br>
                    <label>Author
                        <input type='text' value={updatedAuthor} 
                            onChange={(e) => setUpdatedAuthor(e.target.value)}/>
                    </label>
                    <br></br>
                    <label>Year
                        <input type='text' value={updatedYear} 
                            onChange={(e) => setUpdatedYear(e.target.value)}/>
                    </label>
                    <br></br>
                    <label>Book ID
                        <input type='text' value={bookData.bookId} />
                    </label>
                    <br></br>
                    <label>Rating
                        <input type='text' value={updatedRating} 
                            onChange={(e) => setUpdatedRating(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <input
                        type="submit"
                        value="Update Book information"
                    />
                </div>
                
            </form>
            
        </div>
    )


}

export default UpdateBook;