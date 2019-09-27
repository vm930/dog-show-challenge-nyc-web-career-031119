document.addEventListener('DOMContentLoaded', () => {
	// console.log('connected?');
	//create dog table
	const tablebodytag = document.querySelector('#table-body');
	const editName = document.querySelector('#name');
	const editBreed = document.querySelector('#breed');
	const editSex = document.querySelector('#sex');

	function getDogs() {
		fetch('http://localhost:3000/dogs').then((res) => res.json()).then((json) => {
			json.forEach((json) => {
				createDogTable(json);
			});
		});
	}
	function createDogTable(dog) {
		tablebodytag.innerHTML += `
        <tr>
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button data-id =${dog.id}>Edit Dog</button>
        </td>
        </tr>
        `;
	}
	getDogs();

	function editDog(clickeddogId) {
		fetch(`http://localhost:3000/dogs/${clickeddogId}`).then((res) => res.json()).then((dog) => {
			editName = dog.name;
			editSex = dog.sex;
			editBreed = dog.breed;
		});
	}

	tablebodytag.addEventListener('click', function(e) {
		if (e.target.innertext === 'Edit Dog') {
			let clickeddogId = parseInt(e.target.dataset.id);
			editDog(clickeddogId);
		}
	});
});
