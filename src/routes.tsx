import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdCampaign,
  MdReceipt,
  MdGroup,
  MdAllInbox,
  MdOutlineCurrencyExchange
} from 'react-icons/md';

import { FaBox } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';


const routes = [
  // {
  //   name: 'Main Dashboard',
  //   layout: '/admin',
  //   path: 'default',
  //   icon: <MdHome className="h-6 w-6" />,
  // },
  {
    name: 'Ads and SEO',
    layout: '/admin',
    path: 'ads',
    icon: <MdCampaign className="h-6 w-6" />,
  },
  {
    name: 'Order',
    layout: '/admin',
    path: 'order',
    icon: <MdReceipt className="h-6 w-6" />,
  }, {
    name: 'Buyer',
    layout: '/admin',
    path: 'buyer',
    icon: <MdGroup className="h-6 w-6" />,
  }, {
    name: 'Product',
    layout: '/admin',
    path: 'product',
    icon: <FaBox className="h-6 w-6" />,
  },
  {
    name: 'Shop',
    layout: '/admin',
    path: 'shop',
    icon: <FaShop className="h-6 w-6" />,
  }, 
  // {
  //   name: 'Transaction',
  //   layout: '/admin',
  //   path: 'transaction',
  //   icon: <MdOutlineCurrencyExchange className="h-6 w-6" />,
  // },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: 'nft-marketplace',
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,

  //   secondary: true,
  // },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: 'profile',
  //   icon: <MdPerson className="h-6 w-6" />,
  // },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: 'sign-in',
  //   icon: <MdLock className="h-6 w-6" />,
  // },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: 'rtl-default',
  //   icon: <MdHome className="h-6 w-6" />,
  // },
];
export default routes;
