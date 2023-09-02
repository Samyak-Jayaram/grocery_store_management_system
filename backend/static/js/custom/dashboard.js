$(function () {
    //Json data by api call for order table
    $.get(orderListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                totalCost += parseFloat(order.total);
                table += '<tr>' +
                    '<td>'+ order.datetime +'</td>'+
                    '<td>'+ order.order_id +'</td>'+
                    '<td>'+ order.customer_name +'</td>'+
                    '<td>'+ order.total.toFixed(2) +' Rs</td></tr>';
            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const viewOrdersButton = document.getElementById("view_orders_button");
    const orderTableBody = document.querySelector(".table-bordered tbody"); // Select the tbody element of the table

    viewOrdersButton.addEventListener("click", function () {
        const selectedDate = document.getElementById("date_of_joining").value;
        fetchOrders(selectedDate);
    });

    function fetchOrders(selectedDate) {
        fetch(`/api/getOrdersByDate/${selectedDate}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Add this line to log the received JSON data
            // Display order details in the orderDetailsDiv
            orderDetailsDiv.innerHTML = JSON.stringify(data, null, 2);
                // Clear the existing table rows
                orderTableBody.innerHTML = '';

                // Display order details in the table
                data.forEach(order => {
                    const row = `
                        <tr>
                            <td>${order.datetime}</td>
                            <td>${order.order_id}</td>
                            <td>${order.customer_name}</td>
                            <td>${order.total.toFixed(2)} Rs</td>
                        </tr>`;
                    orderTableBody.insertAdjacentHTML('beforeend', row);
                });
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
            });
    }
});
