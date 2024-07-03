fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
        let tblCountries = document.getElementById("tbl");

        let tblBody = `<thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Flag</th>
                        </tr>
                    </thead><tbody>`;

        data.forEach(element => {
            tblBody += `<tr>
                            <td>${element.name.common}</td>
                            <td><img src="${element.flags.png}" alt="${element.name.common} flag" width="50"></td>
                        </tr>`;
        });

        tblBody += `</tbody>`;
        tblCountries.innerHTML = tblBody;
    })
    .catch(error => console.error('Error fetching country data:', error));

function searchCountry() {
    let searchValue = document.getElementById("txtSearchValue").value;

    let officialName = document.getElementById("officialName");
    let name = document.getElementById("name");
    let img = document.getElementById("img");

    if (!searchValue) {
        alert('Please enter a country name');
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Country not found');
            }
            return res.json();
        })
        .then(data => {
            const country = data[0];
            officialName.innerText = country.name.official;
            name.innerText = country.name.common;
            img.innerHTML = `<img src="${country.flags.png}" alt="${country.name.common} flag">`;
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            alert('Country not found or an error occurred');
        });
}
