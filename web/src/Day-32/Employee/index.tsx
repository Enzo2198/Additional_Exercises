import {useState, useEffect} from 'react';
import {EmployeeDialog, FTable} from '../../components'
import type {Header, Employee} from '../../utils'
import {Button} from "@mui/material"
import api from '../../plugins/api'

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Tên'},
  {name: 'age', text: 'Tuổi'},
  {name: 'address', text: 'Địa chỉ'},
  {name: 'salary', text: 'Lương'},
  {name: 'position', text: 'Vị trí'},
  {name: 'status', text: 'Tình trạng'},
  {name: 'action', text: ''}
]

export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curEmployee, setCurEmployee] = useState<Employee>({
    id: 0,
    name: '',
    age: 0,
    salary: 0,
    address: '',
    position: '',
    status: ''
  })

  const defaultEmployee: Employee = {
    id: 0,
    name: '',
    age: 0,
    salary: 0,
    address: '',
    position: '',
    status: ''
  }

  const [employees, setEmployees] = useState<Employee[]>([])

  const onAdd = () => {
    setCurEmployee(defaultEmployee)
    setIsOpenDialog(true)
  }

  const onUpdate = (id: number) => {
    const found = employees.find(e => e.id === id)
    if (found) {
      setCurEmployee({
        ...found,
        status: found.status
      })
      setIsOpenDialog(true)
    }
  }



  const onDelete = async (id: number) => {
    try {
      await api.delete(`/employees/${id}`)
      await getData()
    } catch (e) {
      console.log(e)
    }
  }


  const onSave = async () => {
    console.log(curEmployee)
    setIsOpenDialog(false)

    if (curEmployee.id) {
      await api.put(`/employees/${curEmployee.id}`, toBody())
      await getData()
    } else {
      await api.post('/employees', toBody())
      await getData()
    }
  }

  const toBody = () => {
    return {
      id: curEmployee.id,
      name: curEmployee.name,
      age: curEmployee.age,
      address: curEmployee.address,
      salary: curEmployee.salary,
      position: curEmployee.position,
      status: curEmployee.status

    }
  }

  const getData = async () => {
    try {
      const employeesData = await api.get('/employees/')
      setEmployees(employeesData.data)
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
      <h1>Employee</h1>
      <Button variant="outlined" onClick={onAdd}>Add</Button>
      <FTable
        width={800}
        headers={headers}
        rows={employees}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
      <EmployeeDialog
        employee={curEmployee}
        setEmployee={setCurEmployee}
        onSave={onSave}
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  )
}