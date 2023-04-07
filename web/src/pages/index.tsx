import Header from '../components/Header'
import { BodyContainer, ImgContainer, Main } from '../styles/pages/home'

import { api } from '../services/api'
import {  useState } from 'react'
import { MagnifyingGlass } from 'phosphor-react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export default function Home({ linhas }) {
  const [searchInput, setSearchInput] = useState<string>('')
  const router = useRouter()

  function goTo(path: string) {
    event.preventDefault()

    router.push(path)
  }

  return (
    <>
      <Head>
        <title>Moovooca - Início</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <Main>
        <Header />
        <BodyContainer>
          <section className="welcomeSection">
            <div className="textContainer">
              <h1>Seja bem-vindo ao Moovooca!</h1>
              <h3 className='lead'>Utilize nosso inteligente sistema de pesquisa para encontrar a rota ideal para você chegar até a UFC.</h3>
            </div>

            <form onSubmit={() => goTo(`/search?query=${searchInput}`)} className='searchContainer'>
              <input type="text" placeholder="Pesquisar linha" onChange={event => setSearchInput(event.target.value)} />
              <button type='submit'><MagnifyingGlass size={18} weight="bold" color="#2f855a" /></button>
            </form>
          </section>

          <br />

          <section>
            <h3>Sobre o projeto</h3>
            <p>O projeto "moovooca" é uma iniciativa criada pelos estudantes do curso Pet Computação da Universidade Federal do Ceará (UFC), Pedro Yuri e Cauan Victor, com o objetivo de fornecer informações gerais sobre os ônibus que param na UFC e, assim, auxiliar os estudantes no seu deslocamento pela cidade.</p>

            <br />

            <h3>Como funciona?</h3>
            <p>O sistema é acessível através de um site na internet e conta com uma interface simples e fácil de usar. Nele, é possível selecionar a linha de ônibus desejada e visualizar as informações de horários de partida e chegada, além de ter acesso a um mapa com o trajeto completo da linha.

              O projeto "moovooca" já está em funcionamento e tem sido muito bem recebido pela comunidade estudantil da UFC. Com sua interface intuitiva e informações precisas, o sistema tem ajudado muitos estudantes a planejar melhor suas rotas de transporte, evitando atrasos e transtornos no seu dia a dia.

              Em resumo, o "moovooca" é um projeto que exemplifica a importância da tecnologia na solução de problemas cotidianos. A iniciativa dos estudantes da UFC Pedro Yuri e Cauan Victor tem o potencial de melhorar a vida dos estudantes que precisam se deslocar diariamente pela cidade e é uma inspiração para outros jovens que buscam fazer a diferença em sua comunidade através da tecnologia.</p>
          </section>
        </BodyContainer>
      </Main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: linha } = await api.get(`/linhas`);

  return {
    props: {
      linhas: linha
    }
  }
}