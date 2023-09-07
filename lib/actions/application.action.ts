"use server"


import { connectToDB } from "../mongoose";

import Application from "../models/application.model";
import Voyage from "../models/voyage.model";

interface Params {
    department:string,
    author:string,
    currency:string,
    amount:number,
    voyage:string,
    paymentReason:string,
    paymentInfo:string,
    note:string,
    approveLevel:number,
    file:string
  }
  

export async function createApplication({ 
    department,
    author,
    currency,
    amount,
    voyage,
    paymentReason,
    paymentInfo,
    note ,
    approveLevel,
    file 
}: Params
    ) {
      try {
        connectToDB();
    
        
        const createdApplication = await Application.create({
            department,
            author,
            currency,
            amount,
            voyage,
            paymentReason,
            paymentInfo,
            note ,
            approveLevel,
            file 
        });
    
        console.log('application created!')

        // Update the corresponding voyage with the new application's ID
        const voyageToUpdate = await Voyage.findOneAndUpdate(
            { _id: voyage },
            { $push: { applications: createdApplication._id } },
            { new: true }
        );
        if (!voyageToUpdate) {
            throw new Error('Voyage not found');
          }
      
          console.log('Application added to voyage:', voyageToUpdate);
    
    
      } catch (error: any) {
        throw new Error(` ${error.message}`);
      }
    }
    export async function fetchApplicationsByVoyageId(voyageId: string) {
      try {
        connectToDB();
    
        const applications = await Application.find({
          voyage: voyageId,
        }).populate("author");
    
        return applications;
    
      } catch (error: any) {
        throw new Error(` ${error.message}`);
      }
    }

    export async function fetchApplicationById(applicationId: string) {
      try {
        connectToDB();
    
        const application = await Application.findById(applicationId).populate("author");
    
        if (!application) {
          throw new Error("Application not found");
        }
    
        return application;
    
      } catch (error: any) {
        throw new Error(` ${error.message}`);
      }
    }
    export async function deleteApplicationById(applicationId: string) {
      try {
        connectToDB();
    
        // Find and delete the application by its ID
        const deletedApplication = await Application.findByIdAndDelete(applicationId);
    
        if (!deletedApplication) {
          throw new Error('Application not found');
        }
    
        // Retrieve the voyage ID associated with the deleted application
        const voyageId = deletedApplication.voyage;
    
        // Update the corresponding voyage, removing the application ID from the applications array
        const voyageToUpdate = await Voyage.findByIdAndUpdate(
          voyageId,
          { $pull: { applications: applicationId } },
          { new: true }
        );
    
        if (!voyageToUpdate) {
          throw new Error('Voyage not found');
        }
    
        return deletedApplication;
      } catch (error: any) {
        throw new Error(` ${error.message}`);
      }
    }
    export async function fetchApplicationsWithApproveLevel(approveLevel : number) {
      try {
        connectToDB();
    
        const applications = await Application.find({
          approveLevel: approveLevel,
        }).populate("author");
    
        return applications;
    
      } catch (error : any) {
                throw new Error(`Failed to fetch applications: ${error.message}`);

      }
    }

    export async function approveApplicationById(applicationId: string) {
      try {
        connectToDB();
    
        // Find the application by its ID and increment the approveLevel by 1
        const updatedApplication = await Application.findByIdAndUpdate(
          applicationId,
          { $inc: { approveLevel: 1 } },
          { new: true }
        ).populate("author");
    
        if (!updatedApplication) {
          throw new Error('Application not found');
        }
        
        return updatedApplication;
    
      } catch (error:any) {
        throw new Error(`Failed to approve application: ${error.message}`);
      }
    }