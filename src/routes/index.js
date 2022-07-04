import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/AuthPage/Login';
import Home from 'pages/HomePage/Home';
import Register from 'pages/AuthPage/Register';
import Jobs from 'pages/JobsPage/Jobs';
import DetailJob from 'pages/JobsPage/DetailJobPage/DetailJob';
import PrivateRoute from './privateRoute';
import ManageProfile from 'pages/ProfilePage/Candidate/ManageProfile';
import LoveJobs from 'pages/ProfilePage/Candidate/LoveJobs';
import SubmittedJobs from 'pages/ProfilePage/Candidate/SubmittedJobs';
import InfoCandidate from 'pages/ProfilePage/Candidate/InfoCandidate';
import Overview from 'pages/ProfilePage/Recruit/Overview';
import Posts from 'pages/ProfilePage/Recruit/Posts';
import Accounts from 'pages/ProfilePage/Recruit/Accounts';
import ErrorSever from 'pages/ErrorPage/ErrorSever';
import NotFound from 'pages/ErrorPage/NotFound';
import Company from 'pages/CompanyPage/index';
import DetailCompany from 'pages/CompanyPage/DetailCompanyPage/DetailCompany';
import ListCompany from 'pages/ProfilePage/Recruit/ListCompany';
import AddCompany from 'pages/ProfilePage/Recruit/AddCompany';
import EditCompany from 'pages/ProfilePage/Recruit/EditCompany';
import AddPost from 'pages/ProfilePage/Recruit/AddPost';
import EditPost from 'pages/ProfilePage/Recruit/EditPost';
import ListCvOfJob from 'pages/ProfilePage/Recruit/ListCvOfJob';
import HomeRecruit from 'pages/HomeRecruit/index';
import Contact from 'pages/ContactPage/index';
import PostsPage from 'pages/PostsPage/index';
import DetailPost from 'pages/PostsPage/Detail/index';
import ManagePost from 'pages/ProfilePage/ManagePost/index';
import AddPostBlog from 'pages/ProfilePage/ManagePost/AddPost';
import EditPostBlog from 'pages/ProfilePage/ManagePost/EditPost';
import PrivateRouteAdmin from './privateRouteAdmin';
import LoginAdmin from 'pages/AuthPage/LoginAdmin';
import OverviewAdmin from 'pages/AdminisTrators/Overview';
import ManageListCandidate from 'pages/AdminisTrators/ManageListCandidate';
import ManageListRecruit from 'pages/AdminisTrators/ManageListRecruit';
import ApprovePosts from 'pages/AdminisTrators/ApprovePosts';
import ForgotPassword from 'pages/AuthPage/ForgotPassword';

function SwitchRoute() {
  const authSlice = useSelector(state => state.authSlice);

  return (
    <Routes>
      {authSlice.data?.info?.[0]?.user_id_role !== 2 && <Route exact path="/" element={<Home />} />}
      {authSlice.data?.info?.[0]?.user_id_role === 2 && <Route exact path="/" element={<HomeRecruit />} />}
      <Route exact path="*" element={<NotFound />} />
      <Route exact path="/500" element={<ErrorSever />} />
      <Route exact path="/404" element={<NotFound />} />
      <Route exact path="/viec-lam" element={<Jobs />} />
      <Route exact path="/viec-lam/:idJob" element={<DetailJob />} />
      <Route exact path="/dang-nhap" element={<Login />} />
      <Route exact path="/dang-ky" element={<Register />} />
      <Route exact path="/cong-ty" element={<Company />} />
      <Route exact path="/bai-viet" element={<PostsPage />} />
      <Route exact path="/bai-viet/:idPost" element={<DetailPost />} />
      <Route exact path="/lien-he" element={<Contact />} />
      <Route exact path="/cong-ty/:idCompany" element={<DetailCompany />} />
      <Route path="/quen-mat-khau" element={<ForgotPassword />} />
      {authSlice.data?.info?.[0]?.user_id_role === 1 && (
        <Route
          path="/trang-ca-nhan"
          element={
            <PrivateRoute>
              {/* <ManageProfile /> */}
              <LoveJobs />
            </PrivateRoute>
          }
        />
      )}
      {authSlice.data?.info?.[0]?.user_id_role === 2 && (
        <Route
          path="/trang-ca-nhan"
          element={
            <PrivateRoute>
              <Overview />
            </PrivateRoute>
          }
        />
      )}
      <Route
        path="/trang-ca-nhan/quan-ly-ho-so"
        element={
          <PrivateRoute>
            <ManageProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/tong-quan"
        element={
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/viec-lam-yeu-thich"
        element={
          <PrivateRoute>
            <LoveJobs />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/viec-lam-da-nop"
        element={
          <PrivateRoute>
            <SubmittedJobs />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/thong-tin-ca-nhan"
        element={
          <PrivateRoute>
            <InfoCandidate />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/danh-sach-bai-dang"
        element={
          <PrivateRoute>
            <Posts />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/danh-sach-bai-dang/them-bai-tuyen-dung"
        element={
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/danh-sach-bai-dang/chinh-sua-bai-tuyen-dung/:idPost"
        element={
          <PrivateRoute>
            <EditPost />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/danh-sach-bai-dang/ung-vien-da-nop-cv/:idPost"
        element={
          <PrivateRoute>
            <ListCvOfJob />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/danh-sach-tai-khoan"
        element={
          <PrivateRoute>
            <Accounts />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/danh-sach-cong-ty"
        element={
          <PrivateRoute>
            <ListCompany />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/danh-sach-cong-ty/tao-cong-ty"
        element={
          <PrivateRoute>
            <AddCompany />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/danh-sach-cong-ty/chinh-sua-cong-ty/:idCompany"
        element={
          <PrivateRoute>
            <EditCompany />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/bai-viet"
        element={
          <PrivateRoute>
            <ManagePost />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/bai-viet/tao-bai-viet"
        element={
          <PrivateRoute>
            <AddPostBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/trang-ca-nhan/bai-viet/:idPost"
        element={
          <PrivateRoute>
            <EditPostBlog />
          </PrivateRoute>
        }
      />
      <Route path="/admin/dang-nhap" element={<LoginAdmin />} />
      <Route
        path="/admin/tong-quan"
        element={
          <PrivateRouteAdmin>
            <OverviewAdmin />
          </PrivateRouteAdmin>
        }
      />
      <Route
        path="/admin/danh-sach-ung-vien"
        element={
          <PrivateRouteAdmin>
            <ManageListCandidate />
          </PrivateRouteAdmin>
        }
      />
      <Route
        path="/admin/danh-sach-tuyen-dung"
        element={
          <PrivateRouteAdmin>
            <ManageListRecruit />
          </PrivateRouteAdmin>
        }
      />
      <Route
        path="/admin/danh-sach-tin-tuyen-dung"
        element={
          <PrivateRouteAdmin>
            <ApprovePosts />
          </PrivateRouteAdmin>
        }
      />
    </Routes>
  );
}

export default SwitchRoute;
