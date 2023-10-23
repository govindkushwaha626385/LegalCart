import React from 'react'
import DashboardHeader from '../../components/lawShop/Layout/DashboardHeader'
import CreateEvent from "../../components/lawShop/CreateEvent";
import DashboardSideBar from '../../components/lawShop/Layout/DashboardSideBar';

const LawShopCreateEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
      <div className="w-[330px]">
        <DashboardSideBar active={6} />
      </div>
      <div className="w-full justify-center flex">
        <CreateEvent />
      </div>
    </div>
    </div>
  )
}

export default LawShopCreateEvents