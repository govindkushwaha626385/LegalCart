import React from 'react'
import DashboardHeader from '../../components/lawShop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/lawShop/Layout/DashboardSideBar'
import AllEvents from "../../components/lawShop/AllEvents";

const LawShopAllEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <AllEvents />
            </div>
          </div>
    </div>
  )
}

export default LawShopAllEvents