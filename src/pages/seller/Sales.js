import { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Header } from '../../components/Header';
import { SidebarSeller } from '../../components/SidebarSeller';
import api from '../../utils/api';

function Sales() {
  const [productList, setProductList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [clientName, setClientName] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [MSU, setMSU] = useState(0);
  const [nameProduct, setNameProduct] = useState("");
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [MDPrice, setMDPrice] = useState(0);
  const [MDPercentage, setMDPercentage] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [saleAmount, setSaleAmount] = useState(0);
  const [iva, setIva] = useState(19);
  const [ivaPrice, setIvaPrice] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [salesOffer, setSalesOffer] = useState(0);
  const [neto, setNeto] = useState(0);
  const [taxes, setTaxes] = useState(0);

  function updateField() {
    window.location.reload();
  }

  function onSubmit(event) {
    event.preventDefault()

    const data = {
      operatorId,
      date: new Date(),
      sellerId: "6caf2226-8dbc-4d09-b070-ba199553f705",
      amount: neto,
      tax: ivaPrice,
      otherTaxs: taxes,
      total: totalSale,
      active: true,
      details: [
        saleAmount,
        nameProduct,
        price,
        totalSale
      ]
    }

    api.post('/sales', data).then(res => {
      updateField()
    }).catch(err => {
      console.log(err)
    })

  }

  function onSubmitProducts(event) {
    event.preventDefault()

    setNeto(price * saleAmount)
    setIvaPrice((((price * saleAmount) * iva) / 100))
    setSalesOffer(MDPrice * saleAmount)

    setTotalSale(((price * saleAmount) + (((price * saleAmount) * iva) / 100)) - MDPrice * saleAmount)
  }

  function fetchClient(idClient) {
    api.get(`/clients/${operatorId}/${idClient}`).then(response => {

      setClientName(response.data.data[0].name);

      if (response.status == 200) {
        updateField()
      }

    }).catch(err => {
      console.log(err)
    })

  }

  function fetchProduct(idProduct) {
    api.get(`/products/${operatorId}/${idProduct}`).then(response => {
      setMSU(response.data.data[0].MSU);
      setNameProduct(response.data.data[0].name);
      setIsActive(response.data.data[0].active);
      setProductId(response.data.data[0].id)
      setPrice(response.data.data[0].price);
      setStock(response.data.data[0].stock);
      setMDPrice(response.data.data[0].MDPrice);
      setMDPercentage(response.data.data[0].MDPercentage);

      if (response.status == 200) {
        updateField()
      }


    }).catch(err => {
      console.log(err)
    })

  }



  useEffect(() => {
    api.get('/products/689f56d8-3130-4e45-a223-eb5f0cf6c723').then(res => {
      setProductList(res.data.data)

    }).catch(err => {
      console.log(err)
    })

    api.get('/clients/689f56d8-3130-4e45-a223-eb5f0cf6c723').then(res => {

      setClientList(res.data.data)

    }).catch(err => {
      console.log(err)
    })

    setOperatorId("689f56d8-3130-4e45-a223-eb5f0cf6c723")
    setIva(19)

  }, [])

  return (
    <div className="wrapper">
      <Header />
      <SidebarSeller />

      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <h2>Panel de ventas</h2>
          </div>
        </section>
        <section className='content'>
          <div className='card'>
            <div className="card-body">
              <div className='row'>
                <form onSubmit={onSubmitProducts}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rut</Form.Label>
                    <Form.Select onChange={(event) => { fetchClient(event.target.value) }}>
                      <option defaultChecked>Seleccione...</option>
                      {clientList?.map(client => (
                        <>
                          {client.active && <option key={client.id} value={client.id} >{client.rol}</option>}
                        </>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Nombre producto</Form.Label>
                    <Form.Select onChange={(event) => fetchProduct(event.target.value)}>
                      <option defaultChecked>Seleccione...</option>
                      {productList?.map(product => (
                        <>
                          {product.active && <option key={product.id} value={product.id} >{product.name}</option>}
                        </>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Row md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>U.M.V.</Form.Label>
                      <Form.Control type="number" value={MSU} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control required value={stock} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control type="number" minLength={MSU || 1} maxLength={stock || 10} onChange={(event) => {
                        setSaleAmount(event.target.value)
                      }} />
                    </Form.Group>
                  </Row>

                  <Row md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Valor unitario</Form.Label>
                      <Form.Control type="number" value={price} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Descuentos</Form.Label>
                      <Form.Control required value={`${salesOffer} CLP`} disabled />
                    </Form.Group>
                  </Row>

                  <Button type="submit" className="btn btn-primary    w-100">Agregar</Button>
                </form>
                <div className='pt-4'>
                  <Row md={4}>
                    <span className='font-weight-bold'>Producto: {nameProduct}</span>
                    <span className='font-weight-bold'>Cantidad: {saleAmount}</span>
                    <span className='font-weight-bold'>Total: {totalSale}</span>
                    <span className='font-weight-bold'>Acción:</span>
                  </Row>

                  <form onSubmit={onSubmit}>
                    <Row md={2}>
                      <Form.Group className="mb-3">
                        <Form.Label>Neto</Form.Label>
                        <Form.Control type="number" value={neto} disabled />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>IVA</Form.Label>
                        <Form.Control required value={`${ivaPrice} CLP`} disabled />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Otros impuestos</Form.Label>
                        <Form.Control required value={`${taxes} CLP`} disabled />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Total</Form.Label>
                        <Form.Control required value={`${totalSale} CLP`} disabled />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Tipo de venta</Form.Label>
                        <Form.Select >
                          <option defaultChecked>Seleccione...</option>
                          <option value="Afecta">Afecta</option>
                          <option value="Exenta">Exenta</option>

                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>DTE</Form.Label>
                        <Form.Select >
                          <option defaultChecked>Seleccione...</option>
                          <option value="Factura Electrónico">Factura Electrónico</option>
                          <option value="Factura Exenta Electrónico">Factura Exenta Electrónico</option>
                          <option value="Boleta">Boleta</option>
                          <option value="Guía de Despacho Electrónica">Guía de Despacho Electrónica</option>
                        </Form.Select>
                      </Form.Group>

                    </Row>
                    <Button type="submit" className="btn btn-primary    w-100">Guardar pedido</Button>
                  </form>

                </div>
              </div>
              <div className='row'>

              </div>
            </div>
          </div>

        </section>

      </div>

    </div>
  )
}

export default Sales;