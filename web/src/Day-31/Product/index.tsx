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
    id: '',
    code: '',
    name: '',
    shortName: '',
    description: '',
  })

  const [products, setProducts] = useState<Product[]>([])

  const onAdd = () => {
    setCurProduct({
      id: '',
      code: '',
      name: '',
      shortName: '',
      description: '',
    });
    setIsOpenDialog(true);
  };

  const onUpdate = (id: string) => {
    const productToUpdate = products.find(e => e.id === id);
    if (productToUpdate) {
      setCurProduct({ ...productToUpdate });
      setIsOpenDialog(true);
    } else {
      console.error(`Không tìm thấy sản phẩm với id: ${id}`);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`)
      await getData()
    } catch (e) {
      console.log(e)
    }
  }

  const onSave = async () => {
    try {
      setIsOpenDialog(false);

      // @ts-ignore
      const maxId = (Math.max(...products.map(p => parseInt(p.id) || 0)) + 1).toString()

      if (curProduct.id) {
        // Update existing product
        await api.put(`/products/${curProduct.id}`, toBody());
      } else {
        // Add new product
        await api.post('/products', {...toBody(), id: maxId});
      }

      await getData();
    } catch (e) {
      console.error('Lỗi khi lưu sản phẩm:', e);
    }
  };


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
      setProducts(productsData.data)
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