import React from 'react'
import DashboardHeader from '../../components/lawShop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/lawShop/Layout/DashboardSideBar'
import CreateProduct from "../../components/lawShop/CreateProduct";

const LawShopCreateProduct = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <CreateProduct />
            </div>
          </div>
    </div>
  )
}

export default LawShopCreateProduct