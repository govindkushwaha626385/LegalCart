import React from 'react'
import DashboardHeader from '../../components/lawShop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/lawShop/Layout/DashboardSideBar'
import AllCoupons from "../../components/lawShop/AllCoupons";

const LawShopAllCoupouns = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={9} />
            </div>
            <div className="w-full justify-center flex">
                <AllCoupons />
            </div>
          </div>
    </div>
  )
}

export default LawShopAllCoupouns