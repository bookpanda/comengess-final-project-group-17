// TODO #4.0: Change this IP address to EC2 instance public IP address when you are going to deploy this web application
const backendIPAddress = '10.201.236.173:3000';

let itemsData;

// TODO #2.1: Edit group number
const getGroupNumber = () => {
  return 35;
};

// TODO #2.2: Show group members
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
        // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
        // member_dropdown.innerHTML += `${member_list}`;
        member_dropdown.innerHTML += `
          <option value='${member.full_name}'>${member.full_name}</option>
            `;
        // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
      });
    })
    .catch((error) => console.error(error));
};

// TODO #2.3: Send Get items ("GET") request to backend server and store the response in itemsData variable
const getItemsFromDB = async () => {
  const options = {
    method: 'GET',
    credentials: 'include',
  };
  itemsData = await fetch(`http://${backendIPAddress}/items`, options)
    .then((r) => r.json())
    .catch((err) => console.error(err));
};

// TODO #2.4: Show items in table (Sort itemsData variable based on created_date in ascending order)
const showItemsInTable = (itemsData) => {
  const table_body = document.getElementById('main-table-body');
  table_body.innerHTML = '';
  // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
  itemsData.sort((a, b) => a.created_date - b.created_date);
  // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
  itemsData.map((item) => {
    // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
    table_body.innerHTML += `
        <tr id="${item.item_id}">
            <td>${item.item}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><button class="delete-row" onclick="deleteItem('${item.item_id}')">ลบ</button></td>
        </tr>
        `;
    // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
  });
};

// TODO #2.5: Send Add an item ("POST") request to backend server and update items in the table
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

// TODO 2.6: Send Delete an item ("DELETE") request to backend server and update items in the table
const deleteItem = async (item_id) => {
  await fetch(`http://${backendIPAddress}/items/${item_id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  redrawDOM();
};

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

document.getElementById('group-no').innerHTML = getGroupNumber();

document.addEventListener('DOMContentLoaded', async function (event) {
  console.log('Showing group members.');
  await showGroupMembers();
  console.log('Showing items from database.');
  await getItemsFromDB();
  showItemsInTable(itemsData);
});
