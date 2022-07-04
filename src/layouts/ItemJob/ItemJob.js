import React from 'react';
import { useDispatch } from 'react-redux';
import { IconHeart, IconDollar, IconMap, IconHeartActive } from 'assets/index';
import { Link } from 'react-router-dom';
import { checkLogin } from 'store/reducers/authSlice';
import { postLoveJobByIdAction } from 'store/actions/job';
import { setListJob } from 'store/reducers/jobSlice';
import './style.css';

function ItemJob({ id, companyName, logoCompany, address, nameJob, salaryFrom, salaryTo, isFavorites, time }) {
  const dispatch = useDispatch();
  const infoUser = JSON.parse(localStorage.getItem('infoUser'));
  const handleLoveJob = (_idJob, _isFavorites) => () => {
    if (infoUser && infoUser.token) {
      dispatch(
        postLoveJobByIdAction({
          idJob: _idJob,
          isFavorites: _isFavorites
        })
      );
      dispatch(
        setListJob({
          idJob: _idJob,
          isFavorites: _isFavorites
        })
      );
    } else {
      dispatch(
        checkLogin({
          checkLogin: false,
          inc: 1
        })
      );
    }
  };

  return (
    <div className="wrapper-jobs-item-job">
      <div className="wrapper-jobs-item-job-left">
        <Link to={`/viec-lam/${id}`}>
          <p className="item-name-job line-clamp-one">{nameJob}</p>
        </Link>
        <p className="item-company-job">{companyName}</p>
        <div className="wrapper-job-item-job-info">
          <p className="job-item-job-info-child">
            <IconDollar />
            <span className="line-clamp-one">{`${salaryFrom} - ${salaryTo}`} triệu</span>
          </p>
          <p className="job-item-job-info-child line-clamp-one">
            <IconMap />
            <span>{address}</span>
          </p>
        </div>
        <p className="item-job-deadline">Ngày đăng {time}</p>
      </div>
      <div className="wrapper-jobs-item-job-right">
        <img src={logoCompany} alt={nameJob} />
        <div onClick={handleLoveJob(id, isFavorites)} roles="button" aria-hidden="true">
          {isFavorites && <IconHeartActive />}
          {!isFavorites && <IconHeart />}
        </div>
      </div>
    </div>
  );
}

export default ItemJob;
