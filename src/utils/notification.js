import { notification } from 'antd';

const openNotificationWithIcon = (type, title, des) => {
  notification[type]({
    message: title,
    description: des,
    duration: 10
  });
};

export default openNotificationWithIcon;
