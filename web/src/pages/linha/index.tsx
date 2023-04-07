import { useRouter } from "next/router";
import Header from "../../components/Header";
import { api } from "../../services/api";
import { BodyContainer, Main, StopContainer } from "../../styles/pages/linha";
import { ArrowUpRight, Bus, CaretDown, MapPin } from "phosphor-react";
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Footer } from "../../styles/global";
import { parada } from "../../types/api/parada";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { sentido } from "../../types/api/sentido";
import { GetServerSidePropsContext } from "next";
import { LinhaProps } from "../../types/pages/Linha";
import Head from "next/head";

export default function Linha({ linha, sentido, sentidos, paradas }: LinhaProps) {
  const router = useRouter()

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


  return (
    <>
      <Head>
        <title>Rota da linha {linha.cod} {linha.nome} - Moovooca</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <Main>
        <Header />
        <BodyContainer>
          <div className="lineHeader">
            <h3 className="regular">Linha</h3>
            <div className="lineHeaderContainer">
              <h1>
                <span>
                  <Bus weight='regular' color="#276749" />
                  {linha.cod}
                </span>
                {linha?.nome}
              </h1>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild={true} className="DropdownMenuButton">
                  <button>Sentido {sentido.sentido} <CaretDown size={16} weight="bold" color="rgba(0, 0, 0, 0.8)" /></button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                    <DropdownMenu.Arrow className="DropdownMenuArrow" />

                    {sentidos.map((sentido: sentido) => (
                      <DropdownMenu.Item className="DropdownMenuItem" key={sentido.id} onClick={() => goTo(`/linha?id=${linha.id}&sid=${sentido.id}`)}>
                        <DropdownMenu.Item className="DropdownMenuItemIndicator" asChild={false}>
                          <ArrowUpRight size={14} weight="bold" color="rgba(0, 0, 0, 0.8)" />
                        </DropdownMenu.Item>
                        Sentido {sentido.sentido}
                      </DropdownMenu.Item>
                    ))}

                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
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
                    <span>{linha.campus}</span>
                  </div>
                </div>
                <p>A linha {linha.cod} - {linha.nome} de ônibus tem {paradas.length} paradas partindo de {sentido.ponto_partida}, terminando em {sentido.ponto_destino}.</p>
                <p>A grade horária da linha {linha.cod} {linha.nome} de ônibus para a próxima semana: Começa a operar às {sentido.horario_inicio} e termina às {sentido.horario_fim}. Dias de operação durante a semana: todos os dias.</p>

                <div className="buttonContainer">
                  <button onClick={() => goTo(`/horarios?lid=${linha.id}&sid=${sentido.id}`)}>Ver grade horária da linha</button>
                </div>

                <StopContainer>
                  <div className="stopsHeaderContainer">
                    <h3>Sentido {sentido.sentido} ({paradas.length} paradas)</h3>
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
  const { id, sid } = context.query;

  const { data: linha } = await api.get(`/linha?id=${id}`);
  const { data: sentido } = await api.get(`/sentido?id=${sid}`);
  const { data: sentidos } = await api.get(`/sentidos?linha=${linha.id}`);

  return {
    props: {
      linha: linha,
      sentido: sentido,
      sentidos: sentidos,
      paradas: sentido.paradas
    }
  }
}