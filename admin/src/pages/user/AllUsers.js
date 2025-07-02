import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../../utils/config";
import UserTable from "../../components/user/UserTable";
import DeleteUser from "../../components/user/DeleteUser";
import EditUser from "../../components/user/EditUser";
import AdminPanel from "../../containers/AdminPanel";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const fetchdata = async () => {
    const res = await axios.get(endpoint.getAllUsers, {
      withCredentials: true,
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(endpoint.userById(id), {
      withCredentials: true,
    });
    setShowDelete(false);
    fetchdata();
  };

  const handleUpdate = async (updatedUser) => {
    await axios.put(endpoint.userById(updatedUser._id), updatedUser, {
      withCredentials: true,
    });
    setShowEdit(false);
    fetchdata();
  };

  return (
    <AdminPanel>
      <div className="min-h-screen flex items-start justify-center py-10">
        <div className="w-full rounded-lg shadow-gray-500 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-tr from-gray-4000 to-slate-400 py-2 px-4 flex justify-between items-center">
            <h2 className="text-3xl text-blue-950 font-extrabold text-center py-4 font-serif">
              Liste des Utilisateur
            </h2>
          </div>
          <div className="md:block">
            <UserTable
              users={users}
              onEdit={(user) => {
                setSelectedUser(user);
                setShowEdit(true);
              }}
              onDelete={(user) => {
                setSelectedUser(user);
                setShowDelete(true);
              }}
            />
          </div>
        </div>
        {showDelete && (
          <DeleteUser
            user={selectedUser}
            onDelete={handleDelete}
            onCancel={() => setShowDelete(false)}
          />
        )}
        {showEdit && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <EditUser
              user={selectedUser}
              onUpdate={handleUpdate}
              onClose={() => setShowEdit(false)}
            />
          </div>
        )}
      </div>
    </AdminPanel>
  );
};

export default AllUsers;
