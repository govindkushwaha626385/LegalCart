import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LawShopCreate from "../components/lawShop/LawShopCreate";

const LawShopCreatePage = () => {
  const navigate = useNavigate();
  const { isLawyer,lawyer } = useSelector((state) => state.lawyer);

  useEffect(() => {
    if(isLawyer === true){
      navigate(`/lawshop/${lawyer._id}`);
    }
  }, [])
  return (
    <div>
        <LawShopCreate />
    </div>
  )
}

export default LawShopCreatePage