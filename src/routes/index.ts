import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import watchlistRoutes from "./watchlist.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/users/:userId/watchlists", watchlistRoutes);

export default router;
