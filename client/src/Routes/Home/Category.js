import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Fade from "react-reveal/Fade"
import routes from "../../routes"
import { useMediaQuery } from "react-responsive"
import device from "../../hoc/theme"
import { useSelector } from "react-redux"

const LeftColumn = styled.div`
  opacity: 0.3;
  position: absolute;
  bottom: 3rem;
  left: 29%;
  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
  @media ${(props) => props.theme.laptop} {
    opacity: 0.5;
    left: 15%;
    bottom: 3rem;
  }
  @media ${(props) => props.theme.mobile} {
    opacity: 0.5;
    left: 5%;
    bottom: 1rem;
  }
`

const MapColumn = styled.section`
  padding: 2rem;
  height: 10vh;
  width: 20vw;
  border: 1px solid black;
  color: white;
  border-radius: 1rem;
  box-shadow: 1px 1px 1px 1px black;
  &:hover {
    transform: scale(1.005);
  }
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.laptop} {
    width: 250px;
  }
`

const RightColumn = styled.div`
  opacity: 0.3;
  position: absolute;
  bottom: 3rem;
  right: 29%;
  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
  @media ${(props) => props.theme.laptop} {
    opacity: 0.5;
    right: 15%;
    bottom: 3rem;
  }
  @media ${(props) => props.theme.mobile} {
    opacity: 0.5;
    right: 5%;
    bottom: 1rem;
  }
`

const SearchColumn = styled.section`
  padding: 2rem;
  height: 10vh;
  width: 20vw;
  border: 1px solid black;
  border-radius: 1rem;
  box-shadow: 1px 1px 1px 1px black;
  &:hover {
    transform: scale(1.005);
  }
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media ${(props) => props.theme.laptop} {
    width: 250px;
  }
`

const Title = styled.div``

const Contents = styled.div``

function Category({ time, theme }) {
  const { repProduct } = useSelector((state) => state.product)

  const [loadImage, setLoadImage] = useState([])
  const [coord, setCoord] = useState({}) //repProduct 좌표로 이동

  const isMobileOrLaptop = useMediaQuery({ query: device.mobile })

  useEffect(() => {
    setLoadImage(["logo/menu/menu1.jpg", "logo/menu/menu2.jpg"])
    //배포시 맨 처음 화면띄울때 에러를 방지하기 위해 coord를 이렇게 조작해줌
    setCoord({
      lat: repProduct && repProduct.coord ? repProduct.coord.lat : 37.5642135,
      lng: repProduct && repProduct.coord ? repProduct.coord.lng : 127.0016985,
    })
  }, [repProduct])

  return (
    <>
      {isMobileOrLaptop ? (
        /* 모바일  */
        <>
          <LeftColumn theme={theme}>
            <Link to={`${routes.findByMap}?lat=${coord.lat}&lng=${coord.lng}`}>
              <img
                style={{
                  marginLeft: "0.5rem",
                  width: "3rem",
                  height: "3rem",
                }}
                src="logo/map.png"
              />
            </Link>
          </LeftColumn>
          <RightColumn theme={theme}>
            <Link to={routes.findBySearch}>
              <img
                style={{
                  marginRight: "0.5rem",
                  width: "3rem",
                  height: "3rem",
                }}
                src="logo/search.png"
              />
            </Link>
          </RightColumn>
        </>
      ) : (
        /* 랩탑 이상 */
        <>
          <LeftColumn theme={theme}>
            <Fade
              when={time}
              left
              distance="0.5rem"
              delay={4000}
              duration={200}
            >
              <Link
                to={`${routes.findByMap}?lat=${coord.lat}&lng=${coord.lng}`}
              >
                <MapColumn
                  theme={theme}
                  style={{
                    background: `linear-gradient(to right, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%), url(${loadImage[0]}) center/cover`,
                  }}
                >
                  <Contents>
                    <Title>지도로 구경하기</Title>
                    <img
                      style={{
                        marginLeft: "0.5rem",
                        width: "3rem",
                        height: "3rem",
                      }}
                      src="logo/map.png"
                    />
                  </Contents>
                </MapColumn>
              </Link>
            </Fade>
          </LeftColumn>
          <RightColumn theme={theme}>
            <Fade
              when={time}
              right
              distance="0.5rem"
              delay={4000}
              duration={200}
            >
              <Link to={routes.findBySearch}>
                <SearchColumn
                  theme={theme}
                  style={{
                    background: `linear-gradient(to left, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%), url(${loadImage[1]}) center/cover`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Title>검색으로 구경하기</Title>
                    <Contents>
                      <img
                        style={{
                          marginRight: "0.5rem",
                          width: "3rem",
                          height: "3rem",
                        }}
                        src="logo/search.png"
                      />
                    </Contents>
                  </div>
                </SearchColumn>
              </Link>
            </Fade>
          </RightColumn>
        </>
      )}
    </>
  )
}

export default Category
