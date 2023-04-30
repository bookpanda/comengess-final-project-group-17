import { dbGetCourseMaterials } from './apis/dbApi/index.js';
document.getElementById("command1").style.display = "none";
document.getElementById("add-block").style.display = "none";
document.getElementById("checkall-container").style.display = "none";




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
          <input type="checkbox" id="${mat.item_id}" name="${mat.item_id}" value="${mat.item_id}" class="checkbox">
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
  document.getElementById("command1").style.display = "";
  document.getElementById("add-block").style.display = "";
  document.getElementById("checkall-container").style.display = "flex";
  CheckAll();

  var des = document.getElementById('add-describe');
  des.innerText = "Don't find any material? Try this."
};
window.createMaterialsTable = createMaterialsTable;

function CheckAll(){
  // Get all the checkboxes in the table
  var checkboxes = document.querySelectorAll("table input[type='checkbox']");

  // Get the "select all" checkbox
  var selectAllCheckbox = document.getElementById("select-all-checkbox");

  // Add a change event listener to the "select all" checkbox
  selectAllCheckbox.addEventListener("change", function() {
    // Toggle each checkbox in the table based on the "select all" checkbox state
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });

  // Add a change event listener to each checkbox in the table
 checkboxes.forEach(function(checkbox) {
 checkbox.addEventListener("change", function() {
   // Set the "select all" checkbox state based on the state of the other checkboxes
   selectAllCheckbox.checked = checkboxes.length === document.querySelectorAll("table input[type='checkbox']:checked").length;
 });
});

}
