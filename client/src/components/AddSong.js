import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Artist from './Artist'
import axios from 'axios'

function AddSong() {
    const host = "http://localhost:5001"
    const artistInitial = []
    const [artists, setArtists] = useState(artistInitial)
    const [artist, setArtist] = useState({ name: "", dob: "", bio: "" })
    const [songs, setSongs] = useState({ name: "", releasedate: "", image: "", artistId: null })

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
            fetchArtist()
        }
        else {
            navigate('/signin')
        }
        // eslint-disable-next-line
    }, [])

    const fetchArtist = async () => {
        const response = await fetch(`${host}/api/artist/getartists`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authtoken')
            }
        })

        const artists = await response.json()
        setArtists(artists.Artists)
    }


    // Add Artist
    const addArtist = async (name, dob, bio) => {
        const response = await fetch(`${host}/api/artist/addartist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ name, dob, bio })
        })
        const newArtist = await response.json()
        setArtists(artists.concat(newArtist))
    }
    const handleClick = (e) => {
        e.preventDefault()
        addArtist(artist.name, artist.dob, artist.bio)
        setArtist({ name: "", dob: "", bio: "" })

    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('name', songs.name)
        formdata.append('releasedate', songs.releasedate)
        formdata.append('image', songs.image)
        formdata.append('artistId', songs.artistId)

        axios.post('http://localhost:5001/api/song/addsong', formdata, {
            headers: {
                'auth-token': localStorage.getItem('authtoken')
            }
        })
            .then(e => { console.log(e.data); })
            .catch(e => { console.log(e); })
        setSongs({ name: "", releasedate: "", image: "", artistId: null })
    }

    const onChangeArtist = (e) => {
        setArtist({ ...artist, [e.target.name]: e.target.value })
    }

    const handleOnChange = (e) => {
        setSongs({ ...songs, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        setSongs({ ...songs, image: e.target.files[0] })
    }

    const handleArtistId = (value)=>{
        setSongs({...songs, artistId: value})
    }

    return (
        <>
            <form onSubmit={handleOnSubmit} encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={songs.name} onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date of Release</label>
                    <input type="text" className="form-control" id="date" name='releasedate' value={songs.releasedate} onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Art Work</label>
                    <input type="file" className='form-control' accept='.jpg, .png, .jpeg' name='image' onChange={handleImage} />
                </div>
                <div className='d-flex justify-content-around'>
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                            Artists
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {artists.map((e) => {
                                return <Artist artist = {e} key = {e.id} handleArtistId={handleArtistId} />
                            })}
                        </ul>
                    </div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                        Add Artist
                    </button>
                </div>

                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Artist</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChangeArtist} value={artist.name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                                    <input type="text" className="form-control" id="dob" name='dob' aria-describedby="emailHelp" onChange={onChangeArtist} value={artist.dob} />
                                </div>
                                <div className="form-floating">
                                    <textarea type="text" className="form-control" id="bio" name='bio' aria-describedby="emailHelp" onChange={onChangeArtist} value={artist.bio} />
                                    <label htmlFor="floatingTextarea2">Bio</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
// className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}
export default AddSong