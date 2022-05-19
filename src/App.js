import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button , Form, Input } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined,AuditOutlined,LoadingOutlined } from '@ant-design/icons';
import {fetchCodes} from "./utilities";


const App = () => {
  const [ isModalVisible, setIsModalVisible ] = useState(true);
  const [ code, setCode ] = useState("");
  const [ state,setState ] = useState(1);
  const [ cantidad,setCantidad ] = useState(0);
  const [ loading,setLoading ] = useState(false);

  const handleOk = () => {
      setLoading(true);
      const data = {
          code: code,
          event_id: "5ea23acbd74d5c4b360ddde2"
      }
      fetchCodes(data).then((response)=>{
          console.log(response)
          if (response.status === undefined){
              if (response.number_uses < response.discount_code_template.use_limit ){
                  setState(2);
                  setCantidad( response.discount_code_template.use_limit - response.number_uses);
              }
          }else{
              if (response.status === 403) setState(3);
              if (response.status === 404) setState(4);
          }
          setLoading(false)
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const helperChange = (e) => {
    setCode(e.target.value)
  }

  const Formulario = () => {
    return (
        <div style={{display:"block"}}>
            <div style={{display:"flex",justifyContent:"center"}}>
                <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
                <div style={{display:"block"}}>
                    <div style={{display:"block",paddingBottom:"10px"}}>
                        <p style={{textAlign:"center",margin:0}} >input</p>
                        <Input type="text" value={code} onChange={(event) => helperChange(event)} />
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Button onClick={() => handleCancel()} >Cancelar</Button>
                        <Button onClick={() => handleOk()} >Usar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  const Carga = () => {
      return (
          <div style={{display:"block",justifyContent:"center"}}>
              <div style={{display:"flex",justifyContent:"center"}} >
                  <Avatar size={64} icon={<LoadingOutlined />} />
              </div>
              <p style={{textAlign:"center",margin:0}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
      )
  }

  const disponible = () => {
      return (
          <div style={{display:"block"}}>
              <div style={{display:"flex",justifyContent:"center"}}>
                  <Avatar size={64} icon={<AuditOutlined />} />
              </div>
              <div style={{display:"block",justifyContent:"center"}}>
                  <h2 style={{textAlign:"center",margin:0}}>{cantidad} Cupos</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  <div style={{display:"flex",justifyContent:"center"}}>
                      <Button>Aceptar</Button>
                  </div>
              </div>
          </div>
      )
  }
  
  const Usado = () => {
      return (
          <div style={{display:"block"}}>
              <div style={{display:"flex",justifyContent:"center"}}>
                  <Avatar size={64} icon={<AuditOutlined />} />
              </div>
              <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
                  <div style={{display:"block",justifyContent:"center",width:"50%"}}>
                      <h2 style={{textAlign:"center",margin:0}} >{ state === 3 ? "Código usado" : "Código invalido" }</h2>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                          <Button onClick={() => handleCancel()} >Cancelar</Button>
                          <Button onClick={() => setState(1)} >Usar otro</Button>
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  return (
      <>
        <Modal visible={isModalVisible} footer={false}>
            {
                loading
                    ? Carga()
                    : state === 1
                        ? Formulario()
                        : state === 2
                            ? disponible()
                            : Usado()
            }
        </Modal>
      </>
  );
};

export default App;
