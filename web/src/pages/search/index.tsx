import Header from '../../components/Header'
import { BodyContainer, Main } from '../../styles/pages/search'

import { api } from '../../services/api'
import { linha } from '../../types/api/linha'
import Table from '../../components/Table'
import TableRow from '../../components/TableRow'
import { Bus, MagnifyingGlass } from 'phosphor-react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import Head from 'next/head'

export default function Search({ linhas, query, texto_gerado }) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState<string>('')

  function goTo(path: string) {
    event.preventDefault()
    router.push(path)
  }

  return (
    <>
      <Head>
        <title>{query ? `${query} - Pesquisa Moovooca` : `Moovooca - Pesquisa`}</title>
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
                <input type="text" placeholder="Pesquisar" defaultValue={query} onChange={event => setSearchInput(event.target.value)} />
                <button type='submit'><MagnifyingGlass size={18} weight="bold" color="#2f855a" /></button>
              </form>
            </div>
            <div className='gptText'>
              <span className='bold'>Texto gerado por inteligência artifical: </span>
              <br />
              <span>{texto_gerado}</span>
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
            </Table>
          </section>
        </BodyContainer>
      </Main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query.query || '';

  const { data: linhas } = await api.get(`/linhas/search?query=${query}`);
  const { data: texto_gerado } = await api.post(`/linhas/search?query=${query}`);

  return {
    props: {
      linhas,
      query,
      texto_gerado
    }
  }
}