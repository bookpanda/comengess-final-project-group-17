import {
  fetchGetCourses,
  fetchGetCourseInfo,
  fetchGetCourseMaterials,
  fetchGetMaterial,
  fetchGetCourseMaterialsLinks,
  fetchGetProfileInfo,
} from './apis/mcvApi/index.js';
import { backendIPAddress, getGroupNumber } from './utils/constants.js';

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};
window.authorizeApplication = authorizeApplication;

const getUserProfile = async () => {
  const data = await fetchGetProfileInfo();
  console.log(data.user);
  document.getElementById(
    'eng-name-info'
  ).innerHTML = `${data.user.title_en} ${data.user.firstname_en} ${data.user.lastname_en}`;
  document.getElementById(
    'thai-name-info'
  ).innerHTML = `${data.user.title_th} ${data.user.firstname_th} ${data.user.lastname_th}`;
};
window.getUserProfile = getUserProfile;

// const getCompEngEssCid = async () => {
//   const options = {
//     method: 'GET',
//     credentials: 'include',
//   };

//   const data = await fetch(
//     `http://${backendIPAddress}/courseville/get_courses`,
//     options
//   )
//     .then((response) => response.json())
//     .catch((error) => console.error(error));

//   const cv_cid = data.data.student.find(
//     (std) => std.course_no === '2110221'
//   ).cv_cid;

//   document.getElementById('ces-cid-value').innerHTML = cv_cid;
// };
// window.getCompEngEssCid = getCompEngEssCid;

const getCourses = async () => {
  const data = await fetchGetCourses();
  const cv_cid_array = data.data.student.map((c) => c.cv_cid);
  cv_cid_array.forEach(async (cv_cid) => {
    await getCourseInfo(cv_cid);
  });
};
window.getCourses = getCourses;

const getCourseInfo = async (cv_cid) => {
  const data = await fetchGetCourseInfo(cv_cid);
  const select = document.getElementById('subject-select');
  select.innerHTML += `<option value="${cv_cid}">${data.data.title}</option>`;

  console.log(data);
};
window.getCourseInfo = getCourseInfo;

const getCourseMaterials = async () => {
  const cv_cid = document.getElementById('subject-select').value;
  const data = await fetchGetCourseMaterials(cv_cid);
  console.log(data);
};
window.getCourseMaterials = getCourseMaterials;

const getMaterial = async () => {
  const item_id = document.getElementById('itemIdInput').value;
  const data = await fetchGetMaterial(item_id);
  console.log(data);
};
window.getMaterial = getMaterial;

const getCourseMaterialsLinks = async () => {
  const cv_cid = document.getElementById('courseIdInput2').value;
  const data = await fetchGetCourseMaterialsLinks(cv_cid);
  console.log(data);
};
window.getCourseMaterialsLinks = getCourseMaterialsLinks;

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};
window.logout = logout;

document.getElementById('group-id').innerHTML = getGroupNumber();
