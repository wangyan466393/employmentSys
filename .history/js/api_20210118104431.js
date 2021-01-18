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
    return request.post(url, params,requestConfig);
  };

  // 登录的API
const loginApi = async (userAccount,userPassword) => {
    const { data } = await requestPost("/user/login", {
        "account":userAccount,
        "password":userPassword
    });
    return data;
  };

//通过用户角色查询学校学生信息
const schoolListDataApi = async (roleId) => {
  const {data} = await requestPost("/student/queryStudent",roleId);
  return data ;
};

  // 分组查看学生列表，单击某个学校查看对应的学生数据
  const studentListDataApi = async (stuPramas) => {
    const {data} = await requestPost("/student/selectStuByCollegeId",stuPramas);
    return data ;
  };

//导出数据
const downloadDataApi = async (sclId) =>{
  return new Promise((resolve,reject)=>{
    request.post('/student/exportExcelAllInfo',sclId,{
      responseType: 'blob'
    }).then(result=>{
      resolve(result.data)
    }).catch(err=>{
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
      if (res.data.status == "ok") {
        alert('上传成功');
      } else {
        alert('上传失败，请重试！');
      }
    });
}

// 点击显示学生详情
const studentDetailApi = async (id)=>{
  const {data} =await request.get(`/student/selectStuById?stuId=${id}`);
  return data;
}
