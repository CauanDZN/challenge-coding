import { useRouter } from "next/router";
import Header from "../../components/Header";
import Modal from 'react-modal'
import { api } from "../../services/api";
import { BodyContainer, Main, ModalContainer, StopContainer } from "../../styles/pages/viagem";
import { ArrowUpRight, Bus, CaretDown, CheckCircle, CircleNotch, MapPin, X } from "phosphor-react";
import GoogleMapReact from 'google-map-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { sentido } from "../../types/api/sentido";
import { GetServerSidePropsContext } from "next";
import { ViagemProps } from "../../types/pages/Viagem";
import Head from "next/head";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { reserva } from "../../types/api/reserva";
import { HttpStatusCode } from "axios";

export default function Viagem({ paradas, viagem }: ViagemProps) {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const [reserva, setReserva] = useState<reserva>()
  const [reservaLoading, setReservaLoading] = useState(false)
  const [error, setError] = useState(false)
  const [status, setStatus] = useState<HttpStatusCode>()

  const data_viagem = new Date(viagem.data)
  const dia_viagem = data_viagem.getDate() < 10 ? '0' + data_viagem.getDate() : data_viagem.getDate()
  const mes_viagem = (data_viagem.getMonth() + 1) < 10 ? '0' + (data_viagem.getMonth() + 1) : data_viagem.getMonth() + 1
  const partida = new Date(viagem.horario_partida)
  const chegada = new Date(viagem.horario_chegada)
  const duracao_media = (viagem.duracao_media / 60) > 60 ? (viagem.duracao_media / 60 / 60).toFixed(0) + " horas e " + ((viagem.duracao_media / 60) % 60).toFixed(0) + " minutos" : (viagem.duracao_media / 60).toFixed(0) + " minutos"
  const minutos_partida = partida.getMinutes() < 10 ? "0" + partida.getMinutes() : partida.getMinutes()
  const minutos_chegada = chegada.getMinutes() < 10 ? "0" + chegada.getMinutes() : chegada.getMinutes()

  const { autenticado, usuario, reload } = useContext(AuthContext)

  function goTo(path: string) {
    router.push(path)
  }

  const defaultProps = {
    center: {
      lat: -3.7765124,
      lng: -38.5637712
    },
    zoom: 17
  };


  function handleModal() {
    setModal(!modal)
  }


  function closeModal() {
    setModal(false)
    setStatus(null)
    setReserva(null)
    setReservaLoading(false)
  }


  async function handleReserva() {
    setModal(true)

    setReservaLoading(true)

    await api.post('/reserva', {
      id_viagem: viagem.id,
      id_usuario: usuario.id,
      forma_pagamento: 'inteira'
    }).then(
      res => setReserva(res.data)
    ).catch(error => {
      if (error.response) {
        setStatus(error.response.status)
      }
    })

    setReservaLoading(false)
  }

  Modal.setAppElement('.react-modal')

  return (
    <>
      <Head>
        <title>Viagem {viagem.id} - {viagem.linha.cod} {viagem.linha.nome} - Moovooca</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <Main>
        <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
          <div className="react-modal-content-header">
            <h2>Reserva</h2>
            <X className="react-modal-close" size={24} onClick={closeModal} />
          </div>

          <div className="react-modal-container">
            <ModalContainer>
              {
                reservaLoading &&
                <div className="row">
                  <CircleNotch className="load" size={24} weight="regular" />
                  Realizando reserva...
                </div>
              }

              {
                reserva &&
                <>
                  <div className="row">
                    <CheckCircle size={24} weight="regular" />Código da reserva:
                    <b>{reserva.cod}</b>
                  </div>
                  <button onClick={() => goTo('/reservas')}>Ver minhas reservas</button>
                </>
              }

              {
                status && <div className="row"><X size={24} weight="regular" />Ocorreu um erro ao realizar a reserva.</div>
              }
            </ModalContainer>
          </div>
        </Modal>

        <Header />
        <BodyContainer>
          <div className="lineHeader">
            <h3 className="regular">Viagem</h3>
            <div className="lineHeaderContainer">
              <h1>
                <span>
                  <Bus weight='regular' color="#276749" />
                  {viagem.linha.cod}
                </span>
                {viagem.linha?.nome}
              </h1>
              <button>Sentido {viagem.sentido.sentido}</button>
            </div>
            <hr />
          </div>


          <div className="mainContainer">
            <div className="lineContainer">
              <div className="infoContainer">
                <h3>Informações</h3>
                <div className="stopsNearContainer">
                  <div className="iconContainer">
                    <MapPin size={16} weight="fill" color="#2f855a" />
                  </div>

                  <div className="stopsNearText">
                    <span>Para próximo de: </span>
                    <span>{viagem.linha.campus}</span>
                  </div>
                </div>

                <div>
                  <span><span className="bold">Linha: </span>{viagem.linha.cod} {viagem.linha.nome}</span>
                  <br />
                  <span><span className="bold">Sentido: </span>{viagem.sentido.sentido}</span>
                  <br />
                  <span><span className="bold">Data da viagem: </span>{dia_viagem}/{mes_viagem}/{data_viagem.getFullYear()}</span>
                  <br />
                  <span><span className="bold">Capacidade de assentos: </span>{viagem.linha.capacidade_assento} (Quantidade reduzida por conta do distânciamento social)</span>
                  <br />
                  <span><span className="bold">Total de assentos: </span>{viagem.assentos_disponiveis}</span>
                </div>
                <p>Nesta viagem, o ônibus {viagem.linha.cod} {viagem.linha.nome} parte de {viagem.origem} e tem como destino {viagem.destino}.</p>
                <p>A duração estimada para esta viagem é de {duracao_media}, o ônibus deverá partir às {partida.getHours()}:{minutos_partida} e a estimativa de chegada aponta para as {chegada.getHours()}:{minutos_chegada}, passando por um total de {paradas.length} paradas.</p>

                <div className="buttonContainer">
                  {
                    autenticado ?
                      viagem.assentos_disponiveis > 0 ?
                        <button onClick={handleReserva}>Realizar uma reserva</button>
                        :
                        <a>Assentos esgotados.</a>
                      :
                      <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => goTo(`/entrar`)}>Faça login para realizar uma reserva</a>
                  }
                </div>

                <StopContainer>
                  <div className="stopsHeaderContainer">
                    <h3>Sentido {viagem.sentido.sentido} ({paradas.length} paradas)</h3>
                  </div>
                  <ul className="stopsContainer">
                    {paradas.map(parada => (
                      <li className="stopItem" key={parada.id}>
                        <p>{parada.parada}</p>
                      </li>
                    ))}
                  </ul>
                </StopContainer>
              </div>
              <div className="mapsContainer" style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "" }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                >
                </GoogleMapReact>
              </div>
            </div>
            <br />
          </div>
        </BodyContainer>
      </Main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const { data: viagem } = await api.get(`/viagem?id=${id}`)
  const { data: paradas } = await api.get(`/paradas?linha=${viagem.linha.id}&sentido=${viagem.sentido.id}`);

  return {
    props: {
      paradas,
      viagem
    }
  }
}