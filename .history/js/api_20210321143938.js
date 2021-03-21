const request = axios.create({
  baseURL: "http://47.95.13.193:80/Job-1.0-SNAPSHOT",
});

// post表单请求
const requestPost = (url, data) => {
  const params = JSON.stringify(data);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  
  return request.post(url, params, requestConfig);
};
// request.interceptors.response.use(
//   res=>{
//     Promise.resolve(res)
//   }
// )
// 登录的API
const loginApi = async (userAccount, userPassword) => {
  const { data } = await requestPost("/user/login", {
    "account": userAccount,
    "password": userPassword
  });
  return data;
};

//通过用户角色查询学校学生信息
const schoolListDataApi = async (roleId) => {
  const { data } = await requestPost("/student/queryStudent", roleId);
  return data;
};

// 分组查看学生列表，单击某个学校查看对应的学生数据
const studentListDataApi = async (stuPramas) => {
  const { data } = await requestPost("/student/selectStuByCollegeId", stuPramas);
  return data;
};

//导出学校数据
const downloadDataApi = async (sclId) => {
  return new Promise((resolve, reject) => {
    request.post('/student/exportExcelAllInfo', sclId, {
      responseType: 'blob'
    }).then(result => {
      resolve(result.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//导出指定学校下的学生数据
const downloadStudentDataApi = async (stuId) => {
  return new Promise((resolve, reject) => {
    request.post('/student/exportExcelStu', stuId, {
      responseType: 'blob'
    }).then(result => {
      resolve(result.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//导入数据
const uploadDataApi = async (fileFormData)=>{
  return request.post("/student/upLoadExcelStu",
     fileFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data,charset=UTF-8",
        }
      }  
    ).then((res) => {
      console.log(res);
      if (res.data == "success") {
        alert('导入成功');
        location.reload() 
      } else {
        alert('导入失败，请重试！');
      }
    });
}
//删除班级
const deleteSclClassApi = async (collegeId,gradeId,className)=>{
  const {data} =await request.get(`/student/deleteClass?collegeId=${collegeId}&gradeId=${gradeId}&banname=${className}`);
  return data;
}
//删除指定学生信息
const deleteStuApi = async (id)=>{
  const {data} =await request.get(`/student/deleteStu?id=${id}`);
  return data;
}
// 点击显示学生详情
const studentDetailApi = async (id) => {
  const { data } = await request.get(`/student/selectStuById?stuId=${id}`);
  return data;
}
// 获取学生头像
const studentAvatarApi = async (id) => {
  const { data } = await request.get(`/student/selectPhoto?id=${id}`);
  return data;
}
// 获取学生工作经历
const studentWorkExperienceApi = async (id) => {
   let {data} = await  request.get(`/student/selectWorkExperience?stuid=${id}`);
   return data;
}
// 点击实现新增
const addWorkExperienceApi = async (studentId,company,positionName,address,jobNumber,salary,salaryRemark,jobDate,leaveDate,cause) => {
  const res = await requestPost("/student/updateJob", {
    "stuId": studentId,
    "company": company,
    "positionName": positionName,
    "address":address,
    "jobNumber":jobNumber,
    "salary": salary,
    "salaryRemark": salaryRemark,
    "jobDate":jobDate,
    "leaveDate":leaveDate,
    "cause":cause
  });
  return res;
};
//修改学生信息
const alterStudentInfo = async()=>{
  const res = await requestPost("/student/updateStu",{
    
  });
  return res;
}