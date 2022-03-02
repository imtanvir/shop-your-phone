
document.getElementById('search-btn').addEventListener('click', getData => {
    const search_input = document.getElementById('search-input-text');
    fetch(`https://openapi.programming-hero.com/api/phones?search=${search_input.value}`)
        .then(response => response.json())
        .then(data => createData(data.data))      
});

const createData = dataperameter => {
    // console.log(dataperameter.data[0]);
    dataperameter.forEach(phone => {
        const row_div = document.getElementById('rowid');
        const createDataDiv = document.createElement('div');
        // code for details data start
        const phone_details_url = `https://openapi.programming-hero.com/api/phone/${phone.slug}`;
        fetch(phone_details_url)
        .then(response => response.json())
            .then(detailsData => detailsGetdata(detailsData))
        const detailsGetdata = detailData => {
            dataSet = detailData.mainFeatures;
        }
        createDataDiv.classList.add('col');
        createDataDiv.innerHTML =`
        <div class="card">
            <img src="${phone.image}" style="width: 60%;" class="card-img-top mx-auto pt-3" alt="phone_photo">
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.phone_name}</h5>
                <h6 class="card-title">Brand: ${phone.brand}</h6>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#detailsbtn">Details</button>
            </div>
        </div>

<!-- Details model popup -->
<div class="modal fade" id="detailsbtn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<div class="row row-cols-1 row-cols-md-1 g-4">
      <div class="col col-md">
        <div class="card" style="border:none;">
              <img src="apple-iphone-13-pro-max.jpg" style="width: 60%; height: 50%;" class="card-img-top" alt="...">
        </div>
      </div>
      <div class="col col-md">
      <div class="card">
            <div class="card-body">
                <h5 class="card-title">Release Date:</h5>
                <div>
                    <h6 class="card-title">Features:</h6>
                    <ul class="list-group" id="features_details">
                        <!-- foreEach loop  -->
                        <li class="list-group-item"></li>
                    </ul>
                    
                    <h6 class="card-title">Sensors:</h6>
                    <ul class="list-group">
                        <!-- foreEach loop  -->
                        <li class="list-group-item"></li>
                    </ul>
                    
                    <h6 class="card-title">Others:</h6>
                    <ul class="list-group">
                            <!-- foreEach loop  -->
                            <li class="list-group-item"></li>
                    </ul>
                </div>
                <button type="button" class="btn btn-primary">Buy</button>
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
        row_div.appendChild(createDataDiv);
            // for (const [key, value] of Object.entries(dataSet)) {
            //     const li = createElement('li');
            //     li.innerHTML = `${key}: ${value}`;
            //     document.getElementById('features_details').appendChild(li);
            // }
    })
}