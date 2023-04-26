import { backendIPAddress, getGroupNumber } from './utils/contants.js';

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};
window.authorizeApplication = authorizeApplication;

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
window.getUserProfile = getUserProfile;

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
window.getCompEngEssCid = getCompEngEssCid;

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
window.getCourses = getCourses;

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
window.getCourseInfo = getCourseInfo;

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
window.getCourseMaterials = getCourseMaterials;

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
window.getMaterial = getMaterial;

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
window.getCourseMaterialsLinks = getCourseMaterialsLinks;

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
window.createCompEngEssAssignmentTable = createCompEngEssAssignmentTable;

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};
window.logout = logout;

document.getElementById('group-id').innerHTML = getGroupNumber();
