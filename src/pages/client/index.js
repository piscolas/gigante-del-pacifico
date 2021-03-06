import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { RiUserAddFill } from 'react-icons/ri';
import { useHistory } from "react-router-dom";
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import api from '../../utils/api';

function Client() {
  const [clientList, setClientList] = useState([]);
  const [rol, setRol] = useState("");
  const [name, setName] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [idClient, setIdClient] = useState("");
  const history = useHistory();

  function clearField() {
    window.location.reload();
  }

  function changeStates(client) {
    setRol(client.rol);
    setName(client.name);
    setIsActive(client.active);
    setIdClient(client.id)
  }

  function onSubmit(event) {
    event.preventDefault()

    const data = {
      rol,
      name,
      operatorId
    }

    api.post('/clients', data).then(response => {
      console.log(response.status)

      if (response.status === 201) {
        clearField()
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
      name,
      rol,
      operatorId,
      active: isActive
    }

    api.put(`/clients/${idClient}`, data).then(response => {
      console.log(response.status)

      if (response.status === 200) {
        clearField()
      } else {
        alert('Datos incorrectos');
      }
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    const userLevel = localStorage.getItem('level');
    if (userLevel === 'admin') {
      api.get('/clients/689f56d8-3130-4e45-a223-eb5f0cf6c723').then(res => {
        setClientList(res.data.data);
      }).catch(err => {
        console.log(err)
      })

      setOperatorId("689f56d8-3130-4e45-a223-eb5f0cf6c723")
    } else {
      history.push('/');
    }
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <Sidebar />

      <div className='content-wrapper d-flex justify-content-center'>
        <div className='w-75 mt-5'>
          <div className='text-center d-flex  justify-content-between m-3'>
            <h5>Cliente</h5>

            <button type="button" className="" data-bs-toggle="modal" data-bs-target="#myModal">
              <RiUserAddFill size="30px" />
            </button>

            {/*Modal*/}
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h4 className="modal-title">Create Client</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body">
                    <Form className="form" onSubmit={onSubmit} >
                      <Form.Group className="mb-3 text-left" controlId="formRol">
                        <Form.Label>Rut</Form.Label>
                        <Form.Control type="text" placeholder="Rut" onChange={res => setRol(res.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3 text-left" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" onChange={res => setName(res.target.value)} />
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
                <th>Id</th>
                <th>Nombre</th>
                <th>Rut</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clientList?.map((client) => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.rol}</td>
                  <td>{client.active ? "Activo" : "No activo"}</td>
                  <td>
                    <Button
                      data-bs-toggle="modal"
                      data-bs-target="#myModalUpdate"
                      onClick={() => { changeStates(client) }}
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
                <Form.Group className="mb-3 text-left" controlId="formRol">
                  <Form.Label>Rut</Form.Label>
                  <Form.Control type="text" placeholder="Rut" defaultValue={rol} onChange={res => setRol(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Nombre" defaultValue={name} onChange={res => setName(res.target.value)} />
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

export default Client;