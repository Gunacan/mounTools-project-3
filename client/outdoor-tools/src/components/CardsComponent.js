import React, { Component } from 'react'
import { Card, Modal, Button, Icon, Header, List, Segment, Divider, Form, Input } from 'semantic-ui-react'
import {Doughnut} from 'react-chartjs-2'

class CardsComponent extends Component {
  state = {
    tools:[],
    data: {
      name: '',
      must_have: 'Choose one'
    },
    postedResponse: '',
    editedResponse: ''
  }

  getData = (category) => {
    return fetch('https://trailist-p3.herokuapp.com/' + category)
      .then(response => response.json())
      .then(data => {
          this.setState({
            tools: data
          })
      })
  }

  handleChange = (event) => {
    const key = event.target.name
    const value = event.target.type === 'text' ?  event.target.value : eval(event.target.value)
    const data = this.state.data
    data[key] = value
    this.setState({
      data: data
    })
  }

  addNewItem = (category) => (event) => {
    event.preventDefault()
    const postUrl = 'https://trailist-p3.herokuapp.com/' + category

    fetch(postUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state.data)
    })
      .then(response => response.json())
      .then(posted => {
        this.setState({
          postedResponse: posted
        })
        this.getData(category)
        this.setState({data:{}})
      })
  }

  
  editItem = (id) => {

    let cat = document.getElementById('category').innerText
    const editUrl = `https://trailist-p3.herokuapp.com/${cat}/${id}`
    fetch(editUrl, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state.data)
    })
    .then(response => response.json())
    .then(edited => {
      this.setState({
        editedResponse: edited
      })
      this.getData(cat)
      this.setState({data:{}})
    })
  }


  removeItem = (id) => {
    
    let cat = document.getElementById('category').innerText
    const deleteUrl = `https://trailist-p3.herokuapp.com/${cat}/${id}`
    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(deleted => {
      this.getData(cat)
    })
  }
  

  render() {
    const mustHave = this.state.tools.filter(tool => {
      return tool.must_have === true
    })
    const NiceToHave = this.state.tools.filter(tool => {
      return tool.must_have === false
    })
    const chartdata = {
            labels: ['Must-have', 'Nice-to-have'],
            datasets: [{
              data: [mustHave.length, NiceToHave.length],
              backgroundColor: [
                'red',
                'rgb(206, 120, 54)'
                ],
                hoverBackgroundColor: [
                  '#f15f5f',
                  'rgb(249, 157, 87)'
                  ]
            }]
    }
    let tools = this.state.tools.length && this.state.tools.map(tool => {
      return (
              <List.Item key={tool.id} id='list-bar'>
                <div id='content'>
                  <List.Content color='blue' id='tool-name' >{tool.name}</List.Content>
                  {tool.must_have ? (<List.Description id='must-have' floated='' horizontalalign='middle' >Must-have</List.Description>) : (<List.Description id='nice-to-have' floated=''>Nice-to-have</List.Description>)}
                </div>
                <List.Content floated='right' animated='true' id='buttons'>
                  <Modal trigger={<Button icon size='mini' inverted ><Icon link name='edit' /></Button>} closeIcon basic size='small'>
                    <Modal.Content id='edit-add-form' >
                      <Segment inverted>
                        <Form inverted>
                          <Form.Group widths='equal' id='edit-form-text'>
                            <Form.Field  id='edit-form-name' control={Input} label='Item Name' placeholder={tool.name}  value={this.state.data.name} onChange={this.handleChange} name='name'/>
                            <div id='edit-importanceBar'>
                              <div>
                                <label htmlFor='edit-importanceBar'>Importance</label>
                              </div>
                              <div>
                                <select id='edit-form-select' name="must_have"  onChange={this.handleChange} value={this.state.data.must_have}>
                                  <option defaultValue disabled>Choose one</option>
                                  <option value={true} >Must-have</option>
                                  <option value={false} >Nice-to-have</option>
                                </select>
                              </div>
                            </div>
                          </Form.Group>
                          <Modal  closeIcon horizontalalign='middle' id='edit-status-message' trigger={<Form.Field control={Button}  color='green' onClick={() => this.editItem(tool.id)} >Save</Form.Field>}>
                            <Modal.Content  >
                              <Modal.Description>
                                {this.state.editedResponse.message ?  
                                  (<Header id='edit-error-status' color='red' >{this.state.editedResponse.message}!</Header>)
                                  : (<Header id='edit-success-status' color='green' >Changes saved!</Header>) }
                              </Modal.Description>
                            </Modal.Content>
                          </Modal>
                        </Form>
                      </Segment >
                    </Modal.Content>
                  </Modal>
                  <Button icon color='red' size='mini' inverted onClick={() => this.removeItem(tool.id)} > 
                    <Icon link name='remove' color='red' />  
                  </Button>
                </List.Content>
                <Divider horizontal></Divider>
              </List.Item>
      )
    })

    const activities = this.props.activities.map(activity => {
      return (
        <Modal  key={activity.name} trigger={<Card color='black' id='card' onClick={() => this.getData(activity.name)} image={activity.imgUrl} header={activity.name} />} closeIcon basic size='small'>
          <Modal trigger={<Header icon='add'  content='Add new item' href='#' />} closeIcon basic size='small' >
            <Modal.Content id='add-form'>
              <Segment inverted>
                <Form inverted onSubmit={this.addNewItem(activity.name)} >
                  <Form.Group widths='equal' id='form-text'>
                    <Form.Field  id='form-name' control={Input} label='Item Name' placeholder='Item Name' value={this.state.data.name} onChange={this.handleChange} name='name'/>
                    <div id="importanceBar">
                      <div>
                        <label htmlFor='importanceBar'>Importance</label>
                      </div>
                      <div>
                        <select id='form-select' name="must_have"  onChange={this.handleChange} value={this.state.data.must_have}>
                          <option defaultValue disabled>Choose one</option>
                          <option value={true} >Must-have</option>
                          <option value={false} >Nice-to-have</option>
                        </select>
                      </div>
                    </div>
                  </Form.Group>
                  <Modal  closeIcon horizontalalign='middle' id='status-message' trigger={<Form.Field control={Button}  color='green'>Add the Item</Form.Field>}>
                    <Modal.Content  >
                      <Modal.Description>
                      {this.state.postedResponse.message ?  
                        (<Header id='error-status' color='red' >{this.state.postedResponse.message}!</Header>)
                        : (<Header id='success-status' color='green' >Item succesfully added!</Header>) }
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                </Form>
              </Segment >
            </Modal.Content>
          </Modal>
          <Modal.Content>
            <h1 id='category'>{activity.name}</h1>
            <List id='tools_bar'  verticalAlign='middle' size='large' animated >
              {tools}
            </List>
            <div className='chart'>
              <Doughnut
                data={chartdata}
              />
            </div>
          </Modal.Content>
        </Modal>
      )
    })

    return (
        <React.Fragment>
          <main id='main'>
            <Card.Group itemsPerRow={3}>
              {activities}
            </Card.Group>
          </main>
        </React.Fragment>
    )
  }
}

export default CardsComponent