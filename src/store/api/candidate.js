import instance from 'config/axiosClient';
import authHeader from 'services/authHeader';

const convertISO = _time => {
  const date = new Date(_time);
  const iso = date.toISOString();
  return iso;
};

const candidate = {
  listCv(_idUser) {
    const url = '/api/cv/by-user-id/' + _idUser;
    return instance.get(url, { headers: authHeader() });
  },

  uploadCv(_file) {
    const url = '/upload';
    let formData = new FormData();
    formData.append('file', _file);
    return instance.post(url, formData);
  },

  submitCv(_idJob, _title, _userName, _recruitmentId, _subTitle, _linkFile) {
    const url = '/api/transaction/create';
    return instance.post(
      url,
      {
        jd_id: _idJob,
        jd_title: _title,
        transaction_title: _title,
        transaction_subtitle: _subTitle,
        transaction_cv: _linkFile
      },
      { headers: authHeader() }
    );
  },

  infoDetailCandidate(_idUser) {
    const url = '/api/user/' + _idUser;
    return instance.get(url, { headers: authHeader() });
  },

  updateInfo(
    userId,
    userName,
    userGender,
    userPhone,
    userIdCity,
    userIdDistrict,
    userIdStreet,
    userAddress,
    userImage
  ) {
    const url = '/api/user/update';
    return instance.put(
      url,
      {
        user_id: userId,
        user_name: userName,
        user_gender: userGender,
        user_phone: userPhone,
        user_id_city: userIdCity,
        user_id_district: userIdDistrict,
        user_id_street: userIdStreet,
        user_address: userAddress,
        user_image: userImage
      },
      { headers: authHeader() }
    );
  },

  cancelSubmittedCv(_idTransaction) {
    const url = '/api/transaction/' + _idTransaction;
    return instance.delete(url, {
      headers: authHeader()
    });
  },

  updatePassword(userId, passwordOld, passwordNew) {
    const url = '/api/user/password';
    return instance.put(
      url,
      {
        user_id: userId,
        passwordOld: passwordOld,
        passwordNew: passwordNew
      },
      {
        headers: authHeader()
      }
    );
  },

  getRecodePersonalApi(idUser) {
    const url = '/api/profile/' + idUser;
    return instance.get(url, { headers: authHeader() });
  },

  updateRecordPersonalApi(
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
  ) {
    const url = '/api/profile';
    return instance.put(
      url,
      {
        my_information: myInfo,
        skill: skill,
        office_information: informatics,
        language: foreignLanguage,
        certificate: certificate,
        date_begin: convertISO(timeBeginLearn),
        date_end: convertISO(timeEndLearn),
        school: nameSchool,
        specialized: industry,
        desired_salary: 30000000,
        level_desired: 'Senior 123',
        company: nameCompany,
        position: jobTitle,
        exp_date_begin: convertISO(timeBeginJob),
        exp_date_end: convertISO(timeEndJob),
        is_working: isWorking ? 1 : 0
      },
      {
        headers: authHeader()
      }
    );
  }
};

export default candidate;
