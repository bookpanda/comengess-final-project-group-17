// @ts-check

import { Router } from 'express';
import {
  authApp,
  accessToken,
  getProfileInformation,
  getCourses,
  getCourseInfo,
  getCourseAssignments,
  getCourseMaterials,
  getCourseMaterialsLinks,
  getMaterial,
  logout,
} from '../controller/coursevilleController.js';

const router = Router();

router.get('/auth_app', authApp);
router.get('/access_token', accessToken);
router.get('/get_profile_info', getProfileInformation);
router.get('/get_courses', getCourses);
router.get('/get_course_info/:cv_cid', getCourseInfo);
router.get('/get_course_assignments/:cv_cid', getCourseAssignments);
router.get('/get_course_materials/:cv_cid', getCourseMaterials);
router.get('/get_course_materials_links/:cv_cid', getCourseMaterialsLinks);
router.get('/get_material/:item_id', getMaterial);
router.get('/logout', logout);

export default router;
