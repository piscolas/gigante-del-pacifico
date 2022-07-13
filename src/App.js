import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
import './styles/App.css';
import api from './utils/api';

function App() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [operatorId, setOperatorId] = useState('');

  // const history = useHistory();

  function onSubmit(event) {
    event.preventDefault()

    const data = {
      nickname,
      password,
      operatorId
    }

    api.post('/login', data).then(response => {
      console.log(response.status)

      if (response.status === 200) {
        // history.push('/dashboard');
        console.log(response);
      } else {
        alert('Datos incorrectos');
      }
    })

  }

  return (
    <div className="container">
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
            <Button variant="primary" type="submit" className="btn primary" >
              Entrar
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}

export default App;
