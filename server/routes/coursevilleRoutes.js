const express = require('express');
const coursevilleController = require('../controller/coursevilleController');

const router = express.Router();

router.get('/auth_app', coursevilleController.authApp);
router.get('/access_token', coursevilleController.accessToken);
router.get('/get_profile_info', coursevilleController.getProfileInformation);
router.get('/get_courses', coursevilleController.getCourses);
router.get('/get_course_info/:cv_cid', coursevilleController.getCourseInfo);
router.get(
  '/get_course_assignments/:cv_cid',
  coursevilleController.getCourseAssignments
);
router.get(
  '/get_course_materials/:cv_cid',
  coursevilleController.getCourseMaterials
);
router.get(
  '/get_course_materials_links/:cv_cid',
  coursevilleController.getCourseMaterialsLinks
);
router.get('/get_material/:item_id', coursevilleController.getMaterial);
router.get('/logout', coursevilleController.logout);

module.exports = router;
