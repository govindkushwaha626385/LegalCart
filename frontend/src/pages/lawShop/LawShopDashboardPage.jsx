import React from "react";
import DashboardHeader from "../../components/lawShop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/lawShop/Layout/DashboardSideBar";
import DashboardHero from "../../components/lawShop/DashboardHero";

const LawShopDashboardPage = () => {
  return (
        <div>
          <DashboardHeader />
          <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={1} />
            </div>
            <DashboardHero />
          </div>
        </div>
  );
};

export default LawShopDashboardPage;
