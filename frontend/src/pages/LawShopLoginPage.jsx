import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LawShopLogin from "../components/lawShop/LawShopLogin";

const LawShopLoginPage = () => {
  const navigate = useNavigate();
  const { isLawyer,isLoading } = useSelector((state) => state.lawyer);

  useEffect(() => {
    if(isLawyer === true){
      navigate(`/dashboard`);
    }
  }, [isLoading,isLawyer])
  return (
    <div>
        <LawShopLogin />
    </div>
  )
}

export default LawShopLoginPage