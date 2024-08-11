import Image from "next/image";
import React from "react";
import { useWriteContract, useReadContract } from "wagmi";
import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";
import Link from "next/link";

const AllGrants = () => {
  const { data, isError, isLoading } = useReadContract({
    address: FundFusionAddress,
    abi: FundFusionABI,
    functionName: "getGrantApplications",
    args: [],
  });

  // console.log(data);

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

  const applications = (data as Application[]) || [];
  return (
    <div>
      <div>
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4">
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"></div>

              <div className="grid grid-cols-1 2xl:grid-cols-0 xl:gap-4 my-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                    All grant Applications
                  </h3>

                  <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Project Title
                          </th>
                          <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Status
                          </th>

                          <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Action
                          </th>
                          <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {applications.length === 0 ? (
                          <div className="text-center">
                            <h1 className="text-3xl font-bold">
                              No Applications
                            </h1>
                          </div>
                        ) : (
                          applications.map(
                            (application: Application, index: number) => (
                              <tr key={index} className="text-gray-500">
                                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                  {application.projectTitle}
                                </th>
                                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                  {application.approved === true
                                    ? "Approved"
                                    : "Pending"}
                                </td>
                                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center bg-gray-600 rounded-md p-1">
                                    <span className="mr-2 text-xs font-medium text-white">
                                      <span>
                                        <Link href={`/application/${index}`}>VIEW</Link>
                                      </span>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            )
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* <script async defer src="https://buttons.github.io/buttons.js"></script>
    <script src="https://demo.themesberg.com/windster/app.bundle.js"></script> */}
      </div>
    </div>
  );
};

export default AllGrants;
