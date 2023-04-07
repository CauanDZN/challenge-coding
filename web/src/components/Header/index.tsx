import { Bus, List } from "phosphor-react";
import { RefObject, useEffect, useRef, useState } from "react";
import { HandleNav, HeaderContainer, Logo } from "./styles";

import Nav from "../Nav";

import { HeaderProps } from "../../types/components/header";
import { useRouter } from "next/router";

export default function Header({ }: HeaderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const router = useRouter();

  const isTransparent = scrollY === 0;

  const refs = {
    header: useRef() as RefObject<HTMLDivElement>,
  };

  function handleNav() {
    setIsNavOpen(!isNavOpen);
  }

  function goTo(route: string) {
    router.push(route);
  }

  useEffect(() => {
    setHeaderHeight(refs.header.current?.clientHeight || 0);

    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY);
    });
  }, [refs.header]);

  return (
    <HeaderContainer ref={refs.header} isTransparent={isTransparent}>
      <div className='MainContainer'>

        <div className='LogoContainer'>
          <Logo onClick={() => goTo('/')}>
            <Bus size={24} weight="regular" color="#276749" />
            <span>
              moovooca
            </span>
          </Logo>
        </div>


        <div className="rightContainer">
          <Nav isNavOpen={isNavOpen} />
        </div>

        <HandleNav onClick={handleNav} active={isNavOpen}>
          <List size={24} weight="fill" color="rgba(0, 0, 0, 0.85)" />
        </HandleNav>
      </div>
    </HeaderContainer>
  )
}