import { Request, Response } from 'express';
import * as permissionService from '../services/permissionService';

export const requestPermission = async (req: any, res: Response) => {
  try {
    const newRequest = await permissionService.createRequest(req.user.id, req.body.requestedPermission, req.body.reason);
    res.status(201).json(newRequest);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const requests = await permissionService.getRequests();
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyRequests = async (req: any, res: Response) => {
  try {
    const requests = await permissionService.getRequests({ userId: req.user.id });
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleRequest = async (req: Request, res: Response) => {
  try {
    const { status, adminNotes } = req.body;
    const updated = await permissionService.updateRequestStatus(req.params.id, status, adminNotes);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};