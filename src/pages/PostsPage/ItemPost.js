import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

function ItemPost({ idPost, namePost, subTitle, bannerImg, timePost }) {
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
    <div className="wrapper-item-post">
      <Link to={'/bai-viet/' + idPost}>
        <h3 className="item-name-post">{namePost}</h3>
      </Link>
      <p className="item-time-post"> {convertTime(timePost)}</p>
      <img className="item-image-post" src={bannerImg} alt={namePost} />
      <p className="item-des-post line-clamp-two">{subTitle}</p>
      <div className="item-border-post" />
    </div>
  );
}

export default ItemPost;
