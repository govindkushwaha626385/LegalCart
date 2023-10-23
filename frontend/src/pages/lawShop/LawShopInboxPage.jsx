import React from 'react'
import DashboardHeader from '../../components/lawShop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/lawShop/Layout/DashboardSideBar'
import DashboardMessages from "../../components/lawShop/DashboardMessages";

const LawShopInboxPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={8} />
      </div>
       <DashboardMessages />
    </div>
  </div>
  )
}

export default LawShopInboxPage