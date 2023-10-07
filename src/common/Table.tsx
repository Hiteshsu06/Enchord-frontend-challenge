import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface DataTableProps {
    data?: Array<any>;
    columns?: Array<any>;
}
const Table:React.FC<DataTableProps> = ({
    data,
    columns
}) => {

const dynamicColumns = columns?.map((col:any, index:any) => {
    if(col) {
        return (
            <Column
            key={index}
            field={col.field}
            header={col.header}
            body={col.body}
           />
        )
    }
})

  return (
    <div>
        <DataTable 
            value={data} 
            tableStyle={{ minWidth: '50rem' }}>
        {dynamicColumns}
        </DataTable>
    </div>
  )
}

export default Table