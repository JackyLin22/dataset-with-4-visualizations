async function loadData(url) {
  try {
    const request = await fetch(url);
    const json = await request.json();
    await displayInfo(json)
    return json;
  } catch(err){
    console.error(err);
  };
}

async function mainThread() {
  const url = "https://data.princegeorgescountymd.gov/resource/p9kn-7u2k.json";
  const dataToShow = await loadData(url);
}

async function displayInfo(json){
  
  console.log("This is the log" + json);
                             
  const agencySet = new Set();
  const agencyArray = [];
  const amountArray = [];

  json.forEach(item => {
    const agency = item.agency;
    const amount = parseFloat(item.amount);

    if (!agencySet.has(agency)) {
      agencySet.add(agency);
      agencyArray.push(agency);
      amountArray.push(amount);
    }
  });
  console.log(agencyArray)
  console.log(amountArray)
  
  // Determine if it's a mobile screen//
  const isMobile = window.innerWidth <= 736;
  
  //Polar Area chart setup//
  const myChart = new Chart ("myChart", {
    type: 'polarArea',
    data: {
      labels: agencyArray,
      datasets: [{
        label: '2014 Fiscal Year Dataset',
        data: amountArray,
        backgroundColor: ['red', 'orange', 'yellow', 'green', 'cyan', 'purple', 'brown', 'white', 'pink', 'black', 'blue', 'crimson', 'maroon', 'teal', 'silver', 'gold', 'violet', 'indigo', 'gray', 'lime', 'olive', 'fuchsia', 'navy', '#ca92fe', '#aff2e6', 'azure', 'turquoise', '#060760', '#25cb00']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
  
  //Bar chart setup//
  const labels = agencyArray
  const data2 = {
    labels: labels,
    datasets: [{
      label: 'Amount paid to Agency',
      data: amountArray,
      backgroundColor: 'red',
      borderColor: 'black',
      borderWidth: 1,
    }]
  };
  
  //Bar chart//
  const bar = new Chart("bar", { 
    type: "bar",
    data: data2,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'string',
          position: 'bottom'
        }
      }  
    }
  });
  
  //Line chart setup//
  const label = agencyArray;
  const data3 = {
    labels: labels,
    datasets: [{
      label: 'Amount paid to Agency',
      data: amountArray,
      fill: false,
      backgroundColor: 'red',
      borderColor: 'rgb(55, 155, 255)',
      tension: 0.1
    }]
  };
  
  //Line chart//
  const line = new Chart("line", { 
    type: "line",
    data: data3,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'string',
          position: 'bottom'
        }
      }  
    }
  });
  
  //pie chart setup//
  const pie = new Chart ("pie", {
    type: 'pie',
    data: {
      labels: agencyArray,
      datasets: [{
        label: 'Agencies',
        data: amountArray,
        backgroundColor: ['red', 'orange', 'yellow', 'green', 'cyan', 'purple', 'brown', 'white', 'pink', 'black', 'blue', 'crimson', 'maroon', 'teal', 'silver', 'gold', 'violet', 'indigo', 'gray', 'lime', 'olive', 'fuchsia', 'navy', '#ca92fe', '#aff2e6', 'azure', 'turquoise', '#060760', '#25cb00'],
        hoverOffset: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await mainThread();
});