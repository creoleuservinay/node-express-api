import { request, Request, Response } from 'express';
import JSONResponse from '../libs/json-responses';

const paypal = require('paypal-rest-sdk');



class PaymentRouteManager {
  createPayment = (req: Request, res: Response) => {
   const { title, amount }  = req.body;
   typeof(title)
    try {
      const create_payment_json = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
          "item_list": {
            "items": [{
              "name": title,
              "sku": "001",
              "price": amount,
              "currency": "USD",
              "quantity": 1
            }]
          },
          "amount": {
            "currency": "USD",
            "total": amount
          },
          "description": "Testing product"
        }]
      };

      paypal.payment.create(create_payment_json, function (error: Error, payment: any) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              //res.redirect(payment.links[i].href);
              return JSONResponse.success(req, res, 200, 'Payment created successfully', {link: payment.links[i].href, data: create_payment_json}, 2);
            }
          }
        }
      });

      // const tourData: TourInterface = req.body;
      // const newTour = await Tour.create(tourData);
    } catch (error) {
      return JSONResponse.serverError(req, res, 500, 'Something went wrong!!', {});
    }
  };

}

const paymentRouteManage = new PaymentRouteManager();

export default { paymentRouteManage };