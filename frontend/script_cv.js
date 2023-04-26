// TODO #4.0: Change this IP address to EC2 instance public IP address when you are going to deploy this web application
const backendIPAddress = '127.0.0.1:3000';

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

// TODO #3.1: Change group number
const getGroupNumber = () => {
  return 35;
};

// Example: Send Get user profile ("GET") request to backend server and show the response on the webpage
const getUserProfile = async () => {
  const options = {
    method: 'GET',
    credentials: 'include',
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_profile_info`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.user);
      document.getElementById(
        'eng-name-info'
      ).innerHTML = `${data.user.title_en} ${data.user.firstname_en} ${data.user.lastname_en}`;
      document.getElementById(
        'thai-name-info'
      ).innerHTML = `${data.user.title_th} ${data.user.firstname_th} ${data.user.lastname_th}`;
    })
    .catch((error) => console.error(error));
};

// TODO #3.3: Send Get Courses ("GET") request to backend server and filter the response to get Comp Eng Ess CV_cid
//            and display the result on the webpage
const getCompEngEssCid = async () => {
  const options = {
    method: 'GET',
    credentials: 'include',
  };

  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_courses`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  const cv_cid = data.data.student.find(
    (std) => std.course_no === '2110221'
  ).cv_cid;

  document.getElementById('ces-cid-value').innerHTML = cv_cid;
};

const getCourses = async () => {
  const options = {
    method: 'GET',
    credentials: 'include',
  };

  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_courses`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  const cv_cid_array = data.data.student.map((c) => c.cv_cid);

  cv_cid_array.forEach(async (cv_cid) => {
    await getCourseInfo(cv_cid);
  });
};

const getCourseInfo = async (cv_cid) => {
  const options = {
    method: 'GET',
    credentials: 'include',
  };

  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_course_info/${cv_cid}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  const select = document.getElementById('subject-select');

  select.innerHTML += `<option value="${cv_cid}">${data.data.title}</option>`;

  console.log(data);
};

/*const getCourseInfo = async () => {
  //const cv_cid = document.getElementById("courseIdInput0").value;
  const cv_cid = getCourses.cv_cid;
  const options = {
    method: "GET",
    credentials: "include",
  };

  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_course_info/${cv_cid}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

    console.log(data);
}*/

const getCourseMaterials = async () => {
  const cv_cid = document.getElementById('subject-select').value;
  console.log(cv_cid);
  const options = {
    method: 'GET',
    credentials: 'include',
  };

  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_course_materials/${cv_cid}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  console.log(data);
};

const getCourseMaterialsFromDb = async () => {
  const cv_cid = document.getElementById('subject-select').value;
  console.log(cv_cid);
  const options = {
    method: 'GET',
    credentials: 'include',
  };

  const data = await fetch(
    `http://${backendIPAddress}/items/${cv_cid}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  console.log(data);
};

const getMaterial = async () => {
  const item_id = document.getElementById('itemIdInput').value;
  const options = {
    method: 'GET',
    credentials: 'include',
  };

  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_material/${item_id}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  console.log(data);
};

const getCourseMaterialsLinks = async () => {
  const cv_cid = document.getElementById('courseIdInput2').value;
  const options = {
    method: 'GET',
    credentials: 'include',
  };

  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_course_materials_links/${cv_cid}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  console.log(data);
};

const addAllAvailableItems = async () => {
  const cv_cid = document.getElementById('courseIdInput3').value;
  const options = {
    method: 'POST',
    credentials: 'include',
  };

  const data = await fetch(
    `http://${backendIPAddress}/items/add_all/${cv_cid}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  console.log(data);
};

const downloadSelectedItems = async () => {
  const cv_cid = document.getElementById('courseIdInput3').value;
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{ id: 837512 }, { id: 837754 }, { id: 830878 }]),
  };

  const data = await fetch(
    `http://${backendIPAddress}/items/download_selected`,
    options
  )
    .then((res) => res.blob())
    .then((blob) => {
      const file = window.URL.createObjectURL(blob);
      window.location.assign(file);
    })
    .catch((error) => console.error(error));
  // .then((response) => response.json())

  // console.log(data);
  // const fetchOptions = {
  //   headers:{
  //     "Access-Control-Allow-Origin": "*",
  //   }
  // };
  // for(let i=0;i<data.length;i++){
  //   await fetch(data[i], fetchOptions).then( res => res.blob() )
  //   .then( blob => {
  //     var url = window.URL.createObjectURL(blob);
  //     var a = document.createElement('a');
  //     a.href = url;
  //     a.setAttribute("download", "");
  //     // a.target = "_blank"
  //     // a.download = "filename.xlsx";
  //     document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
  //     a.click();
  //     a.remove();
  //   });
  // }
};

// TODO #3.5: Send Get Course Assignments ("GET") request with cv_cid to backend server
//            and create Comp Eng Ess assignments table based on the response (itemid, title)
const createCompEngEssAssignmentTable = async () => {
  const table_body = document.getElementById('main-table-body');
  table_body.innerHTML = '';
  const cv_cid = document.getElementById('ces-cid-value').innerHTML;

  const options = {
    method: 'GET',
    credentials: 'include',
  };

  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_course_assignments/${cv_cid}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  const table = document.getElementById('main-table-body');

  data.data.map((ass) => {
    table.innerHTML += `<tr> 
      <td>
        ${ass.itemid}
      </td> 
      <td>
        ${ass.title}
      </td>
    </tr>
    `;
  });
};

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};

document.getElementById('group-id').innerHTML = getGroupNumber();
