import { useRouter } from "next/navigation";
import React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";
import { toast } from "sonner";

const RegisterProgramme = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { writeContractAsync, isPending } = useWriteContract();

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
      const dateObject = new Date(data.deadline as string);
      const dateInMilliseconds = dateObject.getTime();

      const hash = await writeContractAsync({
        address: FundFusionAddress,
        abi: FundFusionABI,
        functionName: "addAdministrator",
        args: [
          data.name as string,         
        ],
      });
      if (hash) {
        console.log(hash);
        toast("successfully registered");
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
          <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-2">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <div className="isolate bg-white px-6 py-2 sm:py-2 lg:px-8">
                <div
                  className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                  aria-hidden="true"
                >
                  <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
                </div>
                <div className="mx-auto w-fit max-w-2xl rounded-lg shadow-lg p-5">
                  <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Register as Admin.
                    </h1>
                  </div>
                  <form
                    onSubmit={submitForm}
                    className="mx-auto mt-6  sm:mt-20"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold leading-6 text-black"
                      >
                        UserName
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
                    <div className="mt-10">
                      <button
                        disabled={isPending}
                        type="submit"
                        className="block w-fit rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {isPending ? "..." : "Register"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterProgramme;
