import { Request, Response } from 'express';
import * as permissionService from '../services/permissionService';
import { catchAsync } from '../utils/catchAsync';

export const requestPermission = catchAsync(async (req: any, res: Response) => {
  const newRequest = await permissionService.createRequest(
    req.user.id, 
    req.body.requestedPermission, 
    req.body.reason
  );
  res.status(201).json(newRequest);
});

export const getAllRequests = catchAsync(async (req: Request, res: Response) => {
  const requests = await permissionService.getRequests();
  res.json(requests);
});

export const getMyRequests = catchAsync(async (req: any, res: Response) => {
  const requests = await permissionService.getRequests({ userId: req.user.id });
  res.json(requests);
});

export const handleRequest = catchAsync(async (req: Request, res: Response) => {
  const { status, adminNotes } = req.body;
  const updated = await permissionService.updateRequestStatus(
    req.params.id, 
    status, 
    adminNotes
  );
  res.json(updated);
});