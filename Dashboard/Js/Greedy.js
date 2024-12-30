function calculateKnapsack() {
    const value1 = parseInt(document.getElementById("value1").value);
    const weight1 = parseInt(document.getElementById("weight1").value);
    const value2 = parseInt(document.getElementById("value2").value);
    const weight2 = parseInt(document.getElementById("weight2").value);
    const value3 = parseInt(document.getElementById("value3").value);
    const weight3 = parseInt(document.getElementById("weight3").value);
    const capacity = parseInt(document.getElementById("capacity").value);
    const ratio1 = value1 / weight1;
    const ratio2 = value2 / weight2;
    const ratio3 = value3 / weight3;

    document.getElementById("ratio1").innerText = ratio1.toFixed(1);
    document.getElementById("ratio2").innerText = ratio2.toFixed(1);
    document.getElementById("ratio3").innerText = ratio3.toFixed(1);

  
    const items = [
        { id: 'item1', value: value1, weight: weight1, ratio: ratio1 },
        { id: 'item2', value: value2, weight: weight2, ratio: ratio2 },
        { id: 'item3', value: value3, weight: weight3, ratio: ratio3 }
    ];

    
    items.sort((a, b) => b.ratio - a.ratio);

    let totalValue = 0;
    let usedCapacity = 0;

    
    items.forEach(item => {
        if (usedCapacity + item.weight <= capacity) {
            usedCapacity += item.weight;
            totalValue += item.value;
            document.getElementById(item.id).style.visibility = 'visible'; // Show the selected items
        } else {
            document.getElementById(item.id).style.visibility = 'hidden'; // Hide the items that don't fit
        }
    });


    document.getElementById("usedCapacity").innerText = `Used Capacity: ${usedCapacity} / ${capacity}`;
    document.getElementById("totalValue").innerText = `Total Value: ${totalValue}`;
}
