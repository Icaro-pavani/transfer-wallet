import Joi from "joi";

export interface TransactionData {
  creditedUsername: string;
  value: number;
}

export const transactionSchema = Joi.object<TransactionData>({
  creditedUsername: Joi.string().required(),
  value: Joi.number().integer().greater(0).required(),
});
