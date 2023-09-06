import express from "express"
import prisma from "../../../prisma/prisma.js"
// import cleanUserInput from "../../../services/cleanUserInput.js"

const albumSongsRouter = new express.Router({ mergeParams: true })

albumSongsRouter.post("/", async (req, res) => {
    const { body } = req
    console.log(body)
    const { name, isCool, plays, description } = body
    const albumId = req.params.albumId

    try {
        const newSong = await prisma.song.create({ data: { name, isCool, plays, description, albumId }})

        return res.status(201).json({ song: newSong })
    } catch (error) {
        console.log(error)
   
        return res.status(500).json({ errors: error })
    }
})

export default albumSongsRouter