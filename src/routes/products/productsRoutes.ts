import express from "express";
import productsController from "../../controllers/productsController";
import productOptionsController from "../../controllers/productOptionsController";
import { validateGuids } from "../../middleware/validateGuids";

const router = express.Router();
// Matches with "/products"
router.route("/")
  .get(productsController.get)

router.route("/:id")
  .get(validateGuids, productsController.get)

router.route("/")
  .post(productsController.create)

router.route("/:id")
  .put(validateGuids, productsController.update)

router.route("/:id")
  .delete(validateGuids, productsController.delete)

router.route("/:id/options/")
  .get(validateGuids, productOptionsController.get)

router.route("/:id/options/:optionId")
  .get(validateGuids, productOptionsController.get)

router.route("/:id/options/")
  .post(validateGuids, productOptionsController.create)

router.route("/:id/options/:optionId")
  .put(validateGuids, productOptionsController.update)

router.route("/:id/options/:optionId")
  .delete(validateGuids, productOptionsController.delete)

export default router;