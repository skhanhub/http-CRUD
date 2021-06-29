import { Request, Response } from 'express'
import urljoin from 'url-join';
import {
  StatusCodes,
  getReasonPhrase,
} from 'http-status-codes';
import ProductsService from "../services/productsService";
import Product from "../models/product.model";
import { ID_EXISTS } from "../const/errorMessages";


const productsService = new ProductsService(Product)
// Defining methods for the userController
export default {
    get: async (req: Request, res: Response) => {
      try{
        let resData;
        if(req.params.id){
          resData = await productsService.GetById(req.params.id);
          if(!resData) {
            return res.status(StatusCodes.NOT_FOUND).json(getReasonPhrase(StatusCodes.NOT_FOUND));
          }
        } else {
          let products;
          if(req.query.name) {
            products = await productsService.FilterProductByName(String(req.query.name));
          } else {
            products = await productsService.Get();
          }

          resData = {
            items: products
          }
        }
        return res.status(StatusCodes.OK).json(resData);
      }
      catch(err){
        console.error(err)
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY))
      }
    },
    create: async (req: Request, res: Response) => {
      try{
        const product = await productsService.Create(req.body);
        res.location(urljoin(req.originalUrl, product.get().id.toString()))
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
        const { id } = req.params;
        const numUpdated = await productsService.Update(id, req.body);

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
        const { id } = req.params;
        const product = await productsService.UpdateOrCreate(id, req.body);

        const statusCode = product.created ? StatusCodes.CREATED : StatusCodes.ACCEPTED;

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
        const id = req.params.id;
        const numDelete = await productsService.DeleteById(id);

        const statusCode = numDelete === 0 ? StatusCodes.NOT_FOUND : StatusCodes.ACCEPTED;

        return res.status(statusCode).json(getReasonPhrase(statusCode));
      }
      catch(err){
        console.log(err)
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY))
      }
    },
};