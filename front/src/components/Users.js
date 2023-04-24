import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.js";
import { Button } from "react-bootstrap";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    //const {setNotification} = useStateContext();

    console.log('hola desde Usersss')
  
    useEffect(() => {
      getUsers();
    }, [])
  
    const onDelete = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
          return
        }
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            //setNotification('User was successfully deleted')
            getUsers()
          })
    }
  
    const getUsers = () => {
      setLoading(true)
      axiosClient.get('/users')
        .then(({ data }) => {
          setLoading(false)
          setUsers(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  
    return (
      <div>
        <div>
            <h1>Users</h1>
            <Button as={Link} to="/users/new" variant="primary">Add new</Button>
            <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Button as={Link}  to={'/users/' + u.id} variant="warning">Edit</Button>
                  &nbsp;
                  <Button as={Link} onClick={ev => onDelete(u)} variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
        </div>
      </div>
    )
  }