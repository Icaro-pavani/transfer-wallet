import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../protocols.js";

const serviceErrorToStatusCode = {
  unauthorized: 401,
  conflict: 409,
  unprocessable: 422,
  notFound: 404,
};

export function conflictError(message: string) {
  return { name: "conflict", message: message || "" };
}

export function unprocessableError(message: string) {
  return { name: "unprocessable", message: message || "" };
}

export function unauthorizedError(message: string) {
  return { name: "unauthorized", message: message || "" };
}

export function notFoundError(message: string) {
  return { name: "notFound", message: message || "" };
}

export default async function handleErrors(
  error: ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const errorName = error.name as ErrorNames;
  if (error.name) {
    return res.status(serviceErrorToStatusCode[errorName]).send(error.message);
  }

  return res.sendStatus(500);
}

type ErrorNames = "conflict" | "unprocessable" | "unauthorized" | "notFound";
