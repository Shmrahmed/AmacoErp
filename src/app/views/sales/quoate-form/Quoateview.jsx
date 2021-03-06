import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon, Tooltip } from "@material-ui/core";
import { Link,useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url from "../../invoice/InvoiceService";
import moment from "moment";
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  TableRow,
  Button
} from "@material-ui/core";


const SimpleMuiTable = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [qdetails, setqdetails] = useState([]);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "600px",
    wordBreak: "break-all",
  }
  useEffect(() => {
    Axios.get(url+"sales-list").then(({ data }) => {
      // if (isAlive) setUserList(data);
      // var myJSON = JSON.stringify(data.id);
      // console.log(myJSON)
      // console.log(data.length)
      // if(data.length)
      // {
        setUserList(data);
     
       setqdetails(data);
      // }
    });
    return () => setIsAlive(false);
  }, []);
  const [count, setCount] = useState(0);
  const history = useHistory();
  const handeViewClick = (invoiceId) => {
    // console.log(invoiceId)
    history.push(`/rfqanalysis/${invoiceId}`);
  };

  function getrow(id) {
    Axios.get(url+"rfq/" + id).then(({ data }) => {
      if (isAlive) setqdetails(data[0].qdetails);
    });
    return () => setIsAlive(false);
  }
  function Increment(e) {
    alert('3')
  }
  function Decrement() {
    setCount(count - 1);
  }
  const [showInvoiceEditor, setShowInvoiceEditor] = useState(false);
  const [isNewInvoice, setIsNewInvoice] = useState(false);

  const [click, setClick] = useState([]);

  const addNumber = () => {
    setClick([
      ...click,
      {
        id: click.length,
        value: Math.random() * 10
      }
    ]);
  };
  const removeData = (id) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Axios.delete(url+`products/${id}`)
          .then(res => {
            getrow()
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            )

          })


        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    // Axios.delete(`http://dataqueuesystems.com/amaco/amaco/public/api/products/${id}`)
    // .then(res => {
    //     console.log(res);
    //     console.log(res.data);

    // })
    // getrow()
    // Axios.delete(url).then(res => {
    //     const del = employees.filter(employee => id !== employee.id)
    //     setEmployees(del)
    //     console.log('res', res)
    // })
  }
  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
        filter: true,
      },
    },
    {
      name: "quotation_no", // field name in the row object
      label: "Quotation No", // column title that will be shown in table
      options: {
        filter: true,
      },
    },
    {
      name: "fname", // field name in the row object
      label: "Firm_Name", // column title that will be shown in table
      options: {
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={columnStyleWithWidth1}>  
              <p style={{marginLeft:18}}>Firm Name</p> 
            </TableCell>
          )
       }
      },
    },
    {
      name: "name",
      label: "Quote Date",
      options: {
        filter: true,
      },
    },
    {
      name: "require_date",
      label: "Amount",
      options: {
        filter: true,
      },
    },

    //   {
    //     name: "id",
    //     label: "Action",
    //     options: {
    //         filter: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //              console.log(tableMeta.rowData)
    //             return (
    //             <IconButton onClick={() => removeData(tableMeta.rowData[4])
    //             }
    //             >
    //                     <Icon>close</Icon>
    //             </IconButton>


    //             )

    //         },
    //     },
    // },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
         
          return (
            <span>
            <Link to={"/quote/" + tableMeta.rowData[5]}>
              <Tooltip title="View More">
                <Icon color="primary">remove_red_eye</Icon>
           </Tooltip>
            </Link>
            {/* <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
            <IconButton>
              <Icon color="secondary">find_in_page</Icon>
            </IconButton>
          </Link> */}
          </span>

          )

        },
      },
    },
    //   {
    //     name: "",
    //     // label: "Action",
    //     options: {
    //       filter: true,
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //         return (
    //           <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
    //             <IconButton>
    //               <Icon color="secondary">find_in_page</Icon>
    //             </IconButton>
    //           </Link>
  
    //         )
  
    //       },
    //     },
    // },
  ];



  return (
    <div>
      <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            // { name: "Add new", path: "/sales/rfq-form/Rfqform" },
            { name: "Sales Quotation" },
          ]}
        />

        <div className="text-right">
          <Link to={"/Newquoteanalysis"}>
            <Button
              className="py-2"
              variant="outlined"
              color="primary"
            >
              <Icon>add</Icon> Add New 
          </Button>
          </Link>
        </div>
      </div>
      <MUIDataTable
        title={"Sales Quotation"}
        data={qdetails.map((item, index) => {
       
            return [
              ++index,
              item.quotation_no,
              item.party.firm_name,
              moment(item.created_at).format('DD MMM YYYY'),
              parseFloat(item.net_amount).toFixed(2),
              item.id
              // item.party[index].firm_name,
              // item.requested_date,
              // item.require_date,
            ]
          
        })}
        columns={columns}
        options={{
          
          rowsPerPageOptions: [10, 20, 40, 80, 100],
          selectableRows: "none",
          filterType: "dropdown",
          responsive: "scrollMaxHeight",
          rowsPerPage: 10,
          // expandableRows: true,
          // expandableRowsOnClick: true,
          renderExpandableRow: (rowData, rowMeta) => {
            
            return (
              <tr>
                <td colSpan={6}>
                  <Table style={{ minWidth: "650",border:"1px solid black" }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>product Name</TableCell>
                        <TableCell>description</TableCell>
                        <TableCell>Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {userList.map((item, index) => {
                        if(rowData[0]===item.id)
                      {
                      {item.qdetails.map((row,index) => {
                      
                       return(<TableRow key={row.product[0].id}>

                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.product[0].name}</TableCell>
                          <TableCell>{row.product[0].id}</TableCell>
                        </TableRow>
                       )
                      })}
                      } */}
                      {userList.map((item, index) => {
                        
                        {item.qdetails.map(row => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="right">{row.product[0].name}</TableCell>
                            <TableCell align="right">{row.product[0].name}</TableCell>
                            <TableCell align="right">{row.product[0].name}</TableCell>
                            <TableCell align="right">{row.product[0].name}</TableCell>
                          </TableRow>
                        ))}
                      
                      })}
                      
                    {/* })} */}
                   
                    </TableBody>
                  </Table>
                </td>
              </tr>
            )
          }
        }}
      />
    </div>
    </div>
  );
}


export default SimpleMuiTable;
