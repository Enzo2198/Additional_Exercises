import {FTable, ProductDialog} from '../../components'
import type {Header, Product} from '../../utils'
import {Button} from "@mui/material";
import {useState, useEffect} from "react";
import api from '../../plugins/api'

const headers: Header[] = [
  { name: 'id', text: 'ID' },
  { name: 'name', text: 'Tên' },
  { name: 'shortName', text: 'Tên ngắn' },
  { name: 'code', text: 'Code' },
  { name: 'description', text: 'Mô tả' },
  { name: 'action', text: 'Thao tác' }
];

export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curProduct, setCurProduct] = useState<Product>({
    id: 0,
    code: '',
    name: '',
    shortName: '',
    description: '',
  })

  const defaultProduct: Product = {
    id: 0,
    code: '',
    name: '',
    shortName: '',
    description: '',
  }


  const [products, setProducts] = useState<Product[]>([])

  const onAdd = () => {
    setCurProduct(defaultProduct)
    setIsOpenDialog(true)
  }

  const onUpdate = (id: number) => {
    // @ts-ignore
    setCurProduct({...products.find(e => e.id === id)})
    setIsOpenDialog(true)
  }

  const onDelete = (id: number) => {
    const removed = products.filter(e => e.id !== id)
    setProducts(removed)
  }

  const onSave = async () => {
    console.log(curProduct)
    setIsOpenDialog(false)

    if (curProduct.id) {
      await api.put(`/products/${curProduct.id}`, toBody())
      await getData()
    } else {
      await api.post('/products', toBody())
      await getData()
    }
  }

  const toBody = () => {
    return {
      id: curProduct.id,
      name: curProduct.name,
      shortName: curProduct.shortName,
      code: curProduct.code,
      description: curProduct.description,
    }
  }

  const getData = async () => {
    try {
      const productsData = await api.get('/products/')
      setProducts(productsData.data)   // thêm dòng này vào
    } catch (e) {
      console.log(e)
    }
  }


  // onmounted
  useEffect(() => {
    getData()
  }, [])

return (
  <>
    <h1>Product</h1>
    <Button variant="outlined" onClick={onAdd}>Add</Button>
    <FTable
      headers={headers}
      rows={products}
      onUpdate={onUpdate}
      onDelete={onDelete}
      width={900}
    />
    <ProductDialog
      product={curProduct}
      setProduct={setCurProduct}
      onSave={onSave}
      isOpen={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
    />
  </>
)
}