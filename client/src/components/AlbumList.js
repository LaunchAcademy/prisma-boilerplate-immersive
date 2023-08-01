import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AlbumsList = props => {
    const [albums, setAlbums] = useState([])

    const getAlbums = async () => {
        try {
            const response = await fetch("/api/v1/albums")
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw (error)
            }
            const body = await response.json()
            console.log(body)
            setAlbums(body.albums)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getAlbums()
    }, [])

    const albumsListItems = albums.map(albumsItem => {
        return (
            <li key={albumsItem.id}>
                <Link to={`/albums/${albumsItem.id}`}>
                    {albumsItem.name}
                </Link>
            </li>
        )
    })

    return (
        <div>
            <h1>All Albums</h1>
            <ul>
                {albumsListItems}
            </ul>
        </div>
    )
}

export default AlbumsList