const getHomepage = (req: Request, res) => {
    res.render("homepage", {
        "letters": [
            "jcra",
            "ioet",
            "tai-",
            "snen"
        ]
    });
}

export { getHomepage };