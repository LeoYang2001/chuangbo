"use server";


import { connectToDB } from "../mongoose";

import Voyage from "../models/voyage.model";
import User from "../models/user.model";

interface Params {
  oldVoyageNum:string,
    author:string,
    voyageNumber: string,
    portToll: string,
    departure: string,
    arrival: string,
    status:string,
    arrivalTime:Date,
    departureTime:Date,
    file:string
  }
  

export async function createVoyage({ author, voyageNumber, portToll, departure, arrival,status,arrivalTime,departureTime,file }: Params
    ) {
      try {
        connectToDB();
    
        const existingVoyage = await Voyage.findOne({ voyageNumber });

        if (existingVoyage) {
          throw new Error('Voyage number is already in use.');
        }
    
    
        await Voyage.create({
            author,
            voyageNumber,
            portToll,
            departure, 
            arrival,
            status,
            arrivalTime,
            departureTime,
            file
        });
    
        console.log('voyage created!')
    
      } catch (error: any) {
        throw new Error(` ${error.message}`);
      }
    }

    export async function fetchVoyageByNum(voyageNumber: string) {
      try {
        connectToDB()

        const voyage = await Voyage.findOne({voyageNumber}).populate('author');;

        return voyage

      } catch (error:any) {
        throw new Error(`${error.message}`);
      }
      
    }
    export async function deleteVoyageByNum(voyageNumber: string) {
      try {
        connectToDB(); // Connect to the database
    
        // Find and delete the voyage by its voyage number
        const deletedVoyage = await Voyage.findOneAndDelete({ voyageNumber });
    
        if (!deletedVoyage) {
          throw new Error('Voyage not found'); // Throw an error if voyage doesn't exist
        }
    
        return deletedVoyage;
      } catch (error: any) {
        throw new Error(`${error.message}`);
      }
    }

    export async function updateVoyageByNum({
      oldVoyageNum,
      voyageNumber,
      portToll,
      departure,
      arrival,
      status,
      arrivalTime,
      departureTime
    }: Params) {
      try {
        connectToDB();
    
        const existingVoyage = await Voyage.findOne({ oldVoyageNum });
    
        if (!existingVoyage) {
          throw new Error("Voyage not found.");
        }
    
        existingVoyage.portToll = portToll;
        existingVoyage.departure = departure;
        existingVoyage.arrival = arrival;
        existingVoyage.status = status;
        existingVoyage.arrivalTime = arrivalTime;
        existingVoyage.departureTime = departureTime;
        existingVoyage.voyageNumber = voyageNumber
    
        await existingVoyage.save();
    
        console.log("Voyage updated!");
      } catch (error: any) {
        throw new Error(` ${error.message}`);
      }
    }

    export async function fetchVoyages(pageNumber = 1, pageSize = 20) {
        connectToDB();
      
        // Calculate the number of posts to skip based on the page number and page size.
        const skipAmount = (pageNumber - 1) * pageSize;
      
        // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
        const postsQuery = Voyage.find()
          .sort({ createdAt: "desc" })
          .skip(skipAmount)
          .limit(pageSize)
          .populate({
            path: "author",
            model: User,
          })
        
          const totalPostsCount = await Voyage.countDocuments(); // Get the total count of posts
        
          const posts = await postsQuery.exec();
        
          const isNext = totalPostsCount > skipAmount + posts.length;
        
          return { posts, isNext };
    }
        
      
    export async function fetchVoyageById(voyageId: string) {
      try {
        connectToDB();
    
        const voyage = await Voyage.findById(voyageId).populate('author');
    
        if (!voyage) {
          throw new Error('Voyage not found');
        }
    
        return voyage;
    
      } catch (error: any) {
        throw new Error(` ${error.message}`);
      }
    }