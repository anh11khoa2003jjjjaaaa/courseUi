import OrderPage from "../components/OrderPage";
import UserCategoryByTeacher from "../pages/UserCategoryByTeacher";
import UserCourse from "../pages/UserCourse";
import UserForgotPass from "../pages/UserForgotPass";
import UserHome from "../pages/UserHome";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import UserTeacher from "../pages/UserTeacher";
import UserYourOrder from "../pages/UserYourOrder";

const UserRoutes = [
    { path: '/home', component: UserHome },
    { path: '/register', component: UserRegister },
    { path: '/login', component: UserLogin },
    { path: '/order/:orderId', component: OrderPage },
    { path: '/courses/:courseId', component: UserCourse },
    { path: '/orders/user/:userId', component: UserYourOrder },
    { path: '/courses/:courseId', component: UserCourse },
    { path: '/teacherPost', component: UserTeacher },
    { path: '/teacherAddCategory', component: UserCategoryByTeacher },
    { path: '/forgot-password', component: UserForgotPass },

];

export default UserRoutes;