"use client";
 
// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";
 
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";

 
export default function UploadButtonPage() {
  const [file, setFile] = useState<{
    fileUrl:string;
    fileKey:string;
  }>()

  return (
    <main style={{fontSize:'15px'}} className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton<OurFileRouter>
        endpoint="media"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}