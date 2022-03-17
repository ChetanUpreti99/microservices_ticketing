import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError } from "@cutickets/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.patch('/api/ticket/:id',
    requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage(`Title is required`),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage(`Price must be greater than 0`)
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;
        const ticket = await Ticket.findById({
            id
        })
        if (!ticket) {
            return new NotFoundError();
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price,
        });
        await ticket.save();

        res.send(ticket);

    })





export { router as updateTicketRouter };