// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const InventoryDashboard = () => {
//   const [items, setItems] = useState([]);
//   const [lowStockItems, setLowStockItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingItem, setEditingItem] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     itemName: "",
//     department: "",
//     quantity: 0,
//     threshold: 0,
//   });

//   const containerStyle = {
//     fontFamily: "Arial, sans-serif",
//     padding: "20px",
//     minHeight: "100vh",
//     width: "100%",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//   };

//   const statsContainer = {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "20px",
//   };

//   const statBox = {
//     background: "#f8f9fa",
//     padding: "15px",
//     borderRadius: "5px",
//     textAlign: "center",
//     flex: 1,
//     margin: "0 10px",
//   };

//   const tableContainer = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//   };

//   const thStyle = {
//     background: "#007bff",
//     color: "white",
//     padding: "10px",
//     textAlign: "left",
//   };

//   const tdStyle = {
//     padding: "10px",
//     borderBottom: "1px solid #ddd",
//   };

//   const stockTdStyle = {
//     padding: "10px",
//     background: "#d4edda",
//     color: "#155724",
//   };

//   const alertStyle = {
//     background: "#fff3cd",
//     color: "#721c24",
//     padding: "10px",
//     borderRadius: "5px",
//     marginTop: "10px",
//   };

//   const modalStyle = {
//     position: "fixed",
//     top: "20%",
//     left: "30%",
//     width: "40%",
//     padding: "20px",
//     backgroundColor: "white",
//     border: "1px solid black",
//     zIndex: 1000,
//     borderRadius: "10px",
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/items");
//       if (res.data) {
//         setItems(res.data);
//         const lowStock = res.data.filter((item) => item.quantity <= item.threshold);
//         setLowStockItems(lowStock);
//       } else {
//         console.error("Error: No data received");
//       }
//     } catch (err) {
//       console.error("Failed to fetch items:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (item) => {
//     setEditingItem(item._id);
//     setEditFormData({
//       itemName: item.itemName,
//       department: item.department,
//       quantity: item.quantity,
//       threshold: item.threshold,
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/items/${editingItem}`, editFormData);
//       alert("Item updated successfully!");
//       setEditingItem(null);
//       fetchItems();
//     } catch (error) {
//       console.error("Error updating item:", error);
//     }
//   };

//   const handleDeleteClick = async (itemId) => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/items/${itemId}`);
//         alert("Item deleted successfully!");
//         fetchItems();
//       } catch (error) {
//         console.error("Error deleting item:", error);
//       }
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingItem(null);
//   };

//   if (loading) {
//     return <div style={containerStyle}>Loading...</div>;
//   }

//   return (
//     <div style={containerStyle}>
//       <div style={titleStyle}>Inventory Management Dashboard</div>
//       <div style={statsContainer}>
//         <div style={statBox}>
//           <h3>Total Items</h3>
//           <p>{items.length}</p>
//         </div>
//         <div style={statBox}>
//           <h3>Low Stock</h3>
//           <p>{lowStockItems.length}</p>
//         </div>
//         <div style={statBox}>
//           <h3>Pending Orders</h3>
//           <p>--</p>
//         </div>
//         <div style={statBox}>
//           <h3>Recent Audits</h3>
//           <p>--</p>
//         </div>
//       </div>

//       <table style={tableContainer}>
//         <thead>
//           <tr>
//             <th style={thStyle}>Item Name</th>
//             <th style={thStyle}>Category</th>
//             <th style={thStyle}>Stock</th>
//             <th style={thStyle}>Threshold</th>
//             <th style={thStyle}>Last Updated</th>
//             <th style={thStyle}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.length > 0 ? (
//             items.map((item) => (
//               <tr key={item._id}> {/* Ensure each item has a unique key */}
//                 <td style={tdStyle}>{item.itemName}</td>
//                 <td style={tdStyle}>{item.department}</td>
//                 <td style={stockTdStyle}>{item.quantity} units</td>
//                 <td style={tdStyle}>{item.threshold}</td>
//                 <td style={tdStyle}>{item.receiptDate}</td>
//                 <td style={tdStyle}>
//                   <span
//                     role="img"
//                     aria-label="edit"
//                     style={{ cursor: "pointer", marginRight: "10px" }}
//                     onClick={() => handleEditClick(item)}
//                   >
//                     ✏️
//                   </span>
//                   <span
//                     role="img"
//                     aria-label="delete"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => handleDeleteClick(item._id)}
//                   >
//                     🗑️
//                   </span>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={tdStyle}>No items available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {lowStockItems.length > 0 && (
//         <div style={alertStyle}>
//           <center>⚠️ <strong>Low Stock Alert:</strong> {lowStockItems.map(item => item.itemName).join(', ')} is below threshold</center>
//         </div>
//       )}

//       {editingItem && (
//         <div style={modalStyle}>
//           <h2>Edit Item</h2>
//           <form>
//             <label>
//               Item Name: 
//               <input
//                 type="text"
//                 name="itemName"
//                 value={editFormData.itemName}
//                 onChange={handleEditChange}
//               />
//             </label><br /><br />

//             <label>
//               Department: 
//               <input
//                 type="text"
//                 name="department"
//                 value={editFormData.department}
//                 onChange={handleEditChange}
//               />
//             </label><br /><br />

//             <label>
//               Quantity: 
//               <input
//                 type="number"
//                 name="quantity"
//                 value={editFormData.quantity}
//                 onChange={handleEditChange}
//               />
//             </label><br /><br />

//             <label>
//               Threshold: 
//               <input
//                 type="number"
//                 name="threshold"
//                 value={editFormData.threshold}
//                 onChange={handleEditChange}
//               />
//             </label><br /><br />

//             <button type="button" onClick={handleEditSave}>Save</button>&nbsp;
//             <button type="button" onClick={handleCancelEdit}>Cancel</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InventoryDashboard;
