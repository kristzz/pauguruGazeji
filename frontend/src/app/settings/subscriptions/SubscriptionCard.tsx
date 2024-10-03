import React from 'react';

interface SubscriptionCardProps {
  name: string;
  price: string;
  text: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ name, price, text, }) => {
  return (
    <div className="flex flex-col mr-4 p-4 border-main-blue border-[1px] rounded-xl cursor-pointer">
      <div className="">{name}</div>
      <div className=" opacity-90 flex items-end">{price} <p className="text-sm ml-2 opacity-60">{text}</p></div>
    </div>
  );
};

export default SubscriptionCard;