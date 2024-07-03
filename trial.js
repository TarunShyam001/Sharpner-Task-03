async function handleFormSubmit(event) {
  event.preventDefault();
  const title = event.target.title.value;
  const description = event.target.description.value;

  try {
    let res = await axios.get("https://crudcrud.com/api/104065203a09452890d9eceb3461eafb/appointmentData");
    const count = res.data.length;
    const booksDetails = {
      title,
      description
    };

    const response = await axios.post("https://crudcrud.com/api/104065203a09452890d9eceb3461eafb/appointmentData", booksDetails);
    displayUserOnScreen(response.data, count+1);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("https://crudcrud.com/api/104065203a09452890d9eceb3461eafb/appointmentData");
    for (let i = 0; i < res.data.length; i++) {
      displayUserOnScreen(res.data[i], res.data.length);
    }
    if(res.data.length === 0){
      const total = document.getElementById('total');
      total.textContent = `Total Counts : ${0}`;

      const show = document.getElementById('showing');
      show.textContent = `Showing : ${0}`;
    }
  } catch (err) {
    console.error(err);
  }
});


 async function displayUserOnScreen(user, count) {
  try{
    const parentNode = document.getElementById('listOfBooks');
    const listItem = document.createElement('li');
    listItem.id = user._id;
    listItem.className = 'book';

    const titleElement = document.createElement('h3');
    titleElement.textContent = user.title;

    const descriptionElement = document.createElement('p');
    // descriptionElement.style.width = '300px';
    descriptionElement.className = 'desc';
    descriptionElement.textContent = user.description;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => deleteUser(user._id));

    listItem.appendChild(titleElement);
    listItem.appendChild(descriptionElement);
    listItem.appendChild(deleteButton);

    parentNode.appendChild(listItem);

    const total = document.getElementById('total');
    total.textContent = `Total Counts : ${count}`;

    const show = document.getElementById('showing');
    show.textContent = `Showing : ${count}`;
  } catch (error) {
    console.error(error);
  }
}


  async function deleteUser(userId) {
    try {
      await axios.delete(`https://crudcrud.com/api/104065203a09452890d9eceb3461eafb/appointmentData/${userId}`);
      removeUserOnScreen(userId);
  
      // Refetch data to get updated count
      const res = await axios.get("https://crudcrud.com/api/104065203a09452890d9eceb3461eafb/appointmentData");
      const count = res.data.length;
  
      // Update UI
      const total = document.getElementById('total');
      total.textContent = `Total Counts : ${count}`;
  
      const show = document.getElementById('showing');
      show.textContent = `Showing : ${count}`;
    } catch (err) {
      console.error(err);
    }
  }
  

  function removeUserOnScreen(userId){
    const parentNode = document.getElementById('listOfBooks');
    const childNodeToBeDel =  document.getElementById(userId);
    if(childNodeToBeDel){
      parentNode.removeChild(childNodeToBeDel);
    }
  }

const filter = document.getElementById('filter');

filter.addEventListener('keyup', function(event) {
  const textEntered = event.target.value.trim().toLowerCase();
  const bookItems = document.getElementsByClassName('book');
  let count = 0;

  for (let i = 0; i < bookItems.length; i++) {
    const currentItemsText = bookItems[i].firstElementChild.textContent.trim().toLowerCase();
    const listItem = bookItems[i];

    if (textEntered.length === 0 || currentItemsText.includes(textEntered)) {
      listItem.style.display = 'flex';
      count++;
    } else {
      listItem.style.display = 'none';
    }
  }

  const show = document.getElementById('showing');
  show.textContent = `Showing : ${count}`;
});


  // Do not touch code below
  module.exports = handleFormSubmit;