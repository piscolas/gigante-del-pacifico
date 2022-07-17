import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { RiUserAddFill } from 'react-icons/ri';
import { useHistory } from "react-router-dom";
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import api from '../../utils/api';

function Product() {
  const [productList, setProductList] = useState([]);
  const [operatorId, setOperatorId] = useState("");
  const [MSU, setMSU] = useState("");
  const [name, setName] = useState("");
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [MDPrice, setMDPrice] = useState("");
  const [MDPercentage, setMDPercentage] = useState("");
  const [isActive, setIsActive] = useState(false);

  let history = useHistory();

  function changeStates(product) {
    setMSU(product.MSU);
    setName(product.name);
    setIsActive(product.active);
    setProductId(product.id)
    setPrice(product.price);
    setStock(product.stock);
    setMDPrice(product.MDPrice);
    setMDPercentage(product.MDPercentage);

  }

  function reloadField() {
    window.location.reload();
  }

  function onSubmit(event) {
    event.preventDefault()

    const data = {
      operatorId,
      name,
      MSU,
      price,
      stock,
      MDPrice,
      MDPercentage,
    }

    api.post('/products', data).then(response => {

      if (response.status === 201) {
        reloadField()
      } else {
        alert('Datos incorrectos');
      }
    }).catch(error => {
      console.log(error);
    })

  }

  function updateProduct(event) {
    event.preventDefault()

    const data = {
      operatorId,
      name,
      MSU,
      price,
      stock,
      MDPrice,
      MDPercentage,
      active: isActive
    }

    api.put(`/products/${productId}`, data).then(response => {

      if (response.status === 200) {
        reloadField()
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
      api.get('/products/689f56d8-3130-4e45-a223-eb5f0cf6c723').then(res => {
        setProductList(res.data.data);
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
            <h5>Producto</h5>

            <button type="button" className="" data-bs-toggle="modal" data-bs-target="#myModal">
              <RiUserAddFill size="30px" />
            </button>

            {/*Modal*/}
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h4 className="modal-title">Create Product</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body">
                    <Form className="form" onSubmit={onSubmit} >
                      <Form.Group className="mb-3 text-left" controlId="formRol">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" onChange={res => setName(res.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3 text-left" controlId="formName">
                        <Form.Label>Unidad Mínima de Venta</Form.Label>
                        <Form.Control type="text" placeholder="Unidad Mínima de Venta" onChange={res => setMSU(res.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3 text-left" controlId="formName">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control type="text" placeholder="Precio" onChange={res => setPrice(res.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3 text-left" controlId="formName">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="text" placeholder="Stock" onChange={res => setStock(res.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3 text-left" controlId="formName">
                        <Form.Label>Descuento máximo en precio</Form.Label>
                        <Form.Control type="text" placeholder="Descuento máximo en precio" onChange={res => setMDPrice(res.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3 text-left" controlId="formName">
                        <Form.Label>Descuento máximo en porcentaje</Form.Label>
                        <Form.Control type="text" placeholder="Descuento máximo en porcentaje" onChange={res => setMDPercentage(res.target.value)} />
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
                <th>MSU</th>
                <th>Precio</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productList?.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.MSU}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Button
                      data-bs-toggle="modal"
                      data-bs-target="#myModalUpdate"
                      onClick={() => { changeStates(product) }}
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
              <h4 className="modal-title">Update Product</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <Form className="form" onSubmit={updateProduct} >
                <Form.Group className="mb-3 text-left" controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Nombre" defaultValue={name} onChange={res => setName(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formMSU">
                  <Form.Label>Unidad mínima de venta</Form.Label>
                  <Form.Control type="text" placeholder="Unidad mínima de venta" defaultValue={MSU} onChange={res => setMSU(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formPrice">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control type="text" placeholder="Name" defaultValue={price} onChange={res => setPrice(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="text" placeholder="Stock" defaultValue={stock} onChange={res => setStock(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formMDPrice">
                  <Form.Label>Descuento máximo en precio</Form.Label>
                  <Form.Control type="text" placeholder="Descuento máximo en precio" defaultValue={MDPrice} onChange={res => setMDPrice(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formMDPercentage">
                  <Form.Label>Descuento máximo en porcentaje</Form.Label>
                  <Form.Control type="text" placeholder="Descuento máximo en porcentaje" defaultValue={MDPercentage} onChange={res => setMDPercentage(res.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3 text-left d-flex justify-content-end" controlId="formName">
                  {isActive ? (
                    <Button className="btn btn-danger" onClick={() => {
                      setIsActive(false)
                    }}>Desactivar producto</Button>
                  ) : (
                    <Button className="btn btn-secondary" onClick={() => {
                      setIsActive(true)
                    }}>Activar producto</Button>
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

export default Product;