# Isaac Nyarko

# Razak Ayariga

# Razak Adams

# Swanzy

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

# Calvin Asantey

# Alfred
