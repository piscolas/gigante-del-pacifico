import { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../styles/Main.css';
import api from '../utils/api';

function Main() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [operatorId, setOperatorId] = useState('');
  const [toast, setToast] = useState("false");
  const [isAlert, setIsAlert] = useState(false);

  let history = useHistory();

  function onSubmit(event) {
    event.preventDefault()

    const data = {
      nickname,
      password,
      operatorId
    }

    try {
      api.post('/login', data).then(response => {
        console.log(response.status)

        if (response.status === 200) {
          localStorage.setItem('nickname', nickname);
          localStorage.setItem('operatorId', operatorId);
          localStorage.setItem('level', response.data.data[0].level);
          localStorage.setItem('idUser', response.data.data[0].id);

          toast.classList.add("bg-success")
          toast.innerHTML = "<Alert variant='success'>Conexión exitosa</Alert>"

          if (response.data.data[0].level === 'admin') {
            history.push('/user/dashboard');
          }
          if (response.data.data[0].level === 'seller') {
            history.push('/seller');
          }
        }
        if (response.status === 401) {
          toast.classList.add("bg-danger")
          toast.innerHTML = "<Alert variant='danger'>Credenciales incorrectas</Alert>"
        }

        if (response.status === 404) {
          toast.classList.add("bg-danger")
          toast.innerHTML = "<Alert variant='danger'>Credenciales incorrectas</Alert>"
        }
      }).catch(error => {
        toast.classList.add("bg-danger")
        toast.innerHTML = "<Alert variant='danger'>Credenciales incorrectas </Alert>"
      })


    } catch (error) {
      console.log(error)
      toast.classList.add("bg-danger")
      toast.innerHTML = "<Alert variant='danger'>Error al intentar ingresar</Alert>"
    }

  }

  useEffect(() => {
    setToast(document.getElementById('headerToast'))
  }, [])

  return (
    <div className="container">
      {isAlert && <Alert></Alert>}
      <div id="headerToast" className='d-flex position-absolute justify-content-center vw-100'>
      </div>
      <div className="columnInfo">
        <span className="logo" >Mi empresa</span>
      </div>

      <div className="columnForm">

        <h1>Login</h1>
        <Form className="form" onSubmit={onSubmit} >
          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>Nick name</Form.Label>
            <Form.Control type="text" placeholder="Nick name" onChange={res => setNickname(res.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" onChange={res => setPassword(res.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicOperatorId">
            <Form.Label>Operador ID</Form.Label>
            <Form.Control type="text" placeholder="Operador ID" onChange={res => setOperatorId(res.target.value)} />
          </Form.Group>

          <div className="d-flex w-100 justify-content-end">
            <Button variant="primary" type="submit" className="btn primary">
              Entrar
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}

export default Main;
