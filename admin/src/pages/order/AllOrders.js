import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../../utils/config";
import AdminPanel from "../../containers/AdminPanel";
import OrderTable from "../../components/order/OrderTable";
import DeleteOrder from "../../components/order/DeleteOrder";
import EditOrder from "../../components/order/EditOrder";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const fetchData = async () => {
    const res = await axios.get(endpoint.getAllOrders, {
      withCredentials: true,
    });
    setOrders(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(endpoint.orderById(id), {
      withCredentials: true,
    });
    setShowDelete(false);
    fetchData();
  };

  const handleUpdate = async (updatedOrder) => {
    await axios.put(endpoint.orderById(updatedOrder._id), updatedOrder, {
      withCredentials: true,
    });
    setShowEdit(false);
    fetchData();
  };

  return (
    <AdminPanel>
      <div className="min-h-screen flex items-start justify-center py-10">
        <div className="w-full rounded-lg shadow-gray-500 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-tr from-gray-4000 to-slate-400 py-2 px-4 flex justify-between items-center">
            <h2 className="text-3xl text-blue-950 font-extrabold text-center py-4 font-serif">
              Liste des Commandes
            </h2>
          </div>
          <div className="md:block">
            <OrderTable
              orders={orders}
              onEdit={(order) => {
                setSelectedOrder(order);
                setShowEdit(true);
              }}
              onDelete={(order) => {
                setSelectedOrder(order);
                setShowDelete(true);
              }}
            />
          </div>
        </div>
        {showDelete && (
          <DeleteOrder
            order={selectedOrder}
            onDelete={handleDelete}
            onCancel={() => setShowDelete(false)}
          />
        )}
        {showEdit && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <EditOrder
              order={selectedOrder}
              onUpdate={handleUpdate}
              onClose={() => setShowEdit(false)}
            />
          </div>
        )}
      </div>
    </AdminPanel>
  );
};

export default AllOrders;
