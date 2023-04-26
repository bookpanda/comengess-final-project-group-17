import { backendIPAddress, getGroupNumber } from './utils/contants.js';

let itemsData;

const showGroupMembers = async () => {
  const member_list = document.getElementById('member-list');
  member_list.innerHTML = '';
  const member_dropdown = document.getElementById('name-to-add');
  member_dropdown.innerHTML =
    "<option value='0'>-- เลือกผู้ฝากซื้อ --</option>";
  const options = {
    method: 'GET',
    credentials: 'include',
  };
  await fetch(`http://${backendIPAddress}/items/members`, options)
    .then((response) => response.json())
    .then((data) => {
      const members = data;
      members.map((member) => {
        member_list.innerHTML += `
          <li>${member.full_name}</li>
          `;
        member_dropdown.innerHTML += `
          <option value='${member.full_name}'>${member.full_name}</option>
            `;
      });
    })
    .catch((error) => console.error(error));
};
window.showGroupMembers = showGroupMembers;

const getItemsFromDB = async () => {
  const options = {
    method: 'GET',
    credentials: 'include',
  };
  itemsData = await fetch(`http://${backendIPAddress}/items`, options)
    .then((r) => r.json())
    .catch((err) => console.error(err));
};
window.getItemsFromDB = getItemsFromDB;

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
window.getCourseMaterialsFromDb = getCourseMaterialsFromDb;

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
window.addAllAvailableItems = addAllAvailableItems;

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
window.downloadSelectedItems = downloadSelectedItems;

const showItemsInTable = (itemsData) => {
  const table_body = document.getElementById('main-table-body');
  table_body.innerHTML = '';
  itemsData.sort((a, b) => a.created_date - b.created_date);
  itemsData.map((item) => {
    table_body.innerHTML += `
        <tr id="${item.item_id}">
            <td>${item.item}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><button class="delete-row" onclick="deleteItem('${item.item_id}')">ลบ</button></td>
        </tr>
        `;
  });
};
window.showItemsInTable = showItemsInTable;

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

const deleteItem = async (item_id) => {
  await fetch(`http://${backendIPAddress}/items/${item_id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  redrawDOM();
};
window.deleteItem = deleteItem;

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

document.getElementById('group-no').innerHTML = getGroupNumber();

document.addEventListener('DOMContentLoaded', async function (event) {
  console.log('Showing group members.');
  await showGroupMembers();
  console.log('Showing items from database.');
  await getItemsFromDB();
  showItemsInTable(itemsData);
});
