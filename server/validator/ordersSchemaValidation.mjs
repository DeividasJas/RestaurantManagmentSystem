import {  param } from "express-validator";

// export const validateOrderIdSchema = [
//   param("id").isInt().withMessage("ID must be an interger"),
// ];

export const validateOrderParams = [
  param("userId").isInt().withMessage("user id must be interger"),
  param("orderId").isInt().withMessage("order id must be interger"),
];
export const validateOrderUserId = [
  param("userId").isInt().withMessage("user id must be interger"),
];
export const validateOrderOrderId = [
  param("orderId").isInt().withMessage("order id must be interger"),
];


