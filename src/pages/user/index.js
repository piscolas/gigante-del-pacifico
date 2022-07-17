import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { RiUserAddFill } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import api from '../../utils/api';

function User() {
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [idUser, setIdUser] = useState("");

  function changeStates(user) {
    setName(user.name);
    setNickname(user.nickname);
    setPassword(user.password);
    setLevel(user.level);
    setIdUser(user.id)
    setIsActive(user.active);
  }

  function onSubmit(event) {
    event.preventDefault()

    const data = {
      name,
      nickname,
      password,
      level,
      operatorId,
      active: isActive
    }

    api.post('/users', data).then(response => {
      console.log(response.status)

      if (response.status === 201) {
        // history.push('/dashboard');
        console.log(response);
      } else {
        alert('Datos incorrectos');
      }
    }).catch(error => {
      console.log(error);
    })

  }

  function updateClient(event) {
    event.preventDefault()

    const data = {
      operatorId: operatorId,
      name,
      nickname,
      password,
      level,
      active: isActive,
    }

    api.put(`/users/${idUser}`, data).then(response => {
      console.log(response.status)

      if (response.status === 200) {
        // history.push('/dashboard');
        console.log(response);
      } else {
        alert('Datos incorrectos');
      }
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    api.get('/users/689f56d8-3130-4e45-a223-eb5f0cf6c723').then(res => {
      setUserList(res.data.data);
    }).catch(err => {
      console.log(err)
    })

    setOperatorId("689f56d8-3130-4e45-a223-eb5f0cf6c723")
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <Sidebar />

      <div className='content-wrapper d-flex justify-content-center'>
        <div className='w-75 mt-5'>
          <div className='text-center d-flex  justify-content-between m-3'>
            <h5>Usuarios</h5>

            <button type="button" className="" data-bs-toggle="modal" data-bs-target="#myModal">
              <RiUserAddFill size="30px" />
            </button>

            {/*Modal*/}
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h4 className="modal-title">Create User</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body">
                    <Form className="form" onSubmit={onSubmit} >
                      <Form.Group className="mb-3 text-left" controlId="formRol">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" onChange={res => setName(res.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3 text-left" controlId="formName">
                        <Form.Label>Nombre usuario</Form.Label>
                        <Form.Control type="text" placeholder="Nombre usuario" onChange={res => setNickname(res.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3 text-left" controlId="formPassword">
                        <Form.Label>Clave</Form.Label>
                        <Form.Control type="password" placeholder="Clave" onChange={res => setPassword(res.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3 text-left" controlId="formLevel">
                        <Form.Label>Level</Form.Label>
                        <Form.Control type="text" placeholder="Level" onChange={res => setLevel(res.target.value)} />
                      </Form.Group>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                        <Button variant="primary" type="submit">
                          Crear
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Nombre usuario</th>
                <th>Level</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.nickname}</td>
                  <td>{user.level}</td>
                  <td>{user.active ? "Activo" : "No activo"}</td>
                  <td>
                    <Button
                      data-bs-toggle="modal"
                      data-bs-target="#myModalUpdate"
                      onClick={() => { changeStates(user) }}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
        </div>
      </div>
      {/*Modal Update*/}
      <div className="modal" id="myModalUpdate">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Update Client</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <Form className="form" onSubmit={updateClient} >
                <Form.Group className="mb-3 text-left" controlId="formId">
                  <Form.Label>ID</Form.Label>
                  <Form.Control type="text" placeholder="ID" defaultValue={idUser} onChange={res => setName(res.target.value)} disabled />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Nombre" defaultValue={name} onChange={res => setName(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formNickname">
                  <Form.Label>Nombre usuario</Form.Label>
                  <Form.Control type="text" placeholder="Nombre usuario" defaultValue={nickname} onChange={res => setNickname(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formPassword">
                  <Form.Label>Clave</Form.Label>
                  <Form.Control type="password" placeholder="Clave" defaultValue={password} onChange={res => setPassword(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formLevel">
                  <Form.Label>Level</Form.Label>
                  <Form.Control type="text" placeholder="Level" defaultValue={level} onChange={res => setLevel(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left d-flex justify-content-end" controlId="formName">
                  {isActive ? (
                    <Button className="btn btn-danger" onClick={() => {
                      setIsActive(false)
                    }}>Desactivar cuenta</Button>
                  ) : (
                    <Button className="btn btn-secondary" onClick={() => {
                      setIsActive(true)
                    }}>Activar cuenta</Button>
                  )}


                </Form.Group>

                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                  <Button variant="primary" type="submit">
                    Actualizar
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default User;