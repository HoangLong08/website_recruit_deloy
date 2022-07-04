import React from 'react';
import { Button } from 'antd';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';
import './style.css';

function ItemCompany({ idCompany, nameCompany, logoCompany, establish }) {
  const navigate = useNavigate();

  const redirectUrl = _url => () => {
    navigate(_url);
  };

  const convertTime = _time => {
    const date = new Date(_time);
    const timeZone = 'Asia/Saigon';
    const zonedDate = utcToZonedTime(date, timeZone);
    const pattern = 'dd-MM-yyyy';
    const output = format(zonedDate, pattern, { timeZone: timeZone });
    return output;
  };

  return (
    <div className="item-company">
      <div className="wrapper-item-company-image">
        <img className="item-company-logo" src={logoCompany} alt={nameCompany} />
      </div>
      <p className="item-company-name">{nameCompany}</p>
      <p className="item-company-establish">
        <span>Ngày thành lập</span>
        {convertTime(establish)}
      </p>
      <div className="item-company-btn">
        <Button type="primary" onClick={redirectUrl(`/cong-ty/${idCompany}`)}>
          Xem giới thiệu
        </Button>
      </div>
    </div>
  );
}

export default ItemCompany;
