import React from 'react'
import DashboardHeader from '../../components/lawShop/Layout/DashboardHeader'
import Footer from '../../components/Layout/Footer'
import OrderDetails from "../../components/lawShop/OrderDetails";

const LawShopOrderDetails = () => {
  return (
    <div>
         <DashboardHeader />
         <OrderDetails />
          <Footer />
    </div>
  )
}

export default LawShopOrderDetails