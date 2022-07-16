import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Header } from '../../components/Header';
import { SidebarSeller } from '../../components/SidebarSeller';
import api from '../../utils/api';

function Seller() {
  const [salesList, setSalesList] = useState([]);
  const [salesId, setSalesId] = useState("");
  const [date, setDate] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [otherTax, setOtherTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [details, setDetails] = useState([]);
  const [operatorId, setOperatorId] = useState("");
  const [isActive, setIsActive] = useState(false);

  function changeStates(sales) {
    setDate(sales.date);
    setSellerId(sales.sellerId);
    setAmount(sales.amount);
    setSalesId(sales.id)
    setTax(sales.tax);
    setOtherTax(sales.otherTax);
    setTotal(sales.total);
    setDetails(sales.details);
    setIsActive(sales.active);
  }

  function updateSales(event) {
    event.preventDefault()

    const data = {
      date,
      sellerId,
      amount,
      tax,
      otherTax,
      total,
      active: isActive,
    }

    api.put(`/sales/${salesId}`, data).then(response => {
      console.log(response.status)

      if (response.status === 200) {
        console.log(response);
      } else {
        alert('Datos incorrectos');
      }
    })
  }

  useEffect(() => {
    api.get('/sales/689f56d8-3130-4e45-a223-eb5f0cf6c723').then(res => {
      setSalesList(res.data.data);
    })
    setOperatorId("689f56d8-3130-4e45-a223-eb5f0cf6c723")
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <SidebarSeller />

      <div className='content-wrapper d-flex justify-content-center'>
        <div className='w-75 mt-5'>
          <div className='text-center d-flex  justify-content-between m-3'>
            <h5>Ventas</h5>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Cantidad</th>
                <th>Taxa</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {salesList?.map((sales) => (
                <tr key={sales.id}>
                  <td>{sales.id}</td>
                  <td>{sales.amount}</td>
                  <td>{sales.tax}</td>
                  <td>{sales.total}</td>
                  <td>
                    <Button
                      data-bs-toggle="modal"
                      data-bs-target="#myModalUpdate"
                      onClick={() => { changeStates(sales) }}
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
              <h4 className="modal-title">Update Sales</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <Form className="form" onSubmit={updateSales} >
                <Form.Group className="mb-3 text-left" controlId="formFecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="text" placeholder="Fecha" defaultValue={date} onChange={res => setDate(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formSellerId">
                  <Form.Label>Id. vendedor</Form.Label>
                  <Form.Control type="text" placeholder="Id. vendedor" defaultValue={sellerId} onChange={res => setSellerId(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formAmount">
                  <Form.Label>Neto</Form.Label>
                  <Form.Control type="password" placeholder="Neto" defaultValue={amount} onChange={res => setAmount(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formTax">
                  <Form.Label>Taxa</Form.Label>
                  <Form.Control type="text" placeholder="Taxa" defaultValue={tax} onChange={res => setTax(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formOtherTax">
                  <Form.Label>Otra taxa</Form.Label>
                  <Form.Control type="text" placeholder="Otra taxa" defaultValue={otherTax} onChange={res => setOtherTax(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left" controlId="formTotal">
                  <Form.Label>Total</Form.Label>
                  <Form.Control type="text" placeholder="Total" defaultValue={total} onChange={res => setTotal(res.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-left d-flex justify-content-end" controlId="formName">
                  {isActive ? (
                    <Button className="btn btn-danger" onClick={() => {
                      setIsActive(false)
                    }}>Desactivar venta</Button>
                  ) : (
                    <Button className="btn btn-secondary" onClick={() => {
                      setIsActive(true)
                    }}>Activar venta</Button>
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

export default Seller;