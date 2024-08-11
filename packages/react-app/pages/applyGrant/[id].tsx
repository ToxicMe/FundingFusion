import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useAccount, useWriteContract } from "wagmi";
import { PinataSDK } from "pinata";
import dotenv from "dotenv";
require("dotenv").config();

const GrantApplication = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);
  const { id } = router.query;
  const { isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const pinata = new PinataSDK({
    pinataJwt:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0OGRhNzE2MC03NTc2LTRmNWEtYTc0Ny0wODNkMGI1NjMxZjMiLCJlbWFpbCI6ImplZmZpc2htYWVsMTQxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmYTIxYThkNDZlMzA1ZGQwOTgyNiIsInNjb3BlZEtleVNlY3JldCI6IjRkYjk5OGUyZDg5OWIwZmMxNzA5NDU4OWYxZGRjNjhlNmZhNjlkMTZmODI3MTdmOWEyOGNmY2UyNDI1Mjk0ZmMiLCJleHAiOjE3NTQ4OTk2NzV9.PjtrDEIM1-YL7OpIAOe_KDfkA2gMGOCbaAXeDFjMHlg",
    pinataGateway: "red-above-locust-968.mypinata.cloud",
  });

  const trial = process.env.PINATA_JWT;
  console.log(trial);

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploading(true);
      console.log(uploading);
      // const data = new FormData();
      // data.append("file", fileToUpload);
      // const file = new File(fileToUpload,"", { type: "file" });
      const result = async () => {
        try {
          const upload = await pinata.upload.file(fileToUpload);
          console.log(upload);
          return upload;
        } catch (error) {
          console.log(error);
        }
      };

      const uploadResult = await result();
      if (uploadResult) {
        console.log(uploadResult.IpfsHash);
        setCid(uploadResult.IpfsHash);
      } else {
        console.log("error");
      }

      // const resData = await res.json();
      // setCid(resData.IpfsHash);
      // console.log(resData.IpfsHash);
      setUploading(false);
    } catch (e: any) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  // console.log(uploading);
  // console.log(file);

  const handleChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    uploadFile(selectedFile);
  };

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      console.log("Please connect your wallet");
      toast("Please connect your wallet");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const hash = await writeContractAsync({
        address: FundFusionAddress,
        abi: FundFusionABI,
        functionName: "makeGrantApplication",
        args: [
          BigInt(Number(id)),
          data.name as string,
          data.description as string,
          data.problemStatement as string,
          data.videolink as string,
          data.livelink as string,
          data.sourcecode as string,
          cid as string,
        ],
      });
      if (hash) {
        console.log(hash);
        toast("Application successful");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occured. Please try again");
      console.log(error);
    }
  }

  return (
    <div>
      <main>
        <div>
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"></div>

          <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-2">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <div className="isolate bg-white px-6 py-2 sm:py-2 lg:px-8">
                <div
                  className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                  aria-hidden="true"
                >
                  <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
                </div>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Grant Application Form{" "}
                  </h2>
                  <p className="mt-2 text-lg leading-8 text-gray-600">
                    Make sure you fill the for mas instructed.
                  </p>
                </div>
                <form
                  onSubmit={submitForm}
                  className="mx-auto mt-16 max-w-xl sm:mt-20"
                >
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold leading-6 text-black"
                      >
                        Project title
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="name"
                          id="first-name"
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="block text-sm font-semibold leading-6 text-green-600"
                      >
                        Short Intro
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          name="description"
                          id="message"
                          rows={4}
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="problemStatement"
                        className="block text-sm font-semibold leading-6 text-green-600"
                      >
                        problem Statement & Solution
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          name="problemStatement"
                          id="message"
                          rows={4}
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="videolink"
                        className="block text-sm font-semibold leading-6 text-black"
                      >
                        Demo Video Link
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="videolink"
                          id="company"
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="livelink"
                        className="block text-sm font-semibold leading-6 text-black"
                      >
                        Live Video Link
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="livelink"
                          id="company"
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="sourcecode"
                        className="block text-sm font-semibold leading-6 text-black"
                      >
                        GitHub
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="sourcecode"
                          id="company"
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="upload"
                        className="block text-sm font-semibold leading-6 text-black"
                      >
                        Upload Project File
                      </label>
                      <div className="mt-2.5">
                        <input
                          name="upload"
                          id="company"
                          type="file"
                          ref={inputFile}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <button
                      type="submit"
                      className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {isPending ? "Applying..." : "Apply"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GrantApplication;
