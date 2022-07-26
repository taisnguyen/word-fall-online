import { Request, Response } from "express";

const getHomepage = (req: Request, res: Response): void => {
    res.render("homepage", {
        "letters": [
            "JOIN",
            "MAKE",
            "WORD",
            "FALL"
        ]
    });
}

export { getHomepage };