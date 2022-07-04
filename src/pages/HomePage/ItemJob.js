import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconHeart, IconHeartActive } from 'assets';
import { checkLogin } from 'store/reducers/authSlice';
import { postLoveJobByIdAction } from 'store/actions/job';
import { setListJob } from 'store/reducers/jobSlice';

function ItemJob({ id, image, nameJob, nameCompany, salary, employmentType, isFavorites }) {
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
    <div className="wrapper-home-item-job">
      <div className="home-item-job-left">
        <img src={image} alt={nameJob} />
        <div className="home-item-job-des">
          <Link to={`/viec-lam/${id}`}>
            <p className="home-item-name-job line-clamp-one" title={nameJob}>
              {nameJob}
            </p>
          </Link>
          <p className="home-item-name-company line-clamp-one" title={nameCompany}>
            {nameCompany}
          </p>
        </div>
        <div onClick={handleLoveJob(id, isFavorites)} roles="button" aria-hidden="true">
          {isFavorites && <IconHeartActive />}
          {!isFavorites && <IconHeart />}
        </div>
      </div>
      <div className="home-item-list-info">
        <p className="home-item-info">{salary}</p>
        <p className="home-item-info">{employmentType}</p>
      </div>
    </div>
  );
}

export default ItemJob;
