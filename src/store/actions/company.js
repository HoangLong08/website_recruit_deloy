import { createAsyncThunk } from '@reduxjs/toolkit';
import company from 'store/api/company';
import { createAlert } from 'store/reducers/notificationSlice';

const getCompanyAction = createAsyncThunk('company/getCompanyAction', async (params, thunkAPI) => {
  try {
    const { pageSize, pageIndex, companyCode, companyName, companyAddress, companyService } = params;
    const dataCompanies = await company
      .search(pageSize, pageIndex, companyCode, companyName, companyAddress, companyService)
      .then(response => {
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

const getDetailCompanyAction = createAsyncThunk('company/getDetailCompanyAction', async (params, thunkAPI) => {
  try {
    const { idCompany } = params;
    const dataCompanies = await company.detail(idCompany).then(response => {
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

const getCompanyByIdUserAction = createAsyncThunk('company/getCompanyByIdUserAction', async (params, thunkAPI) => {
  try {
    const { idUser } = params;
    const dataCompanies = await company.getCompanyByIdUserApi(idUser).then(response => {
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

const createCompanyAction = createAsyncThunk('company/createCompanyAction', async (params, thunkAPI) => {
  try {
    const {
      logoCompany,
      nameCompany,
      websiteCompany,
      addressCompany,
      totalEmployee,
      serviceCompany,
      estCompany,
      introCompany
    } = params;
    const dataCompanies = await company
      .createCompanyApi(
        logoCompany,
        nameCompany,
        websiteCompany,
        addressCompany,
        totalEmployee,
        serviceCompany,
        estCompany,
        introCompany
      )
      .then(response => {
        if (response) {
          thunkAPI.dispatch(
            createAlert({
              message: 'T???o c??ng ty th??nh c??ng',
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
        message: 'T???o c??ng ty th???t b???i',
        type: 'error'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const editCompanyAction = createAsyncThunk('company/editCompanyAction', async (params, thunkAPI) => {
  try {
    const {
      idCompany,
      logoCompany,
      nameCompany,
      websiteCompany,
      addressCompany,
      totalEmployee,
      serviceCompany,
      estCompany,
      introCompany
    } = params;
    const dataCompanies = await company
      .editCompanyApi(
        idCompany,
        logoCompany,
        nameCompany,
        websiteCompany,
        addressCompany,
        totalEmployee,
        serviceCompany,
        estCompany,
        introCompany
      )
      .then(response => {
        if (response) {
          thunkAPI.dispatch(
            createAlert({
              message: 'Ch???nh s???a c??ng ty th??nh c??ng',
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
        message: 'Ch???nh s???a c??ng ty th???t b???i',
        type: 'error'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const deleteCompanyAction = createAsyncThunk('company/deleteCompanyAction', async (params, thunkAPI) => {
  try {
    const { idCompany } = params;
    const res = await company.deleteCompanyApi(idCompany).then(response => {
      if (response) {
        thunkAPI.dispatch(
          createAlert({
            message: 'X??a th??nh c??ng',
            type: 'success'
          })
        );
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    thunkAPI.dispatch(
      createAlert({
        message: 'X??a th???t b???i',
        type: 'success'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

export {
  getCompanyAction,
  getDetailCompanyAction,
  getCompanyByIdUserAction,
  createCompanyAction,
  editCompanyAction,
  deleteCompanyAction
};
