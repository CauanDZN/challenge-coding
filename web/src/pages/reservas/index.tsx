import Header from '../../components/Header'
import { BodyContainer, Main } from '../../styles/pages/reservas'

import { api } from '../../services/api'
import { useContext, useEffect, useState } from 'react'
import Table from '../../components/Table'
import TableRow from '../../components/TableRow'
import { Bus, Trash } from 'phosphor-react'
import { Footer } from '../../styles/global'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { AuthContext } from '../../contexts/AuthContext'
import { format_date, format_datetime } from '../../utils/format_datetime'
import { Logo } from '../../components/Header/styles'
import { reserva } from '../../types/api/reserva'

export default function Reservas() {
  const { autenticado } = useContext(AuthContext)
  const [reservas, setReservas] = useState<reserva[]>()
  const [reload, setReload] = useState(false)
  const router = useRouter()

  function goTo(route: string) {
    router.push(route)
  }

  async function handleDeleteBooking(id: number) {
    console.log(`/reserva?id=${id}`)
    await api.delete(`/reserva?id=${id}`)
      .catch(except => console.log(except))
    setReload(!reload)
  }

  useEffect(() => {
    const fetch = async () => {
      await api.get('/reservas')
        .then(res => setReservas(res.data))
        .catch(except => console.log(except))
    }


    fetch()
  }, [reload])

  if (!autenticado) {
    return (
      <Main>
        <div className='formContainer'>
          <Logo onClick={() => goTo('/')}>
            <Bus size={24} weight="regular" color="#276749" />
            <span>
              moovooca
            </span>
          </Logo>
          <h4>Não autorizado.</h4>
        </div>
      </Main>
    )
  }

  return (
    <>
      <Head>
        <title>Moovooca - Minhas reservas</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <Main>
        <Header />
        <BodyContainer>
          <section className="myBookingsSection">
            <Table header={['Minhas Reservas']}>
              {reservas?.length > 0 ? reservas?.map(reserva => (
                <TableRow key={reserva.id} data={{
                  linha:
                    <button className="bookingRow">
                      <div className='firstContainer'>
                        <span><Bus size={18} color="#2f855a" weight="bold" />{reserva.viagem.linha.cod}</span>
                        <div className="bookingInfo">
                          <a><a className='bold'>Linha: </a>{reserva.viagem.linha.cod} - {reserva.viagem.linha.nome}</a>
                          <a><a className='bold'>Código da reserva: </a>{reserva.cod}</a>
                          <a><a className='bold'>Data da viagem: </a>{format_date(reserva.viagem.data)}</a>
                          <a><a className='bold'>Horário de partida: </a>{format_datetime(reserva.viagem.horario_partida)}</a>
                          <a><a className='bold'>Estimativa de término: </a>{format_datetime(reserva.viagem.horario_chegada)}</a>
                        </div>
                      </div>
                      <div className='lastContainer'>
                        <button onClick={() => handleDeleteBooking(reserva.id)}>
                          <Trash size={20} weight='regular' />
                        </button>
                      </div>
                    </button>,
                }} />
              )) : <p>Ainda não há nenhuma reserva aqui.</p>}
            </Table>
          </section>
        </BodyContainer>
      </Main>
    </>
  )
}