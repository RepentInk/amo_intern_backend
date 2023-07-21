# Isaac Nyarko






# Razak Ayariga






# Razak Adams




# Swanzy
## User Log Service

#### logUserActivity(user_id, action, model)

Logs user activity and returns a formatted log message.

The `logUserActivity` function creates a user log entry and stores it in the `userLogs` array. It then returns a formatted log message based on the provided `user_id`, `action`, and `model`.


### Order Items API Documentation

Create Order Items
URL: POST /orderItems
Params: order_id (number)
Body: Array of objects containing item_id (number), quantity (number), and price (number)
Description: Creates multiple order items for a specific order.
Response: Success message along with the details of the created order items.

Get All Order Items
URL: GET /orderItems
Description: Retrieves all order items.
Response: Success message along with an array of order items.

Get Order Item by ID
URL: GET /orderItems/:order_item_id
Params: order_item_id (number)
Description: Retrieves a single order item by its ID.
Response: Success message along with the details of the found order item if it exists; otherwise, a message indicating that the order item was not found.

Edit Order Items
URL: PATCH /orderItems/:order_id
Params: order_id (number)
Body: Array of objects containing id (number) of the order items to edit, and optional fields to update: item_id (number), quantity (number), and price (number)
Description: Edits multiple order items of a specific order.
Response: Success message along with the details of the updated order items.

Delete Order Items by Order ID
URL: DELETE /orderItems/:order_id
Params: order_id (number)
Description: Deletes all order items belonging to a specific order.
Response: Success message along with the details of the deleted order items if any were found; otherwise, a message indicating that no order items were found for the given order ID.


# Momo






# Emmanuel Darko
<!-- Customers -->
## 1. Create Customer
* route = [POST] localhost:3000/customers/
* shape = {
  "name": "Kode",
  "phone_number": "+23320445773",
  "gender": "male",
  "email": "candletech@gmail.com",
  "organization": "Candle Technologies",
  "created_at": "Tue Jul 18 2023 09:15:23 GMT+0100 (British Summer Time)",
  "deleted_at": "Tue Jul 18 2023 11:15:23 GMT+0100 (British Summer Time)"
}
## 2. Get All Customers
* route = [GET] localhost:3000/customers/
## 3. Get One Customer
* route = [GET] localhost:3000/customers/{id}
## 4. Update One Customer
* route = [PUT] localhost:3000/customers/{id}
## 5. Delete One Customer
* route = [DELETE] localhost:3000/customers/{id}





# Calvin 






# Alfred
