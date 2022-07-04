import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwitchRoute from 'routes/index';
import { openNotificationWithIcon } from 'utils';
import { setAlert } from 'store/reducers/notificationSlice';
import 'antd/dist/antd.min.css';
import './App.less';

function App() {
  const dispatch = useDispatch();
  const { notifies } = useSelector(state => state.notificationSlice);
  useEffect(() => {
    if (notifies.length > 0) {
      openNotificationWithIcon(notifies[0]?.type, notifies[0]?.message);
      dispatch(setAlert([]));
    }
  }, [notifies, dispatch]);

  return (
    <>
      <SwitchRoute />
    </>
  );
}

export default App;
