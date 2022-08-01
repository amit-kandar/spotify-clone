import { Image } from 'react-bootstrap';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import axios from 'axios';

function SongItem(props) {
    const host = "http://localhost:5001/"

    const { song } = props
    const [rating, setRating] = useState(song.rating)

    const handleOnChange=async(e)=>{
        e.preventDefault()
        const rate = e.target.value
        const response = await axios({
            method: 'put',
            url: `${host}api/song/addrating`,
            headers: {
                'auth-token': localStorage.getItem('authtoken'),
                'content-type': 'application/json'
            }, 
            data: {
              rating: parseInt(rate),
              id: parseInt(song.id)
            }
          })

        setRating(response.data.rating)
    }

    return (
        <tr style={{verticalAlign: "middle"}}>
            <td><Image src={`${host}`+song.image} rounded style={{ width: "5rem", height: "5rem" }} /></td>
            <td>{song.name}</td>
            <td>{song.releasedate}</td>
            <td>{song.artist.name}</td>
            <td><Box sx={{ '& > legend': { mt: 2 } }}><Rating name="rating" value={rating} onChange={handleOnChange} /></Box></td>
        </tr>
    )
}

export default SongItem