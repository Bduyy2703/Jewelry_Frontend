import { DefaultProfile, HeaderOnly } from "../components/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Register";
import Upload from "../pages/Upload";
import Search from "../pages/Search";
import ProfileUser from "../pages/ProfileUser/pageProfile/profileUser";
import CartUser from "../pages/ProfileUser/pageCart/cartUser";
import PasswordUser from "../pages/ProfileUser/pagePassword/passwordUser";
import AddressesUser from "../pages/ProfileUser/pageAddresses/addressesUser";
import Register from "../pages/Register";
import VerifyRegister from "../pages/VerifyRegister";
import CartPage from "../pages/CartPage";
import { DetailProduct } from "../pages/DetailProduct/DetailProduct";

// không cần đăng nhập vẫn xem được
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/register", component: Register },
  { path: "/verifyRegister", component: VerifyRegister },
  { path: "/login", component: Login },
  { path: "/search", component: Search, layout: null },
  { path: "/upload", component: Upload, layout: HeaderOnly },
  {
    path: "/account",
    component: ProfileUser,
    layout: DefaultProfile,
    // children: [
    //     { path: '/cartUser', component: CartUser, layout: DefaultProfile },
    //     // { path: 'other-tab', element: <OtherTab /> },
    // ]
  },
  { path: "/account/orders", component: CartUser, layout: DefaultProfile },
  {
    path: "/account/changepassword",
    component: PasswordUser,
    layout: DefaultProfile,
  },
  {
    path: "/account/addresses",
    component: AddressesUser,
    layout: DefaultProfile,
  },
  { path: "/cart", component: CartPage },
  { path: "/detail-product", component: DetailProduct },

];

// ví dụ phải đăng nhập mới xem được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
