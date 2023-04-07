import Header from '../../components/Header'
import { BodyContainer, Main } from '../../styles/pages/linhas'

import { api } from '../../services/api'
import { linha } from '../../types/api/linha'
import Table from '../../components/Table'
import TableRow from '../../components/TableRow'
import { Bus, CaretLeft, CaretRight, MagnifyingGlass } from 'phosphor-react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import { int } from '../../utils/convert'
import { useState } from 'react'
import Head from 'next/head'

export default function Linhas({ linhas, page }) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState<string>('')

  function goTo(path: string) {
    event.preventDefault()
    router.push(path)
  }

  return (
    <>
      <Head>
        <title>Moovooca - Linhas</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <Main>
        <Header />
        <BodyContainer>
          <section className="headerSection">
            <div className="textContainer">
              <h1>Linhas</h1>
              <h3 className='lead'>Pesquise ou selecione a linha que fica melhor para você.</h3>
              <form onSubmit={() => goTo(`/search?query=${searchInput}`)} className='searchContainer'>
                <input type="text" placeholder="Pesquisar" onChange={event => setSearchInput(event.target.value)} />
                <button type='submit'><MagnifyingGlass size={18} weight="bold" color="#2f855a" /></button>
              </form>
            </div>
          </section>

          <section className='lineSection'>
            <Table header={[]}>
              {linhas.map((linha: linha) => {
                return (
                  <TableRow key={linha.id} data={{
                    linha:
                      <button onClick={() => goTo(`/linha?id=${linha.id}&sid=${linha.sentidos[0].id}`)}>
                        <div className='firstContainer'>
                          <span><Bus size={18} color="#2f855a" weight="bold" />{linha.cod}</span>
                          {linha.nome}
                        </div>
                        <div className='lastContainer'>
                          <span>Passa próximo de</span>
                          <a>{linha.campus}</a>
                        </div>
                      </button>,
                  }} />
                )
              })}
              <TableRow data={{
                info:
                  <div className='pagination'>
                    <span>Página {page} de {'0'}</span>
                    <div className='buttonContainer'>
                      <button onClick={() => goTo(`/linhas?page=${int(page) - 1}`)} disabled={!(page > 1)}>
                        <CaretLeft size={18} color={page > 1 ? '#276749' : 'rgba(0, 0, 0, 0.25)'} weight="bold" />
                      </button>
                      <button onClick={() => goTo(`/linhas?page=${int(page) + 1}`)} disabled={!(page < 0)}>
                        <CaretRight size={18} color={page < 0 ? '#276749' : 'rgba(0, 0, 0, 0.25)'} weight="bold" />
                      </button>
                    </div>
                  </div>
              }} />
            </Table>
          </section>
        </BodyContainer>
      </Main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = context.query.page || 1;

  const { data: linhas } = await api.get(`/linhas`);
  // const { data: contagem_linhas } = await api.get(`/linha_count`);

  // const page_count = Math.ceil(int(contagem_linhas) / 15);

  return {
    props: {
      linhas,
      page,
    }
  }
}