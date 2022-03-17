import express, { Request, Response, NextFunction } from "express";
import { NotFoundError } from "@cutickets/common";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.put('/api/ticket/:id',
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;
        const ticket = await Ticket.findById({
            id
        })
        if (!ticket) {
            return new NotFoundError();
        }
        res.status(201).send(ticket);
    })

export { router as showTicketRouter }