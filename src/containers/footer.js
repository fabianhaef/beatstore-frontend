import React from 'react'
import Footer from '../components/footer/Footer'

export function FooterContainer() {
  return (
    <Footer >
      <Footer.Wrapper>
          <Footer.Row>
            <Footer.Column>
              <Footer.Title>About Us</Footer.Title>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
            </Footer.Column>
            <Footer.Column>
              <Footer.Title>Products</Footer.Title>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
            </Footer.Column>
            <Footer.Column>
              <Footer.Title>Whatever</Footer.Title>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
            </Footer.Column>
            <Footer.Column>
              <Footer.Title>Social Media</Footer.Title>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Story</Footer.Link>
            </Footer.Column>
          </Footer.Row>
      </Footer.Wrapper>
    </ Footer>
  )
}
