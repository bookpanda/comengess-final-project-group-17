import { dbGetCourseMaterials } from './apis/dbApi/index.js';

export const createMaterialsTable = async () => {
  const table_body = document.getElementById('main-table-body');
  table_body.innerHTML = '';
  const cv_cid = document.getElementById('subject-select').value;

  const data = await dbGetCourseMaterials(cv_cid);
  console.log(data);

  const table = document.getElementById('main-table-body');

  data.Items.map((mat) => {
    table.innerHTML += `<tr>
        <td>
          ${mat.item_id}
        </td>
        <td>
          <input type="checkbox" id="${mat.item_id}" name="${mat.item_id}" value="${mat.item_id}" checked>
        </td>
        <td>
          <img class="material-icon" alt="icon" src="${mat.thumbnail}" />
        </td>
        <td>
          ${mat.title}
        </td>
      </tr>
      `;
  });
};
window.createMaterialsTable = createMaterialsTable;
