import { Request, Response } from 'express'
import urljoin from 'url-join';
import {
  StatusCodes,
  getReasonPhrase,
} from 'http-status-codes';
import ProductsOptionsService from '../services/productOptionsService';
import ProductOption from '../models/productOption.model';
import { ID_EXISTS } from "../const/errorMessages";

const productsOptionsService = new ProductsOptionsService(ProductOption)
// Defining methods for the userController
export default {
    get: async (req: Request, res: Response) => {
      try{
        const { id, optionId } = req.params;
        let resData;

        if(req.params.optionId){
            resData = await productsOptionsService.GetProductOptionById(id, optionId);
            if(!resData) {
              return res.status(StatusCodes.NOT_FOUND).json(getReasonPhrase(StatusCodes.NOT_FOUND));
            }
        } else {
            const options = await productsOptionsService.GetProductOptions(id);
            resData = {
              items: options
            }
        }

        return res.json(resData)
      }
      catch(err){
        console.error(err)
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY))
      }
    },
    create: async (req: Request, res: Response) => {
      try{
        const option = await productsOptionsService.CreateProductOption(req.params.id, req.body);
        res.location(urljoin(req.originalUrl, option.get().id.toString()))
        res.status(StatusCodes.CREATED).json(getReasonPhrase(StatusCodes.CREATED))
      }
      catch(err){
        console.error(err)
        const statusCode = err.message === ID_EXISTS ? StatusCodes.CONFLICT : StatusCodes.UNPROCESSABLE_ENTITY
        res.status(statusCode).json(getReasonPhrase(statusCode))
      }
    },
    update: async (req: Request, res: Response) => {
      try{
        const { id, optionId } = req.params;
        const numUpdated = await productsOptionsService.UpdateProductOptionById(id, optionId, req.body);

        const statusCode = numUpdated === 0 ? StatusCodes.NOT_FOUND : StatusCodes.ACCEPTED;

        return res.status(statusCode).json(getReasonPhrase(statusCode))
      }
      catch(err){
        console.log(err)
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY))
      }
    },
    updateOrCreate: async (req: Request, res: Response) => {
      try{
        const { id, optionId } = req.params;
        const option = await productsOptionsService.UpdateOrCreateProductOptionById(id, optionId, req.body);

        const statusCode = option.created ? StatusCodes.CREATED : StatusCodes.ACCEPTED;

        return res.status(statusCode).json(getReasonPhrase(statusCode))
      }
      catch(err){
        console.log(err)
        const statusCode = err.message === ID_EXISTS ? StatusCodes.CONFLICT : StatusCodes.UNPROCESSABLE_ENTITY
        res.status(statusCode).json(getReasonPhrase(statusCode))
      }
    },
    delete: async (req: Request, res: Response) => {
      try{
        const { id, optionId } = req.params;
        const numDelete = await productsOptionsService.DeleteProductOptionById(id, optionId);

        const statusCode = numDelete === 0 ? StatusCodes.NOT_FOUND : StatusCodes.ACCEPTED;

        return res.status(statusCode).json(getReasonPhrase(statusCode));
      }
      catch(err){
        console.log(err)
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY))
      }
    },
};