import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";
import React from "react";
import { useAccount, useReadContract } from "wagmi";

const MyPaymentHistory = () => {
  const { address } = useAccount();
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

  const myApplications = ((data as Application[]) || [])?.filter(
    (application) => {
      return application.applicant.toLowerCase() === address?.toLowerCase();
    }
  );

  const myApprovedApplications = (
    (myApplications as Application[]) || []
  )?.filter((application) => {
    return application.approved === true;
  });

  return (
    <div>
      {" "}
      <div>
        <main>
          <div className="pt-6 px-4">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"></div>

            <div className="grid grid-cols-1 2xl:grid-cols-0 xl:gap-4 my-4">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                  Payment History
                </h3>

                <div className="block w-full overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                          Project Title
                        </th>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                          Timestamp
                        </th>

                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                          Amount paid
                        </th>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {myApprovedApplications.length === 0 ? (
                        <tr>
                          <div className="text-center items-center">
                            <p>No Payments Done</p>
                          </div>
                        </tr>
                      ) : (
                        myApprovedApplications.map(
                          (application: Application, index: number) => (
                            <tr key={index} className="text-gray-500">
                              <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                {application.projectTitle}
                              </th>
                              <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                {new Date(
                                  Number(application.timestamp) * 1000
                                ).toLocaleString()}
                              </td>

                              <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2 text-xs font-medium">
                                    30%
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

        {/* <script async defer src="https://buttons.github.io/buttons.js"></script>
      <script src="https://demo.themesberg.com/windster/app.bundle.js"></script> */}
      </div>
    </div>
  );
};

export default MyPaymentHistory;
