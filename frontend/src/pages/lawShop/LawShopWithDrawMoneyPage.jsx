import React from 'react'
import DashboardHeader from '../../components/lawShop/Layout/DashboardHeader'
import WithdrawMoney from "../../components/lawShop/WithdrawMoney";
import DashboardSideBar from '../../components/lawShop/Layout/DashboardSideBar';

const LawShopWithDrawMoneyPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default LawShopWithDrawMoneyPage