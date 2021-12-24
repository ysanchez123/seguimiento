import React, { Component } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faMobileAlt, faTty, faEdit, faCheck, faTimes, faPhoneSquare, faBlenderPhone } from '@fortawesome/free-solid-svg-icons'
import { WhatsappIcon } from '../TodoIcon/WhatsappIcon';

import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true


class ProtocoloLlamadas extends Component {constructor(props) {
  super(props);
  this.state = {
    viewCompleted: false,
    puntosList: [],
    modal: false,
    activeItem: {
      name: "",
    },
  };
}

componentDidMount() {
  this.refreshList();
}

toggle = () => {
  this.setState({ modal: !this.state.modal });
};

getNumeroParaLlamar = (telefono) => {
  let numeroParaLlamar = 'tel:'+telefono.numero
  if (telefono.tipo == "PBX") {
    numeroParaLlamar = 'tel:607' + telefono.numero.split('-')[0]
  }
  else if (telefono.tipo == "Celular") {
    numeroParaLlamar = 'tel:'+telefono.numero
  }
  else if (telefono.tipo == "Whatsapp") {
    let numeroCelular = telefono.numero
    let textoBase = `https://api.whatsapp.com/send?phone=+57${numeroCelular}&text=Hola!%20esto%20es%20una%20verificaci%C3%B3n%20de%20l%C3%ADneas.`
    numeroParaLlamar = textoBase
  }
  else if (telefono.tipo == "Fijo") {
    numeroParaLlamar = 'tel:607' + telefono.numero
  }
  return numeroParaLlamar
}

refreshList = () => {
  axios
    .get("/api/get_all_puntos")
    .then((res) => this.setState({ puntosList: res.data }))
    .catch((err) => console.log(err));
};

handleContesto = (item) => {
  this.setState({ activeItem: item, modal: !this.state.modal });
};

handleContestoModal = (item) => {
  this.setState({ activeItem: item, modal: !this.state.modal });
  const name = this.state.activeItem.name
  const headers = {
    'Content-Type': 'application/json',
  }
  console.log('handleContestoModal', name)
  const data = {
    'params': {
      'name': name,
    }
  }
  
  axios
    .post(`/api/contesto/${item.id}`, data, {'headers': headers})
    .then((res) => this.refreshList());
};

handleNoContesto = (item) => {
  axios
    .post(`/api/no_contesto/${item.id}`)
    .then((res) => this.refreshList());
};

handleEdit = (item) => {
  axios
    .post(`/api/edit/${item.id}`)
    .then((res) => this.refreshList());
};

handleLlamando = (item, called='none') => {
  console.log('handleLlamando')

  if (called == 'button') {
    const numeroParaLlamar = this.getNumeroParaLlamar(item)
    if (item.tipo == "Whatsapp") {
      window.open(numeroParaLlamar, "_blank")
    } else {
      window.open(numeroParaLlamar, "_self")
    }
  }

  axios
    .post(`/api/llamando/${item.id}`)
    .then((res) => this.refreshList());
};

renderEstado = (telefono) => {
    const estado_llamada = telefono.estado_llamada;
    if (estado_llamada == null) {
        return(
                <div className="col-xs-12 col-sm-12 col-md-7 estado row row-flex">
                  <button type="button"
                          className="btn btn-warning col-xs-8 col-md-8 "
                          onClick={() => this.handleLlamando(telefono, 'button')}
                          >
                        <FontAwesomeIcon icon={faPhoneSquare} />
                  </button>

                  <button type="button"
                        className="btn btn-info col-xs-2 col-md-2 "
                        onClick={() => this.handleEdit(telefono)}
                        >
                        <FontAwesomeIcon 
                          icon={faEdit} 
                        />
                  </button>
              </div>
        )
    }
    if (estado_llamada == 'Llamando') {
        return(
            <div className="col-xs-12 col-sm-12 col-md-7 estado row row-flex">

              <button type="button"
                      className="btn btn-success col-xs-4 col-md-4 " 
                      onClick={() => this.handleContesto(telefono)}
                      >
                    <FontAwesomeIcon icon={faCheck} />
              </button>

              <button type="button"
                      className="btn btn-danger col-xs-4 col-md-4 "
                      onClick={() => this.handleNoContesto(telefono)}
                      >
                    <FontAwesomeIcon icon={faTimes} />
              </button>

              <button type="button"
                    className="btn btn-info col-xs-2 col-md-2 "
                    onClick={() => this.handleEdit(telefono)}
                    >
                    <FontAwesomeIcon 
                      icon={faEdit} 
                    />
              </button>

            </div>
        )
    }
    if (estado_llamada == 'Contestado') {
        return(
            <div className="col-xs-12 col-sm-12 col-md-7 estado row row-flex">
              <button type="button"
                      className="btn btn-success col-xs-8 col-md-8 " disabled={true} >
                    <FontAwesomeIcon icon={faCheck} />
                    {" Contestó Llamada"}  
              </button>
              <button type="button"
                    className="btn btn-info col-xs-2 col-md-2 "
                    onClick={() => this.handleEdit(telefono)}
                    >
                    <FontAwesomeIcon 
                      icon={faEdit} 
                    />
              </button>
            </div>
        )
    }
    if (estado_llamada == 'Sin Contestar') {
        return(
            <div className="col-xs-12 col-sm-12 col-md-7 estado row row-flex">
              <button type="button"
                      className="btn btn-danger col-xs-8 col-md-8 " disabled={true} >
                    <FontAwesomeIcon icon={faTimes} />
                    {"No Contestó Llamada"}  
              </button>
              <button type="button"
                    className="btn btn-info col-xs-2 col-md-2 "
                    onClick={() => this.handleEdit(telefono)}
                    >
                    <FontAwesomeIcon 
                      icon={faEdit} 
                    />
              </button>
            </div>
        )
    }
    return(
            <div className="col-xs-12 col-sm-12 col-md-7 estado row row-flex">

              <button type="button"
                      className="btn btn-warning col-xs-8 col-md-8 " hidden={true}>
                    <FontAwesomeIcon icon={faPhoneSquare} />

              </button>

              <button type="button"
                      className="btn btn-success col-xs-8 col-md-8 "  hidden={true}
                      disabled>
                    <FontAwesomeIcon icon={faCheck} />
                    {" Contestó Llamada"} 
              </button>

              <button type="button"
                      className="btn btn-success col-xs-5 col-md-5 " >
                    <FontAwesomeIcon icon={faCheck} />

              </button>

              <button type="button"
                      className="btn btn-danger col-xs-5 col-md-5 ">
                    <FontAwesomeIcon icon={faTimes} />

              </button>

              <button type="button"
                    className="btn btn-info col-xs-2 col-md-2 "
                    onClick={() => this.handleEdit(telefono)}
                    >
                    <FontAwesomeIcon 
                      icon={faEdit} 
                    />
              </button>

          </div>
    )
};

renderIcon = (telefono) => {
  if (telefono.tipo == "Whatsapp") {
    return(
      <WhatsappIcon/>
      )
  }

  let icono = faPhone  
  if (telefono.tipo == "PBX") {
      icono = faTty
  }
  else if (telefono.tipo == "Celular") {
      icono = faMobileAlt
  }
  else if (telefono.tipo == "Fijo") {
      icono = faPhone
  }  
  return(
    <FontAwesomeIcon icon={icono} />
  )
};

renderRowAgenda = (telefono) => {
  let icono = faPhone
  let numeroParaLlamar = 'tel:'+telefono.numero
  let additionaExtencion = ''
  if (telefono.tipo == "PBX") {
      icono = faTty
      additionaExtencion = ' - ' + telefono.extencion
      numeroParaLlamar = 'tel:607' + telefono.numero.split('-')[0]

  }
  else if (telefono.tipo == "Celular") {
      icono = faMobileAlt
  }
  else if (telefono.tipo == "Whatsapp") {
      icono = faBlenderPhone
      let numeroCelular = telefono.numero
      let textoBase = `https://api.whatsapp.com/send?phone=+57${numeroCelular}&text=Hola!%20esto%20es%20una%20verificaci%C3%B3n%20de%20l%C3%ADneas.`
      numeroParaLlamar = textoBase
    }
  else if (telefono.tipo == "Fijo") {
      icono = faPhone
      numeroParaLlamar = 'tel:607' + telefono.numero

  }
  return (
      <div className='row row-flex record-numero'>
          <div className='col-xs-2 col-sm-2 col-md-1 tipo'>
            {this.renderIcon(telefono)}
          </div>

          <div className='col-xs-10 col-sm-10 col-md-4 numero'>
              <a href={numeroParaLlamar} onClick={this.handleLlamando.bind(this, telefono)}>
              { telefono.numero} 
              { additionaExtencion } 
              </a>
          </div>
          {this.renderEstado(telefono)}
      </div>
  )
};

renderAgenda = (agenda) => {
  return agenda.map((telefono) => (
      <div className="">
        {this.renderRowAgenda(telefono)}
      </div>
  ));
};

renderPuntos = () => {
  const newItems = this.state.puntosList;
  return newItems.map((punto) => (
      <div
          className="col-md-6 col-sm-12 row-flex content-punto"
          key={punto.id}
      >
          <div className='h2 name punto'>
              {punto.nombre}
          </div>
          {this.renderAgenda(punto.agenda)}
      </div>
  ));
};

render() {
  return (
    <main className="container">
      <h1>
        Protocolo de llamadas Ziru's Pizza
      </h1>
      <div className="row row-flex content-agenda">
        {this.renderPuntos()}
      </div>
      {this.state.modal ? (
        <Modal
          activeItem={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handleContestoModal}
        />
      ) : null}
    </main>
  );
};

}

export default ProtocoloLlamadas;