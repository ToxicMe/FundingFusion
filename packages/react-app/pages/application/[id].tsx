import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";
import { processCheckout } from "@/cUSDTransfer/TokenFunction";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useAccount, useWriteContract, useReadContract } from "wagmi";

const GrantApplication = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const { id } = router.query;
  const { isConnected, address } = useAccount();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { writeContractAsync, isPending } = useWriteContract();
  const { data, isError, isLoading } = useReadContract({
    address: FundFusionAddress,
    abi: FundFusionABI,
    functionName: "getGrantApplication",
    args: [BigInt(Number(id))],
  });
  const { data: user } = useReadContract({
    address: FundFusionAddress,
    abi: FundFusionABI,
    functionName: "isAdministrator",
    args: [address ?? "0x"],
  });

  const interactor = user as boolean;
  setAdmin(interactor);

  interface Application {
    applicant: string;
    approved: boolean;
    demoVideoLink: string;
    description: string;
    grantId: bigint;
    id: bigint;
    ipfsHash: string;
    liveLink: string;
    problemStatement: string;
    projectTitle: string;
    sourceCode: string;
    timestamp: bigint;
  }

  const application = (data as Application) || {};

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onClose = () => {
    setIsFormVisible(false);
  };

  const handleAmountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect wallet.");
      console.log("Please connect wallet.");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const receiver = application.applicant as `0x${string}`;
    const Amount = Number(data.amount) || 0;
    try {
      const paid = await processCheckout(receiver, Amount);

      if (paid) {
        const hash = await writeContractAsync({
          address: FundFusionAddress,
          abi: FundFusionABI,
          functionName: "approveGrantApplication",
          args: [BigInt(Number(id)), BigInt(Amount * 10 ** 18)],
        });
        if (hash) {
          console.log(hash);
          setIsFormVisible(false);
          toast.success("Application approved.");
        } else {
          console.log("An error occurred while processing.");
        }
      } else {
        console.log("Unable to send.");
      }
    } catch (err: any) {
      if (err.reason) {
        console.log(err.reason);
        toast(err.reason);
      } else if (err.message) {
        console.log(err.message);
        toast("Unable to purchase.");
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="flex overflow-hidden bg-white pt-16">
          <div
            className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
          ></div>
          <div
            id="main-content"
            className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <main>
              <div className="pt-6 px-4">
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"></div>

                <div className="grid grid-cols-1  2xl:grid-cols-2 xl:gap-4 my-4">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flow-root rounded-lg border border-gray-100 py-6 shadow-sm">
                      <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-gray-900">
                            Project Title
                          </dt>
                          <dd className="text-gray-700 sm:col-span-2">
                            {application.projectTitle}
                          </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-gray-900">
                            Introduction
                          </dt>
                          <dd className="text-gray-700 sm:col-span-2">
                            {application.description}
                          </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-gray-900">
                            Problem Statement
                          </dt>
                          <dd className="text-gray-700 sm:col-span-2">
                            {application.problemStatement}
                          </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-gray-900">
                            Objectives
                          </dt>
                          <dd className="text-gray-700 sm:col-span-2">
                            {" "}
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit.{" "}
                          </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-gray-900">
                            Demo link
                          </dt>
                          <dd className="text-gray-700 sm:col-span-2">
                            {application.demoVideoLink}
                          </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-gray-900">
                            Live link
                          </dt>
                          <dd className="text-gray-700 sm:col-span-2">
                            {application.liveLink}
                          </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-gray-900">Github</dt>
                          <dd className="text-gray-700 sm:col-span-2">
                            {application.sourceCode}
                          </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-gray-900">Files</dt>
                          <dd className="text-gray-700 sm:col-span-2">
                            <a
                              href={`https://ipfs.io/ipfs/${application.ipfsHash}`}
                              //   target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View File
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <button
                      hidden={!admin}
                      onClick={() => toggleFormVisibility()}
                      className="bg-blue-500 "
                    >
                      Approve
                    </button>

                    {isFormVisible && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative bg-white p-4 rounded-lg shadow-md w-80">
                          <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-bold text-black">
                              Approve the application
                            </h2>
                            <small className="text-black">
                              <span className="italic">NB:</span> The amount
                              will be sent to the applicant in cUSD.
                            </small>
                            <div className="flex space-x-1">
                              <form
                                onSubmit={handleAmountSubmit}
                                className="flex flex-col"
                              >
                                <input
                                  type="text"
                                  placeholder="input quantity"
                                  // value={amount}
                                  // onChange={handleChange}
                                  name="amount"
                                  required
                                  className="text-black w-full p-1 rounded-md"
                                />

                                <button
                                  type="submit"
                                  // disabled={!amount}
                                  className="bg-blue-500 text-white rounded-lg w-fit p-1 mt-2 hover:bg-blue-400"
                                >
                                  {isPending ? "Processing..." : "Approve"}
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GrantApplication;
