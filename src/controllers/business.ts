import { Request, Response } from "express";
import httpStatus from "http-status";
import businessService from "../services/business";
import catchAsync from "../utils/catchAsync";
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();


const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const createBusiness = catchAsync(async (req: Request, res: Response) => {
    const newBusiness = await businessService.createBusiness(req.body);
    res.status(httpStatus.CREATED).json({newBusiness});
});

export const updateBusiness = catchAsync(async (req: Request, res: Response) => {
    const updatedBusiness = await businessService.updateBusiness(req.params.id, req.body);
    res.status(httpStatus.OK).json({updatedBusiness});
});

export const getBusinessById = catchAsync(async (req: Request, res: Response) => {
    const business = await businessService.getBusinessById(req.params.id);
    res.status(httpStatus.OK).json({business});
});

export const getAllBusiness = catchAsync(async (req: Request, res: Response) => {
    //@ts-ignore
    const business = await businessService.getAllBusinessMetrics(req.user._id); 
    res.status(httpStatus.OK).json({business});
});

export const deleteBusiness = catchAsync(async (req: Request, res: Response) => {
    const deletedBusiness = await businessService.deleteBusiness(req.params.id);
    res.status(httpStatus.OK).json({deletedBusiness});
});
export const uploadFiles = catchAsync(async (req:Request, res:Response)=>{
    //@ts-ignore
    if (!req.file) {
        console.log('inside no file uploaded');
        console.log(req.file);
        console.log(req.body);
        
        
        
        return res.status(400).send('No file uploaded.');
    }
    //@ts-ignore
    const file = req.file;
    console.log('inside');
    
    console.log(file);
    
    const fileKey = `uploads/${uuidv4()}-${file.originalname}`;

    const params = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3Client.send(command);
    
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const updatedBusiness = await businessService.uploadFile(req.params.id,fileUrl)
    res.status(httpStatus.OK).json({updatedBusiness});
})