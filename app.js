// Search Button click and action happend code
document.getElementById('search-btn').addEventListener('click', getData => {
        const search_input = document.getElementById('search-input-text');
        fetch(`https://openapi.programming-hero.com/api/phones?search=${search_input.value}`)
            .then(response => response.json())
        .then(data => { createData(data.data), falseChecker(data.status) })
    // Search keyword true or false check 
        const falseChecker = isFlase => {
            if (isFlase === false) {
                const errDiv = document.createElement('div');
                errDiv.classList.add('w-100','bg-danger','mt-5');
                errDiv.innerHTML = `
                <h1 class="text-white mt-5 fw-bold text-center">Your Search Keyword do not match with any items!</h1>`;
                document.getElementById('rowForMobileItemsShow').appendChild(errDiv);
            }
    }
    // Previous search result clear code 
        document.getElementById('rowForMobileItemsShow').innerHTML = '';
});
// Start Dom creation and search result show code
const createData = dataperameter => {
    showItemNumStart = 0;
    showItemNumEnd = 20;
    showItemClassName = '';
// If Search result more then 20, than prevent to show the more result code 
    if (dataperameter.length <= 20) {
        showItemNumEnd = 20;
        document.getElementById('show-more-btn').setAttribute("class", "d-none btn btn-primary");
    } else if (dataperameter.length > 20) {
        showItemNumEnd = 20;
        document.getElementById('show-more-btn').removeAttribute("class", "d-none btn btn-primary");
    }
    // Matched keyword result items creation code 
    dataperameter.slice(showItemNumStart,showItemNumEnd).forEach(phone => {
        fetch(`https://openapi.programming-hero.com/api/phone/${phone.slug}`)
            .then(response => response.json())
            .then(dataIs => slugData(dataIs.data))
            
        const row_div = document.getElementById('rowForMobileItemsShow');
        const createDataDiv = document.createElement('div');
        // code for details data start
        createDataDiv.classList.add('col');
        const slugData = slugDataIs => {
            let releaseDateIs = '';
            if (slugDataIs.releaseDate != '') {
                releaseDateIs = slugDataIs.releaseDate;
            } else {
                releaseDateIs = "Not included.";
            }
            createDataDiv.innerHTML = `
            <div class="card cardDetail">
                <img src="${phone.image}" style="width: 60%;" class="card-img-top mx-auto pt-3" alt="${phone.slug}">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <h6 class="card-title">Brand: ${phone.brand}</h6>
                    <button id="${phone.slug}" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="${'#idis' + phone.slug.slice(-5)}">Details</button>
                </div>
            </div>
            <!-- Details modal popup -->
            <div class="modal fade" id="${'idis' + phone.slug.slice(-5)}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${phone.phone_name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="row row-cols-1 row-cols-md-1 g-4">
            <div class="col col-md">
                <div class="card" style="border:none;">
                    <img src="${phone.image}" style="width: 60%; height: 50%;" class="card-img-top details-img mx-auto" alt="${phone.slug}">
                </div>
            </div>
            <div class="col col-md">
            <div class="card" id="">
                    <div class="card-body">
                    <h5 class="card-title fw-bold" id="${'rlsdate' + phone.slug.slice(-5)}">Release Date: <span class="fw-normal">${slugDataIs.releaseDate}</span></h5>
                    <div>
                        <h6 class="card-title fw-bold">Features:</h6>
                            <ul class="list-group" id="${'mainfeature'+phone.slug.slice(-5)}"></ul>
                        <h6 class="card-title fw-bold">Others:</h6>
                            <ul class="list-group" id="${'others'+phone.slug.slice(-5)}"></ul>
                    </div>
                    <button type="button" class="btn btn-primary my-3">Buy</button>
                </div>
        </div>
    </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
        </div>
        </div>
        </div>`;
        }
        row_div.appendChild(createDataDiv);
    });
// Details button click and details show code
    const onClick = (event) => {
        if (event.target.nodeName === 'BUTTON' && (event.target.innerText == 'Details')) {
            if (document.getElementById(`${'mainfeature' + event.target.id.slice(-5)}`).innerText.length == 0) {
                let slugIs = `https://openapi.programming-hero.com/api/phone/${event.target.id}`;
                fetch(slugIs)
                    .then(response => response.json())
                    .then(data => {
                        featureDataFunc(data.data);
                    })
// Details Validation code
                const featureDataFunc = dataSet => {
                    if (dataSet.mainFeatures == undefined || dataSet.mainFeatures == null) {
                            const li = document.createElement('li');
                            li.classList.add('list-group-item');
                            li.innerHTML = `<p style="font-size:14px;" class="h6">Not include yet.</p>`;
                            document.getElementById(`${'mainfeature' + event.target.id.slice(-5)}`).appendChild(li);
                    }
                    if (dataSet.mainFeatures != undefined || dataSet.mainFeatures != null) {
                        for (const [key, value] of Object.entries(dataSet.mainFeatures)) {
                            const li = document.createElement('li');
                            li.classList.add('list-group-item');
                            li.innerHTML = `<p style="font-size:14px;" class="h6"><span class="fw-bold">${key.toUpperCase()}:</span> ${value}</p>`;
                            document.getElementById(`${'mainfeature' + event.target.id.slice(-5)}`).appendChild(li);
                        }
                    }

                    if (dataSet.others == undefined || dataSet.others == null) {
                            const li = document.createElement('li');
                            li.classList.add('list-group-item');
                            li.innerHTML = `<p style="font-size:14px;" class="h6">Not include yet.</p>`;
                            document.getElementById(`${'others' + event.target.id.slice(-5)}`).appendChild(li);
                    }
                    if (dataSet.others != undefined || dataSet.others != null) {
                        for (const [key, value] of Object.entries(dataSet.others)) {
                            const li = document.createElement('li');
                            li.classList.add('list-group-item');
                            li.innerHTML = `<p style="font-size:14px;" class="h6"><span class="fw-bold">${key}:</span> ${value}</p>`;
                            document.getElementById(`${'others' + event.target.id.slice(-5)}`).appendChild(li);
                        }
                    }
                }
            } else {
                return;
            }
            }
        }
        window.addEventListener('click', onClick);
}