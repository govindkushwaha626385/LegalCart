import React from 'react'
import DashboardHeader from '../../components/lawShop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/lawShop/Layout/DashboardSideBar'
import AllRefundOrders from "../../components/lawShop/AllRefundOrders";

const LawShopAllRefunds = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
           <AllRefundOrders />
        </div>
      </div>
</div>
  )
}

export default LawShopAllRefunds