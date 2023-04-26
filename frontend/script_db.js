import {
  dbAddCourseMaterials,
  dbDownloadSelectedMaterials,
  dbGetCourseMaterials,
} from './apis/dbApi/index.js';
import { createMaterialsTable } from './script_table.js';
import { backendIPAddress, getGroupNumber } from './utils/constants.js';

const getCourseMaterialsFromDb = async () => {
  const cv_cid = document.getElementById('subject-select').value;
  const data = await dbGetCourseMaterials(cv_cid);
  console.log(data);
};
window.getCourseMaterialsFromDb = getCourseMaterialsFromDb;

const addCourseMaterialsToDb = async () => {
  const cv_cid = document.getElementById('subject-select').value;
  const data = await dbAddCourseMaterials(cv_cid);
  console.log(data);
  await createMaterialsTable();
};
window.addCourseMaterialsToDb = addCourseMaterialsToDb;

const downloadSelectedItems = async () => {
  const table = document.getElementById('main-table-body').rows;
  console.log(table);
  const body = [];
  for (let i = 0; i < table.length; i++) {
    const inputTag = table[i].getElementsByTagName('input')[0];
    if (inputTag.checked) body.push({ id: inputTag.value });
  }
  console.log(body);
  await dbDownloadSelectedMaterials(body);
};
window.downloadSelectedItems = downloadSelectedItems;

const addItem = async () => {
  const item = document.getElementById('item-to-add').value;
  const name = document.getElementById('name-to-add').value;
  const price = document.getElementById('price-to-add').value;

  await fetch(`http://${backendIPAddress}/items`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item, name, price }),
  });

  redrawDOM();
};
window.addItem = addItem;

// const deleteItem = async (item_id) => {
//   await fetch(`http://${backendIPAddress}/items/${item_id}`, {
//     method: 'DELETE',
//     credentials: 'include',
//   });

//   redrawDOM();
// };
// window.deleteItem = deleteItem;

const redrawDOM = () => {
  window.document.dispatchEvent(
    new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true,
    })
  );
  document.getElementById('item-to-add').value = '';
  document.getElementById('name-to-add').value = '0';
  document.getElementById('price-to-add').value = '';
};
window.redrawDOM = redrawDOM;

// document.getElementById('group-no').innerHTML = getGroupNumber();

// document.addEventListener('DOMContentLoaded', async function (event) {
//   console.log('Showing group members.');
//   await showGroupMembers();
//   console.log('Showing items from database.');
//   await getItemsFromDB();
//   showItemsInTable(itemsData);
// });
