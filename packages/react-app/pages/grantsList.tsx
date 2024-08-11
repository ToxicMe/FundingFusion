import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useReadContract, useAccount } from "wagmi";

const GrantsList = () => {
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useReadContract({
    address: FundFusionAddress,
    abi: FundFusionABI,
    functionName: "getGrants",
    args: [],
  });

  const router = useRouter();

  interface Grant {
    amount: bigint;
    deadline: bigint;
    description: string;
    id: bigint;
    name: string;
    owner: string;
  }

  const grants = (data as Grant[]) || [];

  console.log(data);

  return (
    <div>
      <div className="h-full w-full bg-gray-200 ">
        <main>
          <div className="pt-6 px-4">
            <h1 className="text-3xl font-bold text-center">GRANT PROGRAMMES</h1>
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"></div>

            <div className="grid grid-cols-1 2xl:grid-cols-0 xl:gap-4 my-4">
              {isLoading && (
                <div className="rounded-xl bg-white p-4 ring mt-4 ring-green-50 sm:p-6 lg:p-8">
                  Loading...
                </div>
              )}

              {isError && (
                <div className="rounded-xl bg-white p-4 ring mt-4 ring-green-50 sm:p-6 lg:p-8">
                  Error fetching. Please connect wallet and retry.
                </div>
              )}

              {grants.length === 0 ? (
                <div className="rounded-xl bg-white p-4 ring mt-4 ring-green-50 sm:p-6 lg:p-8">
                  No grants currently.
                </div>
              ) : (
                grants.map((grant: Grant, index: number) => (
                  <article
                    key={index}
                    className="rounded-xl bg-white p-4 ring mt-4 mb-4 ring-green-50 sm:p-6 lg:p-8"
                  >
                    <div className="flex items-start sm:gap-8">
                      <div
                        className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-green-500"
                        aria-hidden="true"
                      >
                        <div className="flex items-center gap-1">
                          <span className="h-8 w-0.5 rounded-full bg-green-500"></span>
                          <span className="h-6 w-0.5 rounded-full bg-green-500"></span>
                          <span className="h-4 w-0.5 rounded-full bg-green-500"></span>
                          <span className="h-6 w-0.5 rounded-full bg-green-500"></span>
                          <span className="h-8 w-0.5 rounded-full bg-green-500"></span>
                        </div>
                      </div>

                      <div>
                        <strong className="rounded border border-green-500 bg-green-500 px-3 py-1.5 text-[10px] font-medium text-white">
                          Ongoing
                        </strong>

                        <h3 className="mt-4 text-lg font-medium sm:text-xl">
                          <a href="#" className="hover:underline">
                            {grant.name}
                          </a>
                        </h3>

                        <p className="mt-1 text-sm text-gray-700">
                          {grant.description}
                        </p>

                        <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                          <div className="flex items-center gap-1 text-gray-500">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>

                            <p className="text-xs font-medium">
                              Deadline:{" "}
                              {new Date(
                                Number(grant.deadline)
                              ).toLocaleString()}
                            </p>
                          </div>

                          <span className="hidden sm:block" aria-hidden="true">
                            &middot;
                          </span>

                          <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                            Worldwide
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button onClick={() => router.push(`/applyGrant/${index}`)} className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white">
                        Apply
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GrantsList;
