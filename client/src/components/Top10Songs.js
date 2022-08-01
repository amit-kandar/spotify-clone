import { React, useEffect, useState } from 'react';
import SongItem from './SongItem'
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function Top10Songs() {

    const host = "http://localhost:5001"
    const songInitial = []
    const [song, setSong] = useState(songInitial)

    const gettop10 = async () => {
        const response = await fetch(`${host}/api/song/gettop10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authtoken')
            }
        })

        const songs = await response.json()
        setSong(songs.songs)
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
            <h2>Top 10 Songs</h2>
            <Table striped className='mt-1'>
                <thead>
                    <tr>
                        <th>Artwork</th>
                        <th>Song</th>
                        <th>Date of Release</th>
                        <th>Artists</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>

                    {song.map((e)=>{
                        return <SongItem key = {e.id} song={e} />
                    })}
                </tbody>
            </Table>
        </>
    );
}



export default Top10Songs;