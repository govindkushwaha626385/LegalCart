import React from "react";
import Footer from "../../components/Layout/Footer";
import LawShopSettings from "../../components/lawShop/LawShopSettings";
import DashboardHeader from "../../components/lawShop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/lawShop/Layout/DashboardSideBar";

const LawShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <LawShopSettings />
      </div>
      <Footer/>
    </div>
  );
};

export default LawShopSettingsPage;
