import { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
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
  const [isClientSelect, setIsClientSelect] = useState(true);
  const [isProductSelect, setIsProductSelect] = useState(false);
  const [neto, setNeto] = useState(0);
  const [taxes, setTaxes] = useState(0);

  let history = useHistory();


  function onSubmit(event) {
    event.preventDefault()

    const data = {
      operatorId,
      date: new Date(),
      sellerId: "689f56d8-3130-4e45-a223-eb5f0cf6c723",
      amount: neto,
      tax: ivaPrice,
      otherTaxs: taxes,
      total: totalSale,
      details: [
        saleAmount,
        nameProduct,
        price,
        totalSale
      ]
    }

    api.post('/sales', data).then(res => {
      console.log(res)
    })


  }

  function onSubmitProducts(event) {
    event.preventDefault()

    setNeto(price * saleAmount)
    setIvaPrice((((price * saleAmount) * iva) / 100))
    setSalesOffer(MDPrice * saleAmount)

    setTotalSale(((price * saleAmount) + (((price * saleAmount) * iva) / 100)) - MDPrice * saleAmount)

    setIsProductSelect(true)

  }

  function updateClient(idClient) {
    api.get(`/clients/${operatorId}/${idClient}`).then(response => {
      setClientName(response.data.data[0].name);
    })

    setIsClientSelect(false)

  }

  function updateProduct(idProduct) {
    api.get(`/products/${operatorId}/${idProduct}`).then(response => {
      setMSU(response.data.data[0].MSU);
      setNameProduct(response.data.data[0].name);
      setIsActive(response.data.data[0].active);
      setProductId(response.data.data[0].id)
      setPrice(response.data.data[0].price);
      setStock(response.data.data[0].stock);
      setMDPrice(response.data.data[0].MDPrice);
      setMDPercentage(response.data.data[0].MDPercentage);
    })

  }

  function clearField() {
    window.location.reload();
  }


  useEffect(() => {
    api.get('/products/689f56d8-3130-4e45-a223-eb5f0cf6c723').then(res => {
      setProductList(res.data.data);
    }).catch(err => {
      console.log(err)
    })
    setOperatorId("689f56d8-3130-4e45-a223-eb5f0cf6c723")

    api.get('/clients/689f56d8-3130-4e45-a223-eb5f0cf6c723').then(res => {
      setClientList(res.data.data);

    }).catch(err => {
      console.log(err)
    })

    setIva(19)

  }, [])

  return (
    <div className="wrapper">
      <Header />
      <SidebarSeller />

      {/* <div className='content-wrapper d-flex justify-content-center'>
        <div className='w-75 mt-5'>
          <div className='text-center d-flex  justify-content-between m-3'>
            <h5>Punto de venta</h5>

          </div>
          <Row className="h-50" md={2}>
            <Col className="">
              <div className="mt-2">
                <h5 className="">Datos cliente</h5>
                <Row md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rut</Form.Label>
                    <Form.Select disabled={!isClientSelect} onChange={(event) => { updateClient(event.target.value) }}>
                      <option defaultChecked>Rut cliente</option>
                      {clientList?.map(client => (
                        <option key={client.id} value={client.id} >{client.rol}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control defaultValue={clientName} disabled />
                  </Form.Group>

                </Row>

              </div>
              <div className="mt-2">
                <h5 className="">Datos Producto</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre producto</Form.Label>
                  <Form.Select disabled={isClientSelect && !isProductSelect} onChange={(event) => updateProduct(event.target.value)}>
                    <option defaultChecked>producto</option>
                    {productList?.map(product => (
                      <option key={product.id} value={product.id} >{product.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form onSubmit={onSubmit}>
                  <Row md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control disabled={isClientSelect && !isProductSelect ? true : false} type="number" defaultValue={MSU} minLength={MSU || 1} maxLength={stock || 10} onChange={(event) => {
                        setSaleAmount(event.target.value)
                      }} />
                    </Form.Group>

                  </Row>

                  <div className="d-flex justify-content-between">
                    <Button type="button" onClick={clearField} className="btn btn-danger  ">Limpiar</Button>

                    <Button type="submit" className="btn btn-primary  ">Agregar producto</Button>

                  </div>

                </Form>


              </div>
            </Col>

            {productId ? (
              <Col className='text-center border rounded'>

                <h5 className='text-center'>{nameProduct}</h5>
                <Row md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>U. mín. de venta</Form.Label>
                    <Form.Control type="number" defaultValue={MSU} disabled />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control required defaultValue={stock} disabled />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Valor unidad</Form.Label>
                    <Form.Control defaultValue={price} disabled />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Oferta</Form.Label>
                    <Form.Control defaultValue={MDPrice} disabled />
                  </Form.Group>
                </Row>

                {isProductSelect ? (
                  <>
                    <h5>Producto Agregado</h5>
                    <Row md={2}>
                      <Form.Group className="mb-3">
                        <Form.Control type="text" defaultValue={MSU} disabled />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control type="text" defaultValue={`Cant. x${saleAmount}`} disabled />
                      </Form.Group>

                      <div></div>

                      <Form.Group className="mb-3">
                        <Form.Control defaultValue={`$${price} CLP`} disabled />
                      </Form.Group>

                      <div></div>

                      <Form.Group className="mb-3">
                        <Form.Control defaultValue={`$${MDPrice} CLP`} disabled />
                      </Form.Group>

                      <div></div>

                      <div></div>

                      <div></div>

                      <Form.Group className="mb-3">
                        <Form.Control className="text-end" defaultValue={`$${totalSale} CLP`} disabled />
                      </Form.Group>
                    </Row>
                  </>
                ) : null}

              </Col>
            ) : null}

          </Row>

        </div>
      </div> */}

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
                    <Form.Select onChange={(event) => { updateClient(event.target.value) }}>
                      <option defaultChecked>Seleccione...</option>
                      {clientList?.map(client => (
                        <option key={client.id} value={client.id} >{client.rol}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Nombre producto</Form.Label>
                    <Form.Select onChange={(event) => updateProduct(event.target.value)}>
                      <option defaultChecked>Seleccione...</option>
                      {productList?.map(product => (
                        <option key={product.id} value={product.id} >{product.name}</option>
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

                    {/* 
                    <Form.Group className="mb-3">
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control type="number" minLength={MSU || 1} maxLength={stock || 10} onChange={(event) => {
                        setSaleAmount(event.target.value)
                      }} />
                    </Form.Group> */}
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