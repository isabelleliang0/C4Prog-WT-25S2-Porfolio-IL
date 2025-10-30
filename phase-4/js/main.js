    //creates variabe to link html to js
    const bucketCheckbox = document.getElementById('bucketList');
    const hobbyCheckbox = document.getElementById('hobbies');
    const output = document.getElementById('output');
    const categorySelect = document.getElementById('category');
    const getResponseButton = document.getElementById('getResponseButton');



    // Make checkboxes mutually exclusive
    bucketCheckbox.addEventListener('change', () => {
      if (bucketCheckbox.checked) {
        hobbyCheckbox.checked = false;
        categorySelect.value = '';
      }
    });

    hobbyCheckbox.addEventListener('change', () => {
      if (hobbyCheckbox.checked) {
        bucketCheckbox.checked = false;
      } else {
        categorySelect.value = ''; 
      }
    });

    //If nothing ticked, prompt user to do so 
    getResponseButton.addEventListener('click', async () => {
      if (bucketCheckbox.checked) {
        await getBucketList();
      } else if (hobbyCheckbox.checked) {
        await getHobby();
      } else {
        output.textContent = 'Please tick "Bucket List" or "Hobbies"';
      }
    });


    //API functions
    const getHobby = async () => {
      const category = document.getElementById('category').value;
      output.textContent = 'Loading...';
      const response = await fetch(`https://api.api-ninjas.com/v1/hobbies?category=${category}`, {
        method: "GET",
        headers: { 'X-Api-Key': 'mMBPPE4obP8VvyQfMKQRyQ==92WFboAzJFmq0emq' }
      });

      const jsonResponse = await response.json();
      if (jsonResponse) {
        output.textContent = jsonResponse.hobby;
      } else if (jsonResponse.error) {
        output.textContent = `Error: ${jsonResponse.error}`;
      } else {
        output.textContent = "No hobbies found!";
      }
    };

    const getBucketList = async () => {
      output.textContent = 'Loading...';
      const response = await fetch(`https://api.api-ninjas.com/v1/bucketlist`, {
        method: "GET",
        headers: { 'X-Api-Key': 'mMBPPE4obP8VvyQfMKQRyQ==92WFboAzJFmq0emq' }
      });

      const jsonResponse = await response.json();

      if (jsonResponse.item) {
        output.textContent = jsonResponse.item;
      } else if (jsonResponse.error) {
        output.textContent = `Error: ${jsonResponse.error}`;
      } else {
        output.textContent = "No bucket list items found!";
      }
    };