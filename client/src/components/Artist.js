import React, { useState } from 'react'

function Artist(props) {
    const { artist, handleArtistId } = props
    const [artistId, setArtistId] = useState()

    const handleOnChange=(e)=>{
        console.log(e.target.value);
        handleArtistId(e.target.value)

    }

    return (
        <li>
            <input className="form-check-input" type="checkbox" id="checkboxNoLabel" aria-label="..." value={artist.id} name="artistId" onChange={handleOnChange} />&nbsp;&nbsp;{artist.name}
        </li>
    )
}

export default Artist