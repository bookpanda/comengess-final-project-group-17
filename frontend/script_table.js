import { dbGetCourseMaterials } from './apis/dbApi/index.js';
document.getElementById("command1").style.display ="none";
document.getElementById("add-block").style.display ="none";



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
          <input type="checkbox" id="${mat.item_id}" name="${mat.item_id}" value="${mat.item_id}" class="checkbox"  checked>
        </td>
        <td>
          <img class="material-icon" alt="icon" src="${mat.thumbnail}" />
        </td>
        <td>
          ${mat.title}
        </td>
        <td>
          ${mat.item_id}
        </td>
      </tr>
      `;
  });
  document.getElementById("command1").style.display ="";
  document.getElementById("add-block").style.display ="";

  
};
window.createMaterialsTable = createMaterialsTable;
