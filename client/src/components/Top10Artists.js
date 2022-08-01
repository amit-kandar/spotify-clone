import { React, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import ArtistItem from './ArtistItem';
import { useNavigate } from 'react-router-dom'

function Top10Artists() {

    const host = "http://localhost:5001"
    const artistInitial = []
    const [artist, setArtist] = useState(artistInitial)

    const gettop10 = async () => {
        const response = await fetch(`${host}/api/artist/gettop10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authtoken')
            }
        })

        const artists = await response.json()
        setArtist(artists.artist)
    }

    let navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
            gettop10()
        } else {
            navigate('/signin')
        }
    })


    return (
        <>
        <h2>Top 10 Artists</h2>
            <Table striped >
                <thead>
                    <tr>
                        <th>Artists</th>
                        <th>Date of Birth</th>
                        <th>Songs</th>
                    </tr>
                </thead>
                <tbody>
                    {artist.map((e)=>{
                        return <ArtistItem key={e.id} artists={e} />
                    })}
                </tbody>
            </Table>
        </>
    );
}



export default Top10Artists;