import React from 'react'
import { Image, Header, Button } from 'semantic-ui-react'

const HeaderComponent = () => {
  return (
    <header>
      <div className='header-cover'>
        <div className='app-info'>
          <Image centered src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxJLUuJCp4LcqNzDh5jt0pOgCY01wFPVgdqaFpmU0mhMGxh7bm' size='tiny' circular />
          <Header textAlign='center' as='h1' id='app-name' >Trailist</Header>
          <Header textAlign='center' as='h3' id='app-slogan' >You pick the adventure, we help you pack</Header>
          <Header textAlign='center' as='h4' id='app-description' >Simply select your mountain activity, and Trailist provides a comprehensive inventory of items you “must have,” as well as items that would be “nice to have” on your journey. 
            Trailist also provides you with the ability to add and remove items to fit your specific needs. 
            Trailist helps to take experience out of the packing equation. </Header>
          <div id='scroll-button' >
            <Button  href='#main' icon color='red' size='huge' primary >Get started!</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent