import { createAsyncThunk } from '@reduxjs/toolkit';
import candidate from 'store/api/candidate';
import { createAlert } from 'store/reducers/notificationSlice';

const getListCvAction = createAsyncThunk('candidate/getListCvAction', async (params, thunkAPI) => {
  try {
    const { idUser } = params;
    const dataCompanies = await candidate.listCv(idUser).then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return dataCompanies;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getSubmitCvAction = createAsyncThunk('candidate/getSubmitCvAction', async (params, thunkAPI) => {
  try {
    const { idJob, title, userName, recruitmentId, subTitle, linkFile } = params;
    const res = await candidate.submitCv(idJob, title, userName, recruitmentId, subTitle, linkFile).then(response => {
      if (response) {
        thunkAPI.dispatch(
          createAlert({
            message: 'Đã gửi cv',
            type: 'success'
          })
        );
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getInfoCandidateByIdUserAction = createAsyncThunk(
  'candidate/getInfoCandidateByIdUserAction',
  async (params, thunkAPI) => {
    try {
      const { idUser } = params;
      const res = await candidate.infoDetailCandidate(idUser).then(response => {
        if (response) {
          return response;
        }
        return {};
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'get error' });
    }
  }
);

const updateInfoCandidateAction = createAsyncThunk('candidate/updateInfoCandidateAction', async (params, thunkAPI) => {
  try {
    const {
      userId,
      userName,
      userGender,
      userPhone,
      userIdCity,
      userIdDistrict,
      userIdStreet,
      userAddress,
      userImage
    } = params;
    const dataCompanies = await candidate
      .updateInfo(
        userId,
        userName,
        userGender,
        userPhone,
        userIdCity,
        userIdDistrict,
        userIdStreet,
        userAddress,
        userImage
      )
      .then(response => {
        if (response) {
          thunkAPI.dispatch(
            createAlert({
              message: 'Cập nhật thành công',
              type: 'success'
            })
          );
          return response;
        }
        return {};
      });
    return dataCompanies;
  } catch (error) {
    thunkAPI.dispatch(
      createAlert({
        message: 'Cập nhật thất bại',
        type: 'error'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const cancelSubmittedCvAction = createAsyncThunk('candidate/cancelSubmittedCvAction', async (params, thunkAPI) => {
  try {
    const { idTransaction } = params;
    const dataCompanies = await candidate.cancelSubmittedCv(idTransaction).then(response => {
      if (response) {
        thunkAPI.dispatch(
          createAlert({
            message: 'Hủy nộp thành công',
            type: 'success'
          })
        );
        return response;
      }
      return {};
    });
    return dataCompanies;
  } catch (error) {
    thunkAPI.dispatch(
      createAlert({
        message: 'Hủy nộp thất bại',
        type: 'error'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const updatePasswordAction = createAsyncThunk('candidate/updatePasswordAction', async (params, thunkAPI) => {
  try {
    const { userId, passwordOld, passwordNew } = params;
    const dataCompanies = await candidate.updatePassword(userId, passwordOld, passwordNew).then(response => {
      if (response) {
        thunkAPI.dispatch(
          createAlert({
            message: 'Cập nhật mật khẩu thành công',
            type: 'success'
          })
        );
        return response;
      }
      return {};
    });
    return dataCompanies;
  } catch (error) {
    thunkAPI.dispatch(
      createAlert({
        message: 'Cập nhật mật khẩu thất bại',
        type: 'error'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getRecodePersonalAction = createAsyncThunk('candidate/getRecodePersonalAction', async (params, thunkAPI) => {
  try {
    const { idUser } = params;
    const dataCompanies = await candidate.getRecodePersonalApi(idUser).then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return dataCompanies;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const updateRecordPersonalAction = createAsyncThunk(
  'candidate/updateRecordPersonalAction',
  async (params, thunkAPI) => {
    try {
      const {
        myInfo,
        skill,
        informatics,
        foreignLanguage,
        certificate,
        nameSchool,
        industry,
        timeBeginLearn,
        timeEndLearn,
        nameCompany,
        jobTitle,
        desJob,
        timeBeginJob,
        timeEndJob,
        isWorking
      } = params;
      const dataCompanies = await candidate
        .updateRecordPersonalApi(
          myInfo,
          skill,
          informatics,
          foreignLanguage,
          certificate,
          nameSchool,
          industry,
          timeBeginLearn,
          timeEndLearn,
          nameCompany,
          jobTitle,
          desJob,
          timeBeginJob,
          timeEndJob,
          isWorking
        )
        .then(response => {
          if (response) {
            thunkAPI.dispatch(
              createAlert({
                message: 'Cập nhật thông tin thành công',
                type: 'success'
              })
            );
            return response;
          }
          return {};
        });
      return dataCompanies;
    } catch (error) {
      thunkAPI.dispatch(
        createAlert({
          message: 'Cập nhật thông tin thất bại',
          type: 'error'
        })
      );
      return thunkAPI.rejectWithValue({ error: 'get error' });
    }
  }
);

export {
  getListCvAction,
  getSubmitCvAction,
  updateInfoCandidateAction,
  getInfoCandidateByIdUserAction,
  cancelSubmittedCvAction,
  updatePasswordAction,
  getRecodePersonalAction,
  updateRecordPersonalAction
};
