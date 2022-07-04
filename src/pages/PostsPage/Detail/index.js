import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import Footer from 'layouts/Footer/index';
import HeaderClient from 'layouts/Header/HeaderClient';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailPostAction } from 'store/actions/post';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import '../style.css';

function DetailPost() {
  const { idPost } = useParams();
  const dispatch = useDispatch();
  const detailPost = useSelector(state => state.postSlice.detailPost);
  useEffect(() => {
    dispatch(
      getDetailPostAction({
        idPost: idPost
      })
    );
  }, [idPost, dispatch]);

  const createMarkup = _des => {
    return { __html: _des };
  };

  const convertTime = _time => {
    if (_time) {
      const date = new Date(_time);
      const timeZone = 'Asia/Saigon';
      const zonedDate = utcToZonedTime(date, timeZone);
      const pattern = 'yyyy-MM-dd HH:mm:ss';
      const output = format(zonedDate, pattern, { timeZone: timeZone });
      return output;
    }
    return null;
  };

  return (
    <>
      <HeaderClient />
      <div className="wrapper-post">
        <div className="container">
          {detailPost.load && <Skeleton active paragraph={{ rows: 8 }} />}
          {!detailPost.load && (
            <div>
              <h3 className="item-name-post">{detailPost.data?.data?.blog_title}</h3>
              <p className="item-time-post"> {convertTime(detailPost.data?.data?.updated_at)}</p>
              <img className="item-image-post" src={detailPost.data?.data?.blog_thumbnail} alt="" />
              <div className="item-des-post" dangerouslySetInnerHTML={createMarkup(detailPost.data?.data?.blog_des)} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailPost;
