import { Request, Response } from "express";

const getHomepage = (req: Request, res: Response) => {
    res.render("homepage", {
        "letters": [
            "join",
            "make",
            "word",
            "fall"
        ]
    });
}

export { getHomepage };