import React, { useState, useEffect } from "react";
import { Breadcrumb, ConfirmationDialog } from "matx";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { Icon,Fab } from "@material-ui/core";
import { Link,useParams } from "react-router-dom";
import Swal from "sweetalert2";
import FormDialog from "./Addcategory"
import MemberEditorDialog from "./Addcategory";
import url from "../invoice/InvoiceService";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    TableRow,
    Divider,
    Button,
    Card,
    Grid
} from "@material-ui/core";



const SimpleMuiTable = () => {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      float: 'right',
      background:'blue',
      color:'white'
    },
    input: {
      display: "none"
    }
  }));
  const columnStyleWithWidth = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "500px"
 }
  const classes = useStyles();
    const [isAlive, setIsAlive] = useState(true);
    const [userList, setUserList] = useState([]);
    const [catList, setcatList] = useState([]);
    const [subcatList, setsubcatList] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { id } = useParams();

  function handleClick(event,id) {
    console.log(id)
    Axios.get(url+"sub-category/"+id).then(({ data }) => {
      console.log(data)
      setsubcatList(data);
    })
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);


    useEffect(() => {
      
      Axios.get(url+"products")
      .then(function (response) {
       console.log(response)
        setUserList(response.data)
        
      })
      //   Axios.get(url+"products").then(({ data }) => {
      //      setUserList(data);
        
          

      //   });
      //   Axios.get(url+"categories").then(({ data }) => {
      //     setcatList(data);
      //     console.log(data)
         

      //  });
       console.log(statList)
       
        
        return () => setIsAlive(false);
    },[]);
    const [count, setCount] = useState(0);
  
    function getrow(e) {
      Axios.get(url+"products").then(({ data }) => {
        if (isAlive) setUserList(data);
    });
    return () => setIsAlive(false);
    }
  function Increment(e) {
    alert('3')
  }
  function Decrement() {
    setCount(count - 1);
  }
   
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
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
   
  };

  const handleDeleteUser = (user) => {
    
    setShouldOpenConfirmationDialog(true);
  };
  const selectcategory = (user) => {
  
    Axios.get(url+"categorized-products/"+user)
      .then(function (response) {
       
        setUserList(response.data)
        
      })

  setAnchorEl(null);
  };

  const removeData = (id) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Axios.delete(url+`products/${id}`)
    .then(res => {
        
        getrow()
        Swal.fire(
          'Deleted!',
          ' product has been deleted.',
          'success'
        )
        
    })
    
        
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your product is safe :)',
          'error'
        )
      }
    })
    
}
 {/* category wise product display */}
 const statList = [
  {
    icon: "receipt",
    amount: 23,
    title: "New Quotation Request",
  },
  {
    icon: "hourglass_empty",
    amount: 12,
    title: "Pending Quotation",
  },
  {
    icon: "shopping_cart",
    amount: 10,
    title: "Sales Orders",
  },
  {
    icon: "dvr",
    amount: 30,
    title: "Todays Sale",
  },
];

const columns = [
  {
      name: "id", // field name in the row object
      label: "#", // column title that will be shown in table
      options: {
         
          filter: true,
      },
  },
  {
    name: "name", // field name in the row object
    label: "Name", // column title that will be shown in table
    options: {
       
        filter: true,
    },
},
  {
      name: "description",
      label: "Description",
      resizableColumns: true,
      options: {
          // setCellProps: () => ({ style: { minWidth: "800px", maxWidth: "800px" }}),
          customHeadRender: ({index, ...column}) =>{
            return (
              <TableCell key={index} style={columnStyleWithWidth}>  
                <TableHead>Description</TableHead> 
              </TableCell>
            )
         },
      },
  },
  {
      name: "unit_of_measure",
      label: "Unit_of_measure",
      options: {
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={{top: "0px",
            left: "0px",
            zIndex: "100",
            position: "sticky",
            backgroundColor: "#fff",
            width: "60px"}} >  
              <TableHead >UOM</TableHead> 
            </TableCell>
          )
       },
          filter: true,
      },
  },
  

  {
    name: "category_name",
    label: "Category",
    options: {
      
        filter: true,
    },
},
{
    name: "model_no",
    label: "Model Number",
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
//             return (
//               <span>
//             <IconButton onClick={() => removeData(tableMeta.rowData[5])}>
//                     <Icon color="error">delete</Icon>
//             </IconButton>
            
//             <Link to={"/product/updateproduct?id=" +tableMeta.rowData[5] }>
//               <IconButton>
//                 <Icon color="secondary">edit</Icon>
//               </IconButton>
//             </Link>
//             </span>
            
//             )
            
//         },
//     },
// },
// {
//   name: "id",
//   label:".",
//   options: {
//       filter: true,
//       customBodyRender: (value, tableMeta, updateValue) => {
//           return (
//             <Link to={"/product/updateproduct?id=" +tableMeta.rowData[4] }>
//               <IconButton>
//                 <Icon color="secondary">edit</Icon>
//               </IconButton>
//             </Link>
            
          
//           )
//       },
//   },
// },
];

    
  
  return ( 
   
      <div className="m-sm-30">
      <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
            { name: "Report", path: "/product/producthistory" },
              { name: "Product Report" }
            ]}
          />
          
          </div>
          <div className="viewer_actions px-4 flex justify-between">
          <div className="mb-6">
          <div>
      
        </div>
        
        
           
          {/* <Button
        variant="outlined"
        color="primary"
        className="mr-4 py-2"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        Select Category
      </Button> */}
      {/* <Menu
        
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
                    <MenuItem  onClick={() =>getrow()}>
                       All category
                      </MenuItem>
                    {catList.map((item) => (
                      <MenuItem value={item.id} key={item.id} onClick={() =>selectcategory(item.id)}>
                        {item.name}
                      </MenuItem>
                    ))}
          </Menu>
      */}
         {/* <Button className="mr-4 py-2"
           color="primary"
           variant="outlined"   onClick={() => {
                        setShouldOpenEditorDialog(true);
                      }}>
                     Manage Category
                     </Button> */}
                     </div>
                    {/* </Button> */}
                    {/* <Link to={`/product/addproduct/${id}`}>
           
                    <Button className="py-2"
           color="primary"
           variant="outlined">
          <Icon>add</Icon>
          Add New
        </Button>
        </Link> */}
          </div>
      
          
        
        

                    {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
          />
        )}
        {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleDialogClose}
            text="Are you sure to delete?"
          />
        )}
      
      <div className="mb-sm-30">
      <MUIDataTable
                title={"Product List"}
                data={userList}
                columns={columns}
                options={{
                    filterType: "textField",
                    responsive: "simple",
                    selectableRows: "none", // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            </div>
            </div>
  ); } 
   

export default SimpleMuiTable;
