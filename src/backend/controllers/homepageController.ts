import { Request, Response } from "express";

const getHomepage = (req: Request, res: Response) => {
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