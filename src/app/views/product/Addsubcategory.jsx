import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Divider,
  Switch,
  IconButton,
} from "@material-ui/core";
import history from "history.js";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getUserById, updateUser, addNewUser } from "../CRUD/TableService";
import { generateRandomId } from "utils";
import { withStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import url, {getcategories}from "../invoice/InvoiceService"

const MemberEditorDialog = ({ uid, open, handleClose,catid,catList }) => {
  const [state, setState] = useState({
    name: "abc",
    email: "",
    phone: "",
    balance: "",
    age: "",
    company: "",
    address: "",
    isActive: false,
    isAlive: true,
  });
  const [cname, setcname] = useState('');
  const [cdescription, setcdescription] = useState('');
  const [arr, setarr] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [isAlivecat, setIsAlivecat] = useState('');
  var found=null;
  const styles = {
    customMaxWidth: {
      maxWidth: "900px" // arbitrary value
    }
  };

  const handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      setState({
        ...state,
        isActive: event.target.checked,
      });
      
    }
   
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    return () => setIsAlive(true);
  };
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");



  const handleFormSubmit = () => {
    var arr=[]
     getcategories().then(({ data }) => {
       
      for(const list in data)
      {
        
        arr.push(
         data[list].name
        )

      }
     
      console.log(arr.indexOf(cname))

      if(arr.indexOf(cname)>-1) 
      {
        console.log(data.indexOf(cname))

        setIsAlivecat(true)
        catid=null
      }
       else
       {
        console.log(data.indexOf(cname))
        const frmdetails = {

          name: cname,
          description: cdescription,
          parent_id:catid
    
    
        }
      
        Axios.post(url+'categories', frmdetails)
          .then(function (response) {
            getcategories()
            Swal.fire({
              title: 'Success',
              type: 'success',
              text: 'Data saved successfully.',
            });
            
          
           getcategories().then(({ data }) => {
            catList(data)
    
            });
            handleClose()
            // history.push('/product/viewsubcategory');
          })
          .catch(function (error) {
           
          })
        setcdescription('')
        setcname('')
        catid=null
       
    
       } 
        
  
     })

    
  
  
  };
  const removeData = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'Any products, services will be uncategorised.',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        Axios.delete(url+`categories/${id}`)
          .then(res => {
            
            getcategories().then(({ data }) => {
              catList(data)
      
              });
          })
          handleClose()
          Swal.fire({
            customClass:{
              zIndex: 1000
            },
             text:'Category Deleted Successfully',
             icon: "success"
            // 'Cancelled',
            // 'Your imaginary file is safe :)',
            // 'error',
            
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass:{
            zIndex: 1000
          },
           title:'Cancelled'
          // 'Cancelled',
          // 'Your imaginary file is safe :)',
          // 'error',
          
        })
      }
    })

  }
  const setcatid =()=>{
   

    handleClose()
  }

  useEffect(() => {
    
    // Axios.get(url+"categories").then(({ data }) => {
    //   setUserList(data);

    // });
    // Axios.get("http://dataqueuesystems.com/amaco/amaco/public/api/products-in-category").then(({ data }) => {
    //   if (isAlive) setUserList(data);
    

    // Object.keys(data).forEach(function(key) {

    //   arr.push(data[key]);
    //   setUserList(arr)
    // });


    // });
   
  },[])
  function getrow() {
    if(!catid)
    {
    Axios.get(url+"categories").then(({ data }) => {
      setUserList(data);
      setIsAlive(false)
    });
  }
  else
  {
   
    Axios.get(url+`sub-category/${catid}`).then(({ data }) => {
      setUserList(data);
      setIsAlive(false)
      console.log(data)
    });
  }
    // return () => setIsAlive(false);
  }
  const columns = [
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
      options: {
        filter: true,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {

  
          return (
            <IconButton onClick={() => removeData(tableMeta.rowData[2])
            }
            >
              <Icon color="error">delete</Icon>
            </IconButton>



          )

        },
      },
    },
  ];


  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{zIndex:1000}} fullWidth={fullWidth}
    maxWidth={maxWidth}>
      <div className="p-6"  >
        {catid &&(
        <h4 className="mb-5">Add Sub Category</h4>
        )}
        {!catid &&(
         <h4 className="mb-5">Add Category</h4>   
        )}
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Name"
                
                variant="outlined"
                onChange={e => setcname(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="cname"
                value={cname}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              {isAlivecat &&(
            
            <span><Icon className="mr-2" fontSize="small" color="error">
              info
            </Icon>
            <small style={{color:"red"}}>
              Category already Exists
            </small>
            </span>
         
              )}
             
            </Grid>
            

            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Description"
                onChange={e => setcdescription(e.target.value)
                }
                variant="outlined"
                type="textarea"
                name="cdescription"
                value={cdescription}
              />
              
            </Grid>
          </Grid>
          
          <div className="flex justify-between items-center">
            <Button variant="outlined" color="primary" type="submit">
             <Icon>save</Icon> Save
            </Button>
            <div className="flex justify-between items-center">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setcatid()}
            >
              <Icon>cancel</Icon>Cancel
            </Button>
            
            <Button
            
              variant="outlined"
              color="primary"
              onClick={() => getrow()}
            >
              <Icon color="primary">remove_red_eye</Icon>view
            </Button>
            </div>
          </div>
          
        </ValidatorForm>
        <Divider className="mb-2" />
        {!isAlive &&
          <MUIDataTable
            title={"Category"}
            columns={columns}
            data={userList}
            options={{
              filterType: "textField",
              responsive: "simple",
              selectableRows: "none", // set checkbox for each row
              elevation: 0,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
          />
          }
     
      </div>
    </Dialog>
    
  );
};

export default MemberEditorDialog;
