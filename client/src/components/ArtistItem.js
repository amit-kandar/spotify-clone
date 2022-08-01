import React from 'react'

function ArtistItem(props) {
    const { artists } = props
    return (
        <tr>
            <td>{artists.name}</td>
            <td>{artists.dob}</td>
            <td>{artists.songs[0].name}</td>
        </tr>
    )
}

export default ArtistItem