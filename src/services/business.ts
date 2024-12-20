import httpStatus from "http-status";
import db from "../models";
import { TBusinessTypes } from "../types";
import ApiError from "../utils/ApiError";



const createBusiness = async (body: TBusinessTypes) => {
    // check existed business with same name
    if(body.user_id){
        const existingBusiness = await db.business.findOne({ business_name: body.business_name, user_id: body.user_id });
        if (existingBusiness) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Business name already exists');
        }
    }
    const business = await db.business.create(body);
    return business;
};

const updateBusiness = async (id: string, body: any) => {
    
    
    const checkBusiness = await db.business.findById(id);
    if (!checkBusiness) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Business not found');
    }
    const business = await db.business.findByIdAndUpdate(id, {
        $set: body
    }, { new: true });
    return business;
};

const getBusinessById = async (id: string) => {
    const business = await db.business.findById(id);
    
    
    if(!business){
        throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
    }
    // const metrics = await calculateAllBusinessMetrics(business);
    return {data:business};
};

const getAllBusinessMetrics = async (user_id:string) => {
    const businesses = await db.business.find({user_id});
    // const metrics = await Promise.all(businesses.map(async (business) => {
    //     const metrics = await calculateAllBusinessMetrics(business);
    //     return {data:business, metrics};
    // }));
    return {data:businesses};
};

const deleteBusiness = async (id: string) => {
    const business = await db.business.findByIdAndDelete(id);
    return business;
};

const uploadFile = async(id:string, fileUrl:string)=>{
    console.log(fileUrl);
    
    const updatedBusiness = await db.business.findByIdAndUpdate(id,
        { $push: {business_attachments : fileUrl}},
        { new: true}
    ) 

    return updatedBusiness
}

const businessService = {
    createBusiness,
    updateBusiness,
    getBusinessById,
    getAllBusinessMetrics,
    deleteBusiness,
    uploadFile
};

export default businessService;