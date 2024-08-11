import React, { useEffect, useState } from "react";
import UserDashboard from "@/components/Dashboards/UserDashboard";
import AdministratorDashboard from "@/components/Dashboards/AdministratorDashboard";
import {  useAccount, useReadContract } from "wagmi";
import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useReadContract({
    address: FundFusionAddress,
    abi: FundFusionABI,
    functionName: "isAdministrator",
    args: [address ?? "0x"],
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (data) {
      setIsAdmin(data);
    }
  }, [data]);

  return <div>{isAdmin ? <AdministratorDashboard /> : <UserDashboard />}</div>;
};

export default Dashboard;
