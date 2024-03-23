import { updateDoctor,deleteDoctor,getAllDoctor,getSingleDoctor } from "../Controllers/doctorController.js";
import express from "express";
import { authenticate,restrict } from "../auth/verifyToken.js";
import reviewRouter from './review.js';

const router=express.Router();

//nested route

router.use('/:doctorId/reviews',reviewRouter);

router.put('/:id',authenticate,restrict(["doctor"]),updateDoctor);
router.delete('/:id',authenticate,restrict(["doctor"]),deleteDoctor);
router.get('/',authenticate,restrict(["admin"]),getAllDoctor);
router.get('/:id',authenticate,restrict(["doctor"]),getSingleDoctor);

export default router;