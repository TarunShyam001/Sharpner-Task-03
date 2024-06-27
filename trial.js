async function handleFormSubmit(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
  
    try {
      const res = await axios.get("https://crudcrud.com/api/89b63b3e53144fa084e584fd4f959180/appointmentData");
      let count = res.data.length;
  
      const booksDetails = {
        title,
        description
      };
      const response = await axios.post("https://crudcrud.com/api/89b63b3e53144fa084e584fd4f959180/appointmentData", booksDetails);
  
      displayUserOnScreen(response.data, count);
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
  
    } catch (error) {
      console.error(error);
    }
  }
  
  window.addEventListener("DOMContentLoaded", async () => {
    try {
      const res = await axios.get("https://crudcrud.com/api/89b63b3e53144fa084e584fd4f959180/appointmentData");
      for (let i = 0; i < res.data.length; i++) {
        displayUserOnScreen(res.data[i], res.data.length);
      }
    } catch (err) {
      console.error(err);
    }
  });
  
  
  function displayUserOnScreen(user, count) {
    const parentNode = document.getElementById('listOfBooks');
    const listItem = document.createElement('li');
    listItem.id = user._id;
    listItem.className = 'book';
  
    const titleElement = document.createElement('h3');
    titleElement.textContent = user.title;
  
    const descriptionElement = document.createElement('p');
    descriptionElement.style.width = '300px';
    descriptionElement.textContent = user.description;
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteUser(user._id));
  
    listItem.appendChild(titleElement);
    listItem.appendChild(descriptionElement);
    listItem.appendChild(deleteButton);
  
    parentNode.appendChild(listItem);
  
    const total = document.getElementById('total');
    total.textContent = `Total Counts : ${count}`;
  
    const show = document.getElementById('showing');
    show.textContent = `Showing : ${count}`;
  }
  
  
    async function deleteUser(userId) {
      try {
        await axios.delete(`https://crudcrud.com/api/89b63b3e53144fa084e584fd4f959180/appointmentData/${userId}`);
        removeUserOnScreen(userId);
    
        // Refetch data to get updated count
        const res = await axios.get("https://crudcrud.com/api/89b63b3e53144fa084e584fd4f959180/appointmentData");
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