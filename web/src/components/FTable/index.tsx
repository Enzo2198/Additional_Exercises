import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import type {Header} from '../../utils'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {memo} from "react";

interface FTable {
  headers: Header[]
  rows: any[]
  onUpdate?: (id: string) => void
  onDelete?: (id: string) => void
  width: number
}

const RenderActionBtn = (
  id: string,
  onUpdate?: (id: string) => void,
  onDelete?: (id: string) => void
) => {
  return (
    <TableCell key={`action-${id}`}>
      <EditIcon color="success" onClick={() => onUpdate?.(id)} style={{cursor: 'pointer'}}/>
      <DeleteOutlineIcon color="error" onClick={() => onDelete?.(id)} style={{cursor: 'pointer', marginLeft: 8}}/>
    </TableCell>
  )
}


function FTableComponent ({headers, rows, onUpdate, onDelete, width=650}: FTable){

  return (
    <>
      <TableContainer sx={{width, margin: 'auto'}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                headers.map((header: Header) => {
                  return <TableCell key={header.name}>{header.text}</TableCell>
                })
              }
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row: any) => (
              <TableRow key={`employee-${row.id}`}>
                {headers.map((header: Header) => {
                  if (header.name === 'action') {
                    return RenderActionBtn(row.id, onUpdate, onDelete);
                  }

                  const rowKey: string = header.name;
                  return (
                    <TableCell size="small" key={`${rowKey}-${row.id}`}>
                      {row[rowKey]
                        ? header?.displayProperty
                          ? row[rowKey][header.displayProperty]
                          : row[rowKey]
                        : ''}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  )
}

export default memo(FTableComponent)