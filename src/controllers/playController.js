const getPlayPage = (req, res) => {
    const roomCode = req.query["room-code"];
    res.render("playPage");
}

export { getPlayPage };